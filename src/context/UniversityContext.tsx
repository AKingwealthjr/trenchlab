import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { UserProfile, UserProgress, TradeJournalEntry, Lesson, Phase } from '../types';
import { LEVELS, LevelInfo } from '../data/levelsData';
import { TOTAL_CURRICULUM_LESSONS } from '../data/curriculumData';
import { 
  auth, 
  onAuthStateChanged, 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
  googleProvider, 
  githubProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  signOut,
  FirebaseUser
} from '../lib/firebase';
import { 
  getOrCreateUserProfile, 
  fetchUserFullProgress, 
  persistLessonProgress, 
  persistQuizScore, 
  persistChallengeCompletion, 
  persistJournalEntry, 
  deleteJournalEntryDoc, 
  updateUserSummaryDoc,
  FirestoreUserDocument 
} from '../lib/firestoreService';

interface UniversityContextType {
  user: UserProfile;
  firebaseUser: FirebaseUser | null;
  authLoading: boolean;
  isAuthenticated: boolean;
  progress: UserProgress;
  currentLevel: LevelInfo;
  nextLevel: LevelInfo | null;
  xp: number;
  xpToNextLevel: number;
  totalLessonsCompleted: number;
  progressPercentage: number;
  toggleLessonComplete: (lessonId: string) => Promise<void>;
  submitQuizScore: (quizId: string, score: number) => Promise<void>;
  saveAssignment: (lessonId: string, deliverable: string) => Promise<void>;
  addJournalEntry: (entry: Omit<TradeJournalEntry, 'id' | 'date'>) => Promise<void>;
  deleteJournalEntry: (id: string) => Promise<void>;
  toggleChallengeComplete: (challengeId: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGoogleRedirect: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string, displayName: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfileName: (name: string) => Promise<void>;
  login: (name: string, email: string, provider?: string) => void;
  logout: () => Promise<void>;
  resetProgress: () => Promise<void>;
  isPhaseUnlocked: (phase: Phase) => boolean;
}

const GUEST_USER: UserProfile = {
  id: 'guest',
  name: 'Unverified Operator',
  email: 'operator@trenchlab.edu',
  avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Guest',
  joinedDate: new Date().toISOString().split('T')[0],
  isGuest: true
};

const EMPTY_PROGRESS: UserProgress = {
  completedLessons: [],
  completedAssignments: {},
  quizScores: {},
  completedChallenges: [],
  learningStreak: 0,
  lastActiveDate: new Date().toISOString().split('T')[0],
  journalEntries: []
};

// Seed demo progress for unauthenticated preview if needed
const DEMO_PROGRESS: UserProgress = {
  completedLessons: ['l1-01', 'l1-02', 'l1-03', 'l1-04'],
  completedAssignments: {
    'l1-01': 'Verified block height 304,912,840 on Solscan. Current live TPS measured at 2,420 with 0.000005 SOL base network fee.'
  },
  quizScores: {
    'quiz-01': 100
  },
  completedChallenges: ['c-01'],
  learningStreak: 4,
  lastActiveDate: new Date().toISOString().split('T')[0],
  journalEntries: [
    {
      id: 'j-01',
      date: '2025-02-14',
      tokenSymbol: 'BONK',
      contractAddress: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
      entryPrice: 0.0000215,
      exitPrice: 0.0000298,
      positionSizeUsd: 450,
      reasonForEntry: 'Breakout retest of prior 4h resistance zone. Volume acceleration was 3.2x relative to 20MA.',
      invalidation: '4-hour candle close back below 0.0000198.',
      takeProfitPlan: 'TP1 (50%) at 0.0000280 (hit), TP2 (25%) at 0.0000340, 25% moonbag runner.',
      result: 'WIN',
      pnlUsd: 173.7,
      pnlPercent: 38.6,
      emotion: 'Disciplined',
      whatILearned: 'Waiting for the 15m retest candle prevented getting shaken out during the morning dip.'
    },
    {
      id: 'j-02',
      date: '2025-02-16',
      tokenSymbol: 'SOLCAT',
      contractAddress: '8wJ1r...pump',
      entryPrice: 0.0125,
      exitPrice: 0.0108,
      positionSizeUsd: 200,
      reasonForEntry: 'Bonding curve migration reclaim attempt.',
      invalidation: 'Loss of Raydium pool initial price floor at 0.0110.',
      takeProfitPlan: 'TP1 at 0.020, stopped out at invalidation.',
      result: 'LOSS',
      pnlUsd: -27.2,
      pnlPercent: -13.6,
      emotion: 'Patient',
      whatILearned: 'Bonding curve snipers dumped heavy in the first 3 minutes. Need to wait for post-graduation floor to establish.'
    }
  ]
};

const UniversityContext = createContext<UniversityContextType | undefined>(undefined);

export const UniversityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserProfile>(GUEST_USER);
  const [progress, setProgress] = useState<UserProgress>(EMPTY_PROGRESS);
  const userRef = useRef<FirebaseUser | null>(null);
  userRef.current = firebaseUser;

