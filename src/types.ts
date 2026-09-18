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

export type ResourceType = 'EXTERNAL_YOUTUBE' | 'TRENCHLAB_ORIGINAL';

export type ResourceStatus = 
  | 'DISCOVERED'
  | 'VALIDATED'
  | 'REVIEWED'
  | 'APPROVED'
  | 'REJECTED'
  | 'UNAVAILABLE'
  | 'NEEDS_REVIEW'
  | 'ARCHIVED';

export type LessonResourceSummaryStatus = 'RESOURCE_READY' | 'NEEDS_REVIEW' | 'NEEDS_RESOURCE';

export interface LessonResource {
  id: string;
  lessonId: string;
  provider: 'youtube' | 'trenchlab';
  providerVideoId: string;
  title: string;
  description: string;
  channelName: string;
  thumbnailUrl: string;
  youtubeUrl: string;
  embedUrl: string;
  durationSeconds?: number;
  durationFormatted?: string;
  publishedAt: string;
  relevanceScore: number;
  qualityScore: number;
  resourceType: ResourceType;
  status: ResourceStatus;
  isPrimary: boolean;
  searchQuery: string;
  whyUseful?: string;
  validationStatus?: 'candidate' | 'validated' | 'approved' | 'rejected' | 'unavailable' | 'needs_review';
  validatedAt?: string;
  validationReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LessonSearchProfile {
  lessonId: string;
  lessonTitle: string;
  lessonDescription: string;
  phaseId: number;
  phaseTitle: string;
  topic: string;
  difficulty: Difficulty;
  learningObjective: string;
  primarySearchQuery: string;
  secondarySearchQueries: string[];
  negativeKeywords: string[];
  preferredVideoLength: 'SHORT' | 'MEDIUM' | 'LONG';
  preferredContentType: string;
}

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
  accessStatus?: 'active' | 'inactive' | 'suspended' | 'revoked' | 'expired';
  licenseId?: string | null;
  licenseActivatedAt?: string | null;
  accessExpiresAt?: string | null;
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

export const DEFAULT_ADMIN_EMAILS = [
  '1alexkingsley@gmail.com',
  'alexkingsley@gmail.com',
  'precilexis@gmail.com'
] as const;

export function checkIsAdmin(email?: string | null): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  return DEFAULT_ADMIN_EMAILS.some(adminEmail => adminEmail.toLowerCase() === normalized);
}
