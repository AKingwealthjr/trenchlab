import { ToolItem } from '../types';

export const TOOLS_DATA: ToolItem[] = [
  {
    id: 'dexscreener',
    name: 'DexScreener',
    category: 'DISCOVERY',
    purpose: 'Real-time DEX chart streaming, multi-pair price action, liquidity tracking, and buy/sell transaction feeds.',
    whenToUse: 'Primary charting terminal for inspecting Solana token launches, checking 5m/1m market structure, and tracking volume surges.',
    officialUrl: 'https://dexscreener.com',
    relevantLessons: ['Phase 04: All Lessons', 'Phase 02: Candlesticks & Structure', 'Phase 08: Volume Anomalies'],
    keyFeatures: [
      'Filter new pairs by chain, liquidity, and age',
      'Real-time transaction stream with maker wallet addresses',
      'Detailed liquidity pool breakdown and locked status indicators',
      'Multi-chart custom watchlists for active session monitoring'
    ],
    badge: 'Core Terminal'
  },
  {
    id: 'birdeye',
    name: 'Birdeye',
    category: 'DISCOVERY',
    purpose: 'Deep crypto trading data aggregator with advanced holder metrics, organic trader activity, and liquidity insights.',
    whenToUse: 'When you need deep statistical analysis on token holder growth, unique buyer/seller ratios, and volume health.',
    officialUrl: 'https://birdeye.so',
    relevantLessons: ['Phase 05: Birdeye Masterclass', 'Phase 08: Organic Demand', 'Phase 07: Smart Money'],
    keyFeatures: [
      'Trader leaderboard & smart money tracking',
      'Historical holder distribution graphs',
      'Buy/Sell pressure meters and net flow metrics',
      'Token security overview with mint & freeze flags'
    ],
    badge: 'Analytics Suite'
  },
  {
    id: 'jupiter',
    name: 'Jupiter Exchange',
    category: 'TRADING',
    purpose: 'The premier swap aggregator on Solana, routing trades across all liquidity venues for minimal price impact.',
    whenToUse: 'Executing token swaps with optimized routing, setting limit orders, DCA schedules, and dynamic priority fees.',
    officialUrl: 'https://jup.ag',
    relevantLessons: ['Phase 03: Jupiter Swaps', 'Phase 01: Slippage & Impact', 'Phase 10: Scaling Out'],
    keyFeatures: [
      'Best price routing across Raydium, Orca, Meteora, and more',
      'Automated slippage protection and MEV defense',
      'Limit orders and Dollar Cost Averaging (DCA)',
      'Exact-out swaps and priority fee custom sliders'
    ],
    badge: 'Aggregator'
  },
  {
    id: 'solscan',
    name: 'Solscan',
    category: 'ON-CHAIN',
    purpose: 'Official leading block explorer for the Solana blockchain, detailing raw account states, instructions, and transfers.',
    whenToUse: 'Auditing smart contract authorities, verifying developer fund movements, checking transaction logs, and inspecting token accounts.',
    officialUrl: 'https://solscan.io',
    relevantLessons: ['Phase 03: Solscan Block Verification', 'Phase 06: Rug Detection', 'Phase 07: Reading Wallets'],
    keyFeatures: [
      'SPL Token metadata, Mint Authority & Freeze Authority checks',
      'Holder breakdown table with exact percentage ownership',
      'Transaction instruction tree & program invocation traces',
      'SPL token transfer history for tracking wallet dispersals'
    ],
    badge: 'Explorer'
  },
  {
    id: 'bubblemaps',
    name: 'Bubblemaps',
    category: 'ON-CHAIN',
    purpose: 'Visual on-chain auditing tool that maps wallet clusters and reveals hidden connections between top token holders.',
    whenToUse: 'Investigating whether top holders are separate organic buyers or a single insider team controlling supply via bundled wallets.',
    officialUrl: 'https://bubblemaps.io',
    relevantLessons: ['Phase 06: Bundled Wallets & Concentration', 'Phase 07: Wallet Clusters', 'Phase 12: Advanced On-Chain'],
    keyFeatures: [
      'Interactive visual bubble graphs of token supply distribution',
      'Automatic detection of wallet clusters funded by the same root source',
      'Historical timeline slider showing how tokens were distributed',
      'Instant rug risk scoring based on insider cluster dominance'
    ],
    badge: 'Forensic Visualizer'
  },
  {
    id: 'phantom',
    name: 'Phantom Wallet',
    category: 'TRADING',
    purpose: 'The standard self-custody wallet for Solana, providing key management, DApp signing, and biometric security.',
    whenToUse: 'Your personal vault and signature terminal for connecting to DEXs, confirming swaps, and managing SOL collateral.',
    officialUrl: 'https://phantom.app',
    relevantLessons: ['Phase 01: Wallets & Self Custody', 'Phase 03: Phantom Setup & Safety', 'Phase 10: Protecting Capital'],
    keyFeatures: [
      'Biometric and password-protected key security',
      'Simulated transaction preview to detect malicious drains',
      'Multi-account segregation for burner vs cold storage',
      'Instant connection with Jupiter, Raydium, and DexScreener'
    ],
    badge: 'Self-Custody'
  },
  {
    id: 'raydium',
    name: 'Raydium',
    category: 'TRADING',
    purpose: 'Solana’s foundational automated market maker (AMM) and concentrated liquidity DEX.',
    whenToUse: 'Viewing primary liquidity pools (CPMM & CLMM), tracking LP creation transactions, and token migration pools.',
    officialUrl: 'https://raydium.io',
    relevantLessons: ['Phase 03: Raydium & AMM Mechanics', 'Phase 01: Liquidity Pools', 'Phase 06: LP Burn & Lock'],
    keyFeatures: [
      'Automated Market Maker liquidity pool creation',
      'Concentrated liquidity market maker (CLMM) integration',
      'Direct swap pool routing and LP token management',
      'Primary destination for migrated Pump.fun bonding curve pools'
    ],
    badge: 'DEX AMM'
  },
  {
    id: 'gmgn',
    name: 'GMGN.ai',
    category: 'WALLET INTELLIGENCE',
    purpose: 'Rapid on-chain trader intelligence terminal specializing in Solana memecoin sniper detection, smart money tracking, and PnL audits.',
    whenToUse: 'Tracking high-winrate wallets, identifying dev wallets that sold into liquidity, and auditing sniper activity at block zero.',
    officialUrl: 'https://gmgn.ai',
    relevantLessons: ['Phase 07: Smart Money & Wallet Tracking', 'Phase 06: Snipers & Dev Behavior', 'Phase 12: Smart Money Systems'],
    keyFeatures: [
      'Live smart money buy/sell signal feeds',
      'Realized and unrealized PnL breakdown per wallet',
      'Holding duration and win rate percentages for any address',
      'Copy-trading danger indicators and front-run warnings'
    ],
    badge: 'Sniper & Flow'
  }
];
