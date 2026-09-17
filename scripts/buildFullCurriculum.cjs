const fs = require('fs');
const path = require('path');

// Read existing curriculumPhases3to12.ts to get existing lessons and phase metadata
const existingContent = fs.readFileSync(path.join(__dirname, '../src/data/curriculumPhases3to12.ts'), 'utf8');

// Helper to extract a lesson object from existing file by ID
function extractExistingLesson(lessonId) {
  const startPattern = new RegExp(`{\\s*id:\\s*['"]${lessonId}['"],`);
  const match = existingContent.search(startPattern);
  if (match === -1) return null;

  let braceCount = 0;
  let inString = false;
  let stringChar = '';
  let escapeNext = false;
  let endIndex = -1;

  for (let i = match; i < existingContent.length; i++) {
    const char = existingContent[i];

    if (escapeNext) {
      escapeNext = false;
      continue;
    }
    if (char === '\\') {
      escapeNext = true;
      continue;
    }
    if (inString) {
      if (char === stringChar) inString = false;
      continue;
    }
    if (char === "'" || char === '"' || char === '`') {
      inString = true;
      stringChar = char;
      continue;
    }

    if (char === '{') {
      braceCount++;
    } else if (char === '}') {
      braceCount--;
      if (braceCount === 0) {
        endIndex = i + 1;
        break;
      }
    }
  }

  if (endIndex !== -1) {
    return existingContent.slice(match, endIndex);
  }
  return null;
}

// Generate complete lesson code
function createLessonCode(lesson) {
  const existingCode = extractExistingLesson(lesson.id);
  if (existingCode) {
    return existingCode;
  }

  return `      {
        id: '${lesson.id}',
        phaseId: ${lesson.phaseId},
        lessonNumber: ${lesson.lessonNumber},
        title: ${JSON.stringify(lesson.title)},
        difficulty: '${lesson.difficulty}',
        estimatedTime: '${lesson.estimatedTime || '15 min'}',
        objectives: ${JSON.stringify(lesson.objectives, null, 10)},
        videos: [],
        keyConcepts: ${JSON.stringify(lesson.keyConcepts, null, 10)},
        deepDive: ${JSON.stringify(lesson.deepDive, null, 10)},
        realWorldExample: ${JSON.stringify(lesson.realWorldExample)},
        commonMistakes: ${JSON.stringify(lesson.commonMistakes, null, 10)},
        checkQuestions: [
          {
            question: ${JSON.stringify(lesson.question.question)},
            options: ${JSON.stringify(lesson.question.options, null, 12)},
            correctIndex: ${lesson.question.correctIndex},
            explanation: ${JSON.stringify(lesson.question.explanation)}
          }
        ],
        assignment: {
          title: ${JSON.stringify(lesson.assignment.title)},
          instructions: ${JSON.stringify(lesson.assignment.instructions)},
          deliverables: ${JSON.stringify(lesson.assignment.deliverables, null, 12)}
        }
      }`;
}

