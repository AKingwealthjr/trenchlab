import { UserLevel } from '../types';

export interface LevelInfo {
  levelNumber: number;
  title: UserLevel;
  shortTitle: string;
  minPhaseRequired: number;
  minLessonsRequired: number;
  minQuizzesRequired: number;
  description: string;
  badge: string;
  unlockedCapabilities: string[];
}

export const LEVELS: LevelInfo[] = [
  {
    levelNumber: 1,
    title: 'LEVEL 01: FOUNDATION',
    shortTitle: 'Foundation',
    minPhaseRequired: 0,
    minLessonsRequired: 0,
    minQuizzesRequired: 0,
    description: 'Mastering the core mechanics of blockchain, market caps, tokenomics, and liquidity pools.',
    badge: 'LVL-1',
    unlockedCapabilities: ['Market structure basics', 'Liquidity / MC ratio analysis', 'Terminal navigation']
  },
  {
    levelNumber: 2,
    title: 'LEVEL 02: MARKET READER',
    shortTitle: 'Market Reader',
    minPhaseRequired: 1,
    minLessonsRequired: 12,
    minQuizzesRequired: 1,
    description: 'Technical price-action reading, candlestick wicks, multi-timeframe structures, and breakout validation.',
    badge: 'LVL-2',
    unlockedCapabilities: ['Support / Resistance mapping', 'Break of structure identification', 'Wick exhaustion detection']
  },
  {
    levelNumber: 3,
    title: 'LEVEL 03: SOLANA OPERATOR',
    shortTitle: 'Solana Operator',
    minPhaseRequired: 2,
    minLessonsRequired: 27,
    minQuizzesRequired: 2,
    description: 'Deep familiarity with the Solana execution stack: Phantom, Jupiter routing, Raydium pools, and bonding curves.',
    badge: 'LVL-3',
    unlockedCapabilities: ['Priority fee tuning', 'Slippage optimization', 'Solscan block validation']
  },
  {
    levelNumber: 4,
    title: 'LEVEL 04: TRENCH SCOUT',
    shortTitle: 'Trench Scout',
    minPhaseRequired: 3,
    minLessonsRequired: 39,
    minQuizzesRequired: 3,
    description: 'Mastery of DexScreener and Birdeye for early token discovery, pair screening, and volume monitoring.',
    badge: 'LVL-4',
    unlockedCapabilities: ['New pair filtering', 'Wash trading filters', 'Fast triage (PASS / WATCH / INVESTIGATE)']
  },
  {
    levelNumber: 5,
    title: 'LEVEL 05: ON-CHAIN ANALYST',
    shortTitle: 'On-Chain Analyst',
    minPhaseRequired: 5,
    minLessonsRequired: 66,
    minQuizzesRequired: 5,
    description: 'Forensic audits of smart contracts, mint/freeze authorities, LP locks, top holder clustering, and dev dumping.',
    badge: 'LVL-5',
    unlockedCapabilities: ['Bubblemaps cluster analysis', 'Dev wallet tracking', 'Honeypot code detection']
  },
  {
    levelNumber: 6,
    title: 'LEVEL 06: MEMECOIN STRATEGIST',
    shortTitle: 'Memecoin Strategist',
    minPhaseRequired: 7,
    minLessonsRequired: 90,
    minQuizzesRequired: 7,
    description: 'Executing predefined, high-probability entry models: early momentum, reclaim entries, and volume breakouts.',
    badge: 'LVL-6',
    unlockedCapabilities: ['Setup vs Invalidation logic', 'Pullback confirmation', 'FOMO suppression protocols']
  },
  {
    levelNumber: 7,
    title: 'LEVEL 07: ADVANCED TRENCHER',
    shortTitle: 'Advanced Trencher',
    minPhaseRequired: 9,
    minLessonsRequired: 112,
    minQuizzesRequired: 9,
    description: 'Strict capital preservation, mathematical position sizing, multi-tiered profit targets, and emotional discipline.',
    badge: 'LVL-7',
    unlockedCapabilities: ['Position calculator execution', 'Trailing stops', 'Trade journaling analytics']
  },
  {
    levelNumber: 8,
    title: 'LEVEL 08: SYSTEM BUILDER',
    shortTitle: 'System Builder',
    minPhaseRequired: 11,
    minLessonsRequired: 135,
    minQuizzesRequired: 11,
    description: 'Operating a fully systematic, multi-signal trading framework with on-chain confluence and complete risk control.',
    badge: 'LVL-8',
    unlockedCapabilities: ['Full 5-minute token teardowns', 'Personal edge definition', 'Institutional risk modeling']
  }
];

export function calculateUserLevel(completedLessonsCount: number, completedQuizzesCount: number): LevelInfo {
  let matched = LEVELS[0];
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (completedLessonsCount >= LEVELS[i].minLessonsRequired && completedQuizzesCount >= LEVELS[i].minQuizzesRequired) {
      matched = LEVELS[i];
      break;
    }
  }
  return matched;
}
