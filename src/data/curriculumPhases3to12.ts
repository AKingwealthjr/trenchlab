import { Phase } from '../types';
import { VERIFIED_VIDEOS } from './videoData';

export const PHASES_3_TO_12: Phase[] = [
  // ==================== PHASE 03 ====================
  {
    id: 3,
    title: 'PHASE 03 — SOLANA TRADING STACK',
    subtitle: 'Execution Infrastructure, Wallets, Routers, and Bonding Curves',
    description: 'Master the mechanics of Solana execution. Understand how Phantom, Jupiter, Raydium, and Pump.fun interact, how bonding curves work, and how to verify blocks on Solscan.',
    levelRequired: 3,
    badge: 'SOLANA_OPERATOR',
    practicalAssignment: {
      title: 'Explain the Lifecycle of a Newly Launched Solana Token',
      description: 'Write a comprehensive technical walkthrough tracking a token from bonding curve creation to DEX liquidity migration.',
      task: 'Document: (1) Creation on Pump.fun, (2) Bonding curve accumulation, (3) Migration to Raydium, (4) LP token burning, and (5) Priority fee optimization during high volume.'
    },
    quiz: {
      id: 'quiz-03',
      phaseId: 3,
      title: 'Phase 03 Assessment: Solana Infrastructure & Routers',
      passingScore: 75,
      questions: [
        {
          id: 'q3-1',
          question: 'What is Jupiter\'s primary role in the Solana trading ecosystem?',
          options: [
            'A memecoin launchpad with bonding curves',
            'A DEX aggregator that routes trades through the deepest liquidity pools to minimize price impact',
            'A centralized custodian for SOL',
            'A blockchain validator network'
          ],
          correctIndex: 1,
          explanation: 'Jupiter searches across Raydium, Orca, Meteora, and other pools to split and route swaps for optimal pricing and minimal slippage.',
          type: 'multiple-choice'
        },
        {
          id: 'q3-2',
          question: 'What happens when a Pump.fun bonding curve reaches 100% completion?',
          options: [
            'All tokens are burned and the project closes',
            'Liquidity is automatically deposited into a Raydium pool and the LP tokens are permanently burned',
            'The developer withdraws 100% of the funds to a private CEX',
            'Trading is paused for 7 days'
          ],
          correctIndex: 1,
          explanation: 'At 100% curve completion, Pump.fun automatically migrates ~$12k-$14k in accumulated SOL liquidity into a Raydium pool and burns the LP tokens to make liquidity permanent.',
          type: 'scenario'
        },
        {
          id: 'q3-3',
          question: 'Why do transactions occasionally fail or get dropped on Solana during high-volatility launches?',
          options: [
            'Solana shuts down daily at midnight',
            'Validators drop low-priority transactions when compute unit block space fills up with higher priority fee bids',
            'DEXs only allow 100 people to trade per minute',
            'You did not submit KYC'
          ],
          correctIndex: 1,
          explanation: 'When blocks are saturated, validators prioritize transactions paying higher priority fees per compute unit.',
          type: 'multiple-choice'
        },
        {
          id: 'q3-4',
          question: 'Where can you verify whether a token\'s Mint Authority and Freeze Authority have been permanently revoked?',
          options: [
            'On Twitter / X comments',
            'On Solscan by inspecting the token mint account details',
            'By asking the developer directly in a Telegram chat',
            'In your browser bookmarks'
          ],
          correctIndex: 1,
          explanation: 'Solscan displays the raw on-chain state: if Mint Authority or Freeze Authority is not set to null, the developer retains dangerous control.',
          type: 'true-false'
        }
      ]
    },
    lessons: [
      {
        id: 'l3-01',
        phaseId: 3,
        lessonNumber: 1,
        title: 'Phantom Wallet Setup & Advanced Security',
        difficulty: 'BEGINNER',
        estimatedTime: '20 min',
        objectives: [
          'Configure Phantom with hardware/burner account segregation',
          'Understand transaction simulation banners to identify malicious drains',
          'Learn custom RPC endpoints for lightning-fast execution'
        ],
        videos: [VERIFIED_VIDEOS.phantomWallet],
        keyConcepts: ['Burner Sub-Accounts', 'Simulation Previews', 'Custom RPCs', 'Approval Revocations'],
        deepDive: [
          'Phantom offers built-in simulation: before signing, it calculates exactly what tokens leave and enter your wallet.',
          'If a simulation shows all your SOL leaving but 0 tokens returning, reject the transaction immediately.',
          'Configure auto-lock timers and biometric authentication to protect your session.'
        ],
        realWorldExample: 'A user attempts to mint an "airdrop" on a phishing site. Phantom’s simulation warns: "Warning: Malicious site. 15.2 SOL will leave your wallet." The user declines and escapes a drain.',
        commonMistakes: [
          'Ignoring simulation warnings because of FOMO to get into a trade quickly.',
          'Leaving wallet unlocked on shared laptops or public Wi-Fi.'
        ],
        checkQuestions: [
          {
            question: 'What is the most critical check before clicking "Confirm" in Phantom?',
            options: ['Checking the color of the button', 'Reviewing the simulation balance changes to ensure only the intended amount leaves your wallet', 'Checking the time of day', 'Turning off your firewall'],
            correctIndex: 1,
            explanation: 'Transaction simulations reveal the exact net token balance change before on-chain execution.'
          }
        ],
        assignment: {
          title: 'Phantom Security Checklist',
          instructions: 'Review your Phantom settings: enable auto-lock after 10 minutes, verify connected apps, and revoke any stale dApp permissions.',
          deliverables: ['Document that auto-lock is configured and your connected apps list is clean.']
        }
      },
      {
        id: 'l3-02',
        phaseId: 3,
        lessonNumber: 2,
        title: 'Jupiter Aggregator: Best Execution & Dynamic Routing',
        difficulty: 'INTERMEDIATE',
        estimatedTime: '25 min',
        objectives: [
          'Understand how Jupiter splits orders across multiple DEX pools',
          'Configure dynamic priority fees and slippage protection',
          'Utilize Limit Orders and Dollar Cost Averaging (DCA) natively on-chain'
        ],
        videos: [VERIFIED_VIDEOS.solanaEcosystem],
        keyConcepts: ['Smart Routing', 'DCA Mechanics', 'On-Chain Limit Orders', 'Dynamic Slippage'],
        deepDive: [
          'When executing a $5,000 swap on a low-cap token, Jupiter may route 60% through Raydium and 40% through Meteora to avoid massive single-pool price impact.',
          'Jupiter Limit Orders: You can set automated buy or sell limits on Solana tokens without keeping your browser open, executed by decentralized keeper bots when price crosses your threshold.'
        ],
        realWorldExample: 'A trader wants to take profit on a memecoin at $0.15 while sleeping. They set a Jupiter Limit Order for 50% of their position. When an Asian session wick hits $0.152, the limit order executes automatically into SOL.',
        commonMistakes: [
          'Setting fixed 0.1% slippage during a viral token migration (guaranteeing transaction reverts).',
          'Forgetting to cancel old limit orders on tokens that have undergone contract migrations.'
        ],
        checkQuestions: [
          {
            question: 'How does Jupiter help execute large orders with lower price impact?',
            options: ['By asking the dev for a discount', 'By splitting the swap route across multiple independent liquidity pools', 'By delaying the trade by 24 hours', 'By trading on CEX order books'],
            correctIndex: 1,
            explanation: 'Split routing distributes pool reserve impact across multiple venues.'
          }
        ],
        assignment: {
          title: 'Jupiter Test Limit Order',
          instructions: 'Set a small limit order on Jupiter for SOL/USDC at a 5% discount to current price. Observe how the escrow account is funded.',
          deliverables: ['Record the transaction signature and order status in your journal.']
        }
      },
      {
        id: 'l3-03',
        phaseId: 3,
        lessonNumber: 3,
        title: 'Raydium & AMM Liquidity Mechanics',
        difficulty: 'INTERMEDIATE',
        estimatedTime: '20 min',
        objectives: [
          'Understand Standard CPMM vs Concentrated Liquidity (CLMM) pools',
          'Learn how LP tokens represent pool ownership and redemption rights',
          'Track pool initialization transactions and initial liquidity seeding'
        ],
        videos: [VERIFIED_VIDEOS.liquidityPools],
        keyConcepts: ['Constant Product (x * y = k)', 'Concentrated Liquidity (CLMM)', 'LP Token Minting', 'Pool Fees'],
        deepDive: [
          'Raydium is the primary liquidity venue for Solana memecoins. In standard CPMM pools, liquidity is spread infinitely from zero to infinity.',
          'When a developer adds 20 SOL and 1,000,000,000 tokens to a pool, Raydium mints LP tokens representing 100% of the pool. If the dev keeps those LP tokens, they can withdraw the SOL at any time (rug pull). That is why LP burning is mandatory.'
        ],
        realWorldExample: 'A developer creates a Raydium pool with 50 SOL. They immediately send the LP tokens to the `Incinerator` burn address. Solscan records the burn event, proving to traders the pool is permanent.',
        commonMistakes: [
          'Assuming a pool is safe because it is on Raydium without checking if LP tokens were burned or locked.',
          'Trading into unverified cloned pools with zero volume.'
        ],
        checkQuestions: [
          {
            question: 'Why is verifying the destruction of LP tokens vital on Raydium?',
            options: ['Because it saves gas', 'Because holding LP tokens gives the holder the power to withdraw all SOL from the pool at will', 'Because Raydium requires it for trading', 'Because Solana shuts down inactive pools'],
            correctIndex: 1,
            explanation: 'Whoever holds the LP tokens holds the cryptographic claim on the pool reserves.'
          }
        ],
        assignment: {
          title: 'Raydium Pool Inspection',
          instructions: 'Find a newly migrated token on Raydium. Locate the LP Creation transaction on Solscan and verify whether LP tokens were burned.',
          deliverables: ['Document the transaction hash of the LP burn.']
        }
      },
      {
        id: 'l3-04',
        phaseId: 3,
        lessonNumber: 4,
        title: 'Pump.fun & Bonding Curves Explained',
        difficulty: 'INTERMEDIATE',
        estimatedTime: '25 min',
        objectives: [
          'Understand the mathematical mechanics of automated bonding curves',
          'Track curve progression from 0% to 100% graduation',
          'Evaluate migration risk, snipers at graduation, and Raydium pool seeding'
        ],
        videos: [VERIFIED_VIDEOS.solanaEcosystem],
        keyConcepts: ['Bonding Curve Pricing', 'Graduation Threshold', 'Raydium Migration', 'Curve Snipers'],
        deepDive: [
          'Bonding curves solve the initial liquidity problem: nobody needs to put up $20k in SOL to launch a token. Price is determined by a deterministic mathematical formula based on how many tokens have been bought.',
          'When users buy, SOL accumulates in the curve contract. Once the curve reaches ~85 SOL (~$69k-$85k market cap), trading on the curve closes.',
          'Migration: The contract takes accumulated SOL and remaining tokens, seeds a new Raydium pool, and automatically burns the LP tokens.'
        ],
        realWorldExample: 'A token reaches 98% on the bonding curve. Traders rush to buy before migration. Right after migration onto Raydium, early bonding curve buyers dump for a quick 2x, creating an immediate post-migration dip.',
        commonMistakes: [
          'Buying tokens at 99% bonding curve with high slippage without anticipating the post-migration sniper dump.',
          'Failing to monitor whether the dev dumped their own bag before the curve even hit 50%.'
        ],
        checkQuestions: [
          {
            question: 'What happens to the liquidity when a token migrates off the bonding curve to Raydium?',
            options: ['It is sent to the developer\'s personal wallet', 'It is deposited into a Raydium pool and the LP tokens are automatically burned', 'It is converted to Bitcoin', 'It is locked for 10 years in a bank'],
            correctIndex: 1,
            explanation: 'The smart contract automatically seeds the DEX pool and burns the LP tokens, removing manual developer tampering.'
          }
        ],
        assignment: {
          title: 'Bonding Curve Case Study',
          instructions: 'Monitor a token approaching 100% on Pump.fun. Observe the migration event to Raydium and the subsequent 5-minute price action.',
          deliverables: ['Write a 3-sentence summary of the post-migration price reaction.']
        }
      }
    ]
  },

  // ==================== PHASE 04 ====================
  {
    id: 4,
    title: 'PHASE 04 — DEXSCREENER MASTERY',
    subtitle: 'Real-Time Charting, Pair Filtering, and Live Order Flow',
    description: 'Transform DexScreener into a high-precision radar terminal. Learn how to configure custom filters, spot wash trading, analyze maker flows, and triage tokens in seconds.',
    levelRequired: 4,
    badge: 'TRENCH_SCOUT',
    practicalAssignment: {
      title: 'Inspect 30 Newly Launched Tokens',
      description: 'Filter DexScreener for Solana pairs created in the last 6 hours.',
      task: 'Audit 30 tokens and categorize each into PASS, WATCH, or INVESTIGATE with specific criteria notes (Liquidity/MC ratio, maker count, chart structure).'
    },
    quiz: {
      id: 'quiz-04',
      phaseId: 4,
      title: 'Phase 04 Assessment: DexScreener & Order Flow',
      passingScore: 75,
      questions: [
        {
          id: 'q4-1',
          question: 'A token shows $1,500,000 in 24h volume on DexScreener, but only 28 unique makers (traders). What does this indicate?',
          options: [
            'Institutional hedge funds are quietly accumulating',
            'Heavy wash trading / volume bots generating fake turnover to rank on trending lists',
            'The token has zero fees',
            'DexScreener servers are lagging'
          ],
          correctIndex: 1,
          explanation: 'Real volume features thousands of unique makers. When volume is enormous but maker count is tiny, automated scripts are churning the same tokens between a few controlled wallets.',
          type: 'scenario'
        },
        {
          id: 'q4-2',
          question: 'What does the "Dex Boost" or rocket icon next to a token on DexScreener signify?',
          options: [
            'DexScreener has officially audited and verified the token as 100% safe',
            'The developer or a community member paid DexScreener advertising fees to boost the token\'s visual placement on trending feeds',
            'The token is guaranteed to 10x',
            'The liquidity is locked forever'
          ],
          correctIndex: 1,
          explanation: 'Dex Boosts are paid advertisements; anyone can pay for boosts regardless of whether the token is legitimate or a scam.',
          type: 'multiple-choice'
        }
      ]
    },
    lessons: [
      {
        id: 'l4-01',
        phaseId: 4,
        lessonNumber: 1,
        title: 'DexScreener Interface & Custom Layouts',
        difficulty: 'BEGINNER',
        estimatedTime: '20 min',
        objectives: [
          'Configure custom watchlists and multi-chart monitoring grids',
          'Understand real-time price updates, market cap feeds, and liquidity metrics',
          'Use hotkeys and custom layout presets for rapid session monitoring'
        ],
        videos: [VERIFIED_VIDEOS.dexscreenerMastery],
        keyConcepts: ['Multi-Charts', 'Watchlist Management', 'Data Latency', 'Terminal Shortcuts'],
        deepDive: [
          'DexScreener streams raw transaction events directly from Solana RPC nodes via WebSockets.',
          'Configuring your workspace: Place your primary macro chart on 15m, secondary chart on 5m, and keep the live transaction stream visible on the right margin.'
        ],
        realWorldExample: 'A trader monitors 4 high-momentum tokens simultaneously on a 2x2 multi-chart layout, spotting an S/R reclaim on one while the others consolidate.',
        commonMistakes: [
          'Cluttering the screen with 20 indicators (RSI, MACD, Bollinger Bands) on a 1-minute memecoin chart.',
          'Relying solely on mobile screens without access to the desktop order book feed.'
        ],
        checkQuestions: [
          {
            question: 'Why is keeping the live transaction feed open while viewing charts helpful?',
            options: ['It changes the color of your screen', 'It lets you see the actual dollar size of individual buys and sells in real time', 'It reduces slippage', 'It speeds up your internet'],
            correctIndex: 1,
            explanation: 'The transaction feed reveals whether green candles are driven by retail $50 orders or institutional $10,000 market buys.'
          }
        ],
        assignment: {
          title: 'Custom Screener Preset',
          instructions: 'Build a custom multi-chart layout on DexScreener with 4 Solana tokens. Set timeframes to 15m and 5m.',
          deliverables: ['Screenshot or layout description of your 4-chart workspace.']
        }
      },
      {
        id: 'l4-02',
        phaseId: 4,
        lessonNumber: 2,
        title: 'New Pairs vs Trending: Filtering the Noise',
        difficulty: 'INTERMEDIATE',
        estimatedTime: '25 min',
        objectives: [
          'Filter the New Pairs tab: Min Liquidity ($25k+), Min Age (1h+), Max Age (48h)',
          'Differentiate between organic trending and paid Dex Boost manipulation',
          'Execute the 3-second triage rule: Pass, Watch, or Investigate'
        ],
        videos: [VERIFIED_VIDEOS.dexscreenerMastery],
        keyConcepts: ['New Pairs Filtering', 'Dex Boost Advertising', '3-Second Triage', 'Scam Filter Presets'],
        deepDive: [
          'Thousands of tokens launch on Solana every hour. 98% are abandoned within 30 minutes.',
          'If you do not filter, you will drown in noise. Essential Filter: Min Liquidity $30k, Min 24h Volume $50k, Min 100 txns, Age > 1 hour. This instantly eliminates 95% of instant rugs.'
        ],
        realWorldExample: 'A beginner scrolls the unfiltered New Pairs list and buys 5 tokens under 2 minutes old; all 5 lose their liquidity within 10 minutes. An experienced trader filters for pairs older than 2 hours with > $50k liquidity, finding stable setups.',
        commonMistakes: [
          'Buying tokens simply because they have a #1 Trending banner with 200 paid boosts.',
          'Trading pairs less than 5 minutes old without sniper protection.'
        ],
        checkQuestions: [
          {
            question: 'Why should beginner and intermediate traders filter out tokens less than 30 minutes old?',
            options: ['Because Solana bans new tokens', 'Because the vast majority of micro-cap launches are sniped or abandoned before finding an organic price floor', 'Because DexScreener does not show new tokens', 'Because gas fees are 100x higher'],
            correctIndex: 1,
            explanation: 'The first 30 minutes of a token launch carry extreme volatility from snipers and initial dumpers.'
          }
        ],
        assignment: {
          title: 'Filter Setup Exercise',
          instructions: 'Apply the TRENCHLAB filter preset on DexScreener: Min Liquidity $40k, Min 5m Volume $5k, Age > 2h. Note how many tokens pass.',
          deliverables: ['Submit the list of the top 3 tokens that survived the filter.']
        }
      }
    ]
  },

  // ==================== PHASE 05 ====================
  {
    id: 5,
    title: 'PHASE 05 — BIRDEYE ANALYTICS',
    subtitle: 'Deep Statistical Profiling, Unique Traders, and Token Flows',
    description: 'Go beyond basic charts. Use Birdeye to inspect organic holder growth curves, analyze buyer-to-seller ratios, detect smart money accumulations, and verify net liquidity flows.',
    levelRequired: 4,
    badge: 'DATA_ANALYST',
    practicalAssignment: {
      title: 'Compare 10 Tokens for Organic Activity',
      description: 'Audit 10 Solana tokens using Birdeye trader metrics.',
      task: 'Compare buyer/seller ratios, net capital flow over 24 hours, and unique trader counts. Classify which tokens exhibit healthy organic accumulation versus artificial wash activity.'
    },
    quiz: {
      id: 'quiz-05',
      phaseId: 5,
      title: 'Phase 05 Assessment: Birdeye Metrics & Flow',
      passingScore: 75,
      questions: [
        {
          id: 'q5-1',
          question: 'On Birdeye, what does a persistent Net Flow of +$250,000 over 24 hours indicate?',
          options: [
            'More dollar value of tokens has been purchased than sold across the period, showing net capital accumulation',
            'The developer took out a loan',
            'The token has reached all-time high',
            'All trades were wash trades'
          ],
          correctIndex: 0,
          explanation: 'Net Flow = Total Buy Volume ($) minus Total Sell Volume ($). Positive net flow confirms sustained capital inflow into the token.',
          type: 'multiple-choice'
        }
      ]
    },
    lessons: [
      {
        id: 'l5-01',
        phaseId: 5,
        lessonNumber: 1,
        title: 'Birdeye Overview & Statistical Edge',
        difficulty: 'INTERMEDIATE',
        estimatedTime: '20 min',
        objectives: [
          'Navigate Birdeye’s overview, trader analytics, and security tabs',
          'Read Net Buy/Sell volume and unique wallet metrics',
          'Track top trader PnL performance on individual token pairs'
        ],
        videos: [VERIFIED_VIDEOS.birdeyeAnalytics],
        keyConcepts: ['Net Flow', 'Trader Leaderboards', 'Holder Growth Curves', 'Security Audits'],
        deepDive: [
          'Birdeye aggregates on-chain data to show net capital movement: is money actually staying in the token, or are people buying and immediately dumping?',
          'The Holder Growth graph reveals whether community adoption is expanding organically or stagnating.'
        ],
        realWorldExample: 'Price is moving sideways on DexScreener. On Birdeye, the trader count has grown from 800 to 2,400 over 6 hours, and Net Flow is strongly positive. This reveals stealth accumulation before a breakout.',
        commonMistakes: [
          'Looking only at price candles while ignoring net holder accumulation metrics.',
          'Assuming high volume means high holder growth (often it is just bots trading back and forth).'
        ],
        checkQuestions: [
          {
            question: 'What does a rising holder count during a price consolidation usually suggest?',
            options: ['The token is dying', 'Healthy organic token distribution and accumulation across a wider user base', 'Developers are dumping', 'Validators are freezing accounts'],
            correctIndex: 1,
            explanation: 'Expanding holder counts during flat price action indicates healthy redistribution from early snipers to new retail holders.'
          }
        ],
        assignment: {
          title: 'Birdeye Token Flow Audit',
          instructions: 'Audit a trending token on Birdeye. Check the 24h Net Flow, total holders, and top 5 trader PnL.',
          deliverables: ['Write a 1-paragraph summary of the token’s accumulation health.']
        }
      }
    ]
  },

  // ==================== PHASE 06 ====================
  {
    id: 6,
    title: 'PHASE 06 — TOKEN SAFETY & RUG DETECTION',
    subtitle: 'Forensic Smart Contract Auditing and Deception Detection',
    description: 'Learn how to protect your capital from predatory scams. Master checking Mint Authority, Freeze Authority, LP burns, top holder clustering on Bubblemaps, and bundled insider snipers.',
    levelRequired: 5,
    badge: 'ON_CHAIN_AUDITOR',
    practicalAssignment: {
      title: 'Perform a Complete 10-Point Safety Audit on 10 Tokens',
      description: 'Audit 10 newly launched tokens using Solscan and Bubblemaps.',
      task: 'Check Mint Authority, Freeze Authority, LP Burn %, Top 10 Holder %, Dev holding %, and Bubblemaps cluster connections. Produce a pass/fail scorecard for each.'
    },
    quiz: {
      id: 'quiz-06',
      phaseId: 6,
      title: 'Phase 06 Assessment: Rug Detection & Forensic Auditing',
      passingScore: 75,
      questions: [
        {
          id: 'q6-1',
          question: 'If Solscan reports that a token has "Mint Authority: Active (Not Revoked)", what is the risk?',
          options: [
            'There is no risk; all tokens have mint authority',
            'The creator can mint unlimited new tokens at any moment and dump them into the liquidity pool, stealing all funds',
            'The token will trade faster',
            'The token can only be bought on Coinbase'
          ],
          correctIndex: 1,
          explanation: 'Active mint authority allows the creator to generate unlimited tokens from nothing and drain the pool reserves.',
          type: 'scenario'
        },
        {
          id: 'q6-2',
          question: 'What is the purpose of inspecting a token on Bubblemaps?',
          options: [
            'To see which color bubbles look best',
            'To visually detect whether multiple top wallets are secretly connected and funded by the same deployer address',
            'To calculate your tax returns',
            'To stake tokens for yield'
          ],
          correctIndex: 1,
          explanation: 'Bubblemaps identifies on-chain funding clusters, exposing when 30 seemingly different wallets are actually controlled by one insider entity.',
          type: 'multiple-choice'
        }
      ]
    },
    lessons: [
      {
        id: 'l6-01',
        phaseId: 6,
        lessonNumber: 1,
        title: 'Mint Authority & Freeze Authority: The Non-Negotiables',
        difficulty: 'BEGINNER',
        estimatedTime: '20 min',
        objectives: [
          'Verify SPL token authorities on Solscan and RugCheck',
          'Understand how active freeze authority turns any token into a honeypot',
          'Establish the TRENCHLAB Rule: Zero tolerance for unrevoked authorities'
        ],
        videos: [VERIFIED_VIDEOS.bubblemapsAudit],
        keyConcepts: ['Mint Authority', 'Freeze Authority', 'Honeypot Logic', 'Revocation Signatures'],
        deepDive: [
          'On Solana, SPL tokens have two critical administrative authorities: Mint and Freeze.',
          'Mint Authority: Allows printing more supply. Must be revoked (`null`).',
          'Freeze Authority: Allows freezing specific holder accounts, preventing them from selling while the creator unloads. Must be revoked (`null`).',
          'Never make an exception. If either authority is active, pass immediately.'
        ],
        realWorldExample: 'A hyped token pumps 500%. Buyers try to take profit, but every sell transaction reverts with `Error: Account is frozen`. The developer left Freeze Authority active and froze all non-whitelisted wallets before pulling liquidity.',
        commonMistakes: [
          'Believing a developer who promises "I will revoke mint authority after we hit $1M market cap."',
          'Assuming DexScreener flags 100% of malicious smart contracts automatically.'
        ],
        checkQuestions: [
          {
            question: 'What should an on-chain trader do if a memecoin has an active Freeze Authority?',
            options: ['Buy a small position', 'Pass immediately; active freeze authority means the dev can freeze your ability to sell at any time', 'Wait for 10x gains', 'Message the dev on Discord'],
            correctIndex: 1,
            explanation: 'Active freeze authority represents total counterparty risk of being honeypotted.'
          }
        ],
        assignment: {
          title: 'Authority Verification Drill',
          instructions: 'Look up 3 random tokens on Solscan. Find the "Token Authority" section and check both Mint Authority and Freeze Authority.',
          deliverables: ['Screenshot or note the authority status (Revoked vs Active) for all 3.']
        }
      },
      {
        id: 'l6-02',
        phaseId: 6,
        lessonNumber: 2,
        title: 'Bubblemaps & Clustered Insider Wallets',
        difficulty: 'ADVANCED',
        estimatedTime: '30 min',
        objectives: [
          'Read Bubblemaps cluster graphs to detect hidden supply concentration',
          'Identify Jito bundle launches where one actor funds 30 fresh wallets in block 0',
          'Calculate true insider control percentage beyond standard top-10 lists'
        ],
        videos: [VERIFIED_VIDEOS.bubblemapsAudit],
        keyConcepts: ['Cluster Analysis', 'Root Funding Addresses', 'Bundle Sniping', 'True Distribution'],
        deepDive: [
          'Developers know that traders check top 10 holders on Solscan. To bypass this, malicious teams use bundling scripts to split 60% of the supply across 40 different wallets with 1.5% each.',
          'On Solscan, it looks like no single holder owns more than 1.5%.',
          'Bubblemaps connects the dots: it traces transaction history back to the parent wallet that funded all 40 wallets with SOL before launch, visually linking them into a single massive bubble cluster.'
        ],
        realWorldExample: 'A token appears to have clean distribution with the top holder owning only 2%. On Bubblemaps, 25 top wallets are connected by green lines to a single Binance withdrawal account. Total insider control is 58%. The token dumps 80% two hours later.',
        commonMistakes: [
          'Looking only at individual holder percentages without checking if they share a common funding source.',
          'Ignoring cluster warnings when the price chart looks bullish.'
        ],
        checkQuestions: [
          {
            question: 'Why do sophisticated rug-pullers split their token supply across 30 separate wallets?',
            options: ['To pay less gas', 'To trick basic scanners into thinking the token has decentralized distribution', 'Because Solana limits wallet capacity', 'To qualify for airdrops'],
            correctIndex: 1,
            explanation: 'Splitting supply makes holder concentration appear low on surface-level explorers while keeping control in the hands of one team.'
          }
        ],
        assignment: {
          title: 'Bubblemaps Cluster Investigation',
          instructions: 'Input a trending token mint address into Bubblemaps (bubblemaps.io). Inspect the cluster percentage and note any large interconnected webs.',
          deliverables: ['Record the token ticker, cluster percentage, and your safety determination.']
        }
      }
    ]
  },

  // ==================== PHASE 07 ====================
  {
    id: 7,
    title: 'PHASE 07 — WALLET INTELLIGENCE',
    subtitle: 'Tracking Smart Money, Auditing PnL, and Copy-Trading Hazards',
    description: 'Learn how to read raw wallet histories like a forensic investigator. Audit historical win rates, distinguish real smart money from bait wallets, and understand the catastrophic risks of automated copy-trading.',
    levelRequired: 5,
    badge: 'WALLET_TRACKER',
    practicalAssignment: {
      title: 'Track 10 Wallets for 7 Days',
      description: 'Find 10 high-performing trader wallets using GMGN or Birdeye leaderboards.',
      task: 'Record their entries, exits, holding durations, and win rates across 7 days. Document whether their trades were front-run by bots and determine whether their edge is reproducible.'
    },
    quiz: {
      id: 'quiz-07',
      phaseId: 7,
      title: 'Phase 07 Assessment: Wallet Intelligence & Copy-Trading',
      passingScore: 75,
      questions: [
        {
          id: 'q7-1',
          question: 'Why does automated copy-trading often result in severe losses even when copying a profitable wallet?',
          options: [
            'Because the copy-trading bot buys after the leader, pushes price higher with slippage, and gets dumped on when the leader exits first',
            'Because Solana does not allow copying trades',
            'Because profitable traders have lower gas fees',
            'Because all wallets are public'
          ],
          correctIndex: 0,
          explanation: 'Copy-traders face execution lag and adverse selection: smart money buys first, copy-traders inflate the price, and smart money uses copy-trader volume as exit liquidity.',
          type: 'scenario'
        }
      ]
    },
    lessons: [
      {
        id: 'l7-01',
        phaseId: 7,
        lessonNumber: 1,
        title: 'Reading Raw Wallets & PnL Audits',
        difficulty: 'INTERMEDIATE',
        estimatedTime: '25 min',
        objectives: [
          'Inspect transaction histories and realized vs unrealized PnL on GMGN and Solscan',
          'Filter out lucky one-hit-wonder wallets from consistent systematic traders',
          'Understand how insiders disguise their sell-offs using intermediary wash wallets'
        ],
        videos: [VERIFIED_VIDEOS.bubblemapsAudit],
        keyConcepts: ['Realized vs Unrealized PnL', 'Win Rate vs Expectancy', 'Holding Duration', 'Wallet Clustering'],
        deepDive: [
          'A wallet showing $1,000,000 in PnL might just be a developer who bought 100% of their own scam coin at $0.00001 and never actually extracted real liquidity.',
          'Always audit Realized PnL: did they actually swap their tokens back into SOL or USDC, or are they holding illiquid paper tokens?'
        ],
        realWorldExample: 'A wallet shows a 90% win rate on GMGN, but deeper inspection reveals the trader holds 40 dead tokens down -99% that were never sold, masking their true net negative performance.',
        commonMistakes: [
          'Copying wallets based solely on a high win rate percentage without inspecting trade count or average loss size.',
          'Assuming past wallet performance guarantees future profitability.'
        ],
        checkQuestions: [
          {
            question: 'Why is Realized PnL far more important than Unrealized PnL when auditing a trader\'s wallet?',
            options: ['Realized PnL has lower taxes', 'Unrealized gains on illiquid memecoins cannot always be cashed out into real SOL without collapsing the pool', 'DexScreener only tracks realized PnL', 'Unrealized PnL is fake money'],
            correctIndex: 1,
            explanation: 'Paper gains in thin liquidity pools frequently vanish upon selling; realized gains represent verified extracted profit.'
          }
        ],
        assignment: {
          title: 'Wallet Audit Breakdown',
          instructions: 'Audit a top trader wallet on GMGN.ai. Calculate their average hold duration, win rate over their last 20 trades, and total realized SOL profit.',
          deliverables: ['Submit a 4-bullet audit dossier on the wallet’s trading behavior.']
        }
      }
    ]
  },

  // ==================== PHASE 08 ====================
  {
    id: 8,
    title: 'PHASE 08 — VOLUME & ORGANIC DEMAND',
    subtitle: 'Volume Acceleration, Buy/Sell Flow, and Anomaly Detection',
    description: 'Learn how to detect real organic accumulation before price expands. Deconstruct volume spikes, buyer-seller ratios, bot wash trading, and volume anomalies across the chart.',
    levelRequired: 6,
    badge: 'FLOW_SPECIALIST',
    practicalAssignment: {
      title: 'Study What Happened BEFORE 10 Major Moves',
      description: 'Find 10 Solana memecoins that achieved major 3x+ moves in the last month.',
      task: 'Examine the 1-hour and 4-hour periods immediately preceding each expansion. Document the volume behavior, unique maker count, and price volatility contraction.'
    },
    quiz: {
      id: 'quiz-08',
      phaseId: 8,
      title: 'Phase 08 Assessment: Volume Mechanics & Organic Demand',
      passingScore: 75,
      questions: [
        {
          id: 'q8-1',
          question: 'What is Volume Acceleration?',
          options: [
            'Volume increasing at an exponential rate candle-over-candle while price begins breaking out of a tight consolidation base',
            'Volume decreasing to zero',
            'Gas fees doubling every minute',
            'A sudden drop in market cap'
          ],
          correctIndex: 0,
          explanation: 'Volume acceleration signals that aggressive market orders are overwhelming resting limit orders, confirming that real capital is fueling the price movement.',
          type: 'multiple-choice'
        }
      ]
    },
    lessons: [
      {
        id: 'l8-01',
        phaseId: 8,
        lessonNumber: 1,
        title: 'Raw Volume vs Volume Acceleration',
        difficulty: 'INTERMEDIATE',
        estimatedTime: '20 min',
        objectives: [
          'Measure Relative Volume (RVOL) against historical baseline averages',
          'Detect Volume Acceleration during base consolidations',
          'Avoid entering into high-volume exhaustion climax candles'
        ],
        videos: [VERIFIED_VIDEOS.candlesticks],
        keyConcepts: ['Relative Volume (RVOL)', 'Volume Acceleration', 'Exhaustion Climax', 'Baseline Averages'],
        deepDive: [
          'High raw volume alone means nothing if it is occurring after a 10x run (that is distribution/selling).',
          'Volume Acceleration is most potent when it occurs at the BOTTOM or EXIT of a tight consolidation range, confirming the beginning of an accumulation markup cycle.'
        ],
        realWorldExample: 'A token consolidates for 4 hours with $5k volume per 15m candle. Suddenly, a candle records $45k volume with price closing near its high. This 9x volume acceleration marks the start of a clean 150% expansion.',
        commonMistakes: [
          'Buying the largest volume candle of the entire day after price has already quadrupled.',
          'Ignoring volume dry-ups during pullbacks (which are actually bullish consolidation signs).'
        ],
        checkQuestions: [
          {
            question: 'When is a volume surge most bullish?',
            options: ['At the end of a 10-candle parabolic run', 'At the breakout from a prolonged horizontal consolidation range', 'When the pool has zero liquidity', 'During an exchange maintenance window'],
            correctIndex: 1,
            explanation: 'Breakout volume out of a base proves that buyers are committing capital to shift the market into an expansion phase.'
          }
        ],
        assignment: {
          title: 'Volume Pre-Move Audit',
          instructions: 'Find a chart with a completed 2x move. Measure the 15m volume 3 candles before the move vs 3 candles during the move.',
          deliverables: ['Document the volume multiple and entry trigger.']
        }
      }
    ]
  },

  // ==================== PHASE 09 ====================
  {
    id: 9,
    title: 'PHASE 09 — MEMECOIN ENTRY STRATEGIES',
    subtitle: 'Systematic Playbooks: Setups, Triggers, Invalidation & Risk',
    description: 'Stop chasing green candles impulsively. Master 10 proven trading playbooks: Early Momentum, Breakout Entry, Pullback Entry, Reclaim Entry, and Consolidation Breakouts. Every strategy includes strict Invalidation logic.',
    levelRequired: 6,
    badge: 'STRATEGIST',
    practicalAssignment: {
      title: 'Execute and Journal 5 Systematic Setups',
      description: 'Identify 5 live setups on Solana tokens strictly matching one of the 10 TRENCHLAB playbooks.',
      task: 'For each setup document: SETUP, TRIGGER, CONFIRMATION, INVALIDATION, RISK, and OUTCOME in your trade journal.'
    },
    quiz: {
      id: 'quiz-09',
      phaseId: 9,
      title: 'Phase 09 Assessment: Entry Playbooks & Invalidation',
      passingScore: 75,
      questions: [
        {
          id: 'q9-1',
          question: 'Why must every single trade setup have a pre-defined "Invalidation" point before clicking buy?',
          options: [
            'Because the exchange requires it to process transactions',
            'Because knowing the exact price where your thesis is proven wrong eliminates emotional decision-making and prevents catastrophic bag-holding',
            'To increase token market cap',
            'Because stop losses are illegal on Solana'
          ],
          correctIndex: 1,
          explanation: 'If you do not know where you are wrong before you enter, you will hold all the way to zero when the market turns against you.',
          type: 'scenario'
        },
        {
          id: 'q9-2',
          question: 'In the "Pullback Entry" strategy, what serves as the entry trigger?',
          options: [
            'Buying as fast as possible as price falls off a cliff',
            'Price retracing into a prior S/R flip zone and printing a bullish reversal candle (e.g. hammer or absorption wick) with declining sell volume',
            'A random tweet from a crypto influencer',
            'When slippage hits 50%'
          ],
          correctIndex: 1,
          explanation: 'Pullback entries require both a confluence zone (prior resistance acting as support) and price action confirmation that sellers have exhausted.'
          ,
          type: 'multiple-choice'
        }
      ]
    },
    lessons: [
      {
        id: 'l9-01',
        phaseId: 9,
        lessonNumber: 1,
        title: 'Strategy 01: The Pullback & S/R Re-Test Entry',
        difficulty: 'INTERMEDIATE',
        estimatedTime: '25 min',
        objectives: [
          'SETUP: Identify an aggressive breakout that creates a new swing high',
          'TRIGGER: Wait for price to retrace into the prior broken resistance zone',
          'CONFIRMATION: Lower-wick rejection candle on 5m with declining sell volume',
          'INVALIDATION: Candle body close below the S/R support zone',
          'RISK: Defined 5% to 8% distance from entry to invalidation'
        ],
        videos: [VERIFIED_VIDEOS.supportResistance],
        keyConcepts: ['S/R Flip Retest', 'Exhaustion Retracement', 'Fibonacci Confluence', 'Defined Risk Distance'],
        deepDive: [
          'Never chase the breakout candle. When a token surges 50%, amateur retail buys the top in FOMO, while smart traders wait for the inevitable profit-taking pullback.',
          'When price returns to retest the previous resistance level, old sellers who missed the move step in as new buyers, creating a high-probability bounce with a tight stop.'
        ],
        realWorldExample: 'Resistance was at $0.050. Price breaks out to $0.068. The trader does nothing. Over the next 45 minutes, price pulls back calmly to $0.051 on declining volume. A 5m hammer candle prints. Trader enters at $0.052 with stop loss at $0.048. Price resumes upward to $0.080.',
        commonMistakes: [
          'Buying the top of the breakout at $0.068 and getting stopped out on the normal healthy pullback to $0.051.',
          'Not respecting invalidation if price slices straight through $0.050 with heavy selling volume.'
        ],
        checkQuestions: [
          {
            question: 'What is the primary advantage of the Pullback Entry over chasing breakouts?',
            options: ['You always get a 10x return', 'You get a much tighter invalidation distance, dramatically improving your Risk-to-Reward ratio', 'You don\'t pay network gas fees', 'The token developer guarantees no rugs'],
            correctIndex: 1,
            explanation: 'Entering near support gives you a tight stop loss, allowing you to risk 1 unit to make 3 to 5 units.'
          }
        ],
        assignment: {
          title: 'Pullback Strategy Blueprint',
          instructions: 'Find a chart displaying a clean S/R retest entry. Document all 7 components: SETUP, TRIGGER, CONFIRMATION, INVALIDATION, RISK, EXAMPLE, and COMMON MISTAKES.',
          deliverables: ['Complete written blueprint in your trading notes.']
        }
      },
      {
        id: 'l9-02',
        phaseId: 9,
        lessonNumber: 2,
        title: 'Strategy 02: The Support Reclaim (Liquidity Sweep Entry)',
        difficulty: 'ADVANCED',
        estimatedTime: '25 min',
        objectives: [
          'SETUP: Obvious horizontal support level that retail traders have marked',
          'TRIGGER: Price flashes below support, sweeping retail stop orders, and aggressively snaps back inside',
          'CONFIRMATION: 5m candle closes back ABOVE the broken support level',
          'INVALIDATION: Immediate break below the lowest point of the sweep wick',
          'RISK: Extremely tight 3% to 6% risk'
        ],
        videos: [VERIFIED_VIDEOS.supportResistance],
        keyConcepts: ['Liquidity Sweep', 'Retail Trap Absorption', 'Reclaim Validation', 'Asymmetric R:R'],
        deepDive: [
          'When everyone expects support to hold, market makers frequently drive price through it to generate liquidity.',
          'If the breakdown was real, price will continue downward. If the breakdown was a fakeout / trap, price will immediately reclaim the level.',
          'Entering on the reclaim offers the highest mathematical expectancy in memecoin trading.'
        ],
        realWorldExample: 'A popular memecoin tests $0.10 three times. On the fourth test, price plunges to $0.091, triggering thousands of panic stop-market sells. Two minutes later, an aggressive buyer absorbs the entire order book and the 5m candle closes at $0.103. Trader enters at $0.104 with stop at $0.090. Target is previous high at $0.135 (3:1 R:R).',
        commonMistakes: [
          'Entering while the candle is still below support before the reclaim is confirmed by a close.',
          'Moving your stop loss lower when the sweep wick gets retested.'
        ],
        checkQuestions: [
          {
            question: 'Where must your hard invalidation stop be placed on a Reclaim setup?',
            options: ['10% below your entry price', 'Just below the lowest point of the liquidity sweep wick', 'At zero', 'In your head without writing it down'],
            correctIndex: 1,
            explanation: 'If price breaks below the sweep wick, the reclaim thesis is invalidated and aggressive continuation downward is imminent.'
          }
        ],
        assignment: {
          title: 'Reclaim Setup Logging',
          instructions: 'Log a real-world Reclaim trade setup on DexScreener. Calculate exact risk distance and potential reward to the next resistance zone.',
          deliverables: ['Submit entry price, invalidation price, target price, and R:R ratio.']
        }
      }
    ]
  },

  // ==================== PHASE 10 ====================
  {
    id: 10,
    title: 'PHASE 10 — RISK MANAGEMENT',
    subtitle: 'Capital Preservation, Position Sizing Math, and Ruin Prevention',
    description: 'The single differentiator between traders who survive and traders who blow up their accounts. Master mathematical position sizing, maximum daily loss limits, and our interactive Position Calculator.',
    levelRequired: 7,
    badge: 'RISK_OFFICER',
    practicalAssignment: {
      title: 'Configure Your Personal Risk Rulebook',
      description: 'Draft your binding risk parameters.',
      task: 'Define: (1) Total Trading Bankroll, (2) Max Risk Per Trade (e.g. 1.5%), (3) Max Daily Loss limit (e.g. 4%), (4) Max Open Positions, and (5) The exact criteria that forces you to walk away for 24 hours.'
    },
    quiz: {
      id: 'quiz-10',
      phaseId: 10,
      title: 'Phase 10 Assessment: Position Sizing & Capital Preservation',
      passingScore: 75,
      questions: [
        {
          id: 'q10-1',
          question: 'If your trading account has $5,000, and you decide to risk 2% of your capital per trade, what is your maximum allowed DOLLAR RISK on any single trade?',
          options: ['$50', '$100', '$500', '$1,000'],
          correctIndex: 1,
          explanation: '$5,000 × 0.02 = $100. Regardless of position size, if your stop loss is hit, your total loss must never exceed $100.',
          type: 'multiple-choice'
        },
        {
          id: 'q10-2',
          question: 'You want to buy a token at $1.00 with a stop loss at $0.80 (a 20% distance to stop). Your maximum dollar risk is $100. What is your correct POSITION SIZE in dollars?',
          options: [
            '$100',
            '$500',
            '$1,000',
            '$5,000'
          ],
          correctIndex: 1,
          explanation: 'Position Size = Dollar Risk / Stop Loss % = $100 / 0.20 = $500. If you buy $500 of the token and it drops 20% to $0.80, you lose exactly your $100 budget.',
          type: 'scenario'
        },
        {
          id: 'q10-3',
          question: 'What is the mathematical consequence of suffering a 50% drawdown on your trading portfolio?',
          options: [
            'You need a 50% gain to get back to breakeven',
            'You need a 100% gain (doubling your remaining money) just to break even',
            'You are automatically banned from the DEX',
            'Your risk increases by 2x'
          ],
          correctIndex: 1,
          explanation: 'If $10,000 drops 50% to $5,000, you now need $5,000 to gain 100% (+$5,000) just to recover your original starting capital. Asymmetric downside destroys accounts.',
          type: 'scenario'
        }
      ]
    },
    lessons: [
      {
        id: 'l1-10-01',
        phaseId: 10,
        lessonNumber: 1,
        title: 'The Math of Ruin: Why 1% Risk Saves Careers',
        difficulty: 'INTERMEDIATE',
        estimatedTime: '25 min',
        objectives: [
          'Understand drawdowns and the non-linear recovery math',
          'Calculate risk per trade based on account equity (1% - 2% standard)',
          'Eliminate the "all-in" gambling mindset from on-chain trading'
        ],
        videos: [VERIFIED_VIDEOS.positionSizing],
        keyConcepts: ['Risk of Ruin', 'Drawdown Recovery Table', 'Fixed Fractional Sizing', 'Capital Defense'],
        deepDive: [
          'A trader risking 20% per trade will blow up their account after 5 consecutive losses. In high-variance memecoin markets, 5 consecutive losses happen regularly.',
          'A trader risking 1.5% per trade can endure a 10-trade losing streak and still retain 86% of their capital, easily recovering on their next solid trends.',
          'Rule 1 of TRENCHLAB: Your primary job is not to make money; it is to protect your chips so you can play tomorrow.'
        ],
        realWorldExample: 'Trader A goes "all in" with $5,000 on three hyped launches; two rug and one dumps 60%. Account is left with $800. Trader B risks $100 per trade using the TRENCHLAB calculator; after 10 trades (4 wins, 6 losses), their account is at $5,350 due to 3:1 R:R discipline.',
        commonMistakes: [
          'Increasing position size after a loss to "make it back quickly" (revenge trading).',
          'Confusing position size (how much you buy) with dollar risk (how much you lose if stopped out).'
        ],
        checkQuestions: [
          {
            question: 'What is the recommended maximum percentage of your total trading bankroll to risk on a single memecoin trade?',
            options: ['1% to 2.5%', '25%', '50%', '100% ("all-in")'],
            correctIndex: 0,
            explanation: '1% to 2.5% provides protection against market variance and bad streaks.'
          }
        ],
        assignment: {
          title: 'Drawdown Math Worksheet',
          instructions: 'Calculate the percentage gain required to recover from: 10% loss, 25% loss, 50% loss, 75% loss, and 90% loss.',
          deliverables: ['Submit your drawdown recovery table in your personal journal.']
        }
      },
      {
        id: 'l10-02',
        phaseId: 10,
        lessonNumber: 2,
        title: 'Interactive Position Sizing Calculator Mastery',
        difficulty: 'INTERMEDIATE',
        estimatedTime: '20 min',
        objectives: [
          'Input Account Size, Risk %, Entry Price, and Stop Loss Price',
          'Calculate exact Dollar Risk, Position Size in USD, and Token Quantities',
          'Verify position size against pool liquidity limits'
        ],
        videos: [VERIFIED_VIDEOS.positionSizing],
        keyConcepts: ['Formula: Position = DollarRisk / DistanceToStop', 'Token Allocation Limits', 'Liquidity Slippage Cap'],
        deepDive: [
          'Formula: `Position Size ($) = (Account Size × Risk %) / ((Entry Price - Stop Loss Price) / Entry Price)`',
          'Never guess your position size. Use our built-in TRENCHLAB calculator before entering any transaction.',
          'If the calculated position size represents more than 10% of the total liquidity pool, cap the position to prevent catastrophic exit slippage.'
        ],
        realWorldExample: 'Account = $10,000. Risk = 1.5% ($150). Entry = $0.20. Stop Loss = $0.17 (15% stop). Calculator outputs: Position Size = $1,000 (5,000 tokens). Potential Loss if stopped = exactly $150.',
        commonMistakes: [
          'Entering fixed $1,000 positions on every trade regardless of whether the stop loss is 5% or 40% away.',
          'Not adjusting position size down when trading wide-stop setups.'
        ],
        checkQuestions: [
          {
            question: 'If your stop loss distance is wide (e.g. 30%), what must happen to your position size to keep dollar risk constant?',
            options: ['Position size must increase', 'Position size must decrease proportionally', 'Position size stays the same', 'You cannot place the trade'],
            correctIndex: 1,
            explanation: 'A wider stop requires a smaller position size to keep your total dollar loss within your budget.'
          }
        ],
        assignment: {
          title: 'Position Calculator Drill',
          instructions: 'Use the interactive TRENCHLAB Position Sizing Calculator in the dashboard to calculate 3 hypothetical trades with 5%, 12%, and 25% stop losses.',
          deliverables: ['Record the inputs and outputs for all 3 scenarios.']
        }
      }
    ]
  },

  // ==================== PHASE 11 ====================
  {
    id: 11,
    title: 'PHASE 11 — PROFIT MANAGEMENT & PSYCHOLOGY',
    subtitle: 'Taking Profit Tiers, Runners, and Emotional Mastery',
    description: 'Transform paper gains into realized bank balances. Master multi-tiered profit targets (TP1, TP2, TP3), managing trailing stops on moonbags, suppressing FOMO, and logging every decision in our Trade Journal.',
    levelRequired: 7,
    badge: 'DISCIPLINE_MASTER',
    practicalAssignment: {
      title: 'Log 5 Complete Trades in the TRENCHLAB Trade Journal',
      description: 'Use the built-in Trade Journal to record 5 detailed trades.',
      task: 'Fill in: Date, Token, Entry, Exit, Position Size, Reason for Entry, Invalidation, TP Plan, Result, Emotion, and What I Learned. Review your emotional state during each trade.'
    },
    quiz: {
      id: 'quiz-11',
      phaseId: 11,
      title: 'Phase 11 Assessment: Profit Taking & Emotional Control',
      passingScore: 75,
      questions: [
        {
          id: 'q11-1',
          question: 'What is the purpose of executing "TP1" (Take Profit 1) to remove initial capital at 2x?',
          options: [
            'To quit trading forever',
            'To secure your original invested capital, rendering the remainder of the position a risk-free "moonbag" / runner',
            'Because the exchange forces you to sell',
            'To lower your slippage'
          ],
          correctIndex: 1,
          explanation: 'Taking out your initial investment eliminates emotional anxiety and prevents winning trades from turning into painful losses.',
          type: 'multiple-choice'
        },
        {
          id: 'q11-2',
          question: 'What is "Revenge Trading"?',
          options: [
            'Trading against a friend',
            'Immediately taking an impulsive, oversized, unplanned trade right after a loss in an emotional attempt to win back lost money',
            'Suing a developer for a rug pull',
            'Shorting a token'
          ],
          correctIndex: 1,
          explanation: 'Revenge trading is an emotional response to loss that regularly leads to catastrophic account wipeouts.'
          ,
          type: 'scenario'
        }
      ]
    },
    lessons: [
      {
        id: 'l11-01',
        phaseId: 11,
        lessonNumber: 1,
        title: 'The Tiered Profit Framework: TP1, TP2, TP3 & Runners',
        difficulty: 'INTERMEDIATE',
        estimatedTime: '25 min',
        objectives: [
          'Execute TP1: Sell 33% - 50% at 1.5x - 2x to take initial capital off the table',
          'Execute TP2: Sell 25% at key higher timeframe resistance',
          'Execute TP3 & Runner: Let 15% - 25% ride with a trailing stop on market structure',
          'Never let a green trade that achieved 2x round-trip back into a loss'
        ],
        videos: [VERIFIED_VIDEOS.positionSizing],
        keyConcepts: ['Tiered Exits', 'De-risking (Initial Back)', 'Trailing Market Structure Stops', 'The Runner Mindset'],
        deepDive: [
          'Memecoins move fast. If you try to sell 100% at the exact top, you will fail 99% of the time and round-trip back down to zero.',
          'The TRENCHLAB Scale-Out Formula: Sell 50% at 2x. Your original investment is back in your wallet. The remaining 50% is pure house money.',
          'Move your stop loss on the remaining tokens to breakeven. You can now hold calmly for potential parabolic extensions without fear.'
        ],
        realWorldExample: 'A trader buys $1,000 of a token at $0.02. Price reaches $0.04 (2x). Trader sells 50% ($1,000 back in SOL). Price subsequently runs to $0.12. Trader scales out 25% at $0.08 and leaves 25% as a moonbag runner. Total profit: $3,500 with zero risk after minute 30.',
        commonMistakes: [
          'Holding 100% of your position greedily waiting for a 100x and watching it crash back to where you bought it.',
          'Selling 100% at 1.2x and feeling emotional regret as the token runs 10x.'
        ],
        checkQuestions: [
          {
            question: 'Why is taking initial investment out at 2x psychologically liberating?',
            options: ['Because you don\'t have to pay taxes', 'Because you now have zero downside risk on the trade, eliminating fear and emotional mistakes', 'Because the token will automatically lock', 'Because trading bots will leave you alone'],
            correctIndex: 1,
            explanation: 'When initial capital is secured, you trade with complete emotional objectivity.'
          }
        ],
        assignment: {
          title: 'Scaling Out Plan',
          instructions: 'Draft an explicit scale-out plan for a $500 position entering at $0.05: calculate dollar amounts and token amounts for TP1 (2x), TP2 (4x), and TP3 (10x).',
          deliverables: ['Submit your mathematical scale-out roadmap.']
        }
      },
      {
        id: 'l11-02',
        phaseId: 11,
        lessonNumber: 2,
        title: 'Trading Psychology: Conquering FOMO, Greed & Revenge',
        difficulty: 'ADVANCED',
        estimatedTime: '30 min',
        objectives: [
          'Recognize physical and cognitive symptoms of FOMO (Fear Of Missing Out)',
          'Implement mandatory 30-minute cooling-off periods after severe losses',
          'Use the TRENCHLAB Trade Journal to audit emotional decision-making patterns'
        ],
        videos: [VERIFIED_VIDEOS.candlesticks],
        keyConcepts: ['FOMO Neutralization', 'Cooling-Off Rule', 'Confirmation Bias', 'Journal Accountability'],
        deepDive: [
          'Your biggest adversary in trading is not the market or the bots—it is your own neurobiology.',
          'When you see a token pumping 400% on Twitter, your brain releases dopamine, driving you to buy the top.',
          'The TRENCHLAB Law of Missed Trades: There will ALWAYS be another trade. Missing a move costs you $0.00. Chasing the top of a move can cost you 100% of your capital.'
        ],
        realWorldExample: 'A trader takes a 15% stop-loss hit. Feeling angry and embarrassed, they immediately open DexScreener, spot a random green candle pumping +80%, and buy with double size. The candle reverses instantly and they lose another 30%. Revenge trading wiped out a month of discipline in 4 minutes.',
        commonMistakes: [
          'Trading while tired, intoxicated, or stressed from outside life events.',
          'Not reviewing your trade journal to identify repetitive behavioral leaks.'
        ],
        checkQuestions: [
          {
            question: 'What is the correct action when you experience emotional tilt or two consecutive losses in a session?',
            options: ['Double your risk on the next trade to get even', 'Close your charts, step away from your computer, and take a mandatory break to reset', 'Drink more coffee and trade faster', 'Ask Telegram what to buy'],
            correctIndex: 1,
            explanation: 'Stepping away halts emotional contagion and prevents revenge trading spirals.'
          }
        ],
        assignment: {
          title: 'Emotional Audit in Journal',
          instructions: 'Review your last 3 trades. In the TRENCHLAB Trade Journal, tag your exact emotional state for each: Disciplined, FOMO, Patient, Anxious, Greedy, or Revenge.',
          deliverables: ['Write a 2-paragraph reflection on what emotional trigger causes your worst trades.']
        }
      }
    ]
  },

  // ==================== PHASE 12 ====================
  {
    id: 12,
    title: 'PHASE 12 — ADVANCED TRENCHLAB & SYSTEM BUILDING',
    subtitle: 'The Full Institutional Framework: Confluence, Classification & Execution',
    description: 'Synthesize everything you have learned into a professional trading system. Execute multi-signal confluence audits, analyze insider bundles, and classify live tokens into PASS, WATCH, or TRADE SETUP.',
    levelRequired: 8,
    badge: 'SYSTEM_BUILDER',
    practicalAssignment: {
      title: 'The TRENCHLAB Capstone: Complete Token Teardown Dossier',
      description: 'Pick a fresh live token and produce a complete 12-point institutional dossier from scratch.',
      task: 'Analyze: (1) Fundamentals, (2) Flow, (3) Distribution, (4) Safety, (5) Narrative, (6) Market Structure, (7) Liquidity, (8) Entry, (9) Invalidation, (10) TP Plan, (11) Risk, and provide your FINAL CLASSIFICATION: PASS, WATCH, or TRADE SETUP.'
    },
    quiz: {
      id: 'quiz-12',
      phaseId: 12,
      title: 'Phase 12 Assessment: System Architecture & Confluence',
      passingScore: 75,
      questions: [
        {
          id: 'q12-1',
          type: 'multiple-choice',
          question: 'Why does TRENCHLAB strictly forbid automated BUY/SELL recommendations, insisting on PASS, WATCH, or TRADE SETUP instead?',
          options: [
            'Because we don\'t have an automated button',
            'Because trading is probabilistic, requiring human contextual analysis of confluence, liquidity, and personal risk parameters; binary buy/sell prompts encourage blind gambling',
            'Because buy recommendations are illegal on the internet',
            'To make quizzes harder'
          ],
          correctIndex: 1,
          explanation: 'True professional trading is about executing your personal edge when conditions align, not blindly clicking based on external signals.'
        },
        {
          id: 'q12-2',
          type: 'multiple-choice',
          question: 'What defines "Multi-Signal Confluence" in the TRENCHLAB system?',
          options: [
            'Having 10 different indicators on your screen',
            'When on-chain safety metrics, market structure support, volume acceleration, and favorable liquidity all independently confirm the same directional thesis',
            'When 5 Twitter accounts tweet the same ticker simultaneously',
            'When price hits all-time high'
          ],
          correctIndex: 1,
          explanation: 'Confluence occurs when independent analytical domains (smart contracts, technical chart structure, order flow) point to the same high-probability outcome.'
        }
      ]
    },
    lessons: [
      {
        id: 'l12-01',
        phaseId: 12,
        lessonNumber: 1,
        title: 'Multi-Signal Confirmation & Confluence Scoring',
        difficulty: 'ADVANCED',
        estimatedTime: '30 min',
        objectives: [
          'Construct a 5-pillar confluence scoring model: Safety + Structure + Flow + Distribution + Narrative',
          'Require minimum confluence thresholds before risking capital',
          'Classify tokens strictly as: PASS, WATCH, or TRADE SETUP'
        ],
        videos: [VERIFIED_VIDEOS.bubblemapsAudit],
        keyConcepts: ['5-Pillar Confluence', 'Threshold Scoring', 'Objective Classification', 'System Discipline'],
        deepDive: [
          'A single signal (e.g. "a whale bought") is never enough to justify a trade.',
          'Pillar 1: Safety (Mint/Freeze revoked, LP burned, no cluster control).',
          'Pillar 2: Structure (Uptrend or S/R reclaim on 15m).',
          'Pillar 3: Flow (Positive Net Flow, Volume acceleration).',
          'Pillar 4: Distribution (Clean Bubblemaps, top 10 under 15%).',
          'Pillar 5: Narrative (Strong cultural hook, active organic community).',
          'If any single safety metric fails: Immediate PASS. If metrics are promising but structure is consolidating: WATCH. If all 5 align with defined invalidation: TRADE SETUP.'
        ],
        realWorldExample: 'A trader screens 50 tokens. 44 are classified as PASS (safety red flags or bad charts). 5 are added to the WATCH list. Only 1 achieves full 5-pillar confluence and triggers a TRADE SETUP. The trader executes with full confidence and zero hesitation.',
        commonMistakes: [
          'Lowering your standards during slow market days and trading low-confluence garbage.',
          'Turning a "WATCH" token into an immediate market buy because of impatience.'
        ],
        checkQuestions: [
          {
            question: 'What is the proper action when a token has an amazing narrative and high volume, but fails the Bubblemaps safety check with 45% insider clustering?',
            options: ['Buy a double-size position', 'Immediate PASS; safety disqualifications override all other positive factors', 'Wait for it to pump 10x', 'Ignore the cluster'],
            correctIndex: 1,
            explanation: 'Capital preservation comes first: safety failures represent catastrophic rug risk regardless of how good the narrative appears.'
          }
        ],
        assignment: {
          title: 'Capstone Dossier Execution',
          instructions: 'Complete the Phase 12 Practical Assignment: Produce a complete 12-point TRENCHLAB Token Teardown Dossier for a live token and classify it as PASS, WATCH, or TRADE SETUP.',
          deliverables: ['Submit the complete dossier in the Capstone submission module.']
        }
      }
    ]
  }
];