// Lesson data specification for all 148 lessons
const phase3Lessons = [
  { id: 'l3-01', phaseId: 3, lessonNumber: 1, title: 'Phantom Wallet Setup & Advanced Security' },
  { id: 'l3-02', phaseId: 3, lessonNumber: 2, title: 'Jupiter Aggregator: Best Execution & Dynamic Routing' },
  { id: 'l3-03', phaseId: 3, lessonNumber: 3, title: 'Raydium & AMM Liquidity Mechanics' },
  { id: 'l3-04', phaseId: 3, lessonNumber: 4, title: 'Pump.fun & Bonding Curves Explained' },
  {
    id: 'l3-05', phaseId: 3, lessonNumber: 5,
    title: 'Priority Fees & Jito Tip Bundles on Solana',
    difficulty: 'INTERMEDIATE', estimatedTime: '15 min',
    objectives: [
      'Understand how validator compute unit limits dictate transaction landing speed',
      'Configure dynamic priority fees in Phantom and third-party routers',
      'Understand Jito tip bundles and how snipers secure first-block inclusion'
    ],
    keyConcepts: ['Priority Fees', 'Compute Units (CU)', 'Jito Tip Bundles', 'Mev Bribes'],
    deepDive: [
      'During extreme network congestion or high-volatility launches, the standard 0.000005 SOL base fee is not enough to guarantee block inclusion.',
      'Solana validators order transactions based on Priority Fee per Compute Unit (micro-lamports). If your compute budget is too low, validators simply drop the packet.',
      'Jito bundles allow traders to package a transaction directly with an upfront tip paid to the leader validator, bypassing public mempool front-running.'
    ],
    realWorldExample: 'During a hyped token migration to Raydium, retail swaps with standard fees fail repeatedly for 3 minutes while price doubles. An operator with dynamic priority fees and a 0.005 SOL Jito tip lands on the first block at the base price.',
    commonMistakes: [
      'Setting fixed priority fees too low during breaking viral news events.',
      'Overpaying priority fees on microscopic trades, causing fee bleed.'
    ],
    question: {
      question: 'What is the primary function of a Jito tip bundle on Solana?',
      options: ['To bypass gas fees entirely', 'To deliver private, atomic transaction bundles directly to validators with tip incentives', 'To reverse failed transactions', 'To buy tokens before they are minted'],
      correctIndex: 1,
      explanation: 'Jito bundles send transactions directly to Jito-Solana validators off the public peer-to-peer gossip network, preventing front-running and ensuring atomic inclusion.'
    },
    assignment: {
      title: 'Fee Optimization Experiment',
      instructions: 'Review 5 failed transactions on Solscan and compare their compute unit price with successfully landed swaps in the same slot.',
      deliverables: ['Audit notes documenting compute unit prices and landing latency.']
    }
  },
  {
    id: 'l3-06', phaseId: 3, lessonNumber: 6,
    title: 'RPC Nodes: Public vs Dedicated Private Endpoints',
    difficulty: 'INTERMEDIATE', estimatedTime: '18 min',
    objectives: [
      'Understand how Remote Procedure Call (RPC) nodes mediate between wallet and blockchain',
      'Identify the limitations and rate-limits of public RPC endpoints',
      'Set up custom dedicated RPC providers (Helius, QuickNode, Triton) for low latency'
    ],
    keyConcepts: ['RPC Node', 'Rate Limiting', 'Public vs Private Endpoints', 'Sub-Second Latency'],
    deepDive: [
      'Every time you check balances or broadcast a swap, your wallet contacts an RPC node. Public endpoints provided by Phantom or default networks are heavily throttled and rate-limited.',
      'During high-traffic memecoin runs, public RPCs return 429 Too Many Requests errors, showing stale prices and dropping swap submissions.',
      'Connecting a private RPC endpoint gives you dedicated bandwidth, immediate transaction propagation, and websockets that update balance changes in milliseconds.'
    ],
    realWorldExample: 'A trader on default public RPC sees a pump 8 seconds late and their buy transaction drops due to rate limiting. Another trader using a dedicated Helius RPC catches the exact tick and fills cleanly.',
    commonMistakes: [
      'Relying on overloaded public RPCs for volatile low-cap executions.',
      'Exposing private RPC API keys in public GitHub repositories.'
    ],
    question: {
      question: 'What error commonly indicates that your wallet is using an overloaded public RPC node?',
      options: ['404 Not Found', '429 Too Many Requests / Rate Limit Exceeded', '500 Internal Blockchain Fault', '200 OK'],
      correctIndex: 1,
      explanation: 'HTTP 429 status code indicates that the public RPC provider has throttled your requests due to excessive traffic.'
    },
    assignment: {
      title: 'Custom RPC Integration',
      instructions: 'Create a free developer endpoint on Helius or QuickNode and configure it in your test Phantom or Solflare wallet settings.',
      deliverables: ['Confirmation of custom RPC endpoint connection and latency ping test.']
    }
  },
  {
    id: 'l3-07', phaseId: 3, lessonNumber: 7,
    title: 'Solana Explorer & Solscan: Auditing On-Chain Signatures',
    difficulty: 'INTERMEDIATE', estimatedTime: '20 min',
    objectives: [
      'Navigate transaction logs and program invocations on Solscan',
      'Decode inner instructions to verify actual token transfers and fee deductions',
      'Confirm transaction finality and slot confirmation states'
    ],
    keyConcepts: ['Solscan', 'Program Invocations', 'Inner Instructions', 'Transaction Signatures'],
    deepDive: [
      'Solscan is the ultimate truth terminal for Solana. User interfaces on DEXs can lag or show erroneous data, but raw on-chain signatures never lie.',
      'By inspecting a transaction signature, you can verify which program was invoked (e.g. Raydium AMM, Jupiter, Token Program) and the exact amounts transferred.',
      'Inner instruction inspection reveals hidden fees, routing intermediaries, and exact token balances credited to your Associated Token Account.'
    ],
    realWorldExample: 'A swap appears to fail in a DEX UI with a red banner. The trader checks the transaction signature on Solscan and discovers the swap actually confirmed in the block with zero slippage error.',
    commonMistakes: [
      'Panicking when a frontend UI hangs without checking the transaction signature on Solscan.',
      'Not verifying whether a token transfer actually hit the correct recipient wallet.'
    ],
    question: {
      question: 'What confirms that a transaction on Solana is permanently irreversible?',
      options: ['Frontend confirmation toast', 'Finalized commitment status on Solscan', 'Telegram notification bot', 'Estimated time counter'],
      correctIndex: 1,
      explanation: 'Once a transaction reaches "Finalized" commitment (voted on by a supermajority of the validator cluster), it is cryptographically permanent.'
    },
    assignment: {
      title: 'Signature Anatomy Audit',
      instructions: 'Take a recent DEX swap signature and break down the fee, compute units consumed, programs invoked, and token balances changed.',
      deliverables: ['Annotated signature breakdown report with Solscan URL.']
    }
  },
  {
    id: 'l3-08', phaseId: 3, lessonNumber: 8,
    title: 'Raydium CLMM vs Standard CPMM Pools',
    difficulty: 'ADVANCED', estimatedTime: '16 min',
    objectives: [
      'Differentiate Concentrated Liquidity (CLMM) from Constant Product (CPMM) pools',
      'Understand how concentrated tick ranges amplify capital efficiency and price impact',
      'Recognize volatility traps when price exits a concentrated liquidity band'
    ],
    keyConcepts: ['CLMM', 'CPMM (Constant Product)', 'Tick Ranges', 'Liquidity Depth'],
    deepDive: [
      'Standard Constant Product Market Makers (CPMM) distribute liquidity across the entire curve from zero to infinity (x * y = k).',
      'Concentrated Liquidity Market Makers (CLMM) allow LPs to allocate liquidity strictly within defined price intervals (ticks). This provides 100x deeper liquidity inside the band.',
      'However, if price breaks outside the active concentrated band, liquidity drops to zero instantly, causing violent slippage spikes for market orders.'
    ],
    realWorldExample: 'A memecoin trades in a tight CLMM range between $0.05 and $0.07. When a whale market buys $20,000, price surges through $0.07. Beyond $0.07, no liquidity exists in the band, catapulting price to $0.15 on tiny volume.',
    commonMistakes: [
      'Executing large market orders into a CLMM pool without checking active tick depth.',
      'Assuming all Raydium pools behave with identical constant-product slippage.'
    ],
    question: {
      question: 'What happens in a CLMM pool when price moves outside the active concentrated liquidity range?',
      options: ['Trading is halted', 'Liquidity inside that specific band drops to zero, dramatically increasing slippage', 'Tokens are returned to wallet', 'The pool converts to a CEX orderbook'],
      correctIndex: 1,
      explanation: 'Once price exits the LP concentrated range, the liquidity providers are 100% in one asset and provide zero active depth beyond the boundary.'
    },
    assignment: {
      title: 'Pool Architecture Comparison',
      instructions: 'Locate one standard CPMM pair and one CLMM pair on Raydium and document their fee tier and liquidity distribution.',
      deliverables: ['Comparison summary highlighting slippage risk differences between the pools.']
    }
  },
  {
    id: 'l3-09', phaseId: 3, lessonNumber: 9,
    title: 'Meteora Dynamic AMM & DLMM Pools',
    difficulty: 'ADVANCED', estimatedTime: '18 min',
    objectives: [
      'Understand Meteora DLMM (Dynamic Liquidity Market Maker) bin mechanics',
      'Analyze dynamic fee models that scale with market volatility',
      'Identify how liquidity shape distributions (spot, curve, bid-ask) impact trade routing'
    ],
    keyConcepts: ['Meteora DLMM', 'Discrete Price Bins', 'Dynamic Swap Fees', 'Zero Slippage Bins'],
    deepDive: [
      'Meteora DLMM organizes liquidity into discrete price bins. Trades occurring entirely within a single bin experience zero slippage.',
      'Meteora introduces dynamic fees: during periods of intense volatility, swap fees automatically increase to compensate LPs and dampen predatory toxic arbitrage.',
      'Understanding bin mechanics helps traders anticipate support floors where large volumes of liquidity bins have been stacked.'
    ],
    realWorldExample: 'During a volatile token launch, a Meteora DLMM pool fee increases from 0.25% to 2.5% dynamically as volatility surges, preserving liquidity depth and preventing sandwich bots from draining the pool.',
    commonMistakes: [
      'Failing to notice higher dynamic fees during peak volatility on Meteora swaps.',
      'Confusing discrete bin swaps with continuous bonding curve swaps.'
    ],
    question: {
      question: 'What unique advantage does trading within a single active Meteora DLMM bin offer?',
      options: ['Zero slippage on the portion of the trade executed within the bin', 'No blockchain gas fee', '100% cashback', 'Guaranteed profit'],
      correctIndex: 0,
      explanation: 'Inside a single discrete bin, price is constant, meaning trades executing strictly within that bin incur zero price impact/slippage.'
    },
    assignment: {
      title: 'Meteora Bin Depth Analysis',
      instructions: 'Inspect a live Meteora DLMM pool on Meteora.ag. Identify the active bin, bin step percentage, and dynamic fee tier.',
      deliverables: ['Screenshot and writeup of the active bin distribution.']
    }
  },
  {
    id: 'l3-10', phaseId: 3, lessonNumber: 10,
    title: 'Token Accounts & Associated Token Accounts (ATAs)',
    difficulty: 'BEGINNER', estimatedTime: '14 min',
    objectives: [
      'Understand why Solana requires separate Associated Token Accounts (ATAs) for each token',
      'Calculate the rent exemption cost (~0.002 SOL) per new token account',
      'Use tools to close empty ATAs and reclaim locked SOL rent'
    ],
    keyConcepts: ['Associated Token Account (ATA)', 'Rent Exemption', 'SPL Token Program', 'Reclaiming Rent'],
    deepDive: [
      'On Solana, your main wallet address does not hold SPL tokens directly. Instead, a unique Associated Token Account (ATA) derived from your wallet and the token mint is created.',
      'Creating an ATA requires locking approximately 0.002039 SOL as "rent exemption" to store the account data on validators RAM.',
      'Active memecoin traders who trade hundreds of tokens often have 0.2 to 0.5 SOL locked up in dormant zero-balance token accounts that can be closed to reclaim funds.'
    ],
    realWorldExample: 'An active trencher notices their SOL balance is 0.4 SOL lower than expected after 200 quick trades. They run a rent reclamation tool (like Sol Incinerator or Phantom Manage Tokens), close 180 empty ATAs, and immediately recover 0.36 SOL.',
    commonMistakes: [
      'Closing an ATA while still holding a microscopic residual token dust balance that has future value.',
      'Not realizing that every new token traded deducts rent on first buy.'
    ],
    question: {
      question: 'Why does your SOL balance decrease slightly when you buy a brand-new token for the first time?',
      options: ['DEX fee theft', 'Creation of an Associated Token Account (ATA) requiring ~0.002 SOL rent exemption', 'Solana network tax', 'Phantom subscription fee'],
      correctIndex: 1,
      explanation: 'Creating a new on-chain token account requires locking rent in SOL to allocate storage on validator nodes.'
    },
    assignment: {
      title: 'ATA Audit & Rent Recovery',
      instructions: 'Inspect your active wallet on Solscan under the "Tokens" tab. Count how many zero-balance accounts exist.',
      deliverables: ['Log of total token accounts and estimated recoverable rent in SOL.']
    }
  },
  {
    id: 'l3-11', phaseId: 3, lessonNumber: 11,
    title: 'Burner Wallets & Hardware Wallet Partitioning',
    difficulty: 'INTERMEDIATE', estimatedTime: '16 min',
    objectives: [
      'Implement an air-gapped 3-tier wallet architecture (Vault, Staging, Burner)',
      'Isolate high-risk memecoin dApp connections from long-term capital',
      'Establish a strict fund transfer protocol to prevent catastrophic draining'
    ],
    keyConcepts: ['Vault Wallet', 'Burner Wallet', 'Isolation Architecture', 'Malicious Approvals'],
    deepDive: [
      'In the trenches, interacting with experimental launchpads, claim sites, and DEXs exposes your wallet to malicious smart contract drainers.',
      'A professional operator never connects their primary vault or cold storage hardware wallet to unknown dApps.',
      'The 3-tier architecture maintains: (1) Vault for long-term reserves (no dApp connections), (2) Staging wallet for liquidity allocation, and (3) Burner wallets with strictly disposable funds for daily execution.'
    ],
    realWorldExample: 'A trader accidentally signs a phishing transaction on a spoofed Telegram link. Because they used an isolated burner wallet with only 0.5 SOL, their loss is capped at $70, while their 200 SOL vault remains completely untouched.',
    commonMistakes: [
      'Connecting a ledger or main storage wallet to new memecoin claim airdrops.',
      'Storing recovery seed phrases in cloud notes, screenshots, or email.'
    ],
    question: {
      question: 'What is the primary role of a "Burner Wallet" in on-chain memecoin trading?',
      options: ['To hold long-term investments', 'To interact with high-risk DEXs and contracts with minimal capital exposure', 'To bypass blockchain taxes', 'To avoid paying gas fees'],
      correctIndex: 1,
      explanation: 'Burner wallets contain only the immediate capital needed for a trade, ensuring that a malicious drainer contract can never access your main funds.'
    },
    assignment: {
      title: '3-Tier Wallet Setup',
      instructions: 'Create a dedicated burner wallet in Phantom and map out your flow of funds from cold storage to execution.',
      deliverables: ['Diagram or written procedure for safe fund routing and quarantine.']
    }
  },
  {
    id: 'l3-12', phaseId: 3, lessonNumber: 12,
    title: 'Slippage Tolerance & Price Impact Guards on Solana Swaps',
    difficulty: 'INTERMEDIATE', estimatedTime: '15 min',
    objectives: [
      'Distinguish between Slippage Tolerance (market movement) and Price Impact (liquidity depth)',
      'Calculate optimal slippage percentages for various pool liquidity depths',
      'Prevent maximum extractable value (MEV) exploitation caused by excessive slippage'
    ],
    keyConcepts: ['Slippage Tolerance', 'Price Impact', 'Slippage Guard', 'Sandwich Exploits'],
    deepDive: [
      'Slippage tolerance is the maximum price deviation you permit between transaction submission and block execution.',
      'Price impact is the deterministic price movement caused by your trade size relative to pool liquidity reserves.',
      'Setting slippage to 20% or 50% "just to ensure the trade lands" is an open invitation for MEV bots to front-run and sandwich your swap, handing you the worst possible fill.'
    ],
    realWorldExample: 'A trader sets 25% slippage on a $1,000 swap in a $10,000 pool. An MEV searcher detects the transaction in the mempool, buys ahead of them, lets the user fill at +24.9% worst price, and dumps immediately for guaranteed profit.',
    commonMistakes: [
      'Using automatic 20%+ slippage on low-volatility pairs.',
      'Confusing high price impact (small pool) with high slippage settings.'
    ],
    question: {
      question: 'Why is setting 30% slippage dangerous on a decentralized exchange?',
      options: ['The blockchain will reject the transaction', 'MEV sandwich bots will deliberately manipulate the price up to your 30% limit to extract profit', 'Your wallet will be deleted', 'Gas fees triple automatically'],
      correctIndex: 1,
      explanation: 'Arbitrage and sandwich bots scan for high slippage transactions and manipulate the fill price to the exact outer limit of your tolerance.'
    },
    assignment: {
      title: 'Slippage Optimization Matrix',
      instructions: 'Build a reference table recommending slippage settings based on pool liquidity ($10k, $50k, $200k) and trade size ($100, $500, $2,000).',
      deliverables: ['Reference matrix document for fast execution decision making.']
    }
  },
  {
    id: 'l3-13', phaseId: 3, lessonNumber: 13,
    title: 'MEV & Sandwich Attack Protection on Solana',
    difficulty: 'ADVANCED', estimatedTime: '18 min',
    objectives: [
      'Understand how MEV searchers detect pending swaps and execute sandwich attacks',
      'Enable MEV protection features in routers and custom swap settings',
      'Recognize the on-chain signature pattern of a sandwich attack'
    ],
    keyConcepts: ['MEV (Maximal Extractable Value)', 'Sandwich Attack', 'Front-Running', 'Private RPC Routing'],
    deepDive: [
      'A sandwich attack occurs when a bot places a buy order immediately before your transaction and a sell order immediately after it in the exact same slot.',
      'Because the bot pushes the price up to your maximum slippage limit, you receive significantly fewer tokens than you should have.',
      'Protection requires three layers: (1) keeping slippage below 1-2% whenever possible, (2) using private routing or Jito bundle protection, and (3) avoiding massive single market orders in shallow liquidity pools.'
    ],
    realWorldExample: 'A user buys 10 SOL worth of a token. On Solscan, the block shows: Bot buys 20 SOL (TX 1), User buys 10 SOL (TX 2), Bot sells 20 SOL (TX 3). The bot pocketed 1.2 SOL in risk-free profit extracted directly from the user fill.',
    commonMistakes: [
      'Assuming Solana has zero MEV because it does not have a traditional public Ethereum mempool.',
      'Ignoring Jupiter built-in MEV protection toggles.'
    ],
    question: {
      question: 'What three consecutive transactions characterize a classic sandwich attack on-chain?',
      options: ['Transfer, stake, unstake', 'Attacker buy, victim buy, attacker sell in the same block', 'Mint, burn, freeze', 'Deposit, borrow, liquidate'],
      correctIndex: 1,
      explanation: 'The attacker buys ahead of the victim to artificially inflate price, absorbs the victim swap at the top, and sells immediately behind them for profit.'
    },
    assignment: {
      title: 'Sandwich Attack Identification',
      instructions: 'Find a real sandwich attack transaction sequence on Solana using Solscan or Birdeye trade history.',
      deliverables: ['Link to the victim transaction and documentation of the sandwiching bot addresses.']
    }
  },
  {
    id: 'l3-14', phaseId: 3, lessonNumber: 14,
    title: 'Trading Bots Overview: Telegram & Desktop Execution Bots',
    difficulty: 'INTERMEDIATE', estimatedTime: '20 min',
    objectives: [
      'Evaluate Telegram trading bots (Photon, BullX, Trojan, Banana Gun) vs web interfaces',
      'Configure auto-buy, auto-slippage, and quick tip settings',
      'Understand the custodial security tradeoffs of bot-generated private keys'
    ],
    keyConcepts: ['Telegram Bots', 'Execution Speed', 'Auto-Buy / Auto-Sell', 'Private Key Custody'],
    deepDive: [
      'In high-speed Solana trading, standard browser web interfaces can introduce 3 to 10 seconds of latency due to frontend rendering and wallet popups.',
      'Execution bots (such as Trojan, BullX, or Photon) communicate directly with private RPC clusters, achieving 1-click execution under 800 milliseconds.',
      'However, using trading bots requires depositing funds into a hot private key generated by the bot server. Never store your core net worth inside bot wallets; treat them strictly as transactional burner fuel.'
    ],
    realWorldExample: 'When a major influencer posts an address, traders using Phantom web popups take 8 seconds to approve and fill at 4x the price. A bot trader using pre-set 1-click auto-buy fills within 600 milliseconds at the base price.',
    commonMistakes: [
      'Leaving large balances of SOL sitting indefinitely inside third-party Telegram bot wallets.',
      'Not enabling anti-MEV and auto-slippage toggles in bot settings.'
    ],
    question: {
      question: 'What is the primary operational trade-off when using Telegram execution bots?',
      options: ['Faster execution speed vs increased custodial risk of hot server-stored private keys', 'Higher fees with slower execution', 'Inability to trade on Solana', 'Mandatory KYC requirements'],
      correctIndex: 0,
      explanation: 'Bots provide unmatched execution speed and 1-click swaps, but require entrusting funds to a hot wallet key managed by the bot platform.'
    },
    assignment: {
      title: 'Bot Configuration Protocol',
      instructions: 'Review a major execution bot interface and outline recommended safety settings for priority fees, slippage, and fund sweep limits.',
      deliverables: ['Standard operating procedure document for bot trading safety.']
    }
  }
];

console.log('Script loaded successfully. Ready to build modular files.');
module.exports = {
  createLessonCode,
  phase3Lessons
};