  // Calculate XP & Level dynamically from progress
  const totalLessonsCompleted = progress.completedLessons.length;
  const passedQuizzesCount = Object.values(progress.quizScores).filter(score => (score as number) >= 75).length;
  const challengesCount = progress.completedChallenges.length;
  const journalsCount = progress.journalEntries.length;

  const xp = 
    totalLessonsCompleted * 50 + 
    passedQuizzesCount * 100 + 
    challengesCount * 150 + 
    journalsCount * 30;

  // Determine current level based on completed lessons and quizzes
  let currentLevel = LEVELS[0];
  let nextLevel: LevelInfo | null = LEVELS[1] || null;

  for (let i = LEVELS.length - 1; i >= 0; i--) {
    const lvl = LEVELS[i];
    if (totalLessonsCompleted >= lvl.minLessonsRequired && passedQuizzesCount >= lvl.minQuizzesRequired) {
      currentLevel = lvl;
      nextLevel = LEVELS[i + 1] || null;
      break;
    }
  }

  const xpToNextLevel = nextLevel ? Math.max(0, (nextLevel.minLessonsRequired * 50 + nextLevel.minQuizzesRequired * 100) - xp) : 0;
  const progressPercentage = Math.min(100, Math.round((totalLessonsCompleted / TOTAL_CURRICULUM_LESSONS) * 100));

  // Sync aggregate user document in Firestore when stats change
  const syncSummaryToFirestore = useCallback(async (
    uid: string,
    curXp: number,
    curLvl: number,
    curLvlName: string,
    lessons: number,
    quizzes: number,
    challenges: number
  ) => {
    try {
      await updateUserSummaryDoc(uid, {
        xp: curXp,
        level: curLvl,
        levelName: curLvlName,
        lessonsCompleted: lessons,
        quizzesPassed: quizzes,
        challengesCompleted: challenges
      });
    } catch (err) {
      console.warn('Silent sync to firestore summary failed:', err);
    }
  }, []);

