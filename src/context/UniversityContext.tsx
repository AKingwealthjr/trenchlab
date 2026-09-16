import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserProgress, TradeJournalEntry, Lesson, Phase } from '../types';
import { LEVELS, LevelInfo } from '../data/levelsData';
import { CURRICULUM_DATA, TOTAL_CURRICULUM_LESSONS } from '../data/curriculumData';

interface UniversityContextType {
  user: UserProfile;
  progress: UserProgress;
  currentLevel: LevelInfo;
  nextLevel: LevelInfo | null;
  xp: number;
  xpToNextLevel: number;
  totalLessonsCompleted: number;
  progressPercentage: number;
  toggleLessonComplete: (lessonId: string) => void;
  submitQuizScore: (quizId: string, score: number) => void;
  saveAssignment: (lessonId: string, deliverable: string) => void;
  addJournalEntry: (entry: Omit<TradeJournalEntry, 'id' | 'date'>) => void;
  deleteJournalEntry: (id: string) => void;
  toggleChallengeComplete: (challengeId: string) => void;
  login: (name: string, email: string, provider?: string) => void;
  logout: () => void;
  resetProgress: () => void;
  isPhaseUnlocked: (phase: Phase) => boolean;
}

const DEFAULT_USER: UserProfile = {
  id: 'user-001',
  name: 'Solana Operator',
  email: 'operator@trenchlab.edu',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  joinedDate: '2025-01-10',
  isGuest: false
};

const DEFAULT_PROGRESS: UserProgress = {
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

const STORAGE_KEY_USER = 'trenchlab_user_profile';
const STORAGE_KEY_PROGRESS = 'trenchlab_user_progress';

const UniversityContext = createContext<UniversityContextType | undefined>(undefined);

export const UniversityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROGRESS);
      return saved ? JSON.parse(saved) : DEFAULT_PROGRESS;
    } catch {
      return DEFAULT_PROGRESS;
    }
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } catch (e) {
      console.error('Failed to save user to storage', e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress to storage', e);
    }
  }, [progress]);

  // Calculate XP: 50 XP per lesson, 100 XP per passed quiz (>75%), 150 XP per challenge, 30 XP per journal entry
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

  const isPhaseUnlocked = (phase: Phase): boolean => {
    if (phase.levelRequired <= 1) return true;
    return currentLevel.levelNumber >= phase.levelRequired;
  };

  const toggleLessonComplete = (lessonId: string) => {
    setProgress(prev => {
      const exists = prev.completedLessons.includes(lessonId);
      const updated = exists 
        ? prev.completedLessons.filter(id => id !== lessonId)
        : [...prev.completedLessons, lessonId];
      
      return {
        ...prev,
        completedLessons: updated,
        lastActiveDate: new Date().toISOString().split('T')[0]
      };
    });
  };

  const submitQuizScore = (quizId: string, score: number) => {
    setProgress(prev => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [quizId]: Math.max(prev.quizScores[quizId] || 0, score)
      }
    }));
  };

  const saveAssignment = (lessonId: string, deliverable: string) => {
    setProgress(prev => ({
      ...prev,
      completedAssignments: {
        ...prev.completedAssignments,
        [lessonId]: deliverable
      }
    }));
  };

  const addJournalEntry = (entry: Omit<TradeJournalEntry, 'id' | 'date'>) => {
    const newEntry: TradeJournalEntry = {
      ...entry,
      id: `j-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setProgress(prev => ({
      ...prev,
      journalEntries: [newEntry, ...prev.journalEntries]
    }));
  };

  const deleteJournalEntry = (id: string) => {
    setProgress(prev => ({
      ...prev,
      journalEntries: prev.journalEntries.filter(j => j.id !== id)
    }));
  };

  const toggleChallengeComplete = (challengeId: string) => {
    setProgress(prev => {
      const exists = prev.completedChallenges.includes(challengeId);
      return {
        ...prev,
        completedChallenges: exists 
          ? prev.completedChallenges.filter(id => id !== challengeId)
          : [...prev.completedChallenges, challengeId]
      };
    });
  };

  const login = (name: string, email: string, provider: string = 'Credentials') => {
    setUser({
      id: `user-${Date.now()}`,
      name: name || 'Trench Trader',
      email: email || 'trader@solana.org',
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${name || 'SolanaTrader'}`,
      joinedDate: new Date().toISOString().split('T')[0],
      isGuest: false
    });
  };

  const logout = () => {
    setUser({
      id: 'guest',
      name: 'Guest Observer',
      email: 'guest@trenchlab.edu',
      avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Guest',
      joinedDate: new Date().toISOString().split('T')[0],
      isGuest: true
    });
  };

  const resetProgress = () => {
    setProgress({
      completedLessons: [],
      completedAssignments: {},
      quizScores: {},
      completedChallenges: [],
      learningStreak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      journalEntries: []
    });
  };

  return (
    <UniversityContext.Provider
      value={{
        user,
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
