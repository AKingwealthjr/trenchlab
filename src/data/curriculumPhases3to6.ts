import { Phase } from '../types';
import { VERIFIED_VIDEOS } from './videoData';

export const PHASES_3_TO_6: Phase[] = [
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
          question: 'What is the primary operational rule for Phase 03?',
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
        id: 'l3-01',
        phaseId: 3,
        lessonNumber: 1,
        title: "Phantom Wallet Setup & Advanced Security",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Phantom Wallet Setup & Advanced Security in real-world trading environments",
          "Identify key risk factors and signals associated with Phantom Wallet Setup & Advanced Security",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Phantom Wallet Setup & Advanced Security",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Phantom Wallet Setup & Advanced Security is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Phantom Wallet Setup & Advanced Security identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Phantom Wallet Setup & Advanced Security.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Phantom Wallet Setup & Advanced Security?",
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
          title: "Phantom Wallet Setup & Advanced Security Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Phantom Wallet Setup & Advanced Security and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l3-02',
        phaseId: 3,
        lessonNumber: 2,
        title: "Jupiter Aggregator: Best Execution & Dynamic Routing",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Jupiter Aggregator: Best Execution & Dynamic Routing in real-world trading environments",
          "Identify key risk factors and signals associated with Jupiter Aggregator: Best Execution & Dynamic Routing",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Jupiter Aggregator: Best Execution & Dynamic Routing",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Jupiter Aggregator: Best Execution & Dynamic Routing is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Jupiter Aggregator: Best Execution & Dynamic Routing identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Jupiter Aggregator: Best Execution & Dynamic Routing.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Jupiter Aggregator: Best Execution & Dynamic Routing?",
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
          title: "Jupiter Aggregator: Best Execution & Dynamic Routing Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Jupiter Aggregator: Best Execution & Dynamic Routing and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l3-03',
        phaseId: 3,
        lessonNumber: 3,
        title: "Raydium & AMM Liquidity Mechanics",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Raydium & AMM Liquidity Mechanics in real-world trading environments",
          "Identify key risk factors and signals associated with Raydium & AMM Liquidity Mechanics",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Raydium & AMM Liquidity Mechanics",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Raydium & AMM Liquidity Mechanics is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Raydium & AMM Liquidity Mechanics identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Raydium & AMM Liquidity Mechanics.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Raydium & AMM Liquidity Mechanics?",
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
          title: "Raydium & AMM Liquidity Mechanics Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Raydium & AMM Liquidity Mechanics and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l3-04',
        phaseId: 3,
        lessonNumber: 4,
        title: "Pump.fun & Bonding Curves Explained",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Pump.fun & Bonding Curves Explained in real-world trading environments",
          "Identify key risk factors and signals associated with Pump.fun & Bonding Curves Explained",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Pump.fun & Bonding Curves Explained",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Pump.fun & Bonding Curves Explained is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Pump.fun & Bonding Curves Explained identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Pump.fun & Bonding Curves Explained.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Pump.fun & Bonding Curves Explained?",
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
          title: "Pump.fun & Bonding Curves Explained Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Pump.fun & Bonding Curves Explained and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l3-05',
        phaseId: 3,
        lessonNumber: 5,
        title: "Priority Fees & Jito Tip Bundles on Solana",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Understand how validator compute unit limits dictate transaction landing speed",
          "Configure dynamic priority fees in Phantom and third-party routers",
          "Understand Jito tip bundles and how snipers secure first-block inclusion"
],
        videos: [],
        keyConcepts: [
          "Priority Fees",
          "Compute Units (CU)",
          "Jito Tip Bundles",
          "Mev Bribes"
],
        deepDive: [
          "During extreme network congestion or high-volatility launches, the standard 0.000005 SOL base fee is not enough to guarantee block inclusion.",
          "Solana validators order transactions based on Priority Fee per Compute Unit (micro-lamports). If your compute budget is too low, validators simply drop the packet.",
          "Jito bundles allow traders to package a transaction directly with an upfront tip paid to the leader validator, bypassing public mempool front-running."
],
        realWorldExample: "During a hyped token migration to Raydium, retail swaps with standard fees fail repeatedly for 3 minutes while price doubles. An operator with dynamic priority fees and a 0.005 SOL Jito tip lands on the first block at the base price.",
        commonMistakes: [
          "Setting fixed priority fees too low during breaking viral news events.",
          "Overpaying priority fees on microscopic trades, causing fee bleed."
],
        checkQuestions: [
          {
  "question": "What is the primary function of a Jito tip bundle on Solana?",
  "options": [
    "To bypass gas fees entirely",
    "To deliver private, atomic transaction bundles directly to validators with tip incentives",
    "To reverse failed transactions",
    "To buy tokens before they are minted"
  ],
  "correctIndex": 1,
  "explanation": "Jito bundles send transactions directly to Jito-Solana validators off the public peer-to-peer gossip network, preventing front-running and ensuring atomic inclusion."
}
        ],
        assignment: {
          title: "Priority Fees & Jito Tip Bundles on Solana Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Priority Fees & Jito Tip Bundles on Solana and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l3-06',
        phaseId: 3,
        lessonNumber: 6,
        title: "RPC Nodes: Public vs Dedicated Private Endpoints",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '18 min',
        objectives: [
          "Understand how Remote Procedure Call (RPC) nodes mediate between wallet and blockchain",
          "Identify the limitations and rate-limits of public RPC endpoints",
          "Set up custom dedicated RPC providers (Helius, QuickNode, Triton) for low latency"
],
        videos: [],
        keyConcepts: [
          "RPC Node",
          "Rate Limiting",
          "Public vs Private Endpoints",
          "Sub-Second Latency"
],
        deepDive: [
          "Every time you check balances or broadcast a swap, your wallet contacts an RPC node. Public endpoints provided by Phantom or default networks are heavily throttled and rate-limited.",
          "During high-traffic memecoin runs, public RPCs return 429 Too Many Requests errors, showing stale prices and dropping swap submissions.",
          "Connecting a private RPC endpoint gives you dedicated bandwidth, immediate transaction propagation, and websockets that update balance changes in milliseconds."
],
        realWorldExample: "A trader on default public RPC sees a pump 8 seconds late and their buy transaction drops due to rate limiting. Another trader using a dedicated Helius RPC catches the exact tick and fills cleanly.",
        commonMistakes: [
          "Relying on overloaded public RPCs for volatile low-cap executions.",
          "Exposing private RPC API keys in public GitHub repositories."
],
        checkQuestions: [
          {
  "question": "What error commonly indicates that your wallet is using an overloaded public RPC node?",
  "options": [
    "404 Not Found",
    "429 Too Many Requests / Rate Limit Exceeded",
    "500 Internal Blockchain Fault",
    "200 OK"
  ],
  "correctIndex": 1,
  "explanation": "HTTP 429 status code indicates that the public RPC provider has throttled your requests due to excessive traffic."
}
        ],
        assignment: {
          title: "RPC Nodes: Public vs Dedicated Private Endpoints Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of RPC Nodes: Public vs Dedicated Private Endpoints and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l3-07',
        phaseId: 3,
        lessonNumber: 7,
        title: "Solana Explorer & Solscan: Auditing On-Chain Signatures",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '20 min',
        objectives: [
          "Navigate transaction logs and program invocations on Solscan",
          "Decode inner instructions to verify actual token transfers and fee deductions",
          "Confirm transaction finality and slot confirmation states"
],
        videos: [],
        keyConcepts: [
          "Solscan",
          "Program Invocations",
          "Inner Instructions",
          "Transaction Signatures"
],
        deepDive: [
          "Solscan is the ultimate truth terminal for Solana. User interfaces on DEXs can lag or show erroneous data, but raw on-chain signatures never lie.",
          "By inspecting a transaction signature, you can verify which program was invoked (e.g. Raydium AMM, Jupiter, Token Program) and the exact amounts transferred.",
          "Inner instruction inspection reveals hidden fees, routing intermediaries, and exact token balances credited to your Associated Token Account."
],
        realWorldExample: "A swap appears to fail in a DEX UI with a red banner. The trader checks the transaction signature on Solscan and discovers the swap actually confirmed in the block with zero slippage error.",
        commonMistakes: [
          "Panicking when a frontend UI hangs without checking the transaction signature on Solscan.",
          "Not verifying whether a token transfer actually hit the correct recipient wallet."
],
        checkQuestions: [
          {
  "question": "What confirms that a transaction on Solana is permanently irreversible?",
  "options": [
    "Frontend confirmation toast",
    "Finalized commitment status on Solscan",
    "Telegram notification bot",
    "Estimated time counter"
  ],
  "correctIndex": 1,
  "explanation": "Once a transaction reaches \"Finalized\" commitment (voted on by a supermajority of the validator cluster), it is cryptographically permanent."
}
        ],
        assignment: {
          title: "Solana Explorer & Solscan: Auditing On-Chain Signatures Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Solana Explorer & Solscan: Auditing On-Chain Signatures and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l3-08',
        phaseId: 3,
        lessonNumber: 8,
        title: "Raydium CLMM vs Standard CPMM Pools",
        difficulty: 'ADVANCED',
        estimatedTime: '16 min',
        objectives: [
          "Differentiate Concentrated Liquidity (CLMM) from Constant Product (CPMM) pools",
          "Understand how concentrated tick ranges amplify capital efficiency and price impact",
          "Recognize volatility traps when price exits a concentrated liquidity band"
],
        videos: [],
        keyConcepts: [
          "CLMM",
          "CPMM (Constant Product)",
          "Tick Ranges",
          "Liquidity Depth"
],
        deepDive: [
          "Standard Constant Product Market Makers (CPMM) distribute liquidity across the entire curve from zero to infinity (x * y = k).",
          "Concentrated Liquidity Market Makers (CLMM) allow LPs to allocate liquidity strictly within defined price intervals (ticks). This provides 100x deeper liquidity inside the band.",
          "However, if price breaks outside the active concentrated band, liquidity drops to zero instantly, causing violent slippage spikes for market orders."
],
        realWorldExample: "A memecoin trades in a tight CLMM range between $0.05 and $0.07. When a whale market buys $20,000, price surges through $0.07. Beyond $0.07, no liquidity exists in the band, catapulting price to $0.15 on tiny volume.",
        commonMistakes: [
          "Executing large market orders into a CLMM pool without checking active tick depth.",
          "Assuming all Raydium pools behave with identical constant-product slippage."
],
        checkQuestions: [
          {
  "question": "What happens in a CLMM pool when price moves outside the active concentrated liquidity range?",
  "options": [
    "Trading is halted",
    "Liquidity inside that specific band drops to zero, dramatically increasing slippage",
    "Tokens are returned to wallet",
    "The pool converts to a CEX orderbook"
  ],
  "correctIndex": 1,
  "explanation": "Once price exits the LP concentrated range, the liquidity providers are 100% in one asset and provide zero active depth beyond the boundary."
}
        ],
        assignment: {
          title: "Raydium CLMM vs Standard CPMM Pools Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Raydium CLMM vs Standard CPMM Pools and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l3-09',
        phaseId: 3,
        lessonNumber: 9,
        title: "Meteora Dynamic AMM & DLMM Pools",
        difficulty: 'ADVANCED',
        estimatedTime: '18 min',
        objectives: [
          "Understand Meteora DLMM (Dynamic Liquidity Market Maker) bin mechanics",
          "Analyze dynamic fee models that scale with market volatility",
          "Identify how liquidity shape distributions (spot, curve, bid-ask) impact trade routing"
],
        videos: [],
        keyConcepts: [
          "Meteora DLMM",
          "Discrete Price Bins",
          "Dynamic Swap Fees",
          "Zero Slippage Bins"
],
        deepDive: [
          "Meteora DLMM organizes liquidity into discrete price bins. Trades occurring entirely within a single bin experience zero slippage.",
          "Meteora introduces dynamic fees: during periods of intense volatility, swap fees automatically increase to compensate LPs and dampen predatory toxic arbitrage.",
          "Understanding bin mechanics helps traders anticipate support floors where large volumes of liquidity bins have been stacked."
],
        realWorldExample: "During a volatile token launch, a Meteora DLMM pool fee increases from 0.25% to 2.5% dynamically as volatility surges, preserving liquidity depth and preventing sandwich bots from draining the pool.",
        commonMistakes: [
          "Failing to notice higher dynamic fees during peak volatility on Meteora swaps.",
          "Confusing discrete bin swaps with continuous bonding curve swaps."
],
        checkQuestions: [
          {
  "question": "What unique advantage does trading within a single active Meteora DLMM bin offer?",
  "options": [
    "Zero slippage on the portion of the trade executed within the bin",
    "No blockchain gas fee",
    "100% cashback",
    "Guaranteed profit"
  ],
  "correctIndex": 0,
  "explanation": "Inside a single discrete bin, price is constant, meaning trades executing strictly within that bin incur zero price impact/slippage."
}
        ],
        assignment: {
          title: "Meteora Dynamic AMM & DLMM Pools Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Meteora Dynamic AMM & DLMM Pools and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l3-10',
        phaseId: 3,
        lessonNumber: 10,
        title: "Token Accounts & Associated Token Accounts (ATAs)",
        difficulty: 'BEGINNER',
        estimatedTime: '14 min',
        objectives: [
          "Understand why Solana requires separate Associated Token Accounts (ATAs) for each token",
          "Calculate the rent exemption cost (~0.002 SOL) per new token account",
          "Use tools to close empty ATAs and reclaim locked SOL rent"
],
        videos: [],
        keyConcepts: [
          "Associated Token Account (ATA)",
          "Rent Exemption",
          "SPL Token Program",
          "Reclaiming Rent"
],
        deepDive: [
          "On Solana, your main wallet address does not hold SPL tokens directly. Instead, a unique Associated Token Account (ATA) derived from your wallet and the token mint is created.",
          "Creating an ATA requires locking approximately 0.002039 SOL as \"rent exemption\" to store the account data on validators RAM.",
          "Active memecoin traders who trade hundreds of tokens often have 0.2 to 0.5 SOL locked up in dormant zero-balance token accounts that can be closed to reclaim funds."
],
        realWorldExample: "An active trencher notices their SOL balance is 0.4 SOL lower than expected after 200 quick trades. They run a rent reclamation tool (like Sol Incinerator or Phantom Manage Tokens), close 180 empty ATAs, and immediately recover 0.36 SOL.",
        commonMistakes: [
          "Closing an ATA while still holding a microscopic residual token dust balance that has future value.",
          "Not realizing that every new token traded deducts rent on first buy."
],
        checkQuestions: [
          {
  "question": "Why does your SOL balance decrease slightly when you buy a brand-new token for the first time?",
  "options": [
    "DEX fee theft",
    "Creation of an Associated Token Account (ATA) requiring ~0.002 SOL rent exemption",
    "Solana network tax",
    "Phantom subscription fee"
  ],
  "correctIndex": 1,
  "explanation": "Creating a new on-chain token account requires locking rent in SOL to allocate storage on validator nodes."
}
        ],
        assignment: {
          title: "Token Accounts & Associated Token Accounts (ATAs) Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Token Accounts & Associated Token Accounts (ATAs) and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l3-11',
        phaseId: 3,
        lessonNumber: 11,
        title: "Burner Wallets & Hardware Wallet Partitioning",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '16 min',
        objectives: [
          "Implement an air-gapped 3-tier wallet architecture (Vault, Staging, Burner)",
          "Isolate high-risk memecoin dApp connections from long-term capital",
          "Establish a strict fund transfer protocol to prevent catastrophic draining"
],
        videos: [],
        keyConcepts: [
          "Vault Wallet",
          "Burner Wallet",
          "Isolation Architecture",
          "Malicious Approvals"
],
        deepDive: [
          "In the trenches, interacting with experimental launchpads, claim sites, and DEXs exposes your wallet to malicious smart contract drainers.",
          "A professional operator never connects their primary vault or cold storage hardware wallet to unknown dApps.",
          "The 3-tier architecture maintains: (1) Vault for long-term reserves (no dApp connections), (2) Staging wallet for liquidity allocation, and (3) Burner wallets with strictly disposable funds for daily execution."
],
        realWorldExample: "A trader accidentally signs a phishing transaction on a spoofed Telegram link. Because they used an isolated burner wallet with only 0.5 SOL, their loss is capped at $70, while their 200 SOL vault remains completely untouched.",
        commonMistakes: [
          "Connecting a ledger or main storage wallet to new memecoin claim airdrops.",
          "Storing recovery seed phrases in cloud notes, screenshots, or email."
],
        checkQuestions: [
          {
  "question": "What is the primary role of a \"Burner Wallet\" in on-chain memecoin trading?",
  "options": [
    "To hold long-term investments",
    "To interact with high-risk DEXs and contracts with minimal capital exposure",
    "To bypass blockchain taxes",
    "To avoid paying gas fees"
  ],
  "correctIndex": 1,
  "explanation": "Burner wallets contain only the immediate capital needed for a trade, ensuring that a malicious drainer contract can never access your main funds."
}
        ],
        assignment: {
          title: "Burner Wallets & Hardware Wallet Partitioning Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Burner Wallets & Hardware Wallet Partitioning and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l3-12',
        phaseId: 3,
        lessonNumber: 12,
        title: "Slippage Tolerance & Price Impact Guards on Solana Swaps",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Distinguish between Slippage Tolerance (market movement) and Price Impact (liquidity depth)",
          "Calculate optimal slippage percentages for various pool liquidity depths",
          "Prevent maximum extractable value (MEV) exploitation caused by excessive slippage"
],
        videos: [],
        keyConcepts: [
          "Slippage Tolerance",
          "Price Impact",
          "Slippage Guard",
          "Sandwich Exploits"
],
        deepDive: [
          "Slippage tolerance is the maximum price deviation you permit between transaction submission and block execution.",
          "Price impact is the deterministic price movement caused by your trade size relative to pool liquidity reserves.",
          "Setting slippage to 20% or 50% \"just to ensure the trade lands\" is an open invitation for MEV bots to front-run and sandwich your swap, handing you the worst possible fill."
],
        realWorldExample: "A trader sets 25% slippage on a $1,000 swap in a $10,000 pool. An MEV searcher detects the transaction in the mempool, buys ahead of them, lets the user fill at +24.9% worst price, and dumps immediately for guaranteed profit.",
        commonMistakes: [
          "Using automatic 20%+ slippage on low-volatility pairs.",
          "Confusing high price impact (small pool) with high slippage settings."
],
        checkQuestions: [
          {
  "question": "Why is setting 30% slippage dangerous on a decentralized exchange?",
  "options": [
    "The blockchain will reject the transaction",
    "MEV sandwich bots will deliberately manipulate the price up to your 30% limit to extract profit",
    "Your wallet will be deleted",
    "Gas fees triple automatically"
  ],
  "correctIndex": 1,
  "explanation": "Arbitrage and sandwich bots scan for high slippage transactions and manipulate the fill price to the exact outer limit of your tolerance."
}
        ],
        assignment: {
          title: "Slippage Tolerance & Price Impact Guards on Solana Swaps Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Slippage Tolerance & Price Impact Guards on Solana Swaps and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l3-13',
        phaseId: 3,
        lessonNumber: 13,
        title: "MEV & Sandwich Attack Protection on Solana",
        difficulty: 'ADVANCED',
        estimatedTime: '18 min',
        objectives: [
          "Understand how MEV searchers detect pending swaps and execute sandwich attacks",
          "Enable MEV protection features in routers and custom swap settings",
          "Recognize the on-chain signature pattern of a sandwich attack"
],
        videos: [],
        keyConcepts: [
          "MEV (Maximal Extractable Value)",
          "Sandwich Attack",
          "Front-Running",
          "Private RPC Routing"
],
        deepDive: [
          "A sandwich attack occurs when a bot places a buy order immediately before your transaction and a sell order immediately after it in the exact same slot.",
          "Because the bot pushes the price up to your maximum slippage limit, you receive significantly fewer tokens than you should have.",
          "Protection requires three layers: (1) keeping slippage below 1-2% whenever possible, (2) using private routing or Jito bundle protection, and (3) avoiding massive single market orders in shallow liquidity pools."
],
        realWorldExample: "A user buys 10 SOL worth of a token. On Solscan, the block shows: Bot buys 20 SOL (TX 1), User buys 10 SOL (TX 2), Bot sells 20 SOL (TX 3). The bot pocketed 1.2 SOL in risk-free profit extracted directly from the user fill.",
        commonMistakes: [
          "Assuming Solana has zero MEV because it does not have a traditional public Ethereum mempool.",
          "Ignoring Jupiter built-in MEV protection toggles."
],
        checkQuestions: [
          {
  "question": "What three consecutive transactions characterize a classic sandwich attack on-chain?",
  "options": [
    "Transfer, stake, unstake",
    "Attacker buy, victim buy, attacker sell in the same block",
    "Mint, burn, freeze",
    "Deposit, borrow, liquidate"
  ],
  "correctIndex": 1,
  "explanation": "The attacker buys ahead of the victim to artificially inflate price, absorbs the victim swap at the top, and sells immediately behind them for profit."
}
        ],
        assignment: {
          title: "MEV & Sandwich Attack Protection on Solana Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of MEV & Sandwich Attack Protection on Solana and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l3-14',
        phaseId: 3,
        lessonNumber: 14,
        title: "Trading Bots Overview: Telegram & Desktop Execution Bots",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '20 min',
        objectives: [
          "Evaluate Telegram trading bots (Photon, BullX, Trojan, Banana Gun) vs web interfaces",
          "Configure auto-buy, auto-slippage, and quick tip settings",
          "Understand the custodial security tradeoffs of bot-generated private keys"
],
        videos: [],
        keyConcepts: [
          "Telegram Bots",
          "Execution Speed",
          "Auto-Buy / Auto-Sell",
          "Private Key Custody"
],
        deepDive: [
          "In high-speed Solana trading, standard browser web interfaces can introduce 3 to 10 seconds of latency due to frontend rendering and wallet popups.",
          "Execution bots (such as Trojan, BullX, or Photon) communicate directly with private RPC clusters, achieving 1-click execution under 800 milliseconds.",
          "However, using trading bots requires depositing funds into a hot private key generated by the bot server. Never store your core net worth inside bot wallets; treat them strictly as transactional burner fuel."
],
        realWorldExample: "When a major influencer posts an address, traders using Phantom web popups take 8 seconds to approve and fill at 4x the price. A bot trader using pre-set 1-click auto-buy fills within 600 milliseconds at the base price.",
        commonMistakes: [
          "Leaving large balances of SOL sitting indefinitely inside third-party Telegram bot wallets.",
          "Not enabling anti-MEV and auto-slippage toggles in bot settings."
],
        checkQuestions: [
          {
  "question": "What is the primary operational trade-off when using Telegram execution bots?",
  "options": [
    "Faster execution speed vs increased custodial risk of hot server-stored private keys",
    "Higher fees with slower execution",
    "Inability to trade on Solana",
    "Mandatory KYC requirements"
  ],
  "correctIndex": 0,
  "explanation": "Bots provide unmatched execution speed and 1-click swaps, but require entrusting funds to a hot wallet key managed by the bot platform."
}
        ],
        assignment: {
          title: "Trading Bots Overview: Telegram & Desktop Execution Bots Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Trading Bots Overview: Telegram & Desktop Execution Bots and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      }
    ]
  },
  {
    id: 4,
    title: 'PHASE 04 — DEXSCREENER MASTERY',
    subtitle: 'Terminal Navigation, Layouts, Filters & Real-Time Analytics',
    description: 'Turn DexScreener from a price-watching toy into a tactical command center.',
    levelRequired: 4,
    badge: 'DEX_NAVIGATOR',
    practicalAssignment: {
      title: 'Build Your Custom DexScreener Layout',
      description: 'Configure a personalized multi-chart watchlist and filter setup.',
      task: 'Save a custom view with 3 active pairs, volume threshold filters, and transaction alerts.'
    },
    quiz: {
      id: 'quiz-04',
      phaseId: 4,
      title: 'Phase 04 Assessment: DexScreener Operational Competence',
      passingScore: 75,
      questions: [
        {
          id: 'q4-1',
          question: 'What is the primary operational rule for Phase 04?',
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
        id: 'l4-01',
        phaseId: 4,
        lessonNumber: 1,
        title: "DexScreener Interface & Custom Layouts",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master DexScreener Interface & Custom Layouts in real-world trading environments",
          "Identify key risk factors and signals associated with DexScreener Interface & Custom Layouts",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "DexScreener Interface & Custom Layouts",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "DexScreener Interface & Custom Layouts is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring DexScreener Interface & Custom Layouts identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on DexScreener Interface & Custom Layouts.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing DexScreener Interface & Custom Layouts?",
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
          title: "DexScreener Interface & Custom Layouts Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of DexScreener Interface & Custom Layouts and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l4-02',
        phaseId: 4,
        lessonNumber: 2,
        title: "New Pairs vs Trending: Filtering the Noise",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master New Pairs vs Trending: Filtering the Noise in real-world trading environments",
          "Identify key risk factors and signals associated with New Pairs vs Trending: Filtering the Noise",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "New Pairs vs Trending: Filtering the Noise",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "New Pairs vs Trending: Filtering the Noise is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring New Pairs vs Trending: Filtering the Noise identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on New Pairs vs Trending: Filtering the Noise.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing New Pairs vs Trending: Filtering the Noise?",
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
          title: "New Pairs vs Trending: Filtering the Noise Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of New Pairs vs Trending: Filtering the Noise and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l4-03',
        phaseId: 4,
        lessonNumber: 3,
        title: "Setting Up Custom Price & Volume Alerts on DexScreener",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Setting Up Custom Price & Volume Alerts on DexScreener in real-world trading environments",
          "Identify key risk factors and signals associated with Setting Up Custom Price & Volume Alerts on DexScreener",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Setting Up Custom Price & Volume Alerts on DexScreener",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Setting Up Custom Price & Volume Alerts on DexScreener is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Setting Up Custom Price & Volume Alerts on DexScreener identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Setting Up Custom Price & Volume Alerts on DexScreener.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Setting Up Custom Price & Volume Alerts on DexScreener?",
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
          title: "Setting Up Custom Price & Volume Alerts on DexScreener Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Setting Up Custom Price & Volume Alerts on DexScreener and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l4-04',
        phaseId: 4,
        lessonNumber: 4,
        title: "Identifying Wash Trading & Fake Volume Rings",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Identifying Wash Trading & Fake Volume Rings in real-world trading environments",
          "Identify key risk factors and signals associated with Identifying Wash Trading & Fake Volume Rings",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Identifying Wash Trading & Fake Volume Rings",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Identifying Wash Trading & Fake Volume Rings is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Identifying Wash Trading & Fake Volume Rings identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Identifying Wash Trading & Fake Volume Rings.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Identifying Wash Trading & Fake Volume Rings?",
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
          title: "Identifying Wash Trading & Fake Volume Rings Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Identifying Wash Trading & Fake Volume Rings and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l4-05',
        phaseId: 4,
        lessonNumber: 5,
        title: "Multi-Charts Setup for Simultaneous Token Tracking",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Multi-Charts Setup for Simultaneous Token Tracking in real-world trading environments",
          "Identify key risk factors and signals associated with Multi-Charts Setup for Simultaneous Token Tracking",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Multi-Charts Setup for Simultaneous Token Tracking",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Multi-Charts Setup for Simultaneous Token Tracking is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Multi-Charts Setup for Simultaneous Token Tracking identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Multi-Charts Setup for Simultaneous Token Tracking.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Multi-Charts Setup for Simultaneous Token Tracking?",
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
          title: "Multi-Charts Setup for Simultaneous Token Tracking Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Multi-Charts Setup for Simultaneous Token Tracking and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l4-06',
        phaseId: 4,
        lessonNumber: 6,
        title: "Reading Liquidity Locks & Burn Badges on DexScreener",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Reading Liquidity Locks & Burn Badges on DexScreener in real-world trading environments",
          "Identify key risk factors and signals associated with Reading Liquidity Locks & Burn Badges on DexScreener",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Reading Liquidity Locks & Burn Badges on DexScreener",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Reading Liquidity Locks & Burn Badges on DexScreener is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Reading Liquidity Locks & Burn Badges on DexScreener identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Reading Liquidity Locks & Burn Badges on DexScreener.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Reading Liquidity Locks & Burn Badges on DexScreener?",
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
          title: "Reading Liquidity Locks & Burn Badges on DexScreener Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Reading Liquidity Locks & Burn Badges on DexScreener and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l4-07',
        phaseId: 4,
        lessonNumber: 7,
        title: "Top Traders Tab: Inspecting PnL & Holding Percentages",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Top Traders Tab: Inspecting PnL & Holding Percentages in real-world trading environments",
          "Identify key risk factors and signals associated with Top Traders Tab: Inspecting PnL & Holding Percentages",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Top Traders Tab: Inspecting PnL & Holding Percentages",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Top Traders Tab: Inspecting PnL & Holding Percentages is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Top Traders Tab: Inspecting PnL & Holding Percentages identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Top Traders Tab: Inspecting PnL & Holding Percentages.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Top Traders Tab: Inspecting PnL & Holding Percentages?",
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
          title: "Top Traders Tab: Inspecting PnL & Holding Percentages Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Top Traders Tab: Inspecting PnL & Holding Percentages and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l4-08',
        phaseId: 4,
        lessonNumber: 8,
        title: "Transaction Filters: Whale Buys vs Micro-Dust Snipes",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Transaction Filters: Whale Buys vs Micro-Dust Snipes in real-world trading environments",
          "Identify key risk factors and signals associated with Transaction Filters: Whale Buys vs Micro-Dust Snipes",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Transaction Filters: Whale Buys vs Micro-Dust Snipes",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Transaction Filters: Whale Buys vs Micro-Dust Snipes is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Transaction Filters: Whale Buys vs Micro-Dust Snipes identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Transaction Filters: Whale Buys vs Micro-Dust Snipes.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Transaction Filters: Whale Buys vs Micro-Dust Snipes?",
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
          title: "Transaction Filters: Whale Buys vs Micro-Dust Snipes Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Transaction Filters: Whale Buys vs Micro-Dust Snipes and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l4-09',
        phaseId: 4,
        lessonNumber: 9,
        title: "Integrating Technical Indicators into DexScreener Charts",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Integrating Technical Indicators into DexScreener Charts in real-world trading environments",
          "Identify key risk factors and signals associated with Integrating Technical Indicators into DexScreener Charts",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Integrating Technical Indicators into DexScreener Charts",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Integrating Technical Indicators into DexScreener Charts is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Integrating Technical Indicators into DexScreener Charts identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Integrating Technical Indicators into DexScreener Charts.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Integrating Technical Indicators into DexScreener Charts?",
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
          title: "Integrating Technical Indicators into DexScreener Charts Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Integrating Technical Indicators into DexScreener Charts and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l4-10',
        phaseId: 4,
        lessonNumber: 10,
        title: "Detecting Ghost Volume and Bot Spikes",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Detecting Ghost Volume and Bot Spikes in real-world trading environments",
          "Identify key risk factors and signals associated with Detecting Ghost Volume and Bot Spikes",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Detecting Ghost Volume and Bot Spikes",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Detecting Ghost Volume and Bot Spikes is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Detecting Ghost Volume and Bot Spikes identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Detecting Ghost Volume and Bot Spikes.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Detecting Ghost Volume and Bot Spikes?",
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
          title: "Detecting Ghost Volume and Bot Spikes Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Detecting Ghost Volume and Bot Spikes and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l4-11',
        phaseId: 4,
        lessonNumber: 11,
        title: "Mobile vs Desktop Workflow Optimization on DexScreener",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Mobile vs Desktop Workflow Optimization on DexScreener in real-world trading environments",
          "Identify key risk factors and signals associated with Mobile vs Desktop Workflow Optimization on DexScreener",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Mobile vs Desktop Workflow Optimization on DexScreener",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Mobile vs Desktop Workflow Optimization on DexScreener is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Mobile vs Desktop Workflow Optimization on DexScreener identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Mobile vs Desktop Workflow Optimization on DexScreener.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Mobile vs Desktop Workflow Optimization on DexScreener?",
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
          title: "Mobile vs Desktop Workflow Optimization on DexScreener Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Mobile vs Desktop Workflow Optimization on DexScreener and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l4-12',
        phaseId: 4,
        lessonNumber: 12,
        title: "DexScreener vs Alternative DEX Aggregators",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master DexScreener vs Alternative DEX Aggregators in real-world trading environments",
          "Identify key risk factors and signals associated with DexScreener vs Alternative DEX Aggregators",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "DexScreener vs Alternative DEX Aggregators",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "DexScreener vs Alternative DEX Aggregators is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring DexScreener vs Alternative DEX Aggregators identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on DexScreener vs Alternative DEX Aggregators.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing DexScreener vs Alternative DEX Aggregators?",
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
          title: "DexScreener vs Alternative DEX Aggregators Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of DexScreener vs Alternative DEX Aggregators and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      }
    ]
  },
  {
    id: 5,
    title: 'PHASE 05 — BIRDEYE ANALYTICS',
    subtitle: 'On-Chain Data, Trader Profiling, and Holder Metrics',
    description: 'Leverage Birdeye for granular on-chain data that raw charts cannot show.',
    levelRequired: 5,
    badge: 'ONCHAIN_ANALYST',
    practicalAssignment: {
      title: 'Complete a 15-Minute Birdeye Due Diligence Audit',
      description: 'Audit 5 active trending tokens on Birdeye.',
      task: 'Record Unique Traders, Net Money Flow, Top 10 Holder %, and Security Audit status.'
    },
    quiz: {
      id: 'quiz-05',
      phaseId: 5,
      title: 'Phase 05 Assessment: Birdeye Due Diligence & Holder Analytics',
      passingScore: 75,
      questions: [
        {
          id: 'q5-1',
          question: 'What is the primary operational rule for Phase 05?',
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
        id: 'l5-01',
        phaseId: 5,
        lessonNumber: 1,
        title: "Birdeye Overview & Statistical Edge",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Birdeye Overview & Statistical Edge in real-world trading environments",
          "Identify key risk factors and signals associated with Birdeye Overview & Statistical Edge",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Birdeye Overview & Statistical Edge",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Birdeye Overview & Statistical Edge is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Birdeye Overview & Statistical Edge identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Birdeye Overview & Statistical Edge.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Birdeye Overview & Statistical Edge?",
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
          title: "Birdeye Overview & Statistical Edge Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Birdeye Overview & Statistical Edge and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l5-02',
        phaseId: 5,
        lessonNumber: 2,
        title: "Unique Traders vs Raw Transaction Volume on Birdeye",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Unique Traders vs Raw Transaction Volume on Birdeye in real-world trading environments",
          "Identify key risk factors and signals associated with Unique Traders vs Raw Transaction Volume on Birdeye",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Unique Traders vs Raw Transaction Volume on Birdeye",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Unique Traders vs Raw Transaction Volume on Birdeye is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Unique Traders vs Raw Transaction Volume on Birdeye identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Unique Traders vs Raw Transaction Volume on Birdeye.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Unique Traders vs Raw Transaction Volume on Birdeye?",
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
          title: "Unique Traders vs Raw Transaction Volume on Birdeye Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Unique Traders vs Raw Transaction Volume on Birdeye and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l5-03',
        phaseId: 5,
        lessonNumber: 3,
        title: "Birdeye Leaderboards: Spotting High-Win-Rate Wallets",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Birdeye Leaderboards: Spotting High-Win-Rate Wallets in real-world trading environments",
          "Identify key risk factors and signals associated with Birdeye Leaderboards: Spotting High-Win-Rate Wallets",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Birdeye Leaderboards: Spotting High-Win-Rate Wallets",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Birdeye Leaderboards: Spotting High-Win-Rate Wallets is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Birdeye Leaderboards: Spotting High-Win-Rate Wallets identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Birdeye Leaderboards: Spotting High-Win-Rate Wallets.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Birdeye Leaderboards: Spotting High-Win-Rate Wallets?",
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
          title: "Birdeye Leaderboards: Spotting High-Win-Rate Wallets Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Birdeye Leaderboards: Spotting High-Win-Rate Wallets and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l5-04',
        phaseId: 5,
        lessonNumber: 4,
        title: "Token Overview & Security Scores on Birdeye",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Token Overview & Security Scores on Birdeye in real-world trading environments",
          "Identify key risk factors and signals associated with Token Overview & Security Scores on Birdeye",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Token Overview & Security Scores on Birdeye",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Token Overview & Security Scores on Birdeye is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Token Overview & Security Scores on Birdeye identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Token Overview & Security Scores on Birdeye.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Token Overview & Security Scores on Birdeye?",
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
          title: "Token Overview & Security Scores on Birdeye Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Token Overview & Security Scores on Birdeye and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l5-05',
        phaseId: 5,
        lessonNumber: 5,
        title: "Net Money Flow Inflows vs Outflows",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Net Money Flow Inflows vs Outflows in real-world trading environments",
          "Identify key risk factors and signals associated with Net Money Flow Inflows vs Outflows",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Net Money Flow Inflows vs Outflows",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Net Money Flow Inflows vs Outflows is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Net Money Flow Inflows vs Outflows identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Net Money Flow Inflows vs Outflows.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Net Money Flow Inflows vs Outflows?",
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
          title: "Net Money Flow Inflows vs Outflows Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Net Money Flow Inflows vs Outflows and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l5-06',
        phaseId: 5,
        lessonNumber: 6,
        title: "Historical Price & Liquidity Depth Analysis",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Historical Price & Liquidity Depth Analysis in real-world trading environments",
          "Identify key risk factors and signals associated with Historical Price & Liquidity Depth Analysis",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Historical Price & Liquidity Depth Analysis",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Historical Price & Liquidity Depth Analysis is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Historical Price & Liquidity Depth Analysis identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Historical Price & Liquidity Depth Analysis.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Historical Price & Liquidity Depth Analysis?",
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
          title: "Historical Price & Liquidity Depth Analysis Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Historical Price & Liquidity Depth Analysis and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l5-07',
        phaseId: 5,
        lessonNumber: 7,
        title: "Tracking Token Holder Distribution Trends",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Tracking Token Holder Distribution Trends in real-world trading environments",
          "Identify key risk factors and signals associated with Tracking Token Holder Distribution Trends",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Tracking Token Holder Distribution Trends",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Tracking Token Holder Distribution Trends is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Tracking Token Holder Distribution Trends identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Tracking Token Holder Distribution Trends.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Tracking Token Holder Distribution Trends?",
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
          title: "Tracking Token Holder Distribution Trends Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Tracking Token Holder Distribution Trends and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l5-08',
        phaseId: 5,
        lessonNumber: 8,
        title: "Setting Up Custom Screener Presets on Birdeye",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Setting Up Custom Screener Presets on Birdeye in real-world trading environments",
          "Identify key risk factors and signals associated with Setting Up Custom Screener Presets on Birdeye",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Setting Up Custom Screener Presets on Birdeye",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Setting Up Custom Screener Presets on Birdeye is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Setting Up Custom Screener Presets on Birdeye identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Setting Up Custom Screener Presets on Birdeye.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Setting Up Custom Screener Presets on Birdeye?",
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
          title: "Setting Up Custom Screener Presets on Birdeye Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Setting Up Custom Screener Presets on Birdeye and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l5-09',
        phaseId: 5,
        lessonNumber: 9,
        title: "Birdeye API & Real-Time Data Feeds Overview",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Birdeye API & Real-Time Data Feeds Overview in real-world trading environments",
          "Identify key risk factors and signals associated with Birdeye API & Real-Time Data Feeds Overview",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Birdeye API & Real-Time Data Feeds Overview",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Birdeye API & Real-Time Data Feeds Overview is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Birdeye API & Real-Time Data Feeds Overview identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Birdeye API & Real-Time Data Feeds Overview.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Birdeye API & Real-Time Data Feeds Overview?",
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
          title: "Birdeye API & Real-Time Data Feeds Overview Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Birdeye API & Real-Time Data Feeds Overview and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l5-10',
        phaseId: 5,
        lessonNumber: 10,
        title: "Birdeye & DexScreener Dual-Screen Confluence Workflow",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Birdeye & DexScreener Dual-Screen Confluence Workflow in real-world trading environments",
          "Identify key risk factors and signals associated with Birdeye & DexScreener Dual-Screen Confluence Workflow",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Birdeye & DexScreener Dual-Screen Confluence Workflow",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Birdeye & DexScreener Dual-Screen Confluence Workflow is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Birdeye & DexScreener Dual-Screen Confluence Workflow identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Birdeye & DexScreener Dual-Screen Confluence Workflow.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Birdeye & DexScreener Dual-Screen Confluence Workflow?",
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
          title: "Birdeye & DexScreener Dual-Screen Confluence Workflow Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Birdeye & DexScreener Dual-Screen Confluence Workflow and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      }
    ]
  },
  {
    id: 6,
    title: 'PHASE 06 — TOKEN SAFETY & RUG DETECTION',
    subtitle: 'Security Auditing, Contract Verification, and Insider Wallet Analysis',
    description: 'Learn how to identify rugs, scams, and traps BEFORE you put capital in.',
    levelRequired: 6,
    badge: 'SECURITY_OFFICER',
    practicalAssignment: {
      title: 'Conduct a Live Rug Audit on 3 Fresh Tokens',
      description: 'Audit 3 newly created tokens and document pass/fail for each critical security test.',
      task: 'Document: Mint Authority, Freeze Authority, LP Burn/Lock, Top 10 Holder %, and Bubblemaps clusters.'
    },
    quiz: {
      id: 'quiz-06',
      phaseId: 6,
      title: 'Phase 06 Assessment: Rug Detection & Token Security',
      passingScore: 75,
      questions: [
        {
          id: 'q6-1',
          question: 'What is the primary operational rule for Phase 06?',
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
        id: 'l6-01',
        phaseId: 6,
        lessonNumber: 1,
        title: "Mint Authority & Freeze Authority: The Non-Negotiables",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Mint Authority & Freeze Authority: The Non-Negotiables in real-world trading environments",
          "Identify key risk factors and signals associated with Mint Authority & Freeze Authority: The Non-Negotiables",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Mint Authority & Freeze Authority: The Non-Negotiables",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Mint Authority & Freeze Authority: The Non-Negotiables is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Mint Authority & Freeze Authority: The Non-Negotiables identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Mint Authority & Freeze Authority: The Non-Negotiables.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Mint Authority & Freeze Authority: The Non-Negotiables?",
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
          title: "Mint Authority & Freeze Authority: The Non-Negotiables Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Mint Authority & Freeze Authority: The Non-Negotiables and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l6-02',
        phaseId: 6,
        lessonNumber: 2,
        title: "Bubblemaps & Clustered Insider Wallets",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Bubblemaps & Clustered Insider Wallets in real-world trading environments",
          "Identify key risk factors and signals associated with Bubblemaps & Clustered Insider Wallets",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Bubblemaps & Clustered Insider Wallets",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Bubblemaps & Clustered Insider Wallets is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Bubblemaps & Clustered Insider Wallets identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Bubblemaps & Clustered Insider Wallets.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Bubblemaps & Clustered Insider Wallets?",
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
          title: "Bubblemaps & Clustered Insider Wallets Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Bubblemaps & Clustered Insider Wallets and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l6-03',
        phaseId: 6,
        lessonNumber: 3,
        title: "LP Token Burns vs LP Token Locks: How Developers Pull Liquidity",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master LP Token Burns vs LP Token Locks: How Developers Pull Liquidity in real-world trading environments",
          "Identify key risk factors and signals associated with LP Token Burns vs LP Token Locks: How Developers Pull Liquidity",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "LP Token Burns vs LP Token Locks: How Developers Pull Liquidity",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "LP Token Burns vs LP Token Locks: How Developers Pull Liquidity is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring LP Token Burns vs LP Token Locks: How Developers Pull Liquidity identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on LP Token Burns vs LP Token Locks: How Developers Pull Liquidity.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing LP Token Burns vs LP Token Locks: How Developers Pull Liquidity?",
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
          title: "LP Token Burns vs LP Token Locks: How Developers Pull Liquidity Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of LP Token Burns vs LP Token Locks: How Developers Pull Liquidity and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l6-04',
        phaseId: 6,
        lessonNumber: 4,
        title: "RugCheck.xyz Walkthrough & Automated Risk Audits",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master RugCheck.xyz Walkthrough & Automated Risk Audits in real-world trading environments",
          "Identify key risk factors and signals associated with RugCheck.xyz Walkthrough & Automated Risk Audits",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "RugCheck.xyz Walkthrough & Automated Risk Audits",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "RugCheck.xyz Walkthrough & Automated Risk Audits is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring RugCheck.xyz Walkthrough & Automated Risk Audits identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on RugCheck.xyz Walkthrough & Automated Risk Audits.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing RugCheck.xyz Walkthrough & Automated Risk Audits?",
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
          title: "RugCheck.xyz Walkthrough & Automated Risk Audits Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of RugCheck.xyz Walkthrough & Automated Risk Audits and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l6-05',
        phaseId: 6,
        lessonNumber: 5,
        title: "Top 10 Holder Concentration Risk: The 20% Rule",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Top 10 Holder Concentration Risk: The 20% Rule in real-world trading environments",
          "Identify key risk factors and signals associated with Top 10 Holder Concentration Risk: The 20% Rule",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Top 10 Holder Concentration Risk: The 20% Rule",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Top 10 Holder Concentration Risk: The 20% Rule is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Top 10 Holder Concentration Risk: The 20% Rule identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Top 10 Holder Concentration Risk: The 20% Rule.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Top 10 Holder Concentration Risk: The 20% Rule?",
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
          title: "Top 10 Holder Concentration Risk: The 20% Rule Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Top 10 Holder Concentration Risk: The 20% Rule and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l6-06',
        phaseId: 6,
        lessonNumber: 6,
        title: "HoneyPots & Blacklists on Solana: Can You Sell?",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master HoneyPots & Blacklists on Solana: Can You Sell? in real-world trading environments",
          "Identify key risk factors and signals associated with HoneyPots & Blacklists on Solana: Can You Sell?",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "HoneyPots & Blacklists on Solana: Can You Sell?",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "HoneyPots & Blacklists on Solana: Can You Sell? is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring HoneyPots & Blacklists on Solana: Can You Sell? identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on HoneyPots & Blacklists on Solana: Can You Sell?.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing HoneyPots & Blacklists on Solana: Can You Sell??",
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
          title: "HoneyPots & Blacklists on Solana: Can You Sell? Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of HoneyPots & Blacklists on Solana: Can You Sell? and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l6-07',
        phaseId: 6,
        lessonNumber: 7,
        title: "Dev Holding Audits: Spotting Supply Dispersal Across 20 Wallets",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Dev Holding Audits: Spotting Supply Dispersal Across 20 Wallets in real-world trading environments",
          "Identify key risk factors and signals associated with Dev Holding Audits: Spotting Supply Dispersal Across 20 Wallets",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Dev Holding Audits: Spotting Supply Dispersal Across 20 Wallets",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Dev Holding Audits: Spotting Supply Dispersal Across 20 Wallets is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Dev Holding Audits: Spotting Supply Dispersal Across 20 Wallets identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Dev Holding Audits: Spotting Supply Dispersal Across 20 Wallets.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Dev Holding Audits: Spotting Supply Dispersal Across 20 Wallets?",
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
          title: "Dev Holding Audits: Spotting Supply Dispersal Across 20 Wallets Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Dev Holding Audits: Spotting Supply Dispersal Across 20 Wallets and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l6-08',
        phaseId: 6,
        lessonNumber: 8,
        title: "Social Engineering Red Flags: Fake Influencers & Stolen Content",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Social Engineering Red Flags: Fake Influencers & Stolen Content in real-world trading environments",
          "Identify key risk factors and signals associated with Social Engineering Red Flags: Fake Influencers & Stolen Content",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Social Engineering Red Flags: Fake Influencers & Stolen Content",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Social Engineering Red Flags: Fake Influencers & Stolen Content is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Social Engineering Red Flags: Fake Influencers & Stolen Content identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Social Engineering Red Flags: Fake Influencers & Stolen Content.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Social Engineering Red Flags: Fake Influencers & Stolen Content?",
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
          title: "Social Engineering Red Flags: Fake Influencers & Stolen Content Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Social Engineering Red Flags: Fake Influencers & Stolen Content and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l6-09',
        phaseId: 6,
        lessonNumber: 9,
        title: "Metadata Mutability & Image Swapping Vulnerabilities",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Metadata Mutability & Image Swapping Vulnerabilities in real-world trading environments",
          "Identify key risk factors and signals associated with Metadata Mutability & Image Swapping Vulnerabilities",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Metadata Mutability & Image Swapping Vulnerabilities",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Metadata Mutability & Image Swapping Vulnerabilities is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Metadata Mutability & Image Swapping Vulnerabilities identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Metadata Mutability & Image Swapping Vulnerabilities.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Metadata Mutability & Image Swapping Vulnerabilities?",
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
          title: "Metadata Mutability & Image Swapping Vulnerabilities Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Metadata Mutability & Image Swapping Vulnerabilities and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l6-10',
        phaseId: 6,
        lessonNumber: 10,
        title: "Telegram & Twitter Verification: Spotting Bottled Engagement",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Telegram & Twitter Verification: Spotting Bottled Engagement in real-world trading environments",
          "Identify key risk factors and signals associated with Telegram & Twitter Verification: Spotting Bottled Engagement",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Telegram & Twitter Verification: Spotting Bottled Engagement",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Telegram & Twitter Verification: Spotting Bottled Engagement is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Telegram & Twitter Verification: Spotting Bottled Engagement identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Telegram & Twitter Verification: Spotting Bottled Engagement.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Telegram & Twitter Verification: Spotting Bottled Engagement?",
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
          title: "Telegram & Twitter Verification: Spotting Bottled Engagement Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Telegram & Twitter Verification: Spotting Bottled Engagement and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l6-11',
        phaseId: 6,
        lessonNumber: 11,
        title: "Volume Bot Injections & Bundler Sniping Detection",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Volume Bot Injections & Bundler Sniping Detection in real-world trading environments",
          "Identify key risk factors and signals associated with Volume Bot Injections & Bundler Sniping Detection",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Volume Bot Injections & Bundler Sniping Detection",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Volume Bot Injections & Bundler Sniping Detection is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Volume Bot Injections & Bundler Sniping Detection identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Volume Bot Injections & Bundler Sniping Detection.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Volume Bot Injections & Bundler Sniping Detection?",
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
          title: "Volume Bot Injections & Bundler Sniping Detection Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Volume Bot Injections & Bundler Sniping Detection and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l6-12',
        phaseId: 6,
        lessonNumber: 12,
        title: "Coordinated Developer Dumps: Timing the Liquidity Rug",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master Coordinated Developer Dumps: Timing the Liquidity Rug in real-world trading environments",
          "Identify key risk factors and signals associated with Coordinated Developer Dumps: Timing the Liquidity Rug",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "Coordinated Developer Dumps: Timing the Liquidity Rug",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "Coordinated Developer Dumps: Timing the Liquidity Rug is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring Coordinated Developer Dumps: Timing the Liquidity Rug identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on Coordinated Developer Dumps: Timing the Liquidity Rug.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing Coordinated Developer Dumps: Timing the Liquidity Rug?",
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
          title: "Coordinated Developer Dumps: Timing the Liquidity Rug Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of Coordinated Developer Dumps: Timing the Liquidity Rug and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      },
      {
        id: 'l6-13',
        phaseId: 6,
        lessonNumber: 13,
        title: "The Pre-Flight Safety Checklist: 60-Second Security Audit",
        difficulty: 'INTERMEDIATE',
        estimatedTime: '15 min',
        objectives: [
          "Master The Pre-Flight Safety Checklist: 60-Second Security Audit in real-world trading environments",
          "Identify key risk factors and signals associated with The Pre-Flight Safety Checklist: 60-Second Security Audit",
          "Execute structured strategies while preserving capital"
],
        videos: [],
        keyConcepts: [
          "The Pre-Flight Safety Checklist: 60-Second Security Audit",
          "On-Chain Execution",
          "Risk Management",
          "Solana Liquidity"
],
        deepDive: [
          "The Pre-Flight Safety Checklist: 60-Second Security Audit is a critical component of professional on-chain memecoin operations. In volatile markets, understanding this mechanism separates disciplined traders from exit liquidity.",
          "When analyzing this dynamic on Solana, operators must evaluate block inclusion latency, liquidity pool depth, and participant intent before committing capital.",
          "Always maintain predefined entry invalidation rules and never deviate from established risk parameters when trading these volatile setups."
],
        realWorldExample: "An operator monitoring The Pre-Flight Safety Checklist: 60-Second Security Audit identifies an asymmetric opportunity with defined 1:3 risk-to-reward, avoiding common retail traps and securing consistent execution.",
        commonMistakes: [
          "Entering without waiting for confirmation on The Pre-Flight Safety Checklist: 60-Second Security Audit.",
          "Over-sizing positions and ignoring liquidity depth."
],
        checkQuestions: [
          {
            question: "What is the most critical principle when analyzing The Pre-Flight Safety Checklist: 60-Second Security Audit?",
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
          title: "The Pre-Flight Safety Checklist: 60-Second Security Audit Practical Audit",
          instructions: "Observe 3 live Solana tokens demonstrating principles of The Pre-Flight Safety Checklist: 60-Second Security Audit and document your findings.",
          deliverables: [
          "Written technical case study with Solscan/DexScreener links."
]
        }
      }
    ]
  }
];