  // Subscribe to Firebase Auth State
  useEffect(() => {
    // Process redirect sign-in result if returning from full-page redirect
    getRedirectResult(auth).then(async (cred) => {
      if (cred?.user) {
        await getOrCreateUserProfile(cred.user.uid, {
          displayName: cred.user.displayName || 'Google Operator',
          email: cred.user.email || '',
          photoURL: cred.user.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${cred.user.uid}`
        });
      }
    }).catch((err) => {
      console.warn('Redirect sign-in notice:', err);
    });

    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        try {
          // Initialize or fetch user doc from Firestore
          const { userDoc, isNew } = await getOrCreateUserProfile(fbUser.uid, {
            displayName: fbUser.displayName || 'Solana Operator',
            email: fbUser.email || '',
            photoURL: fbUser.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${fbUser.uid}`
          });

          setUser({
            id: fbUser.uid,
            name: userDoc.displayName || fbUser.displayName || 'Solana Operator',
            email: userDoc.email || fbUser.email || '',
            avatarUrl: userDoc.photoURL || fbUser.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${fbUser.uid}`,
            joinedDate: userDoc.createdAt ? userDoc.createdAt.split('T')[0] : new Date().toISOString().split('T')[0],
            isGuest: false
          });

          if (isNew) {
            // New operator starts with fresh empty progress
            setProgress(EMPTY_PROGRESS);
          } else {
            // Load real persistent progress from Firestore
            const loadedProgress = await fetchUserFullProgress(fbUser.uid);
            // Maintain streak from doc if available
            loadedProgress.learningStreak = userDoc.streak || (loadedProgress.completedLessons.length > 0 ? 1 : 0);
            setProgress(loadedProgress);
          }
        } catch (error) {
          console.error('Error fetching user profile or progress from Firestore:', error);
          // Fallback user state
          setUser({
            id: fbUser.uid,
            name: fbUser.displayName || 'Solana Operator',
            email: fbUser.email || '',
            avatarUrl: fbUser.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${fbUser.uid}`,
            joinedDate: new Date().toISOString().split('T')[0],
            isGuest: false
          });
          setProgress(EMPTY_PROGRESS);
        }
      } else {
        // Not authenticated
        setUser(GUEST_USER);
        setProgress(EMPTY_PROGRESS);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const isPhaseUnlocked = (phase: Phase): boolean => {
    if (phase.levelRequired <= 1) return true;
    return currentLevel.levelNumber >= phase.levelRequired;
  };

  const toggleLessonComplete = async (lessonId: string) => {
    const exists = progress.completedLessons.includes(lessonId);
    const updated = exists 
      ? progress.completedLessons.filter(id => id !== lessonId)
      : [...progress.completedLessons, lessonId];
    
    const newProgress = {
      ...progress,
      completedLessons: updated,
      learningStreak: Math.max(1, progress.learningStreak),
      lastActiveDate: new Date().toISOString().split('T')[0]
    };
    setProgress(newProgress);

    if (firebaseUser) {
      await persistLessonProgress(firebaseUser.uid, lessonId, !exists);
      // Sync summary metrics
      const newLessonsCount = updated.length;
      const newXp = newLessonsCount * 50 + passedQuizzesCount * 100 + challengesCount * 150 + journalsCount * 30;
      await syncSummaryToFirestore(
        firebaseUser.uid, 
        newXp, 
        currentLevel.levelNumber, 
        currentLevel.title, 
        newLessonsCount, 
        passedQuizzesCount, 
        challengesCount
      );
    }
  };

  const submitQuizScore = async (quizId: string, score: number) => {
    const updatedScores = {
      ...progress.quizScores,
      [quizId]: Math.max(progress.quizScores[quizId] || 0, score)
    };

    setProgress(prev => ({
      ...prev,
      quizScores: updatedScores
    }));

    if (firebaseUser) {
      await persistQuizScore(firebaseUser.uid, quizId, score);
      const newPassedCount = Object.values(updatedScores).filter(s => (s as number) >= 75).length;
      const newXp = totalLessonsCompleted * 50 + newPassedCount * 100 + challengesCount * 150 + journalsCount * 30;
      await syncSummaryToFirestore(
        firebaseUser.uid, 
        newXp, 
        currentLevel.levelNumber, 
        currentLevel.title, 
        totalLessonsCompleted, 
        newPassedCount, 
        challengesCount
      );
    }
  };

  const saveAssignment = async (lessonId: string, deliverable: string) => {
    setProgress(prev => ({
      ...prev,
      completedAssignments: {
        ...prev.completedAssignments,
        [lessonId]: deliverable
      }
    }));

    if (firebaseUser) {
      await persistLessonProgress(firebaseUser.uid, lessonId, true, deliverable);
    }
  };

  const addJournalEntry = async (entry: Omit<TradeJournalEntry, 'id' | 'date'>) => {
    const newEntry: TradeJournalEntry = {
      ...entry,
      id: `j-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };

    setProgress(prev => ({
      ...prev,
      journalEntries: [newEntry, ...prev.journalEntries]
    }));

    if (firebaseUser) {
      await persistJournalEntry(firebaseUser.uid, newEntry);
      const newJournalsCount = journalsCount + 1;
      const newXp = totalLessonsCompleted * 50 + passedQuizzesCount * 100 + challengesCount * 150 + newJournalsCount * 30;
      await syncSummaryToFirestore(
        firebaseUser.uid, 
        newXp, 
        currentLevel.levelNumber, 
        currentLevel.title, 
        totalLessonsCompleted, 
        passedQuizzesCount, 
        challengesCount
      );
    }
  };

  const deleteJournalEntry = async (id: string) => {
    setProgress(prev => ({
      ...prev,
      journalEntries: prev.journalEntries.filter(j => j.id !== id)
    }));

    if (firebaseUser) {
      await deleteJournalEntryDoc(firebaseUser.uid, id);
    }
  };

  const toggleChallengeComplete = async (challengeId: string) => {
    const exists = progress.completedChallenges.includes(challengeId);
    const updated = exists 
      ? progress.completedChallenges.filter(id => id !== challengeId)
      : [...progress.completedChallenges, challengeId];

    setProgress(prev => ({
      ...prev,
      completedChallenges: updated
    }));

    if (firebaseUser) {
      await persistChallengeCompletion(firebaseUser.uid, challengeId, !exists);
      const newChallengesCount = updated.length;
      const newXp = totalLessonsCompleted * 50 + passedQuizzesCount * 100 + newChallengesCount * 150 + journalsCount * 30;
      await syncSummaryToFirestore(
        firebaseUser.uid, 
        newXp, 
        currentLevel.levelNumber, 
        currentLevel.title, 
        totalLessonsCompleted, 
        passedQuizzesCount, 
        newChallengesCount
      );
    }
  };

  const signInWithGoogleRedirect = async () => {
    await signInWithRedirect(auth, googleProvider);
  };

  const signInWithGoogle = async () => {
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      if (cred.user) {
        await getOrCreateUserProfile(cred.user.uid, {
          displayName: cred.user.displayName || 'Google Operator',
          email: cred.user.email || '',
          photoURL: cred.user.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${cred.user.uid}`
        });
      }
    } catch (err: unknown) {
      const errCode = typeof err === 'object' && err !== null && 'code' in err 
        ? String((err as { code: unknown }).code) 
        : '';
      // If browser partitions cross-origin storage or blocks the popup window,
      // seamlessly transition to standard OAuth redirect flow:
      if (errCode === 'auth/network-request-failed' || errCode === 'auth/popup-blocked') {
        console.warn('Cross-origin popup interrupted by browser. Redirecting via OAuth...');
        await signInWithRedirect(auth, googleProvider);
        return;
      }
      throw err;
    }
  };

  const signInWithGithub = async () => {
    try {
      const cred = await signInWithPopup(auth, githubProvider);
      if (cred.user) {
        await getOrCreateUserProfile(cred.user.uid, {
          displayName: cred.user.displayName || 'GitHub Trencher',
          email: cred.user.email || '',
          photoURL: cred.user.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${cred.user.uid}`
        });
      }
    } catch (err: unknown) {
      const errCode = typeof err === 'object' && err !== null && 'code' in err 
        ? String((err as { code: unknown }).code) 
        : '';
      if (errCode === 'auth/network-request-failed' || errCode === 'auth/popup-blocked') {
        console.warn('Cross-origin popup interrupted by browser. Redirecting via GitHub OAuth...');
        await signInWithRedirect(auth, githubProvider);
        return;
      }
      throw err;
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const registerWithEmail = async (email: string, pass: string, displayName: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    if (cred.user) {
      await updateProfile(cred.user, { displayName });
      await getOrCreateUserProfile(cred.user.uid, {
        displayName: displayName || 'Operator',
        email,
        photoURL: `https://api.dicebear.com/7.x/bottts/svg?seed=${cred.user.uid}`
      });
    }
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const updateProfileName = async (name: string) => {
    if (firebaseUser) {
      await updateProfile(firebaseUser, { displayName: name });
      await updateUserSummaryDoc(firebaseUser.uid, { displayName: name });
      setUser(prev => ({ ...prev, name }));
    } else {
      setUser(prev => ({ ...prev, name }));
    }
  };

  // Backwards compatibility shim for existing components calling login(...)
  const login = (name: string, email: string) => {
    setUser(prev => ({
      ...prev,
      name: name || prev.name,
      email: email || prev.email
    }));
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Sign out error:', err);
    }
    setFirebaseUser(null);
    setUser(GUEST_USER);
    setProgress(EMPTY_PROGRESS);
  };

  const resetProgress = async () => {
    setProgress(EMPTY_PROGRESS);
    if (firebaseUser) {
      await updateUserSummaryDoc(firebaseUser.uid, {
        xp: 0,
        level: 1,
        levelName: 'Foundation',
        streak: 0,
        lessonsCompleted: 0,
        quizzesPassed: 0,
        challengesCompleted: 0
      });
    }
  };

  return (
    <UniversityContext.Provider
      value={{
        user,
        firebaseUser,
        authLoading,
        isAuthenticated: Boolean(firebaseUser),
        progress,
        currentLevel,
        nextLevel,
        xp,
        xpToNextLevel,
        totalLessonsCompleted,
        progressPercentage,
        toggleLessonComplete,
        submitQuizScore,
        saveAssignment,
        addJournalEntry,
        deleteJournalEntry,
        toggleChallengeComplete,
        signInWithGoogle,
        signInWithGoogleRedirect,
        signInWithGithub,
        signInWithEmail,
        registerWithEmail,
        resetPassword,
        updateProfileName,
        login,
        logout,
        resetProgress,
        isPhaseUnlocked
      }}
    >
      {children}
    </UniversityContext.Provider>
  );
};

export const useUniversity = () => {
  const context = useContext(UniversityContext);
  if (!context) {
    throw new Error('useUniversity must be used within a UniversityProvider');
  }
  return context;
};
