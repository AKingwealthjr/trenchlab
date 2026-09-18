import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  collection, 
  getDocs, 
  onSnapshot 
} from 'firebase/firestore';
import { db, auth } from './firebase';
import { UserProfile, UserProgress, TradeJournalEntry } from '../types';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export interface FirestoreUserDocument {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  createdAt: string;
  level: number;
  levelName: string;
  xp: number;
  streak: number;
  lessonsCompleted: number;
  quizzesPassed: number;
  challengesCompleted: number;
  accessStatus?: 'active' | 'inactive' | 'suspended' | 'revoked' | 'expired';
  licenseId?: string | null;
  licenseActivatedAt?: string | null;
  accessExpiresAt?: string | null;
}

/**
 * Fetch or initialize an Operator profile in Firestore
 */
export async function getOrCreateUserProfile(
  uid: string, 
  defaults: { displayName: string; email: string; photoURL: string }
): Promise<{ userDoc: FirestoreUserDocument; isNew: boolean }> {
  const userRef = doc(db, 'users', uid);
  try {
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return { userDoc: snap.data() as FirestoreUserDocument, isNew: false };
    }

    // Initialize new operator profile
    const initialDoc: FirestoreUserDocument = {
      uid,
      displayName: defaults.displayName || 'Operator',
      email: defaults.email || '',
      photoURL: defaults.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${uid}`,
      createdAt: new Date().toISOString(),
      level: 1,
      levelName: 'Foundation',
      xp: 0,
      streak: 0,
      lessonsCompleted: 0,
      quizzesPassed: 0,
      challengesCompleted: 0
    };

    await setDoc(userRef, initialDoc);
    return { userDoc: initialDoc, isNew: true };
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, `users/${uid}`);
    throw err;
  }
}

/**
 * Fetch user progress across all subcollections
 */
export async function fetchUserFullProgress(uid: string): Promise<UserProgress> {
  const progressPath = `users/${uid}/progress`;
  const quizzesPath = `users/${uid}/quizzes`;
  const challengesPath = `users/${uid}/challenges`;
  const journalPath = `users/${uid}/journal`;

  try {
    const [progressSnaps, quizSnaps, challengeSnaps, journalSnaps] = await Promise.all([
      getDocs(collection(db, 'users', uid, 'progress')),
      getDocs(collection(db, 'users', uid, 'quizzes')),
      getDocs(collection(db, 'users', uid, 'challenges')),
      getDocs(collection(db, 'users', uid, 'journal'))
    ]);

    const completedLessons: string[] = [];
    const completedAssignments: Record<string, string> = {};
    progressSnaps.forEach(docSnap => {
      const data = docSnap.data();
      if (data.completed) {
        completedLessons.push(docSnap.id);
      }
      if (data.assignmentSubmission) {
        completedAssignments[docSnap.id] = data.assignmentSubmission;
      }
    });

    const quizScores: Record<string, number> = {};
    quizSnaps.forEach(docSnap => {
      const data = docSnap.data();
      quizScores[docSnap.id] = data.score || 0;
    });

    const completedChallenges: string[] = [];
    challengeSnaps.forEach(docSnap => {
      const data = docSnap.data();
      if (data.completed) {
        completedChallenges.push(docSnap.id);
      }
    });

    const journalEntries: TradeJournalEntry[] = [];
    journalSnaps.forEach(docSnap => {
      journalEntries.push(docSnap.data() as TradeJournalEntry);
    });

    // Sort journal entries descending by date/id
    journalEntries.sort((a, b) => (b.date > a.date ? 1 : -1));

    return {
      completedLessons,
      completedAssignments,
      quizScores,
      completedChallenges,
      learningStreak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      journalEntries
    };
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, progressPath);
    throw err;
  }
}

/**
 * Save / toggle lesson completion in Firestore
 */
export async function persistLessonProgress(
  uid: string, 
  lessonId: string, 
  completed: boolean,
  assignmentSubmission?: string
) {
  const lessonPath = `users/${uid}/progress/${lessonId}`;
  try {
    const ref = doc(db, 'users', uid, 'progress', lessonId);
    await setDoc(ref, {
      lessonId,
      completed,
      completedAt: new Date().toISOString(),
      ...(assignmentSubmission ? { assignmentSubmission } : {})
    }, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, lessonPath);
  }
}

/**
 * Save quiz score in Firestore
 */
export async function persistQuizScore(uid: string, quizId: string, score: number) {
  const quizPath = `users/${uid}/quizzes/${quizId}`;
  try {
    const ref = doc(db, 'users', uid, 'quizzes', quizId);
    await setDoc(ref, {
      quizId,
      score,
      passed: score >= 75,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, quizPath);
  }
}

/**
 * Save challenge completion in Firestore
 */
export async function persistChallengeCompletion(uid: string, challengeId: string, completed: boolean) {
  const challengePath = `users/${uid}/challenges/${challengeId}`;
  try {
    const ref = doc(db, 'users', uid, 'challenges', challengeId);
    await setDoc(ref, {
      challengeId,
      completed,
      completedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, challengePath);
  }
}

/**
 * Add journal trade entry in Firestore
 */
export async function persistJournalEntry(uid: string, entry: TradeJournalEntry) {
  const journalPath = `users/${uid}/journal/${entry.id}`;
  try {
    const ref = doc(db, 'users', uid, 'journal', entry.id);
    await setDoc(ref, entry);
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, journalPath);
  }
}

/**
 * Delete journal trade entry in Firestore
 */
export async function deleteJournalEntryDoc(uid: string, tradeId: string) {
  const journalPath = `users/${uid}/journal/${tradeId}`;
  try {
    const ref = doc(db, 'users', uid, 'journal', tradeId);
    await deleteDoc(ref);
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, journalPath);
  }
}

/**
 * Update user summary doc (XP, level, counts)
 */
export async function updateUserSummaryDoc(
  uid: string, 
  summary: Partial<FirestoreUserDocument>
) {
  const userPath = `users/${uid}`;
  try {
    const ref = doc(db, 'users', uid);
    await updateDoc(ref, summary);
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, userPath);
  }
}
