const fs = require('fs');
const path = require('path');
const { formatLesson } = require('./generateAllCurriculum.cjs');
const { phase3Lessons } = require('./buildFullCurriculum.cjs');

const phase4Lessons = [
  { id: 'l4-01', phaseId: 4, lessonNumber: 1, title: 'DexScreener Interface & Custom Layouts' },
  { id: 'l4-02', phaseId: 4, lessonNumber: 2, title: 'New Pairs vs Trending: Filtering the Noise' },
  { id: 'l4-03', phaseId: 4, lessonNumber: 3, title: 'Setting Up Custom Price & Volume Alerts on DexScreener' },
  { id: 'l4-04', phaseId: 4, lessonNumber: 4, title: 'Identifying Wash Trading & Fake Volume Rings' },
  { id: 'l4-05', phaseId: 4, lessonNumber: 5, title: 'Multi-Charts Setup for Simultaneous Token Tracking' },
  { id: 'l4-06', phaseId: 4, lessonNumber: 6, title: 'Reading Liquidity Locks & Burn Badges on DexScreener' },
  { id: 'l4-07', phaseId: 4, lessonNumber: 7, title: 'Top Traders Tab: Inspecting PnL & Holding Percentages' },
  { id: 'l4-08', phaseId: 4, lessonNumber: 8, title: 'Transaction Filters: Whale Buys vs Micro-Dust Snipes' },
  { id: 'l4-09', phaseId: 4, lessonNumber: 9, title: 'Integrating Technical Indicators into DexScreener Charts' },
  { id: 'l4-10', phaseId: 4, lessonNumber: 10, title: 'Detecting Ghost Volume and Bot Spikes' },
  { id: 'l4-11', phaseId: 4, lessonNumber: 11, title: 'Mobile vs Desktop Workflow Optimization on DexScreener' },
  { id: 'l4-12', phaseId: 4, lessonNumber: 12, title: 'DexScreener vs Alternative DEX Aggregators' }
];

const phase5Lessons = [
  { id: 'l5-01', phaseId: 5, lessonNumber: 1, title: 'Birdeye Overview & Statistical Edge' },
  { id: 'l5-02', phaseId: 5, lessonNumber: 2, title: 'Unique Traders vs Raw Transaction Volume on Birdeye' },
  { id: 'l5-03', phaseId: 5, lessonNumber: 3, title: 'Birdeye Leaderboards: Spotting High-Win-Rate Wallets' },
  { id: 'l5-04', phaseId: 5, lessonNumber: 4, title: 'Token Overview & Security Scores on Birdeye' },
  { id: 'l5-05', phaseId: 5, lessonNumber: 5, title: 'Net Money Flow Inflows vs Outflows' },
  { id: 'l5-06', phaseId: 5, lessonNumber: 6, title: 'Historical Price & Liquidity Depth Analysis' },
  { id: 'l5-07', phaseId: 5, lessonNumber: 7, title: 'Tracking Token Holder Distribution Trends' },
  { id: 'l5-08', phaseId: 5, lessonNumber: 8, title: 'Setting Up Custom Screener Presets on Birdeye' },
  { id: 'l5-09', phaseId: 5, lessonNumber: 9, title: 'Birdeye API & Real-Time Data Feeds Overview' },
  { id: 'l5-10', phaseId: 5, lessonNumber: 10, title: 'Birdeye & DexScreener Dual-Screen Confluence Workflow' }
];

const phase6Lessons = [
  { id: 'l6-01', phaseId: 6, lessonNumber: 1, title: 'Mint Authority & Freeze Authority: The Non-Negotiables' },
  { id: 'l6-02', phaseId: 6, lessonNumber: 2, title: 'Bubblemaps & Clustered Insider Wallets' },
  { id: 'l6-03', phaseId: 6, lessonNumber: 3, title: 'LP Token Burns vs LP Token Locks: How Developers Pull Liquidity' },
  { id: 'l6-04', phaseId: 6, lessonNumber: 4, title: 'RugCheck.xyz Walkthrough & Automated Risk Audits' },
  { id: 'l6-05', phaseId: 6, lessonNumber: 5, title: 'Top 10 Holder Concentration Risk: The 20% Rule' },
  { id: 'l6-06', phaseId: 6, lessonNumber: 6, title: 'HoneyPots & Blacklists on Solana: Can You Sell?' },
  { id: 'l6-07', phaseId: 6, lessonNumber: 7, title: 'Dev Holding Audits: Spotting Supply Dispersal Across 20 Wallets' },
  { id: 'l6-08', phaseId: 6, lessonNumber: 8, title: 'Social Engineering Red Flags: Fake Influencers & Stolen Content' },
  { id: 'l6-09', phaseId: 6, lessonNumber: 9, title: 'Metadata Mutability & Image Swapping Vulnerabilities' },
  { id: 'l6-10', phaseId: 6, lessonNumber: 10, title: 'Telegram & Twitter Verification: Spotting Bottled Engagement' },
  { id: 'l6-11', phaseId: 6, lessonNumber: 11, title: 'Volume Bot Injections & Bundler Sniping Detection' },
  { id: 'l6-12', phaseId: 6, lessonNumber: 12, title: 'Coordinated Developer Dumps: Timing the Liquidity Rug' },
  { id: 'l6-13', phaseId: 6, lessonNumber: 13, title: 'The Pre-Flight Safety Checklist: 60-Second Security Audit' }
];

