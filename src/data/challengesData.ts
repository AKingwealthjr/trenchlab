import { Challenge } from '../types';

export const CHALLENGES_DATA: Challenge[] = [
  {
    id: 'challenge-01',
    title: 'CHALLENGE 01: Liquidity-to-Market-Cap Validation',
    difficulty: 'BEGINNER',
    description: 'Screen live Solana DEX pairs and identify 5 tokens displaying healthy, sustainable liquidity relative to their market capitalization.',
    targetCriteria: [
      'Market Cap between $200,000 and $5,000,000',
      'Liquidity-to-Market-Cap ratio between 15% and 35%',
      '100% LP burned or locked with verifiable tx hash',
      'Age greater than 24 hours'
    ],
    methodology: [
      'Open DexScreener or Birdeye filtered for Solana network',
      'Set filter: Min Liquidity $50k, Min 24h Volume $100k',
      'Calculate Ratio = Liquidity / Market Cap * 100%',
      'Inspect pool security to confirm LP tokens are burned'
    ],
    outputRequirement: 'List of 5 token tickers with contract addresses, exact MC, exact Liquidity, calculated ratio percentage, and verdict justification.'
  },
  {
    id: 'challenge-02',
    title: 'CHALLENGE 02: Suspicious Holder Concentration Audit',
    difficulty: 'INTERMEDIATE',
    description: 'Locate a newly trending Solana token that appears attractive on the surface but conceals dangerous holder concentration or hidden insider allocation.',
    targetCriteria: [
      'Token currently featured in DexScreener trending or Birdeye gainers',
      'Top 10 non-DEX holders control > 25% of total supply',
      'Evidence of multiple top wallets funded from the same root exchange or intermediary account within the same hour'
    ],
    methodology: [
      'Select a token with rapid upward price action under 6 hours old',
      'Open Solscan token page and sort Holders table in descending order',
      'Input token mint address into Bubblemaps to detect connected clusters',
      'Trace funding source of the top 3 individual holders'
    ],
    outputRequirement: 'Token name, mint address, top 10 percentage total, Bubblemaps cluster screenshot or link, and risk assessment explaining the dump scenario.'
  },
  {
    id: 'challenge-03',
    title: 'CHALLENGE 03: Dev-Wallet Liquidation Forensics',
    difficulty: 'INTERMEDIATE',
    description: 'Find a chart showing a sudden 60%+ collapse, and use on-chain explorers to prove whether the dump was triggered by the deployer or team-linked wallet.',
    targetCriteria: [
      'Chart displaying a sudden violent breakdown candle on 5m/15m',
      'Identification of the deployer address via block zero mint tx',
      'On-chain transfer trace showing tokens moved to a secondary burner/sub-wallet prior to swap execution'
    ],
    methodology: [
      'Locate a steep drop on DexScreener recent pairs',
      'Copy deployer wallet from contract creator metadata',
      'Check Solscan SPL transfers to locate token outflows from deployer',
      'Verify if the selling transaction matches the exact timestamp of the red liquidation candle'
    ],
    outputRequirement: 'Deployer address, dump transaction signature, amount of SOL extracted, and timeline sequence of the liquidation.'
  },
  {
    id: 'challenge-04',
    title: 'CHALLENGE 04: Pre-Expansion Volume Acceleration',
    difficulty: 'INTERMEDIATE',
    description: 'Analyze an established token that recently made a 100%+ expansion and document the subtle volume behavior that preceded the actual price breakout.',
    targetCriteria: [
      'A completed breakout that achieved at least a 2x expansion',
      'Documentation of 5-minute volume bars during the consolidation phase',
      'Identification of volume accumulation bars where volume rose while price remained tight/flat'
    ],
    methodology: [
      'Open a successful runner chart on DexScreener (15m or 5m timeframe)',
      'Rewind visual inspection to the consolidation base before the move',
      'Measure buy vs sell ratio in the 30 minutes prior to breakout',
      'Note whether unique maker count was increasing before price moved'
    ],
    outputRequirement: 'Annotated chart observations: consolidation duration, pre-breakout volume multiple vs 20-period average, and trigger candle confirmation.'
  },
  {
    id: 'challenge-05',
    title: 'CHALLENGE 05: Anatomy of a Failed Breakout (Bull Trap)',
    difficulty: 'ADVANCED',
    description: 'Identify a real-world failed breakout on a Solana memecoin chart and dissect why the breakout lacked continuation and trapped retail buyers.',
    targetCriteria: [
      'Price pierced above multi-hour horizontal resistance level',
      'Candle closed with a long upper wick or immediately followed by an engulfing red candle back into range',
      'Lack of relative volume expansion or heavy insider sell limit orders absorbing bids'
    ],
    methodology: [
      'Scan pairs on 5m timeframe for upper wick rejections at resistance',
      'Evaluate transaction flow during the wick to see if market buys were met with large limit sells',
      'Document where a disciplined trader would have placed invalidation vs where FOMO buyers got trapped'
    ],
    outputRequirement: 'Detailed chart breakdown with exact price levels: Resistance level, Trap high, Invalidation point, and Post-rejection price decline.'
  },
  {
    id: 'challenge-06',
    title: 'CHALLENGE 06: Comprehensive 10-Point Token Safety Audit',
    difficulty: 'ADVANCED',
    description: 'Execute a thorough forensic safety audit on a freshly trending token using the full TRENCHLAB on-chain checklist before risking capital.',
    targetCriteria: [
      'Mint Authority check (Revoked vs Active)',
      'Freeze Authority check (Revoked vs Active)',
      'Liquidity pool burn/lock verification (100% burned required)',
      'Top 10 holder concentration (excluding pool) under 15%',
      'Dev allocation & deployer holding audit',
      'Bubblemaps cluster analysis',
      'Volume-to-liquidity sanity ratio',
      'Wash trading / bot transaction check'
    ],
    methodology: [
      'Follow the TRENCHLAB 10-step protocol using Solscan, Bubblemaps, and DexScreener',
      'Assign an objective score from 0 to 10 based on criteria',
      'Formulate a final risk determination: SAFE TO TRADE, HIGH RISK, or INSTANT PASS'
    ],
    outputRequirement: 'Complete written audit scorecard with contract address, all 10 verified parameters, links to tx proofs, and final trading risk classification.'
  },
  {
    id: 'final-challenge',
    title: 'FINAL CHALLENGE: The 5-Minute TRENCHLAB Rapid Teardown',
    difficulty: 'ADVANCED',
    timeLimit: '5 Minutes',
    description: 'Put your university training to the test. Pick an active, live Solana token and produce a complete institutional-grade rapid analysis in under 5 minutes.',
    targetCriteria: [
      '1. FUNDAMENTALS (Age, narrative hook, community presence)',
      '2. FLOW (24h volume, 5m momentum, buy/sell ratio)',
      '3. DISTRIBUTION (Top 10 holder %, Bubblemaps cluster status)',
      '4. SAFETY (Mint/Freeze revoked, LP burned, no honeypot code)',
      '5. MARKET STRUCTURE (Trend, key support, key resistance, recent BOS)',
      '6. LIQUIDITY (Pool depth, MC/Liquidity ratio, slippage risk)',
      '7. TRADE PLAN (Hypothetical Entry, Hard Invalidation, TP1/TP2, Dollar Risk)',
      '8. FINAL CLASSIFICATION (PASS / WATCH / TRADE SETUP)'
    ],
    methodology: [
      'Start a 5-minute timer',
      'Open DexScreener, Solscan, and Bubblemaps concurrently',
      'Systematically fill in each section of the TRENCHLAB Teardown matrix',
      'Never output automated buy/sell recommendations; classify strictly as PASS, WATCH, or TRADE SETUP'
    ],
    outputRequirement: 'Completed 8-part TRENCHLAB Teardown dossier with explicit Invalidation price and final classification with reasoned justification.'
  }
];

export const CHALLENGES = CHALLENGES_DATA;
