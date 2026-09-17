import { Phase } from '../types';
import { VERIFIED_VIDEOS } from './videoData';

export const PHASES_7_TO_12: Phase[] = [
  {
    id: 7,
    title: 'PHASE 07 — WALLET INTELLIGENCE',
    subtitle: 'Tracking Smart Money, Copy-Trading Hazards, and Insider Wallets',
    description: 'Track the operators who consistently extract profit from the trenches.',
    levelRequired: 7,
    badge: 'WALLET_TRACKER',
    practicalAssignment: {
      title: 'Build a 10-Wallet Smart Money Tracking Watchlist',
      description: 'Identify and verify 10 high-performing Solana trader wallets.',
      task: 'Document win rate, average hold time, and token entry timing for each wallet.'
    },
    quiz: {
      id: 'quiz-07',
      phaseId: 7,
      title: 'Phase 07 Assessment: Wallet Intelligence & On-Chain Forensics',
      passingScore: 75,
      questions: [
        {
          id: 'q7-1',
          question: 'What is the primary operational rule for Phase 07?',
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
      {
        id: 'l7-01',
        phaseId: 7,
        lessonNumber: 1,
        title: "Reading Raw Wallets & PnL Audits",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Reading Raw Wallets & PnL Audits in real-world trading environments",
          "Identify key risk factors and signals associated with Reading Raw Wallets & PnL Audits",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Reading Raw Wallets & PnL Audits",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Reading Raw Wallets & PnL Audits is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Reading Raw Wallets & PnL Audits identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Reading Raw Wallets & PnL Audits.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Reading Raw Wallets & PnL Audits?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Reading Raw Wallets & PnL Audits Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Reading Raw Wallets & PnL Audits and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l7-02',
        phaseId: 7,
        lessonNumber: 2,
        title: "Solscan Deep Dive: Deciphering SPL Token Transfer Histories",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Solscan Deep Dive: Deciphering SPL Token Transfer Histories in real-world trading environments",
          "Identify key risk factors and signals associated with Solscan Deep Dive: Deciphering SPL Token Transfer Histories",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Solscan Deep Dive: Deciphering SPL Token Transfer Histories",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Solscan Deep Dive: Deciphering SPL Token Transfer Histories is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Solscan Deep Dive: Deciphering SPL Token Transfer Histories identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Solscan Deep Dive: Deciphering SPL Token Transfer Histories.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Solscan Deep Dive: Deciphering SPL Token Transfer Histories?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Solscan Deep Dive: Deciphering SPL Token Transfer Histories Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Solscan Deep Dive: Deciphering SPL Token Transfer Histories and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l7-03',
        phaseId: 7,
        lessonNumber: 3,
        title: "Identifying Smart Money Wallets vs Dev Cabal Wallets",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Identifying Smart Money Wallets vs Dev Cabal Wallets in real-world trading environments",
          "Identify key risk factors and signals associated with Identifying Smart Money Wallets vs Dev Cabal Wallets",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Identifying Smart Money Wallets vs Dev Cabal Wallets",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Identifying Smart Money Wallets vs Dev Cabal Wallets is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Identifying Smart Money Wallets vs Dev Cabal Wallets identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Identifying Smart Money Wallets vs Dev Cabal Wallets.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Identifying Smart Money Wallets vs Dev Cabal Wallets?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Identifying Smart Money Wallets vs Dev Cabal Wallets Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Identifying Smart Money Wallets vs Dev Cabal Wallets and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l7-04',
        phaseId: 7,
        lessonNumber: 4,
        title: "Spotting Fresh Wallets Funded by CEXs vs Mixer Bridges",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Spotting Fresh Wallets Funded by CEXs vs Mixer Bridges in real-world trading environments",
          "Identify key risk factors and signals associated with Spotting Fresh Wallets Funded by CEXs vs Mixer Bridges",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Spotting Fresh Wallets Funded by CEXs vs Mixer Bridges",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Spotting Fresh Wallets Funded by CEXs vs Mixer Bridges is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Spotting Fresh Wallets Funded by CEXs vs Mixer Bridges identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Spotting Fresh Wallets Funded by CEXs vs Mixer Bridges.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Spotting Fresh Wallets Funded by CEXs vs Mixer Bridges?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Spotting Fresh Wallets Funded by CEXs vs Mixer Bridges Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Spotting Fresh Wallets Funded by CEXs vs Mixer Bridges and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l7-05',
        phaseId: 7,
        lessonNumber: 5,
        title: "Filter Bubblemaps Clustered Transfers & Direct Transfers",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Filter Bubblemaps Clustered Transfers & Direct Transfers in real-world trading environments",
          "Identify key risk factors and signals associated with Filter Bubblemaps Clustered Transfers & Direct Transfers",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Filter Bubblemaps Clustered Transfers & Direct Transfers",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Filter Bubblemaps Clustered Transfers & Direct Transfers is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Filter Bubblemaps Clustered Transfers & Direct Transfers identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Filter Bubblemaps Clustered Transfers & Direct Transfers.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Filter Bubblemaps Clustered Transfers & Direct Transfers?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Filter Bubblemaps Clustered Transfers & Direct Transfers Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Filter Bubblemaps Clustered Transfers & Direct Transfers and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l7-06',
        phaseId: 7,
        lessonNumber: 6,
        title: "Building a Personal Wallet Watchlist in Telegram & DexScreener",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Building a Personal Wallet Watchlist in Telegram & DexScreener in real-world trading environments",
          "Identify key risk factors and signals associated with Building a Personal Wallet Watchlist in Telegram & DexScreener",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Building a Personal Wallet Watchlist in Telegram & DexScreener",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Building a Personal Wallet Watchlist in Telegram & DexScreener is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Building a Personal Wallet Watchlist in Telegram & DexScreener identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Building a Personal Wallet Watchlist in Telegram & DexScreener.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Building a Personal Wallet Watchlist in Telegram & DexScreener?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Building a Personal Wallet Watchlist in Telegram & DexScreener Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Building a Personal Wallet Watchlist in Telegram & DexScreener and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l7-07',
        phaseId: 7,
        lessonNumber: 7,
        title: "Copy-Trading Risks: Latency, Frontrunning & Slippage Traps",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Copy-Trading Risks: Latency, Frontrunning & Slippage Traps in real-world trading environments",
          "Identify key risk factors and signals associated with Copy-Trading Risks: Latency, Frontrunning & Slippage Traps",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Copy-Trading Risks: Latency, Frontrunning & Slippage Traps",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Copy-Trading Risks: Latency, Frontrunning & Slippage Traps is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Copy-Trading Risks: Latency, Frontrunning & Slippage Traps identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Copy-Trading Risks: Latency, Frontrunning & Slippage Traps.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Copy-Trading Risks: Latency, Frontrunning & Slippage Traps?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Copy-Trading Risks: Latency, Frontrunning & Slippage Traps Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Copy-Trading Risks: Latency, Frontrunning & Slippage Traps and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l7-08',
        phaseId: 7,
        lessonNumber: 8,
        title: "Tracking Early Buyers & Snipers on Pump.fun Launches",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Tracking Early Buyers & Snipers on Pump.fun Launches in real-world trading environments",
          "Identify key risk factors and signals associated with Tracking Early Buyers & Snipers on Pump.fun Launches",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Tracking Early Buyers & Snipers on Pump.fun Launches",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Tracking Early Buyers & Snipers on Pump.fun Launches is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Tracking Early Buyers & Snipers on Pump.fun Launches identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Tracking Early Buyers & Snipers on Pump.fun Launches.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Tracking Early Buyers & Snipers on Pump.fun Launches?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Tracking Early Buyers & Snipers on Pump.fun Launches Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Tracking Early Buyers & Snipers on Pump.fun Launches and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l7-09',
        phaseId: 7,
        lessonNumber: 9,
        title: "Identifying Insider Sniping Rings & Bundled Buys",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Identifying Insider Sniping Rings & Bundled Buys in real-world trading environments",
          "Identify key risk factors and signals associated with Identifying Insider Sniping Rings & Bundled Buys",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Identifying Insider Sniping Rings & Bundled Buys",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Identifying Insider Sniping Rings & Bundled Buys is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Identifying Insider Sniping Rings & Bundled Buys identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Identifying Insider Sniping Rings & Bundled Buys.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Identifying Insider Sniping Rings & Bundled Buys?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Identifying Insider Sniping Rings & Bundled Buys Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Identifying Insider Sniping Rings & Bundled Buys and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l7-10',
        phaseId: 7,
        lessonNumber: 10,
        title: "PnL Verification: Filtering Out Unrealized Paper Gains",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master PnL Verification: Filtering Out Unrealized Paper Gains in real-world trading environments",
          "Identify key risk factors and signals associated with PnL Verification: Filtering Out Unrealized Paper Gains",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "PnL Verification: Filtering Out Unrealized Paper Gains",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "PnL Verification: Filtering Out Unrealized Paper Gains is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring PnL Verification: Filtering Out Unrealized Paper Gains identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on PnL Verification: Filtering Out Unrealized Paper Gains.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing PnL Verification: Filtering Out Unrealized Paper Gains?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "PnL Verification: Filtering Out Unrealized Paper Gains Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of PnL Verification: Filtering Out Unrealized Paper Gains and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l7-11',
        phaseId: 7,
        lessonNumber: 11,
        title: "Analyzing Wallet Holding Time & Distribution Behavior",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Analyzing Wallet Holding Time & Distribution Behavior in real-world trading environments",
          "Identify key risk factors and signals associated with Analyzing Wallet Holding Time & Distribution Behavior",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Analyzing Wallet Holding Time & Distribution Behavior",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Analyzing Wallet Holding Time & Distribution Behavior is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Analyzing Wallet Holding Time & Distribution Behavior identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Analyzing Wallet Holding Time & Distribution Behavior.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Analyzing Wallet Holding Time & Distribution Behavior?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Analyzing Wallet Holding Time & Distribution Behavior Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Analyzing Wallet Holding Time & Distribution Behavior and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l7-12',
        phaseId: 7,
        lessonNumber: 12,
        title: "The Daily Smart Money Flow Routine",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master The Daily Smart Money Flow Routine in real-world trading environments",
          "Identify key risk factors and signals associated with The Daily Smart Money Flow Routine",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "The Daily Smart Money Flow Routine",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "The Daily Smart Money Flow Routine is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring The Daily Smart Money Flow Routine identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on The Daily Smart Money Flow Routine.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing The Daily Smart Money Flow Routine?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "The Daily Smart Money Flow Routine Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of The Daily Smart Money Flow Routine and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      }
    ]
  },
  {
    id: 8,
    title: 'PHASE 08 — VOLUME & ORGANIC DEMAND',
    subtitle: 'Decoding Market Interest, Wash Trading, and Liquidity Inflows',
    description: 'Understand what real demand looks like vs manufactured illusions.',
    levelRequired: 8,
    badge: 'VOLUME_SPECIALIST',
    practicalAssignment: {
      title: 'Distinguish Organic Volume from Wash Trading',
      description: 'Compare 2 tokens on DexScreener with similar 24h volume ($500K+).',
      task: 'Prove which token is experiencing real organic retail demand vs automated wash bots.'
    },
    quiz: {
      id: 'quiz-08',
      phaseId: 8,
      title: 'Phase 08 Assessment: Volume Analysis & Demand Verification',
      passingScore: 75,
      questions: [
        {
          id: 'q8-1',
          question: 'What is the primary operational rule for Phase 08?',
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
      {
        id: 'l8-01',
        phaseId: 8,
        lessonNumber: 1,
        title: "Raw Volume vs Volume Acceleration",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Raw Volume vs Volume Acceleration in real-world trading environments",
          "Identify key risk factors and signals associated with Raw Volume vs Volume Acceleration",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Raw Volume vs Volume Acceleration",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Raw Volume vs Volume Acceleration is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Raw Volume vs Volume Acceleration identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Raw Volume vs Volume Acceleration.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Raw Volume vs Volume Acceleration?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Raw Volume vs Volume Acceleration Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Raw Volume vs Volume Acceleration and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l8-02',
        phaseId: 8,
        lessonNumber: 2,
        title: "Identifying Organic Community Volume vs Market Maker Wash Trading",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Identifying Organic Community Volume vs Market Maker Wash Trading in real-world trading environments",
          "Identify key risk factors and signals associated with Identifying Organic Community Volume vs Market Maker Wash Trading",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Identifying Organic Community Volume vs Market Maker Wash Trading",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Identifying Organic Community Volume vs Market Maker Wash Trading is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Identifying Organic Community Volume vs Market Maker Wash Trading identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Identifying Organic Community Volume vs Market Maker Wash Trading.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Identifying Organic Community Volume vs Market Maker Wash Trading?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Identifying Organic Community Volume vs Market Maker Wash Trading Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Identifying Organic Community Volume vs Market Maker Wash Trading and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l8-03',
        phaseId: 8,
        lessonNumber: 3,
        title: "Volume-to-Market-Cap (V/MC) Ratio Benchmarks",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Volume-to-Market-Cap (V/MC) Ratio Benchmarks in real-world trading environments",
          "Identify key risk factors and signals associated with Volume-to-Market-Cap (V/MC) Ratio Benchmarks",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Volume-to-Market-Cap (V/MC) Ratio Benchmarks",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Volume-to-Market-Cap (V/MC) Ratio Benchmarks is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Volume-to-Market-Cap (V/MC) Ratio Benchmarks identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Volume-to-Market-Cap (V/MC) Ratio Benchmarks.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Volume-to-Market-Cap (V/MC) Ratio Benchmarks?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Volume-to-Market-Cap (V/MC) Ratio Benchmarks Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Volume-to-Market-Cap (V/MC) Ratio Benchmarks and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l8-04',
        phaseId: 8,
        lessonNumber: 4,
        title: "Transaction Count vs Volume: Retail vs Whales",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Transaction Count vs Volume: Retail vs Whales in real-world trading environments",
          "Identify key risk factors and signals associated with Transaction Count vs Volume: Retail vs Whales",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Transaction Count vs Volume: Retail vs Whales",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Transaction Count vs Volume: Retail vs Whales is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Transaction Count vs Volume: Retail vs Whales identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Transaction Count vs Volume: Retail vs Whales.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Transaction Count vs Volume: Retail vs Whales?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Transaction Count vs Volume: Retail vs Whales Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Transaction Count vs Volume: Retail vs Whales and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l8-05',
        phaseId: 8,
        lessonNumber: 5,
        title: "Volume Profile & High-Volume Nodes (HVN) vs Low-Volume Nodes (LVN)",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Volume Profile & High-Volume Nodes (HVN) vs Low-Volume Nodes (LVN) in real-world trading environments",
          "Identify key risk factors and signals associated with Volume Profile & High-Volume Nodes (HVN) vs Low-Volume Nodes (LVN)",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Volume Profile & High-Volume Nodes (HVN) vs Low-Volume Nodes (LVN)",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Volume Profile & High-Volume Nodes (HVN) vs Low-Volume Nodes (LVN) is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Volume Profile & High-Volume Nodes (HVN) vs Low-Volume Nodes (LVN) identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Volume Profile & High-Volume Nodes (HVN) vs Low-Volume Nodes (LVN).",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Volume Profile & High-Volume Nodes (HVN) vs Low-Volume Nodes (LVN)?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Volume Profile & High-Volume Nodes (HVN) vs Low-Volume Nodes (LVN) Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Volume Profile & High-Volume Nodes (HVN) vs Low-Volume Nodes (LVN) and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l8-06',
        phaseId: 8,
        lessonNumber: 6,
        title: "Exhaustion Volume vs Breakout Volume",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Exhaustion Volume vs Breakout Volume in real-world trading environments",
          "Identify key risk factors and signals associated with Exhaustion Volume vs Breakout Volume",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Exhaustion Volume vs Breakout Volume",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Exhaustion Volume vs Breakout Volume is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Exhaustion Volume vs Breakout Volume identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Exhaustion Volume vs Breakout Volume.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Exhaustion Volume vs Breakout Volume?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Exhaustion Volume vs Breakout Volume Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Exhaustion Volume vs Breakout Volume and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l8-07',
        phaseId: 8,
        lessonNumber: 7,
        title: "Buy-to-Sell Pressure Imbalances: Order Flow Dynamics",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Buy-to-Sell Pressure Imbalances: Order Flow Dynamics in real-world trading environments",
          "Identify key risk factors and signals associated with Buy-to-Sell Pressure Imbalances: Order Flow Dynamics",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Buy-to-Sell Pressure Imbalances: Order Flow Dynamics",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Buy-to-Sell Pressure Imbalances: Order Flow Dynamics is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Buy-to-Sell Pressure Imbalances: Order Flow Dynamics identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Buy-to-Sell Pressure Imbalances: Order Flow Dynamics.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Buy-to-Sell Pressure Imbalances: Order Flow Dynamics?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Buy-to-Sell Pressure Imbalances: Order Flow Dynamics Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Buy-to-Sell Pressure Imbalances: Order Flow Dynamics and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l8-08',
        phaseId: 8,
        lessonNumber: 8,
        title: "Time-of-Day Volume Cycles (Asia, Europe, US Market Hours)",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Time-of-Day Volume Cycles (Asia, Europe, US Market Hours) in real-world trading environments",
          "Identify key risk factors and signals associated with Time-of-Day Volume Cycles (Asia, Europe, US Market Hours)",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Time-of-Day Volume Cycles (Asia, Europe, US Market Hours)",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Time-of-Day Volume Cycles (Asia, Europe, US Market Hours) is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Time-of-Day Volume Cycles (Asia, Europe, US Market Hours) identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Time-of-Day Volume Cycles (Asia, Europe, US Market Hours).",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Time-of-Day Volume Cycles (Asia, Europe, US Market Hours)?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Time-of-Day Volume Cycles (Asia, Europe, US Market Hours) Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Time-of-Day Volume Cycles (Asia, Europe, US Market Hours) and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l8-09',
        phaseId: 8,
        lessonNumber: 9,
        title: "Social Sentiment Surges & CT (Crypto Twitter) Volume Spikes",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Social Sentiment Surges & CT (Crypto Twitter) Volume Spikes in real-world trading environments",
          "Identify key risk factors and signals associated with Social Sentiment Surges & CT (Crypto Twitter) Volume Spikes",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Social Sentiment Surges & CT (Crypto Twitter) Volume Spikes",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Social Sentiment Surges & CT (Crypto Twitter) Volume Spikes is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Social Sentiment Surges & CT (Crypto Twitter) Volume Spikes identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Social Sentiment Surges & CT (Crypto Twitter) Volume Spikes.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Social Sentiment Surges & CT (Crypto Twitter) Volume Spikes?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Social Sentiment Surges & CT (Crypto Twitter) Volume Spikes Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Social Sentiment Surges & CT (Crypto Twitter) Volume Spikes and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l8-10',
        phaseId: 8,
        lessonNumber: 10,
        title: "Bonding Curve Migration Volume Surges",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Bonding Curve Migration Volume Surges in real-world trading environments",
          "Identify key risk factors and signals associated with Bonding Curve Migration Volume Surges",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Bonding Curve Migration Volume Surges",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Bonding Curve Migration Volume Surges is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Bonding Curve Migration Volume Surges identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Bonding Curve Migration Volume Surges.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Bonding Curve Migration Volume Surges?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Bonding Curve Migration Volume Surges Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Bonding Curve Migration Volume Surges and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l8-11',
        phaseId: 8,
        lessonNumber: 11,
        title: "Sustained Volume vs Single-Candle Pump-and-Dump Spikes",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Sustained Volume vs Single-Candle Pump-and-Dump Spikes in real-world trading environments",
          "Identify key risk factors and signals associated with Sustained Volume vs Single-Candle Pump-and-Dump Spikes",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Sustained Volume vs Single-Candle Pump-and-Dump Spikes",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Sustained Volume vs Single-Candle Pump-and-Dump Spikes is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Sustained Volume vs Single-Candle Pump-and-Dump Spikes identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Sustained Volume vs Single-Candle Pump-and-Dump Spikes.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Sustained Volume vs Single-Candle Pump-and-Dump Spikes?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Sustained Volume vs Single-Candle Pump-and-Dump Spikes Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Sustained Volume vs Single-Candle Pump-and-Dump Spikes and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l8-12',
        phaseId: 8,
        lessonNumber: 12,
        title: "Volume Confluence Scoring Framework",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Volume Confluence Scoring Framework in real-world trading environments",
          "Identify key risk factors and signals associated with Volume Confluence Scoring Framework",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Volume Confluence Scoring Framework",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Volume Confluence Scoring Framework is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Volume Confluence Scoring Framework identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Volume Confluence Scoring Framework.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Volume Confluence Scoring Framework?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Volume Confluence Scoring Framework Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Volume Confluence Scoring Framework and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      }
    ]
  },
  {
    id: 9,
    title: 'PHASE 09 — MEMECOIN ENTRY STRATEGIES',
    subtitle: 'High-Probability Setups: Retests, Reclaims & Bonding Curve Plays',
    description: 'Stop buying tops. Master the 8 repeatable entry setups used by profitable trench operators.',
    levelRequired: 9,
    badge: 'ENTRY_TACTICIAN',
    practicalAssignment: {
      title: 'Execute and Document 5 Strategy Setups in Your Journal',
      description: 'Identify and document 5 setups that match our core entry strategies.',
      task: 'For each: screenshot setup, document invalidation price, target TP levels, and execution outcome.'
    },
    quiz: {
      id: 'quiz-09',
      phaseId: 9,
      title: 'Phase 09 Assessment: Entry Strategy Execution & Discipline',
      passingScore: 75,
      questions: [
        {
          id: 'q9-1',
          question: 'What is the primary operational rule for Phase 09?',
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
      {
        id: 'l9-01',
        phaseId: 9,
        lessonNumber: 1,
        title: "Strategy 01: The Pullback & S/R Re-Test Entry",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Strategy 01: The Pullback & S/R Re-Test Entry in real-world trading environments",
          "Identify key risk factors and signals associated with Strategy 01: The Pullback & S/R Re-Test Entry",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Strategy 01: The Pullback & S/R Re-Test Entry",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Strategy 01: The Pullback & S/R Re-Test Entry is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Strategy 01: The Pullback & S/R Re-Test Entry identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Strategy 01: The Pullback & S/R Re-Test Entry.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Strategy 01: The Pullback & S/R Re-Test Entry?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Strategy 01: The Pullback & S/R Re-Test Entry Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Strategy 01: The Pullback & S/R Re-Test Entry and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l9-02',
        phaseId: 9,
        lessonNumber: 2,
        title: "Strategy 02: The Support Reclaim (Liquidity Sweep Entry)",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Strategy 02: The Support Reclaim (Liquidity Sweep Entry) in real-world trading environments",
          "Identify key risk factors and signals associated with Strategy 02: The Support Reclaim (Liquidity Sweep Entry)",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Strategy 02: The Support Reclaim (Liquidity Sweep Entry)",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Strategy 02: The Support Reclaim (Liquidity Sweep Entry) is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Strategy 02: The Support Reclaim (Liquidity Sweep Entry) identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Strategy 02: The Support Reclaim (Liquidity Sweep Entry).",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Strategy 02: The Support Reclaim (Liquidity Sweep Entry)?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Strategy 02: The Support Reclaim (Liquidity Sweep Entry) Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Strategy 02: The Support Reclaim (Liquidity Sweep Entry) and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l9-03',
        phaseId: 9,
        lessonNumber: 3,
        title: "Strategy 03: The Bonding Curve Migration Play (Raydium Listing Bounce)",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Strategy 03: The Bonding Curve Migration Play (Raydium Listing Bounce) in real-world trading environments",
          "Identify key risk factors and signals associated with Strategy 03: The Bonding Curve Migration Play (Raydium Listing Bounce)",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Strategy 03: The Bonding Curve Migration Play (Raydium Listing Bounce)",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Strategy 03: The Bonding Curve Migration Play (Raydium Listing Bounce) is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Strategy 03: The Bonding Curve Migration Play (Raydium Listing Bounce) identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Strategy 03: The Bonding Curve Migration Play (Raydium Listing Bounce).",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Strategy 03: The Bonding Curve Migration Play (Raydium Listing Bounce)?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Strategy 03: The Bonding Curve Migration Play (Raydium Listing Bounce) Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Strategy 03: The Bonding Curve Migration Play (Raydium Listing Bounce) and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l9-04',
        phaseId: 9,
        lessonNumber: 4,
        title: "Strategy 04: The Narrative Pivot & Cult Memecoin Accumulation",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Strategy 04: The Narrative Pivot & Cult Memecoin Accumulation in real-world trading environments",
          "Identify key risk factors and signals associated with Strategy 04: The Narrative Pivot & Cult Memecoin Accumulation",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Strategy 04: The Narrative Pivot & Cult Memecoin Accumulation",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Strategy 04: The Narrative Pivot & Cult Memecoin Accumulation is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Strategy 04: The Narrative Pivot & Cult Memecoin Accumulation identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Strategy 04: The Narrative Pivot & Cult Memecoin Accumulation.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Strategy 04: The Narrative Pivot & Cult Memecoin Accumulation?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Strategy 04: The Narrative Pivot & Cult Memecoin Accumulation Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Strategy 04: The Narrative Pivot & Cult Memecoin Accumulation and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l9-05',
        phaseId: 9,
        lessonNumber: 5,
        title: "Strategy 05: The Consolidation Range Breakout Entry",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Strategy 05: The Consolidation Range Breakout Entry in real-world trading environments",
          "Identify key risk factors and signals associated with Strategy 05: The Consolidation Range Breakout Entry",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Strategy 05: The Consolidation Range Breakout Entry",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Strategy 05: The Consolidation Range Breakout Entry is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Strategy 05: The Consolidation Range Breakout Entry identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Strategy 05: The Consolidation Range Breakout Entry.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Strategy 05: The Consolidation Range Breakout Entry?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Strategy 05: The Consolidation Range Breakout Entry Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Strategy 05: The Consolidation Range Breakout Entry and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l9-06',
        phaseId: 9,
        lessonNumber: 6,
        title: "Strategy 06: The Golden Pocket Fibonacci Retracement Entry",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Strategy 06: The Golden Pocket Fibonacci Retracement Entry in real-world trading environments",
          "Identify key risk factors and signals associated with Strategy 06: The Golden Pocket Fibonacci Retracement Entry",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Strategy 06: The Golden Pocket Fibonacci Retracement Entry",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Strategy 06: The Golden Pocket Fibonacci Retracement Entry is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Strategy 06: The Golden Pocket Fibonacci Retracement Entry identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Strategy 06: The Golden Pocket Fibonacci Retracement Entry.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Strategy 06: The Golden Pocket Fibonacci Retracement Entry?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Strategy 06: The Golden Pocket Fibonacci Retracement Entry Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Strategy 06: The Golden Pocket Fibonacci Retracement Entry and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l9-07',
        phaseId: 9,
        lessonNumber: 7,
        title: "Strategy 07: The Smart Money Wallet Inflow Follow",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Strategy 07: The Smart Money Wallet Inflow Follow in real-world trading environments",
          "Identify key risk factors and signals associated with Strategy 07: The Smart Money Wallet Inflow Follow",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Strategy 07: The Smart Money Wallet Inflow Follow",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Strategy 07: The Smart Money Wallet Inflow Follow is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Strategy 07: The Smart Money Wallet Inflow Follow identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Strategy 07: The Smart Money Wallet Inflow Follow.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Strategy 07: The Smart Money Wallet Inflow Follow?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Strategy 07: The Smart Money Wallet Inflow Follow Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Strategy 07: The Smart Money Wallet Inflow Follow and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l9-08',
        phaseId: 9,
        lessonNumber: 8,
        title: "Strategy 08: The Second-Leg Continuation Play",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Strategy 08: The Second-Leg Continuation Play in real-world trading environments",
          "Identify key risk factors and signals associated with Strategy 08: The Second-Leg Continuation Play",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Strategy 08: The Second-Leg Continuation Play",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Strategy 08: The Second-Leg Continuation Play is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Strategy 08: The Second-Leg Continuation Play identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Strategy 08: The Second-Leg Continuation Play.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Strategy 08: The Second-Leg Continuation Play?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Strategy 08: The Second-Leg Continuation Play Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Strategy 08: The Second-Leg Continuation Play and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l9-09',
        phaseId: 9,
        lessonNumber: 9,
        title: "Entry Timing: Limit Bids vs Aggressive Market Swaps",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Entry Timing: Limit Bids vs Aggressive Market Swaps in real-world trading environments",
          "Identify key risk factors and signals associated with Entry Timing: Limit Bids vs Aggressive Market Swaps",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Entry Timing: Limit Bids vs Aggressive Market Swaps",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Entry Timing: Limit Bids vs Aggressive Market Swaps is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Entry Timing: Limit Bids vs Aggressive Market Swaps identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Entry Timing: Limit Bids vs Aggressive Market Swaps.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Entry Timing: Limit Bids vs Aggressive Market Swaps?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Entry Timing: Limit Bids vs Aggressive Market Swaps Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Entry Timing: Limit Bids vs Aggressive Market Swaps and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l9-10',
        phaseId: 9,
        lessonNumber: 10,
        title: "Scaling In: Staggered DCA vs Single Bullet Entry",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Scaling In: Staggered DCA vs Single Bullet Entry in real-world trading environments",
          "Identify key risk factors and signals associated with Scaling In: Staggered DCA vs Single Bullet Entry",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Scaling In: Staggered DCA vs Single Bullet Entry",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Scaling In: Staggered DCA vs Single Bullet Entry is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Scaling In: Staggered DCA vs Single Bullet Entry identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Scaling In: Staggered DCA vs Single Bullet Entry.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Scaling In: Staggered DCA vs Single Bullet Entry?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Scaling In: Staggered DCA vs Single Bullet Entry Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Scaling In: Staggered DCA vs Single Bullet Entry and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l9-11',
        phaseId: 9,
        lessonNumber: 11,
        title: "Invalidating an Entry: When to Cut Immediately",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Invalidating an Entry: When to Cut Immediately in real-world trading environments",
          "Identify key risk factors and signals associated with Invalidating an Entry: When to Cut Immediately",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Invalidating an Entry: When to Cut Immediately",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Invalidating an Entry: When to Cut Immediately is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Invalidating an Entry: When to Cut Immediately identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Invalidating an Entry: When to Cut Immediately.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Invalidating an Entry: When to Cut Immediately?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Invalidating an Entry: When to Cut Immediately Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Invalidating an Entry: When to Cut Immediately and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l9-12',
        phaseId: 9,
        lessonNumber: 12,
        title: "Managing Slippage During High-Volatility Breakouts",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Managing Slippage During High-Volatility Breakouts in real-world trading environments",
          "Identify key risk factors and signals associated with Managing Slippage During High-Volatility Breakouts",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Managing Slippage During High-Volatility Breakouts",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Managing Slippage During High-Volatility Breakouts is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Managing Slippage During High-Volatility Breakouts identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Managing Slippage During High-Volatility Breakouts.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Managing Slippage During High-Volatility Breakouts?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Managing Slippage During High-Volatility Breakouts Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Managing Slippage During High-Volatility Breakouts and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l9-13',
        phaseId: 9,
        lessonNumber: 13,
        title: "Avoiding Top-Tick FOMO Entries: The 3-Candle Rule",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Avoiding Top-Tick FOMO Entries: The 3-Candle Rule in real-world trading environments",
          "Identify key risk factors and signals associated with Avoiding Top-Tick FOMO Entries: The 3-Candle Rule",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Avoiding Top-Tick FOMO Entries: The 3-Candle Rule",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Avoiding Top-Tick FOMO Entries: The 3-Candle Rule is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Avoiding Top-Tick FOMO Entries: The 3-Candle Rule identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Avoiding Top-Tick FOMO Entries: The 3-Candle Rule.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Avoiding Top-Tick FOMO Entries: The 3-Candle Rule?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Avoiding Top-Tick FOMO Entries: The 3-Candle Rule Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Avoiding Top-Tick FOMO Entries: The 3-Candle Rule and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      }
    ]
  },
  {
    id: 10,
    title: 'PHASE 10 — RISK MANAGEMENT',
    subtitle: 'Position Sizing, Capital Preservation, and Ruin Prevention',
    description: 'The difference between a trader who lasts 2 weeks and one who lasts 2 years.',
    levelRequired: 10,
    badge: 'RISK_OFFICER',
    practicalAssignment: {
      title: 'Calculate Position Sizes for 5 Scenarios',
      description: 'Use the TRENCHLAB Position Sizing Calculator to size 5 simulated trades.',
      task: 'Document portfolio size, risk %, entry, invalidation, and calculated SOL position size.'
    },
    quiz: {
      id: 'quiz-10',
      phaseId: 10,
      title: 'Phase 10 Assessment: Risk Mathematics & Position Sizing',
      passingScore: 75,
      questions: [
        {
          id: 'q10-1',
          question: 'What is the primary operational rule for Phase 10?',
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
      {
        id: 'l10-01',
        phaseId: 10,
        lessonNumber: 1,
        title: "The Golden Rule of Capital Preservation: Survival First",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master The Golden Rule of Capital Preservation: Survival First in real-world trading environments",
          "Identify key risk factors and signals associated with The Golden Rule of Capital Preservation: Survival First",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "The Golden Rule of Capital Preservation: Survival First",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "The Golden Rule of Capital Preservation: Survival First is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring The Golden Rule of Capital Preservation: Survival First identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on The Golden Rule of Capital Preservation: Survival First.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing The Golden Rule of Capital Preservation: Survival First?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "The Golden Rule of Capital Preservation: Survival First Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of The Golden Rule of Capital Preservation: Survival First and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l10-02',
        phaseId: 10,
        lessonNumber: 2,
        title: "Interactive Position Sizing Calculator Mastery",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Interactive Position Sizing Calculator Mastery in real-world trading environments",
          "Identify key risk factors and signals associated with Interactive Position Sizing Calculator Mastery",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Interactive Position Sizing Calculator Mastery",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Interactive Position Sizing Calculator Mastery is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Interactive Position Sizing Calculator Mastery identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Interactive Position Sizing Calculator Mastery.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Interactive Position Sizing Calculator Mastery?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Interactive Position Sizing Calculator Mastery Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Interactive Position Sizing Calculator Mastery and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l10-03',
        phaseId: 10,
        lessonNumber: 3,
        title: "Calculating Maximum Risk Per Trade (1-2% Account Rule)",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Calculating Maximum Risk Per Trade (1-2% Account Rule) in real-world trading environments",
          "Identify key risk factors and signals associated with Calculating Maximum Risk Per Trade (1-2% Account Rule)",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Calculating Maximum Risk Per Trade (1-2% Account Rule)",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Calculating Maximum Risk Per Trade (1-2% Account Rule) is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Calculating Maximum Risk Per Trade (1-2% Account Rule) identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Calculating Maximum Risk Per Trade (1-2% Account Rule).",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Calculating Maximum Risk Per Trade (1-2% Account Rule)?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Calculating Maximum Risk Per Trade (1-2% Account Rule) Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Calculating Maximum Risk Per Trade (1-2% Account Rule) and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l10-04',
        phaseId: 10,
        lessonNumber: 4,
        title: "Hard Stop Loss vs Mental Stop Loss in High-Slippage DEXs",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Hard Stop Loss vs Mental Stop Loss in High-Slippage DEXs in real-world trading environments",
          "Identify key risk factors and signals associated with Hard Stop Loss vs Mental Stop Loss in High-Slippage DEXs",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Hard Stop Loss vs Mental Stop Loss in High-Slippage DEXs",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Hard Stop Loss vs Mental Stop Loss in High-Slippage DEXs is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Hard Stop Loss vs Mental Stop Loss in High-Slippage DEXs identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Hard Stop Loss vs Mental Stop Loss in High-Slippage DEXs.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Hard Stop Loss vs Mental Stop Loss in High-Slippage DEXs?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Hard Stop Loss vs Mental Stop Loss in High-Slippage DEXs Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Hard Stop Loss vs Mental Stop Loss in High-Slippage DEXs and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l10-05',
        phaseId: 10,
        lessonNumber: 5,
        title: "Portfolio Allocation: Moonshots vs Core Sol Holdings",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Portfolio Allocation: Moonshots vs Core Sol Holdings in real-world trading environments",
          "Identify key risk factors and signals associated with Portfolio Allocation: Moonshots vs Core Sol Holdings",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Portfolio Allocation: Moonshots vs Core Sol Holdings",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Portfolio Allocation: Moonshots vs Core Sol Holdings is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Portfolio Allocation: Moonshots vs Core Sol Holdings identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Portfolio Allocation: Moonshots vs Core Sol Holdings.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Portfolio Allocation: Moonshots vs Core Sol Holdings?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Portfolio Allocation: Moonshots vs Core Sol Holdings Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Portfolio Allocation: Moonshots vs Core Sol Holdings and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l10-06',
        phaseId: 10,
        lessonNumber: 6,
        title: "The Mathematics of Drawdowns: Why Recovering from 90% is Nearly Impossible",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master The Mathematics of Drawdowns: Why Recovering from 90% is Nearly Impossible in real-world trading environments",
          "Identify key risk factors and signals associated with The Mathematics of Drawdowns: Why Recovering from 90% is Nearly Impossible",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "The Mathematics of Drawdowns: Why Recovering from 90% is Nearly Impossible",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "The Mathematics of Drawdowns: Why Recovering from 90% is Nearly Impossible is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring The Mathematics of Drawdowns: Why Recovering from 90% is Nearly Impossible identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on The Mathematics of Drawdowns: Why Recovering from 90% is Nearly Impossible.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing The Mathematics of Drawdowns: Why Recovering from 90% is Nearly Impossible?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "The Mathematics of Drawdowns: Why Recovering from 90% is Nearly Impossible Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of The Mathematics of Drawdowns: Why Recovering from 90% is Nearly Impossible and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l10-07',
        phaseId: 10,
        lessonNumber: 7,
        title: "Setting Invalidation Levels Based on Market Structure, Not Dollars",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Setting Invalidation Levels Based on Market Structure, Not Dollars in real-world trading environments",
          "Identify key risk factors and signals associated with Setting Invalidation Levels Based on Market Structure, Not Dollars",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Setting Invalidation Levels Based on Market Structure, Not Dollars",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Setting Invalidation Levels Based on Market Structure, Not Dollars is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Setting Invalidation Levels Based on Market Structure, Not Dollars identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Setting Invalidation Levels Based on Market Structure, Not Dollars.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Setting Invalidation Levels Based on Market Structure, Not Dollars?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Setting Invalidation Levels Based on Market Structure, Not Dollars Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Setting Invalidation Levels Based on Market Structure, Not Dollars and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l10-08',
        phaseId: 10,
        lessonNumber: 8,
        title: "Daily Loss Limits: The Kill Switch Protocol",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Daily Loss Limits: The Kill Switch Protocol in real-world trading environments",
          "Identify key risk factors and signals associated with Daily Loss Limits: The Kill Switch Protocol",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Daily Loss Limits: The Kill Switch Protocol",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Daily Loss Limits: The Kill Switch Protocol is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Daily Loss Limits: The Kill Switch Protocol identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Daily Loss Limits: The Kill Switch Protocol.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Daily Loss Limits: The Kill Switch Protocol?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Daily Loss Limits: The Kill Switch Protocol Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Daily Loss Limits: The Kill Switch Protocol and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l10-09',
        phaseId: 10,
        lessonNumber: 9,
        title: "Managing Exposure Across Multiple Correlated Memecoins",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Managing Exposure Across Multiple Correlated Memecoins in real-world trading environments",
          "Identify key risk factors and signals associated with Managing Exposure Across Multiple Correlated Memecoins",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Managing Exposure Across Multiple Correlated Memecoins",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Managing Exposure Across Multiple Correlated Memecoins is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Managing Exposure Across Multiple Correlated Memecoins identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Managing Exposure Across Multiple Correlated Memecoins.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Managing Exposure Across Multiple Correlated Memecoins?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Managing Exposure Across Multiple Correlated Memecoins Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Managing Exposure Across Multiple Correlated Memecoins and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l10-10',
        phaseId: 10,
        lessonNumber: 10,
        title: "Sizing Down During Low-Volume Chop & Downtrends",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Sizing Down During Low-Volume Chop & Downtrends in real-world trading environments",
          "Identify key risk factors and signals associated with Sizing Down During Low-Volume Chop & Downtrends",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Sizing Down During Low-Volume Chop & Downtrends",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Sizing Down During Low-Volume Chop & Downtrends is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Sizing Down During Low-Volume Chop & Downtrends identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Sizing Down During Low-Volume Chop & Downtrends.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Sizing Down During Low-Volume Chop & Downtrends?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Sizing Down During Low-Volume Chop & Downtrends Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Sizing Down During Low-Volume Chop & Downtrends and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l10-11',
        phaseId: 10,
        lessonNumber: 11,
        title: "Protecting Profits: Bankrolling and Securing Cold Storage Wins",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Protecting Profits: Bankrolling and Securing Cold Storage Wins in real-world trading environments",
          "Identify key risk factors and signals associated with Protecting Profits: Bankrolling and Securing Cold Storage Wins",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Protecting Profits: Bankrolling and Securing Cold Storage Wins",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Protecting Profits: Bankrolling and Securing Cold Storage Wins is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Protecting Profits: Bankrolling and Securing Cold Storage Wins identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Protecting Profits: Bankrolling and Securing Cold Storage Wins.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Protecting Profits: Bankrolling and Securing Cold Storage Wins?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Protecting Profits: Bankrolling and Securing Cold Storage Wins Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Protecting Profits: Bankrolling and Securing Cold Storage Wins and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l10-12',
        phaseId: 10,
        lessonNumber: 12,
        title: "Gas & Priority Fee Budgeting: Avoiding Fee Bleed",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Gas & Priority Fee Budgeting: Avoiding Fee Bleed in real-world trading environments",
          "Identify key risk factors and signals associated with Gas & Priority Fee Budgeting: Avoiding Fee Bleed",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Gas & Priority Fee Budgeting: Avoiding Fee Bleed",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Gas & Priority Fee Budgeting: Avoiding Fee Bleed is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Gas & Priority Fee Budgeting: Avoiding Fee Bleed identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Gas & Priority Fee Budgeting: Avoiding Fee Bleed.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Gas & Priority Fee Budgeting: Avoiding Fee Bleed?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Gas & Priority Fee Budgeting: Avoiding Fee Bleed Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Gas & Priority Fee Budgeting: Avoiding Fee Bleed and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l10-13',
        phaseId: 10,
        lessonNumber: 13,
        title: "Managing Black Swan Events & Flash Crashes",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Managing Black Swan Events & Flash Crashes in real-world trading environments",
          "Identify key risk factors and signals associated with Managing Black Swan Events & Flash Crashes",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Managing Black Swan Events & Flash Crashes",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Managing Black Swan Events & Flash Crashes is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Managing Black Swan Events & Flash Crashes identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Managing Black Swan Events & Flash Crashes.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Managing Black Swan Events & Flash Crashes?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Managing Black Swan Events & Flash Crashes Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Managing Black Swan Events & Flash Crashes and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l10-14',
        phaseId: 10,
        lessonNumber: 14,
        title: "The Operator Risk Management Audit Checklist",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master The Operator Risk Management Audit Checklist in real-world trading environments",
          "Identify key risk factors and signals associated with The Operator Risk Management Audit Checklist",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "The Operator Risk Management Audit Checklist",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "The Operator Risk Management Audit Checklist is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring The Operator Risk Management Audit Checklist identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on The Operator Risk Management Audit Checklist.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing The Operator Risk Management Audit Checklist?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "The Operator Risk Management Audit Checklist Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of The Operator Risk Management Audit Checklist and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      }
    ]
  },
  {
    id: 11,
    title: 'PHASE 11 — PROFIT MANAGEMENT & PSYCHOLOGY',
    subtitle: 'Exit Frameworks, Scaling Out, and Conquering Emotional Sabotage',
    description: 'Taking profit is the hardest skill in crypto. Master tiered scaling and emotional regulation.',
    levelRequired: 11,
    badge: 'PROFIT_MASTER',
    practicalAssignment: {
      title: 'Write Your Personal Take-Profit & Loss Recovery Protocol',
      description: 'Draft your mandatory trading rules document.',
      task: 'Define your exact TP1/TP2/TP3 rules, daily loss limit kill switch, and post-loss cooldown routine.'
    },
    quiz: {
      id: 'quiz-11',
      phaseId: 11,
      title: 'Phase 11 Assessment: Profit Frameworks & Psychological Regulation',
      passingScore: 75,
      questions: [
        {
          id: 'q11-1',
          question: 'What is the primary operational rule for Phase 11?',
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
      {
        id: 'l11-01',
        phaseId: 11,
        lessonNumber: 1,
        title: "The Tiered Profit Framework: TP1, TP2, TP3 & Runners",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master The Tiered Profit Framework: TP1, TP2, TP3 & Runners in real-world trading environments",
          "Identify key risk factors and signals associated with The Tiered Profit Framework: TP1, TP2, TP3 & Runners",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "The Tiered Profit Framework: TP1, TP2, TP3 & Runners",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "The Tiered Profit Framework: TP1, TP2, TP3 & Runners is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring The Tiered Profit Framework: TP1, TP2, TP3 & Runners identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on The Tiered Profit Framework: TP1, TP2, TP3 & Runners.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing The Tiered Profit Framework: TP1, TP2, TP3 & Runners?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "The Tiered Profit Framework: TP1, TP2, TP3 & Runners Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of The Tiered Profit Framework: TP1, TP2, TP3 & Runners and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l11-02',
        phaseId: 11,
        lessonNumber: 2,
        title: "Trading Psychology: Conquering FOMO, Greed & Revenge",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Trading Psychology: Conquering FOMO, Greed & Revenge in real-world trading environments",
          "Identify key risk factors and signals associated with Trading Psychology: Conquering FOMO, Greed & Revenge",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Trading Psychology: Conquering FOMO, Greed & Revenge",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Trading Psychology: Conquering FOMO, Greed & Revenge is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Trading Psychology: Conquering FOMO, Greed & Revenge identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Trading Psychology: Conquering FOMO, Greed & Revenge.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Trading Psychology: Conquering FOMO, Greed & Revenge?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Trading Psychology: Conquering FOMO, Greed & Revenge Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Trading Psychology: Conquering FOMO, Greed & Revenge and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l11-03',
        phaseId: 11,
        lessonNumber: 3,
        title: "De-Risking to Free Roll: Pulling Initial Capital on Double",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master De-Risking to Free Roll: Pulling Initial Capital on Double in real-world trading environments",
          "Identify key risk factors and signals associated with De-Risking to Free Roll: Pulling Initial Capital on Double",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "De-Risking to Free Roll: Pulling Initial Capital on Double",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "De-Risking to Free Roll: Pulling Initial Capital on Double is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring De-Risking to Free Roll: Pulling Initial Capital on Double identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on De-Risking to Free Roll: Pulling Initial Capital on Double.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing De-Risking to Free Roll: Pulling Initial Capital on Double?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "De-Risking to Free Roll: Pulling Initial Capital on Double Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of De-Risking to Free Roll: Pulling Initial Capital on Double and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l11-04',
        phaseId: 11,
        lessonNumber: 4,
        title: "Trailing Stops Using Market Structure Swing Lows",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Trailing Stops Using Market Structure Swing Lows in real-world trading environments",
          "Identify key risk factors and signals associated with Trailing Stops Using Market Structure Swing Lows",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Trailing Stops Using Market Structure Swing Lows",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Trailing Stops Using Market Structure Swing Lows is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Trailing Stops Using Market Structure Swing Lows identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Trailing Stops Using Market Structure Swing Lows.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Trailing Stops Using Market Structure Swing Lows?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Trailing Stops Using Market Structure Swing Lows Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Trailing Stops Using Market Structure Swing Lows and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l11-05',
        phaseId: 11,
        lessonNumber: 5,
        title: "The \"Round Number\" Psychological Trap ($1M, $10M, $100M MC)",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master The \"Round Number\" Psychological Trap ($1M, $10M, $100M MC) in real-world trading environments",
          "Identify key risk factors and signals associated with The \"Round Number\" Psychological Trap ($1M, $10M, $100M MC)",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "The \"Round Number\" Psychological Trap ($1M, $10M, $100M MC)",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "The \"Round Number\" Psychological Trap ($1M, $10M, $100M MC) is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring The \"Round Number\" Psychological Trap ($1M, $10M, $100M MC) identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on The \"Round Number\" Psychological Trap ($1M, $10M, $100M MC).",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing The \"Round Number\" Psychological Trap ($1M, $10M, $100M MC)?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "The \"Round Number\" Psychological Trap ($1M, $10M, $100M MC) Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of The \"Round Number\" Psychological Trap ($1M, $10M, $100M MC) and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l11-06',
        phaseId: 11,
        lessonNumber: 6,
        title: "Dealing with \"Should-Have-Held\" Regret & Seller Remorse",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Dealing with \"Should-Have-Held\" Regret & Seller Remorse in real-world trading environments",
          "Identify key risk factors and signals associated with Dealing with \"Should-Have-Held\" Regret & Seller Remorse",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Dealing with \"Should-Have-Held\" Regret & Seller Remorse",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Dealing with \"Should-Have-Held\" Regret & Seller Remorse is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Dealing with \"Should-Have-Held\" Regret & Seller Remorse identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Dealing with \"Should-Have-Held\" Regret & Seller Remorse.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Dealing with \"Should-Have-Held\" Regret & Seller Remorse?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Dealing with \"Should-Have-Held\" Regret & Seller Remorse Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Dealing with \"Should-Have-Held\" Regret & Seller Remorse and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l11-07',
        phaseId: 11,
        lessonNumber: 7,
        title: "The Post-Trade Emotional Cooldown: Resetting Between Wins and Losses",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master The Post-Trade Emotional Cooldown: Resetting Between Wins and Losses in real-world trading environments",
          "Identify key risk factors and signals associated with The Post-Trade Emotional Cooldown: Resetting Between Wins and Losses",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "The Post-Trade Emotional Cooldown: Resetting Between Wins and Losses",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "The Post-Trade Emotional Cooldown: Resetting Between Wins and Losses is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring The Post-Trade Emotional Cooldown: Resetting Between Wins and Losses identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on The Post-Trade Emotional Cooldown: Resetting Between Wins and Losses.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing The Post-Trade Emotional Cooldown: Resetting Between Wins and Losses?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "The Post-Trade Emotional Cooldown: Resetting Between Wins and Losses Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of The Post-Trade Emotional Cooldown: Resetting Between Wins and Losses and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l11-08',
        phaseId: 11,
        lessonNumber: 8,
        title: "Overcoming Overtrading & Dopamine Addiction in the Trenches",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Overcoming Overtrading & Dopamine Addiction in the Trenches in real-world trading environments",
          "Identify key risk factors and signals associated with Overcoming Overtrading & Dopamine Addiction in the Trenches",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Overcoming Overtrading & Dopamine Addiction in the Trenches",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Overcoming Overtrading & Dopamine Addiction in the Trenches is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Overcoming Overtrading & Dopamine Addiction in the Trenches identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Overcoming Overtrading & Dopamine Addiction in the Trenches.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Overcoming Overtrading & Dopamine Addiction in the Trenches?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Overcoming Overtrading & Dopamine Addiction in the Trenches Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Overcoming Overtrading & Dopamine Addiction in the Trenches and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l11-09',
        phaseId: 11,
        lessonNumber: 9,
        title: "Managing Win Streaks: The Danger of Euphoric Sizing",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Managing Win Streaks: The Danger of Euphoric Sizing in real-world trading environments",
          "Identify key risk factors and signals associated with Managing Win Streaks: The Danger of Euphoric Sizing",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Managing Win Streaks: The Danger of Euphoric Sizing",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Managing Win Streaks: The Danger of Euphoric Sizing is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Managing Win Streaks: The Danger of Euphoric Sizing identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Managing Win Streaks: The Danger of Euphoric Sizing.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Managing Win Streaks: The Danger of Euphoric Sizing?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Managing Win Streaks: The Danger of Euphoric Sizing Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Managing Win Streaks: The Danger of Euphoric Sizing and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l11-10',
        phaseId: 11,
        lessonNumber: 10,
        title: "Managing Losing Streaks: Preserving Mental Capital",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Managing Losing Streaks: Preserving Mental Capital in real-world trading environments",
          "Identify key risk factors and signals associated with Managing Losing Streaks: Preserving Mental Capital",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Managing Losing Streaks: Preserving Mental Capital",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Managing Losing Streaks: Preserving Mental Capital is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Managing Losing Streaks: Preserving Mental Capital identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Managing Losing Streaks: Preserving Mental Capital.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Managing Losing Streaks: Preserving Mental Capital?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Managing Losing Streaks: Preserving Mental Capital Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Managing Losing Streaks: Preserving Mental Capital and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l11-11',
        phaseId: 11,
        lessonNumber: 11,
        title: "Building a Daily Routine & Trading Journal Habit",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Building a Daily Routine & Trading Journal Habit in real-world trading environments",
          "Identify key risk factors and signals associated with Building a Daily Routine & Trading Journal Habit",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Building a Daily Routine & Trading Journal Habit",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Building a Daily Routine & Trading Journal Habit is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Building a Daily Routine & Trading Journal Habit identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Building a Daily Routine & Trading Journal Habit.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Building a Daily Routine & Trading Journal Habit?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Building a Daily Routine & Trading Journal Habit Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Building a Daily Routine & Trading Journal Habit and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l11-12',
        phaseId: 11,
        lessonNumber: 12,
        title: "The Long-Term Operator Mindset: Compound Growth Over Overnight Millions",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master The Long-Term Operator Mindset: Compound Growth Over Overnight Millions in real-world trading environments",
          "Identify key risk factors and signals associated with The Long-Term Operator Mindset: Compound Growth Over Overnight Millions",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "The Long-Term Operator Mindset: Compound Growth Over Overnight Millions",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "The Long-Term Operator Mindset: Compound Growth Over Overnight Millions is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring The Long-Term Operator Mindset: Compound Growth Over Overnight Millions identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on The Long-Term Operator Mindset: Compound Growth Over Overnight Millions.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing The Long-Term Operator Mindset: Compound Growth Over Overnight Millions?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "The Long-Term Operator Mindset: Compound Growth Over Overnight Millions Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of The Long-Term Operator Mindset: Compound Growth Over Overnight Millions and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      }
    ]
  },
  {
    id: 12,
    title: 'PHASE 12 — ADVANCED TRENCHLAB & SYSTEM BUILDING',
    subtitle: 'Building Your Personal On-Chain Trading System & Confluence Matrix',
    description: 'Synthesize everything you have learned into an individualized, repeatable trading edge.',
    levelRequired: 12,
    badge: 'SYSTEM_BUILDER',
    practicalAssignment: {
      title: 'The TrenchLab Capstone Trading System Defense',
      description: 'Build and submit your complete personal trading plan.',
      task: 'Document your setup criteria, checklist, risk rules, daily routine, and backtested results.'
    },
    quiz: {
      id: 'quiz-12',
      phaseId: 12,
      title: 'Phase 12 Assessment: System Mastery & Capstone Verification',
      passingScore: 75,
      questions: [
        {
          id: 'q12-1',
          question: 'What is the primary operational rule for Phase 12?',
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
      {
        id: 'l12-01',
        phaseId: 12,
        lessonNumber: 1,
        title: "Multi-Signal Confirmation & Confluence Scoring",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Multi-Signal Confirmation & Confluence Scoring in real-world trading environments",
          "Identify key risk factors and signals associated with Multi-Signal Confirmation & Confluence Scoring",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Multi-Signal Confirmation & Confluence Scoring",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Multi-Signal Confirmation & Confluence Scoring is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Multi-Signal Confirmation & Confluence Scoring identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Multi-Signal Confirmation & Confluence Scoring.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Multi-Signal Confirmation & Confluence Scoring?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Multi-Signal Confirmation & Confluence Scoring Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Multi-Signal Confirmation & Confluence Scoring and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l12-02',
        phaseId: 12,
        lessonNumber: 2,
        title: "Building Your Personal Memecoin Trading System",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Building Your Personal Memecoin Trading System in real-world trading environments",
          "Identify key risk factors and signals associated with Building Your Personal Memecoin Trading System",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Building Your Personal Memecoin Trading System",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Building Your Personal Memecoin Trading System is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Building Your Personal Memecoin Trading System identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Building Your Personal Memecoin Trading System.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Building Your Personal Memecoin Trading System?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Building Your Personal Memecoin Trading System Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Building Your Personal Memecoin Trading System and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l12-03',
        phaseId: 12,
        lessonNumber: 3,
        title: "Creating Automated Telegram Scrapers & Alert Filters",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Creating Automated Telegram Scrapers & Alert Filters in real-world trading environments",
          "Identify key risk factors and signals associated with Creating Automated Telegram Scrapers & Alert Filters",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Creating Automated Telegram Scrapers & Alert Filters",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Creating Automated Telegram Scrapers & Alert Filters is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Creating Automated Telegram Scrapers & Alert Filters identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Creating Automated Telegram Scrapers & Alert Filters.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Creating Automated Telegram Scrapers & Alert Filters?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Creating Automated Telegram Scrapers & Alert Filters Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Creating Automated Telegram Scrapers & Alert Filters and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l12-04',
        phaseId: 12,
        lessonNumber: 4,
        title: "Advanced Solscan API & Program Logs Inspection",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Advanced Solscan API & Program Logs Inspection in real-world trading environments",
          "Identify key risk factors and signals associated with Advanced Solscan API & Program Logs Inspection",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Advanced Solscan API & Program Logs Inspection",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Advanced Solscan API & Program Logs Inspection is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Advanced Solscan API & Program Logs Inspection identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Advanced Solscan API & Program Logs Inspection.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Advanced Solscan API & Program Logs Inspection?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Advanced Solscan API & Program Logs Inspection Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Advanced Solscan API & Program Logs Inspection and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l12-05',
        phaseId: 12,
        lessonNumber: 5,
        title: "Custom DexScreener & Birdeye Workspace Architecture",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Custom DexScreener & Birdeye Workspace Architecture in real-world trading environments",
          "Identify key risk factors and signals associated with Custom DexScreener & Birdeye Workspace Architecture",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Custom DexScreener & Birdeye Workspace Architecture",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Custom DexScreener & Birdeye Workspace Architecture is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Custom DexScreener & Birdeye Workspace Architecture identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Custom DexScreener & Birdeye Workspace Architecture.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Custom DexScreener & Birdeye Workspace Architecture?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Custom DexScreener & Birdeye Workspace Architecture Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Custom DexScreener & Birdeye Workspace Architecture and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l12-06',
        phaseId: 12,
        lessonNumber: 6,
        title: "Analyzing Market Regimes: PVP Trench Season vs Broad Bull Runs",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Analyzing Market Regimes: PVP Trench Season vs Broad Bull Runs in real-world trading environments",
          "Identify key risk factors and signals associated with Analyzing Market Regimes: PVP Trench Season vs Broad Bull Runs",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Analyzing Market Regimes: PVP Trench Season vs Broad Bull Runs",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Analyzing Market Regimes: PVP Trench Season vs Broad Bull Runs is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Analyzing Market Regimes: PVP Trench Season vs Broad Bull Runs identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Analyzing Market Regimes: PVP Trench Season vs Broad Bull Runs.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Analyzing Market Regimes: PVP Trench Season vs Broad Bull Runs?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Analyzing Market Regimes: PVP Trench Season vs Broad Bull Runs Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Analyzing Market Regimes: PVP Trench Season vs Broad Bull Runs and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l12-07',
        phaseId: 12,
        lessonNumber: 7,
        title: "The Pre-Market Morning Audit Protocol",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master The Pre-Market Morning Audit Protocol in real-world trading environments",
          "Identify key risk factors and signals associated with The Pre-Market Morning Audit Protocol",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "The Pre-Market Morning Audit Protocol",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "The Pre-Market Morning Audit Protocol is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring The Pre-Market Morning Audit Protocol identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on The Pre-Market Morning Audit Protocol.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing The Pre-Market Morning Audit Protocol?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "The Pre-Market Morning Audit Protocol Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of The Pre-Market Morning Audit Protocol and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l12-08',
        phaseId: 12,
        lessonNumber: 8,
        title: "Backtesting Your Setups: Recording 50 Historical Trades",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Backtesting Your Setups: Recording 50 Historical Trades in real-world trading environments",
          "Identify key risk factors and signals associated with Backtesting Your Setups: Recording 50 Historical Trades",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Backtesting Your Setups: Recording 50 Historical Trades",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Backtesting Your Setups: Recording 50 Historical Trades is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Backtesting Your Setups: Recording 50 Historical Trades identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Backtesting Your Setups: Recording 50 Historical Trades.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Backtesting Your Setups: Recording 50 Historical Trades?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Backtesting Your Setups: Recording 50 Historical Trades Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Backtesting Your Setups: Recording 50 Historical Trades and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l12-09',
        phaseId: 12,
        lessonNumber: 9,
        title: "Weekly PnL & Process Review: Eliminating Bad Habits",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Weekly PnL & Process Review: Eliminating Bad Habits in real-world trading environments",
          "Identify key risk factors and signals associated with Weekly PnL & Process Review: Eliminating Bad Habits",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Weekly PnL & Process Review: Eliminating Bad Habits",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Weekly PnL & Process Review: Eliminating Bad Habits is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Weekly PnL & Process Review: Eliminating Bad Habits identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Weekly PnL & Process Review: Eliminating Bad Habits.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Weekly PnL & Process Review: Eliminating Bad Habits?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Weekly PnL & Process Review: Eliminating Bad Habits Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Weekly PnL & Process Review: Eliminating Bad Habits and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l12-10',
        phaseId: 12,
        lessonNumber: 10,
        title: "Developing Asymmetric Bet Sizing for Elite Setups",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Developing Asymmetric Bet Sizing for Elite Setups in real-world trading environments",
          "Identify key risk factors and signals associated with Developing Asymmetric Bet Sizing for Elite Setups",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Developing Asymmetric Bet Sizing for Elite Setups",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Developing Asymmetric Bet Sizing for Elite Setups is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Developing Asymmetric Bet Sizing for Elite Setups identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Developing Asymmetric Bet Sizing for Elite Setups.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Developing Asymmetric Bet Sizing for Elite Setups?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Developing Asymmetric Bet Sizing for Elite Setups Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Developing Asymmetric Bet Sizing for Elite Setups and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l12-11',
        phaseId: 12,
        lessonNumber: 11,
        title: "Transitioning from Part-Time Trencher to Full-Time Operator",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Transitioning from Part-Time Trencher to Full-Time Operator in real-world trading environments",
          "Identify key risk factors and signals associated with Transitioning from Part-Time Trencher to Full-Time Operator",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Transitioning from Part-Time Trencher to Full-Time Operator",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Transitioning from Part-Time Trencher to Full-Time Operator is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Transitioning from Part-Time Trencher to Full-Time Operator identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Transitioning from Part-Time Trencher to Full-Time Operator.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Transitioning from Part-Time Trencher to Full-Time Operator?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "Transitioning from Part-Time Trencher to Full-Time Operator Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Transitioning from Part-Time Trencher to Full-Time Operator and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l12-12',
        phaseId: 12,
        lessonNumber: 12,
        title: "The TrenchLab Graduation: Capstone System Defense",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master The TrenchLab Graduation: Capstone System Defense in real-world trading environments",
          "Identify key risk factors and signals associated with The TrenchLab Graduation: Capstone System Defense",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "The TrenchLab Graduation: Capstone System Defense",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "The TrenchLab Graduation: Capstone System Defense is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring The TrenchLab Graduation: Capstone System Defense identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on The TrenchLab Graduation: Capstone System Defense.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing The TrenchLab Graduation: Capstone System Defense?",
            options: [
          "Always risk 100% of your wallet",
          "Confirm on-chain structure and manage risk strictly with defined invalidation",
          "Trade based on unverified Telegram rumors",
          "Ignore liquidity depth"
],
            correctIndex: 1,
            explanation: "Disciplined risk management and waiting for objective on-chain structural confirmation are the cornerstones of long-term profitability."
          }
        ],
        assignment: {
          title: "The TrenchLab Graduation: Capstone System Defense Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of The TrenchLab Graduation: Capstone System Defense and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      }
    ]
  }
];