const phase7Lessons = [
  { id: 'l7-01', phaseId: 7, lessonNumber: 1, title: 'Reading Raw Wallets & PnL Audits' },
  { id: 'l7-02', phaseId: 7, lessonNumber: 2, title: 'Solscan Deep Dive: Deciphering SPL Token Transfer Histories' },
  { id: 'l7-03', phaseId: 7, lessonNumber: 3, title: 'Identifying Smart Money Wallets vs Dev Cabal Wallets' },
  { id: 'l7-04', phaseId: 7, lessonNumber: 4, title: 'Spotting Fresh Wallets Funded by CEXs vs Mixer Bridges' },
  { id: 'l7-05', phaseId: 7, lessonNumber: 5, title: 'Filter Bubblemaps Clustered Transfers & Direct Transfers' },
  { id: 'l7-06', phaseId: 7, lessonNumber: 6, title: 'Building a Personal Wallet Watchlist in Telegram & DexScreener' },
  { id: 'l7-07', phaseId: 7, lessonNumber: 7, title: 'Copy-Trading Risks: Latency, Frontrunning & Slippage Traps' },
  { id: 'l7-08', phaseId: 7, lessonNumber: 8, title: 'Tracking Early Buyers & Snipers on Pump.fun Launches' },
  { id: 'l7-09', phaseId: 7, lessonNumber: 9, title: 'Identifying Insider Sniping Rings & Bundled Buys' },
  { id: 'l7-10', phaseId: 7, lessonNumber: 10, title: 'PnL Verification: Filtering Out Unrealized Paper Gains' },
  { id: 'l7-11', phaseId: 7, lessonNumber: 11, title: 'Analyzing Wallet Holding Time & Distribution Behavior' },
  { id: 'l7-12', phaseId: 7, lessonNumber: 12, title: 'The Daily Smart Money Flow Routine' }
];

const phase8Lessons = [
  { id: 'l8-01', phaseId: 8, lessonNumber: 1, title: 'Raw Volume vs Volume Acceleration' },
  { id: 'l8-02', phaseId: 8, lessonNumber: 2, title: 'Identifying Organic Community Volume vs Market Maker Wash Trading' },
  { id: 'l8-03', phaseId: 8, lessonNumber: 3, title: 'Volume-to-Market-Cap (V/MC) Ratio Benchmarks' },
  { id: 'l8-04', phaseId: 8, lessonNumber: 4, title: 'Transaction Count vs Volume: Retail vs Whales' },
  { id: 'l8-05', phaseId: 8, lessonNumber: 5, title: 'Volume Profile & High-Volume Nodes (HVN) vs Low-Volume Nodes (LVN)' },
  { id: 'l8-06', phaseId: 8, lessonNumber: 6, title: 'Exhaustion Volume vs Breakout Volume' },
  { id: 'l8-07', phaseId: 8, lessonNumber: 7, title: 'Buy-to-Sell Pressure Imbalances: Order Flow Dynamics' },
  { id: 'l8-08', phaseId: 8, lessonNumber: 8, title: 'Time-of-Day Volume Cycles (Asia, Europe, US Market Hours)' },
  { id: 'l8-09', phaseId: 8, lessonNumber: 9, title: 'Social Sentiment Surges & CT (Crypto Twitter) Volume Spikes' },
  { id: 'l8-10', phaseId: 8, lessonNumber: 10, title: 'Bonding Curve Migration Volume Surges' },
  { id: 'l8-11', phaseId: 8, lessonNumber: 11, title: 'Sustained Volume vs Single-Candle Pump-and-Dump Spikes' },
  { id: 'l8-12', phaseId: 8, lessonNumber: 12, title: 'Volume Confluence Scoring Framework' }
];

