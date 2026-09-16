export type Difficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export type UserLevel = 
  | 'LEVEL 01: FOUNDATION'
  | 'LEVEL 02: MARKET READER'
  | 'LEVEL 03: SOLANA OPERATOR'
  | 'LEVEL 04: TRENCH SCOUT'
  | 'LEVEL 05: ON-CHAIN ANALYST'
  | 'LEVEL 06: MEMECOIN STRATEGIST'
  | 'LEVEL 07: ADVANCED TRENCHER'
  | 'LEVEL 08: SYSTEM BUILDER';

export interface VideoResource {
  title: string;
  creator: string;
  url: string;
  youtubeId?: string;
  duration: string;
  difficulty: Difficulty;
  whyUseful: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  type: 'multiple-choice' | 'scenario' | 'true-false';
}

export interface Quiz {
  id: string;
  phaseId: number;
  title: string;
  passingScore: number;
  questions: QuizQuestion[];
}

export interface Lesson {
  id: string;
  phaseId: number;
  lessonNumber: number;
  title: string;
  difficulty: Difficulty;
  estimatedTime: string;
  objectives: string[];
  videos: VideoResource[];
  keyConcepts: string[];
  deepDive: string[];
  realWorldExample: string;
  commonMistakes: string[];
  checkQuestions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  assignment: {
    title: string;
    instructions: string;
    deliverables: string[];
  };
}

export interface Phase {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  levelRequired: number;
  badge: string;
  lessons: Lesson[];
  quiz: Quiz;
  practicalAssignment: {
    title: string;
    description: string;
    task: string;
  };
}

export interface Challenge {
  id: string;
  title: string;
  difficulty: Difficulty;
  description: string;
  targetCriteria: string[];
  methodology: string[];
  outputRequirement: string;
  timeLimit?: string;
}

export interface ToolItem {
  id: string;
  name: string;
  category: 'DISCOVERY' | 'ON-CHAIN' | 'TRADING' | 'WALLET INTELLIGENCE';
  purpose: string;
  whenToUse: string;
  officialUrl: string;
  relevantLessons: string[];
  keyFeatures: string[];
  badge?: string;
}

export interface GlossaryItem {
  id: string;
  term: string;
  category: 'Market Structure' | 'Solana & DeFi' | 'On-Chain & Safety' | 'Execution & Risk';
  shortDef: string;
  fullExplanation: string;
  practicalTip: string;
}

export interface TradeJournalEntry {
  id: string;
  date: string;
  tokenSymbol: string;
  contractAddress?: string;
  entryPrice: number;
  exitPrice?: number;
  positionSizeUsd: number;
  reasonForEntry: string;
  invalidation: string;
  takeProfitPlan: string;
  result: 'WIN' | 'LOSS' | 'BREAKEVEN' | 'OPEN';
  pnlUsd?: number;
  pnlPercent?: number;
  emotion: 'Disciplined' | 'FOMO' | 'Patient' | 'Anxious' | 'Greedy' | 'Revenge';
  whatILearned: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  joinedDate: string;
  isGuest?: boolean;
}

export interface UserProgress {
  completedLessons: string[];
  completedAssignments: Record<string, string>;
  quizScores: Record<string, number>; // quizId -> score percentage (0-100)
  completedChallenges: string[];
  learningStreak: number;
  lastActiveDate: string;
  journalEntries: TradeJournalEntry[];
}