const phase9Lessons = [
  { id: 'l9-01', phaseId: 9, lessonNumber: 1, title: 'Strategy 01: The Pullback & S/R Re-Test Entry' },
  { id: 'l9-02', phaseId: 9, lessonNumber: 2, title: 'Strategy 02: The Support Reclaim (Liquidity Sweep Entry)' },
  { id: 'l9-03', phaseId: 9, lessonNumber: 3, title: 'Strategy 03: The Bonding Curve Migration Play (Raydium Listing Bounce)' },
  { id: 'l9-04', phaseId: 9, lessonNumber: 4, title: 'Strategy 04: The Narrative Pivot & Cult Memecoin Accumulation' },
  { id: 'l9-05', phaseId: 9, lessonNumber: 5, title: 'Strategy 05: The Consolidation Range Breakout Entry' },
  { id: 'l9-06', phaseId: 9, lessonNumber: 6, title: 'Strategy 06: The Golden Pocket Fibonacci Retracement Entry' },
  { id: 'l9-07', phaseId: 9, lessonNumber: 7, title: 'Strategy 07: The Smart Money Wallet Inflow Follow' },
  { id: 'l9-08', phaseId: 9, lessonNumber: 8, title: 'Strategy 08: The Second-Leg Continuation Play' },
  { id: 'l9-09', phaseId: 9, lessonNumber: 9, title: 'Entry Timing: Limit Bids vs Aggressive Market Swaps' },
  { id: 'l9-10', phaseId: 9, lessonNumber: 10, title: 'Scaling In: Staggered DCA vs Single Bullet Entry' },
  { id: 'l9-11', phaseId: 9, lessonNumber: 11, title: 'Invalidating an Entry: When to Cut Immediately' },
  { id: 'l9-12', phaseId: 9, lessonNumber: 12, title: 'Managing Slippage During High-Volatility Breakouts' },
  { id: 'l9-13', phaseId: 9, lessonNumber: 13, title: 'Avoiding Top-Tick FOMO Entries: The 3-Candle Rule' }
];

const phase10Lessons = [
  { id: 'l10-01', phaseId: 10, lessonNumber: 1, title: 'The Golden Rule of Capital Preservation: Survival First' },
  { id: 'l10-02', phaseId: 10, lessonNumber: 2, title: 'Interactive Position Sizing Calculator Mastery' },
  { id: 'l10-03', phaseId: 10, lessonNumber: 3, title: 'Calculating Maximum Risk Per Trade (1-2% Account Rule)' },
  { id: 'l10-04', phaseId: 10, lessonNumber: 4, title: 'Hard Stop Loss vs Mental Stop Loss in High-Slippage DEXs' },
  { id: 'l10-05', phaseId: 10, lessonNumber: 5, title: 'Portfolio Allocation: Moonshots vs Core Sol Holdings' },
  { id: 'l10-06', phaseId: 10, lessonNumber: 6, title: 'The Mathematics of Drawdowns: Why Recovering from 90% is Nearly Impossible' },
  { id: 'l10-07', phaseId: 10, lessonNumber: 7, title: 'Setting Invalidation Levels Based on Market Structure, Not Dollars' },
  { id: 'l10-08', phaseId: 10, lessonNumber: 8, title: 'Daily Loss Limits: The Kill Switch Protocol' },
  { id: 'l10-09', phaseId: 10, lessonNumber: 9, title: 'Managing Exposure Across Multiple Correlated Memecoins' },
  { id: 'l10-10', phaseId: 10, lessonNumber: 10, title: 'Sizing Down During Low-Volume Chop & Downtrends' },
  { id: 'l10-11', phaseId: 10, lessonNumber: 11, title: 'Protecting Profits: Bankrolling and Securing Cold Storage Wins' },
  { id: 'l10-12', phaseId: 10, lessonNumber: 12, title: 'Gas & Priority Fee Budgeting: Avoiding Fee Bleed' },
  { id: 'l10-13', phaseId: 10, lessonNumber: 13, title: 'Managing Black Swan Events & Flash Crashes' },
  { id: 'l10-14', phaseId: 10, lessonNumber: 14, title: 'The Operator Risk Management Audit Checklist' }
];

const phase11Lessons = [
  { id: 'l11-01', phaseId: 11, lessonNumber: 1, title: 'The Tiered Profit Framework: TP1, TP2, TP3 & Runners' },
  { id: 'l11-02', phaseId: 11, lessonNumber: 2, title: 'Trading Psychology: Conquering FOMO, Greed & Revenge' },
  { id: 'l11-03', phaseId: 11, lessonNumber: 3, title: 'De-Risking to Free Roll: Pulling Initial Capital on Double' },
  { id: 'l11-04', phaseId: 11, lessonNumber: 4, title: 'Trailing Stops Using Market Structure Swing Lows' },
  { id: 'l11-05', phaseId: 11, lessonNumber: 5, title: 'The "Round Number" Psychological Trap ($1M, $10M, $100M MC)' },
  { id: 'l11-06', phaseId: 11, lessonNumber: 6, title: 'Dealing with "Should-Have-Held" Regret & Seller Remorse' },
  { id: 'l11-07', phaseId: 11, lessonNumber: 7, title: 'The Post-Trade Emotional Cooldown: Resetting Between Wins and Losses' },
  { id: 'l11-08', phaseId: 11, lessonNumber: 8, title: 'Overcoming Overtrading & Dopamine Addiction in the Trenches' },
  { id: 'l11-09', phaseId: 11, lessonNumber: 9, title: 'Managing Win Streaks: The Danger of Euphoric Sizing' },
  { id: 'l11-10', phaseId: 11, lessonNumber: 10, title: 'Managing Losing Streaks: Preserving Mental Capital' },
  { id: 'l11-11', phaseId: 11, lessonNumber: 11, title: 'Building a Daily Routine & Trading Journal Habit' },
  { id: 'l11-12', phaseId: 11, lessonNumber: 12, title: 'The Long-Term Operator Mindset: Compound Growth Over Overnight Millions' }
];

const phase12Lessons = [
  { id: 'l12-01', phaseId: 12, lessonNumber: 1, title: 'Multi-Signal Confirmation & Confluence Scoring' },
  { id: 'l12-02', phaseId: 12, lessonNumber: 2, title: 'Building Your Personal Memecoin Trading System' },
  { id: 'l12-03', phaseId: 12, lessonNumber: 3, title: 'Creating Automated Telegram Scrapers & Alert Filters' },
  { id: 'l12-04', phaseId: 12, lessonNumber: 4, title: 'Advanced Solscan API & Program Logs Inspection' },
  { id: 'l12-05', phaseId: 12, lessonNumber: 5, title: 'Custom DexScreener & Birdeye Workspace Architecture' },
  { id: 'l12-06', phaseId: 12, lessonNumber: 6, title: 'Analyzing Market Regimes: PVP Trench Season vs Broad Bull Runs' },
  { id: 'l12-07', phaseId: 12, lessonNumber: 7, title: 'The Pre-Market Morning Audit Protocol' },
  { id: 'l12-08', phaseId: 12, lessonNumber: 8, title: 'Backtesting Your Setups: Recording 50 Historical Trades' },
  { id: 'l12-09', phaseId: 12, lessonNumber: 9, title: 'Weekly PnL & Process Review: Eliminating Bad Habits' },
  { id: 'l12-10', phaseId: 12, lessonNumber: 10, title: 'Developing Asymmetric Bet Sizing for Elite Setups' },
  { id: 'l12-11', phaseId: 12, lessonNumber: 11, title: 'Transitioning from Part-Time Trencher to Full-Time Operator' },
  { id: 'l12-12', phaseId: 12, lessonNumber: 12, title: 'The TrenchLab Graduation: Capstone System Defense' }
];

function buildPhaseBlock(id, title, subtitle, desc, level, badge, assignTitle, assignDesc, assignTask, quizTitle, lessons) {
  const lessonBlocks = lessons.map(formatLesson).join(',\n');
  return `  {
    id: ${id},
    title: '${title}',
    subtitle: '${subtitle}',
    description: '${desc}',
    levelRequired: ${level},
    badge: '${badge}',
    practicalAssignment: {
      title: '${assignTitle}',
      description: '${assignDesc}',
      task: '${assignTask}'
    },
    quiz: {
      id: 'quiz-${String(id).padStart(2, '0')}',
      phaseId: ${id},
      title: '${quizTitle}',
      passingScore: 75,
      questions: [
        {
          id: 'q${id}-1',
          question: 'What is the primary operational rule for Phase ${String(id).padStart(2, '0')}?',
          options: [
            'Trade blindly without checking metrics',
            'Enforce rigorous analytical confirmation and defined risk parameters',
            'Risk entire portfolio on one coin',
            'Ignore liquidity depth'
          ],
          correctIndex: 1,
          explanation: 'Disciplined operators prioritize capital preservation and confluence verification before execution.',
          type: 'multiple-choice'
        }
      ]
    },
    lessons: [
${lessonBlocks}
    ]
  }`;
}

// Generate file 1: Phases 3 to 6
const phase3Block = buildPhaseBlock(
  3, 'PHASE 03 — SOLANA TRADING STACK',
  'Execution Infrastructure, Wallets, Routers, and Bonding Curves',
  'Master the mechanics of Solana execution. Understand how Phantom, Jupiter, Raydium, and Pump.fun interact, how bonding curves work, and how to verify blocks on Solscan.',
  3, 'SOLANA_OPERATOR',
  'Explain the Lifecycle of a Newly Launched Solana Token',
  'Write a comprehensive technical walkthrough tracking a token from bonding curve creation to DEX liquidity migration.',
  'Document: (1) Creation on Pump.fun, (2) Bonding curve accumulation, (3) Migration to Raydium, (4) LP token burning, and (5) Priority fee optimization during high volume.',
  'Phase 03 Assessment: Solana Infrastructure & Routers',
  phase3Lessons
);

const phase4Block = buildPhaseBlock(
  4, 'PHASE 04 — DEXSCREENER MASTERY',
  'Terminal Navigation, Layouts, Filters & Real-Time Analytics',
  'Turn DexScreener from a price-watching toy into a tactical command center.',
  4, 'DEX_NAVIGATOR',
  'Build Your Custom DexScreener Layout',
  'Configure a personalized multi-chart watchlist and filter setup.',
  'Save a custom view with 3 active pairs, volume threshold filters, and transaction alerts.',
  'Phase 04 Assessment: DexScreener Operational Competence',
  phase4Lessons
);

const phase5Block = buildPhaseBlock(
  5, 'PHASE 05 — BIRDEYE ANALYTICS',
  'On-Chain Data, Trader Profiling, and Holder Metrics',
  'Leverage Birdeye for granular on-chain data that raw charts cannot show.',
  5, 'ONCHAIN_ANALYST',
  'Complete a 15-Minute Birdeye Due Diligence Audit',
  'Audit 5 active trending tokens on Birdeye.',
  'Record Unique Traders, Net Money Flow, Top 10 Holder %, and Security Audit status.',
  'Phase 05 Assessment: Birdeye Due Diligence & Holder Analytics',
  phase5Lessons
);

const phase6Block = buildPhaseBlock(
  6, 'PHASE 06 — TOKEN SAFETY & RUG DETECTION',
  'Security Auditing, Contract Verification, and Insider Wallet Analysis',
  'Learn how to identify rugs, scams, and traps BEFORE you put capital in.',
  6, 'SECURITY_OFFICER',
  'Conduct a Live Rug Audit on 3 Fresh Tokens',
  'Audit 3 newly created tokens and document pass/fail for each critical security test.',
  'Document: Mint Authority, Freeze Authority, LP Burn/Lock, Top 10 Holder %, and Bubblemaps clusters.',
  'Phase 06 Assessment: Rug Detection & Token Security',
  phase6Lessons
);

const file3to6 = `import { Phase } from '../types';
import { VERIFIED_VIDEOS } from './videoData';

export const PHASES_3_TO_6: Phase[] = [
${phase3Block},
${phase4Block},
${phase5Block},
${phase6Block}
];
`;

fs.writeFileSync(path.join(__dirname, '../src/data/curriculumPhases3to6.ts'), file3to6, 'utf8');
console.log('Created curriculumPhases3to6.ts successfully.');

// Generate file 2: Phases 7 to 12
const phase7Block = buildPhaseBlock(
  7, 'PHASE 07 — WALLET INTELLIGENCE',
  'Tracking Smart Money, Copy-Trading Hazards, and Insider Wallets',
  'Track the operators who consistently extract profit from the trenches.',
  7, 'WALLET_TRACKER',
  'Build a 10-Wallet Smart Money Tracking Watchlist',
  'Identify and verify 10 high-performing Solana trader wallets.',
  'Document win rate, average hold time, and token entry timing for each wallet.',
  'Phase 07 Assessment: Wallet Intelligence & On-Chain Forensics',
  phase7Lessons
);

const phase8Block = buildPhaseBlock(
  8, 'PHASE 08 — VOLUME & ORGANIC DEMAND',
  'Decoding Market Interest, Wash Trading, and Liquidity Inflows',
  'Understand what real demand looks like vs manufactured illusions.',
  8, 'VOLUME_SPECIALIST',
  'Distinguish Organic Volume from Wash Trading',
  'Compare 2 tokens on DexScreener with similar 24h volume ($500K+).',
  'Prove which token is experiencing real organic retail demand vs automated wash bots.',
  'Phase 08 Assessment: Volume Analysis & Demand Verification',
  phase8Lessons
);

const phase9Block = buildPhaseBlock(
  9, 'PHASE 09 — MEMECOIN ENTRY STRATEGIES',
  'High-Probability Setups: Retests, Reclaims & Bonding Curve Plays',
  'Stop buying tops. Master the 8 repeatable entry setups used by profitable trench operators.',
  9, 'ENTRY_TACTICIAN',
  'Execute and Document 5 Strategy Setups in Your Journal',
  'Identify and document 5 setups that match our core entry strategies.',
  'For each: screenshot setup, document invalidation price, target TP levels, and execution outcome.',
  'Phase 09 Assessment: Entry Strategy Execution & Discipline',
  phase9Lessons
);

const phase10Block = buildPhaseBlock(
  10, 'PHASE 10 — RISK MANAGEMENT',
  'Position Sizing, Capital Preservation, and Ruin Prevention',
  'The difference between a trader who lasts 2 weeks and one who lasts 2 years.',
  10, 'RISK_OFFICER',
  'Calculate Position Sizes for 5 Scenarios',
  'Use the TRENCHLAB Position Sizing Calculator to size 5 simulated trades.',
  'Document portfolio size, risk %, entry, invalidation, and calculated SOL position size.',
  'Phase 10 Assessment: Risk Mathematics & Position Sizing',
  phase10Lessons
);

const phase11Block = buildPhaseBlock(
  11, 'PHASE 11 — PROFIT MANAGEMENT & PSYCHOLOGY',
  'Exit Frameworks, Scaling Out, and Conquering Emotional Sabotage',
  'Taking profit is the hardest skill in crypto. Master tiered scaling and emotional regulation.',
  11, 'PROFIT_MASTER',
  'Write Your Personal Take-Profit & Loss Recovery Protocol',
  'Draft your mandatory trading rules document.',
  'Define your exact TP1/TP2/TP3 rules, daily loss limit kill switch, and post-loss cooldown routine.',
  'Phase 11 Assessment: Profit Frameworks & Psychological Regulation',
  phase11Lessons
);

const phase12Block = buildPhaseBlock(
  12, 'PHASE 12 — ADVANCED TRENCHLAB & SYSTEM BUILDING',
  'Building Your Personal On-Chain Trading System & Confluence Matrix',
  'Synthesize everything you have learned into an individualized, repeatable trading edge.',
  12, 'SYSTEM_BUILDER',
  'The TrenchLab Capstone Trading System Defense',
  'Build and submit your complete personal trading plan.',
  'Document your setup criteria, checklist, risk rules, daily routine, and backtested results.',
  'Phase 12 Assessment: System Mastery & Capstone Verification',
  phase12Lessons
);

const file7to12 = `import { Phase } from '../types';
import { VERIFIED_VIDEOS } from './videoData';

export const PHASES_7_TO_12: Phase[] = [
${phase7Block},
${phase8Block},
${phase9Block},
${phase10Block},
${phase11Block},
${phase12Block}
];
`;

fs.writeFileSync(path.join(__dirname, '../src/data/curriculumPhases7to12.ts'), file7to12, 'utf8');
console.log('Created curriculumPhases7to12.ts successfully.');

// Write master curriculumPhases3to12.ts that combines both
const masterFile = `import { Phase } from '../types';
import { PHASES_3_TO_6 } from './curriculumPhases3to6';
import { PHASES_7_TO_12 } from './curriculumPhases7to12';

export const PHASES_3_TO_12: Phase[] = [
  ...PHASES_3_TO_6,
  ...PHASES_7_TO_12
];
`;

fs.writeFileSync(path.join(__dirname, '../src/data/curriculumPhases3to12.ts'), masterFile, 'utf8');
console.log('Updated curriculumPhases3to12.ts to combine phases 3 to 12.');
