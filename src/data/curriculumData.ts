import { Phase, VideoResource } from '../types';
import { PHASES_3_TO_12 } from './curriculumPhases3to12';
import { VERIFIED_VIDEOS } from './videoData';

export { VERIFIED_VIDEOS };

const INITIAL_PHASES: Phase[] = [
  // ==================== PHASE 01 ====================
  {
    id: 1,
    title: 'PHASE 01 — THE FOUNDATION',
    subtitle: 'Core Blockchain, Tokenomics, and Liquidity Mechanics',
    description: 'Build an unshakeable bedrock understanding of crypto markets. Learn why market cap and liquidity are the only metrics that matter, and how decentralized pools actually work.',
    levelRequired: 1,
    badge: 'FOUNDATION',
    practicalAssignment: {
      title: 'Analyze 10 Solana Tokens',
      description: 'Find 10 active tokens on Solana DEXs and compile an audit spreadsheet.',
      task: 'For each token document: Market Cap, Liquidity, 24h Volume, Total Holders, Token Age, and calculate the MC/Liquidity ratio. State whether the liquidity pool is healthy or vulnerable.'
    },
    quiz: {
      id: 'quiz-01',
      phaseId: 1,
      title: 'Phase 01 Assessment: Market Mechanics & Liquidity',
      passingScore: 75,
      questions: [
        {
          id: 'q1-1',
          question: 'A token has a $50,000 Market Cap and $5,000 in total Liquidity. Which statement is most accurate?',
          options: [
            'The token is extremely liquid and ready for $10,000 buys.',
            'The liquidity is fragile; even a moderate sell of $1,000 will cause massive price impact and slippage.',
            'Market cap and liquidity are identical in all automated market makers.',
            'The token cannot be sold until liquidity hits $50,000.'
          ],
          correctIndex: 1,
          explanation: 'Liquidity is the actual dollar reserve backing the pool. With only $5k total liquidity, selling $1,000 represents 20% of the entire pool reserves, triggering catastrophic negative slippage.',
          type: 'scenario'
        },
        {
          id: 'q1-2',
          question: 'What is the primary difference between Market Cap and Fully Diluted Valuation (FDV)?',
          options: [
            'Market Cap is only used on CEXs, while FDV is only used on DEXs.',
            'Market Cap calculates value of circulating tokens; FDV calculates value if 100% of maximum supply were circulating.',
            'Market Cap includes staked tokens, whereas FDV ignores team allocations.',
            'FDV is always smaller than Market Cap.'
          ],
          correctIndex: 1,
          explanation: 'Market Cap = Current Price × Circulating Supply. FDV = Current Price × Max Total Supply. When large supplies are locked and unlocked later, high FDV creates continuous downward sell pressure.',
          type: 'multiple-choice'
        },
        {
          id: 'q1-3',
          question: 'Why does "unit bias" (e.g., thinking a coin at $0.000004 is "cheaper" than a coin at $2.00) ruin beginner traders?',
          options: [
            'Because coins below $0.01 have higher network gas fees.',
            'Because price per token is arbitrary; market capitalization dictates the capital required to move price.',
            'Because cheaper tokens cannot be listed on Raydium.',
            'Because tokens with many zeroes are always audited by Solana Foundation.'
          ],
          correctIndex: 1,
          explanation: 'A token priced at $0.000004 with 100 trillion supply already has a $400,000,000 market cap, requiring hundreds of millions of dollars to double in price. Market cap, not unit price, determines affordability and upside potential.',
          type: 'scenario'
        },
        {
          id: 'q1-4',
          question: 'What happens when a decentralized liquidity pool (AMM) has 100% of its LP tokens burned?',
          options: [
            'The token can no longer be bought.',
            'The developer can pull the liquidity at any moment.',
            'The locked liquidity is permanently unrecoverable, meaning the pool can never be rug-pulled by removing the base SOL.',
            'All holder tokens are automatically sent to a burn address.'
          ],
          correctIndex: 2,
          explanation: 'Burning LP tokens sends them to an unrecoverable address (like `1111111...`), preventing the creator or anyone else from removing the underlying SOL from the automated market maker pool.',
          type: 'true-false'
        }
      ]
    },
    lessons: [
      {
        id: 'l1-01',
        phaseId: 1,
        lessonNumber: 1,
        title: 'What Is Crypto?',
        difficulty: 'BEGINNER',
        estimatedTime: '15 min',
        objectives: [
          'Understand how digital decentralized value differs from fiat banking systems',
          'Learn why censorship-resistance enables permissionless 24/7 on-chain trading',
          'Recognize why the absence of central clearing houses requires complete personal accountability'
        ],
        videos: [VERIFIED_VIDEOS.solanaEcosystem],
        keyConcepts: ['Decentralized Ledger', 'Permissionless Swaps', 'Self-Custodial Risk', 'Cryptographic Proof'],
        deepDive: [
          'Cryptocurrency represents cryptographic ownership recorded across a globally distributed network of independent validator nodes.',
          'Unlike traditional stock brokerages that operate between 9:30 AM and 4:00 PM with settlement clearing periods (T+1), on-chain markets never sleep. Transactions settle in sub-second blocks on Solana.',
          'With this freedom comes absolute responsibility: there is no customer support desk to reverse an accidental transfer or undo a bad trade.'
        ],
        realWorldExample: 'When trading on a Solana DEX, your trade is validated by hundreds of validator nodes worldwide within 400 milliseconds, without any bank or custodian approving your order.',
        commonMistakes: [
          'Expecting a customer support team or bank manager to refund a mistyped address or drained wallet.',
          'Assuming stock market rules (circuit breakers, market closures, trading halts) exist on-chain.'
        ],
        checkQuestions: [
          {
            question: 'If you sign a malicious transaction and lose funds on-chain, who can reverse it?',
            options: ['Solana customer support', 'Phantom wallet support', 'Nobody; on-chain transactions are irreversible', 'The DEX administrator'],
            correctIndex: 2,
            explanation: 'Blockchain transactions are immutable and decentralized; no central authority exists to reverse confirmed blocks.'
          }
        ],
        assignment: {
          title: 'Explorer Block Verification',
          instructions: 'Visit Solscan.io and inspect the latest validated block. Observe the slot number, block leader validator, and transaction throughput (TPS).',
          deliverables: ['Document the current live TPS of Solana and note 3 different transaction types executing in the block.']
        }
      },
      {
        id: 'l1-02',
        phaseId: 1,
        lessonNumber: 2,
        title: 'Blockchain in Plain English',
        difficulty: 'BEGINNER',
        estimatedTime: '20 min',
        objectives: [
          'Deconstruct blocks, transactions, and consensus mechanics without confusing jargon',
          'Understand how Solana achieves high throughput via Proof of History (PoH) and Proof of Stake (PoS)',
          'Learn how state accounts and SPL token balances are updated in real time'
        ],
        videos: [VERIFIED_VIDEOS.solanaEcosystem],
        keyConcepts: ['Proof of History', 'Validator Nodes', 'Account State', 'Slot Time'],
        deepDive: [
          'A blockchain is an append-only digital ledger. Each block references the cryptographic hash of the prior block, ensuring historical transactions cannot be modified.',
          'Solana introduces Proof of History (PoH)—a verifiable delay function clock that allows nodes to agree on the passage of time without having to communicate constantly before ordering transactions.',
          'This allows Solana to process 2,500+ transactions per second with an average confirmation time of 400 milliseconds, creating the fast-paced environment where memecoins trade.'
        ],
        realWorldExample: 'During a high-volatility token launch, thousands of buyers submit swaps simultaneously. Solana’s validator leader organizes and timestamps these swaps sequentially by slot.',
        commonMistakes: [
          'Confusing consensus mechanisms (thinking Solana is slow like Bitcoin or expensive like Ethereum mainnet).',
          'Not realizing that failed transactions still pay network priority fees because computational resources were spent.'
        ],
        checkQuestions: [
          {
            question: 'Why can Solana settle trades in 400 milliseconds while other chains take minutes?',
            options: ['It uses a centralized database server', 'Proof of History provides a cryptographic clock before consensus', 'It only allows 10 traders at a time', 'It skips transaction verification'],
            correctIndex: 1,
            explanation: 'Proof of History allows validators to timestamp and sequence incoming transactions without waiting for global node consensus chatter.'
          }
        ],
        assignment: {
          title: 'Transaction Lifecycle Trace',
          instructions: 'Look up a sample transaction signature on Solscan. Find the slot number, fee paid in SOL, and balance changes before and after.',
          deliverables: ['Note the fee in SOL and the compute units consumed by the swap.']
        }
      },
      {
        id: 'l1-03',
        phaseId: 1,
        lessonNumber: 3,
        title: 'Coins vs Tokens',
        difficulty: 'BEGINNER',
        estimatedTime: '15 min',
        objectives: [
          'Distinguish native layer-1 currency (SOL) from smart contract tokens (SPL tokens)',
          'Understand Associated Token Accounts (ATA) and rent exemption on Solana',
          'Recognize why you always need native SOL in your wallet to trade any token'
        ],
        videos: [VERIFIED_VIDEOS.solanaEcosystem],
        keyConcepts: ['Native Asset (SOL)', 'SPL Token Standard', 'Associated Token Account (ATA)', 'Rent Exemption'],
        deepDive: [
          'Native Coins: SOL is the native asset of the Solana blockchain. It pays for transaction gas, validator rewards, and storage rent.',
          'SPL Tokens: Every memecoin (e.g. BONK, WIF, POPCAT) is an SPL token created via the Solana Program Library Token program.',
          'When you buy a new memecoin for the first time, your wallet creates a sub-account called an Associated Token Account (ATA), locking approximately 0.002 SOL as refundable rent.'
        ],
        realWorldExample: 'You have 50,000 WIF tokens in your wallet, but if your native SOL balance drops to 0.000, you cannot send or sell your WIF because you have no SOL to pay transaction fees.',
        commonMistakes: [
          'Spending 100% of your SOL balance on a memecoin trade and leaving 0 SOL for network gas to exit the position.',
          'Always keep at least 0.05 to 0.1 SOL unallocated in your trading wallet strictly for transaction fees.'
        ],
        checkQuestions: [
          {
            question: 'What happens if you hold $10,000 in a memecoin but have 0.000 SOL in your wallet?',
            options: ['Your wallet automatically sells some memecoins to pay gas', 'You cannot execute any buy, sell, or transfer transaction', 'The DEX pays your gas', 'The transaction waits 24 hours'],
            correctIndex: 1,
            explanation: 'Solana requires native SOL to pay validator computational fees. Without SOL, your account cannot sign transactions.'
          }
        ],
        assignment: {
          title: 'Token Account Audit',
          instructions: 'Inspect your Phantom wallet or a public whale wallet on Solscan. Identify the native SOL balance vs SPL token sub-accounts.',
          deliverables: ['Screenshot or list 3 SPL token mint addresses held in the audited wallet.']
        }
      },
      {
        id: 'l1-04',
        phaseId: 1,
        lessonNumber: 4,
        title: 'Market Cap',
        difficulty: 'BEGINNER',
        estimatedTime: '20 min',
        objectives: [
          'Calculate Market Capitalization accurately: Price × Circulating Supply',
          'Dismantle the dangerous illusion of low token prices (unit bias)',
          'Assess realistic upside multipliers based on total market capitalization brackets'
        ],
        videos: [VERIFIED_VIDEOS.marketCap],
        keyConcepts: ['Circulating Supply', 'Market Cap Brackets', 'Capital Inflow Requirements', 'Unit Bias Trap'],
        deepDive: [
          'Market Cap = Current Token Price × Total Circulating Tokens.',
          'A token priced at $0.000001 with 1 trillion supply has a $1,000,000 market cap. If it doubles to $2,000,000 market cap, that requires substantial net liquidity inflow.',
          'Understanding brackets: Micro-cap ($10k - $250k: extreme volatility, high failure rate), Mid-cap ($1M - $10M: established community, sustained liquidity), High-cap ($50M+: major liquidity, lower percentage volatility).'
        ],
        realWorldExample: 'A trader buys a coin at $0.0001 expecting it to reach $1.00. However, at $1.00 with 10 billion tokens, the market cap would need to be $10,000,000,000 (larger than most multinational corporations). The trade was mathematically impossible.',
        commonMistakes: [
          'Believing a token will "reach $1" without calculating what market cap that implies.',
          'Comparing price tags across tokens with completely different circulating supplies.'
        ],
        checkQuestions: [
          {
            question: 'Token A has 1 billion supply and trades at $0.01. Token B has 100 billion supply and trades at $0.001. Which has the higher Market Cap?',
            options: ['Token A ($10M)', 'Token B ($100M)', 'They are identical', 'Neither has a market cap'],
            correctIndex: 1,
            explanation: 'Token A = 1,000,000,000 × $0.01 = $10,000,000. Token B = 100,000,000,000 × $0.001 = $100,000,000. Token B is 10x larger despite a lower unit price.'
          }
        ],
        assignment: {
          title: 'Market Cap Calculation Drill',
          instructions: 'Pick 5 random tokens on DexScreener. Manually multiply their token price by total supply and verify it matches the reported Market Cap.',
          deliverables: ['Show your math for all 5 tokens in your notebook.']
        }
      },
      {
        id: 'l1-05',
        phaseId: 1,
        lessonNumber: 5,
        title: 'FDV (Fully Diluted Valuation)',
        difficulty: 'BEGINNER',
        estimatedTime: '20 min',
        objectives: [
          'Define Fully Diluted Valuation (FDV) vs Market Cap',
          'Identify predatory vesting schedules and hidden token unlocks',
          'Evaluate why memecoins prefer 100% circulating supply at launch'
        ],
        videos: [VERIFIED_VIDEOS.marketCap],
        keyConcepts: ['Max Supply', 'Unlock Dilution', 'Vesting Schedules', 'Circulating Float'],
        deepDive: [
          'FDV = Current Token Price × Maximum Possible Supply.',
          'In predatory "low-float, high-FDV" tokens (common in VC-backed projects), only 10% of tokens circulate at launch. When the remaining 90% unlock for insiders, massive continuous selling crashes the price.',
          'Pure memecoins on Solana generally feature 100% circulating supply at launch, meaning Market Cap = FDV. This removes future inflation risk, though creator holding concentration remains a separate threat.'
        ],
        realWorldExample: 'A project launches with a $5M Market Cap and a $100M FDV. Over the next 12 months, 20 million new tokens unlock monthly. Even if new buyers enter, the perpetual selling pressure prevents price appreciation.',
        commonMistakes: [
          'Ignoring FDV when trading utility-backed memecoins with team vesting pools.',
          'Assuming a low Market Cap means low supply dilution.'
        ],
        checkQuestions: [
          {
            question: 'If a token has a $2M Market Cap and a $40M FDV, what does this tell an on-chain trader?',
            options: ['The token is undervalued', 'Only 5% of tokens are circulating; massive supply unlocks will dilute holders later', 'The token has 40 million dollars in cash reserves', 'It is a pure memecoin with no inflation'],
            correctIndex: 1,
            explanation: 'A huge gap between MC and FDV signals that future unlocked tokens will flood the market and dilute existing holders.'
          }
        ],
        assignment: {
          title: 'MC vs FDV Comparison',
          instructions: 'Find two tokens: one with MC = FDV (100% circulating) and one with MC < FDV. Note the difference in market dynamics.',
          deliverables: ['Summary table with token names, MC, FDV, and circulation percentage.']
        }
      },
      {
        id: 'l1-06',
        phaseId: 1,
        lessonNumber: 6,
        title: 'Liquidity',
        difficulty: 'BEGINNER',
        estimatedTime: '25 min',
        objectives: [
          'Understand how liquidity pools function as automated counterparties',
          'Differentiate between pool depth and market capitalization',
          'Calculate and evaluate the Liquidity-to-Market-Cap ratio'
        ],
        videos: [VERIFIED_VIDEOS.liquidityPools],
        keyConcepts: ['Automated Counterparty', 'Pool Depth', 'MC/Liquidity Ratio', 'Illiquid Traps'],
        deepDive: [
          'Liquidity is the actual reserve of trading currency (SOL or USDC) paired with the token in the smart contract pool.',
          'Market Cap is an imaginary valuation based on the last transaction price; Liquidity is the real, tangible money sitting in the vault to buy your tokens when you sell.',
          'Healthy Ratio: A sound memecoin typically maintains 15% to 30% of its Market Cap in liquidity. If a token reaches $1,000,000 MC with only $15,000 liquidity, any trader attempting to exit a $2,000 position will suffer severe price collapse.'
        ],
        realWorldExample: 'A token surges to $500,000 Market Cap on DexScreener. A trader holding $25,000 worth of tokens tries to sell, but the liquidity pool only contains $8,000 in SOL. The trader can only extract a fraction of their paper gains.',
        commonMistakes: [
          'Confusing paper wallet balance with extractable liquidity.',
          'Entering high dollar-size positions into tokens with paper-thin liquidity pools.'
        ],
        checkQuestions: [
          {
            question: 'What is a healthy Liquidity-to-Market-Cap ratio for a sustained Solana memecoin?',
            options: ['0.5% - 2%', '15% - 30%', 'Over 500%', '0%'],
            correctIndex: 1,
            explanation: 'A 15% - 30% ratio ensures sufficient buffer for normal trading volume without causing devastating price swings on regular sell orders.'
          }
        ],
        assignment: {
          title: 'Liquidity Depth Audit',
          instructions: 'Find 3 tokens on DexScreener with < $20,000 liquidity and 3 tokens with > $100,000 liquidity. Compare how a simulated $500 swap affects price on both.',
          deliverables: ['Record the simulated price impact percentage for all 6 tokens.']
        }
      },
      {
        id: 'l1-07',
        phaseId: 1,
        lessonNumber: 7,
        title: 'Trading Volume',
        difficulty: 'BEGINNER',
        estimatedTime: '20 min',
        objectives: [
          'Interpret 5m, 1h, and 24h trading volume as validation of price action',
          'Understand the Volume-to-Market-Cap velocity ratio',
          'Spot the difference between sustained organic volume and artificial spikes'
        ],
        videos: [VERIFIED_VIDEOS.dexscreenerMastery],
        keyConcepts: ['Trading Velocity', 'Volume Confirmation', 'Exhaustion Volume', 'Volume / MC Ratio'],
        deepDive: [
          'Volume measures the total dollar value of all swaps executed within a specific timeframe.',
          'Volume is the fuel that validates price movements. A breakout above a resistance level that occurs on light volume is prone to failure; a breakout accompanied by a massive volume surge demonstrates genuine demand absorption.',
          'High Volume / MC Ratio: When a $200k MC token trades $1M in volume over 24 hours, the token is experiencing rapid turnover and high speculative interest.'
        ],
        realWorldExample: 'A memecoin breaks out to a new high, but the 5-minute volume bar is half the size of prior consolidation bars. Smart traders recognize buyer exhaustion and avoid buying the top of the move.',
        commonMistakes: [
          'Trusting raw volume without verifying the number of unique traders (wash trading).',
          'Buying the climax volume bar after a 300% parabolic run.'
        ],
        checkQuestions: [
          {
            question: 'Why is a price breakout on declining volume considered dangerous?',
            options: ['Because the exchange will cancel the trades', 'Because it signals that buyers are drying up and cannot absorb future sell orders', 'Because declining volume always increases gas fees', 'Because market cap cannot increase without volume'],
            correctIndex: 1,
            explanation: 'Price moving higher on lower volume represents buyer exhaustion; when aggressive sellers enter, there are insufficient bids to support price.'
          }
        ],
        assignment: {
          title: 'Volume Analysis Exercise',
          instructions: 'Examine the 15-minute chart of a top-trending Solana token. Identify the highest volume candle of the day and note what price did next.',
          deliverables: ['Write a 3-sentence observation on whether the peak volume marked a continuation or a local top.']
        }
      },
      {
        id: 'l1-08',
        phaseId: 1,
        lessonNumber: 8,
        title: 'Slippage',
        difficulty: 'BEGINNER',
        estimatedTime: '15 min',
        objectives: [
          'Understand why slippage tolerance is necessary in fast on-chain execution',
          'Learn the trade-off between transaction certainty and execution price',
          'Configure slippage settings to minimize vulnerability to MEV sandwich bots'
        ],
        videos: [VERIFIED_VIDEOS.phantomWallet],
        keyConcepts: ['Slippage Tolerance', 'Execution Deviation', 'MEV Sandwich Bots', 'Front-Running'],
        deepDive: [
          'Slippage is the difference between the price you see on your screen when clicking "Swap" and the actual price when your transaction is processed into a block by a validator.',
          'Slippage Tolerance: Setting slippage to 1% tells the swap router to revert (cancel) the trade if the price moves against you by more than 1% before execution.',
          'MEV Sandwich Danger: If you set slippage excessively high (e.g. 15% - 25%), predatory MEV bots detect your pending transaction, buy immediately ahead of you, let your trade push price up to your maximum slippage limit, and sell immediately after you, pocketing the difference.'
        ],
        realWorldExample: 'A trader sets 20% slippage on Jupiter to buy a hyped token. An automated MEV bot detects the swap in the mempool, sandwiches the trade, and the user instantly receives 18% fewer tokens than market value.',
        commonMistakes: [
          'Setting 20%+ slippage permanently on all trades as a lazy way to ensure swaps never fail.',
          'Not using MEV protection or dynamic slippage features available on Jupiter.'
        ],
        checkQuestions: [
          {
            question: 'What is the primary risk of setting your slippage tolerance to 25% on a large trade?',
            options: ['Your wallet will be deleted', 'MEV sandwich bots will exploit the tolerance and give you the worst possible execution price', 'The transaction will take 10 minutes to process', 'The liquidity pool will reject your SOL'],
            correctIndex: 1,
            explanation: 'Arbitrage bots look for large orders with excessive slippage tolerance and sandwich them to extract risk-free profit from the trader.'
          }
        ],
        assignment: {
          title: 'Slippage Simulation',
          instructions: 'Open Jupiter aggregator (jup.ag). Test entering a $100 swap and compare 0.5%, 1%, and 5% slippage settings. Observe the minimum received calculation.',
          deliverables: ['Record the minimum received difference across all 3 settings.']
        }
      },
      {
        id: 'l1-09',
        phaseId: 1,
        lessonNumber: 9,
        title: 'Price Impact',
        difficulty: 'BEGINNER',
        estimatedTime: '15 min',
        objectives: [
          'Differentiate between Slippage (market movement) and Price Impact (pool displacement)',
          'Calculate price impact based on your order size versus pool reserves',
          'Use split orders and DCA execution to trade illiquid pairs safely'
        ],
        videos: [VERIFIED_VIDEOS.liquidityPools],
        keyConcepts: ['Price Impact', 'Constant Product Formula (x * y = k)', 'Order Splitting', 'Liquidity Depth'],
        deepDive: [
          'While slippage is caused by other market participants trading before you, Price Impact is caused by YOUR OWN order size relative to the liquidity pool.',
          'In an AMM using x * y = k, every buy removes tokens from the pool and deposits SOL, moving the price up along the curve during your single transaction.',
          'If you buy $2,000 of a token with only $10,000 liquidity, your own order will push the price up 20%+ against yourself. You pay a massive premium on the latter half of your purchase.'
        ],
        realWorldExample: 'A trader with $5,000 tries to buy an early token with $15,000 liquidity in one single transaction. DexScreener shows a -28% price impact warning. The trader executes anyway and instantly starts with a -28% unrealized loss.',
        commonMistakes: [
          'Ignoring the red Price Impact warning badge on DEX swap interfaces.',
          'Failing to split large entries into multiple smaller orders spread across 5 to 10 minutes.'
        ],
        checkQuestions: [
          {
            question: 'What causes Price Impact in an automated market maker?',
            options: ['Network congestion fees', 'Your own trade size changing the token ratio inside the liquidity pool', 'The token developer manually editing the price', 'A slow internet connection'],
            correctIndex: 1,
            explanation: 'Price impact is the mathematical consequence of your order shifting the asset reserves inside the constant-product pool.'
          }
        ],
        assignment: {
          title: 'Price Impact Observation',
          instructions: 'Simulate a $100, $500, and $2,500 trade on a micro-cap token on Raydium or Jupiter. Note how price impact scales non-linearly.',
          deliverables: ['Create a quick comparison table of order size vs price impact percentage.']
        }
      },
      {
        id: 'l1-10',
        phaseId: 1,
        lessonNumber: 10,
        title: 'DEX vs CEX',
        difficulty: 'BEGINNER',
        estimatedTime: '20 min',
        objectives: [
          'Contrast Decentralized Exchanges (DEX) with Centralized Exchanges (CEX)',
          'Understand order-book matching engines versus Automated Market Makers',
          'Know when a memecoin migrates from DEX trading to Tier-1 CEX listing'
        ],
        videos: [VERIFIED_VIDEOS.solanaEcosystem],
        keyConcepts: ['Custodial vs Non-Custodial', 'Order Book vs AMM', 'KYC & Access', 'Listing Life Cycle'],
        deepDive: [
          'CEX (Centralized Exchange, e.g. Binance, Coinbase): You deposit funds into the exchange’s custody. Trades are matched off-chain in a private matching database with an order book of limit orders.',
          'DEX (Decentralized Exchange, e.g. Raydium, Orca, Jupiter): You retain self-custody in your Phantom wallet. Trades execute transparently via on-chain smart contracts and liquidity pools.',
          'Memecoin Lifecycle: 99.9% of memecoins begin exclusively on DEXs. Only the top 0.01% with massive sustained community volume ever achieve CEX listings.'
        ],
        realWorldExample: 'When WIF was under $10M Market Cap, it was only tradable on Solana DEXs like Raydium. Months later, as daily volume hit hundreds of millions, Binance and Bybit listed it on their centralized order books.',
        commonMistakes: [
          'Waiting for a token to list on a CEX before learning to trade it (missing the initial on-chain move).',
          'Leaving trading capital sitting on a centralized exchange instead of managing a dedicated trading wallet.'
        ],
        checkQuestions: [
          {
            question: 'Where do all Solana memecoins launch and trade before any potential exchange listing?',
            options: ['On Wall Street', 'On Decentralized Exchanges (DEXs) like Raydium and Pump.fun', 'Directly inside Coinbase', 'On the Solana Foundation homepage'],
            correctIndex: 1,
            explanation: 'DEXs are permissionless; anyone can deploy a smart contract pool instantly without needing corporate approval.'
          }
        ],
        assignment: {
          title: 'DEX vs CEX Fee Audit',
          instructions: 'Compare the fee structure of a $200 swap on a Solana DEX (network fee + 0.3% pool fee) vs buying on a centralized exchange with fiat deposit fees.',
          deliverables: ['Write a 2-paragraph comparison of execution cost and speed.']
        }
      },
      {
        id: 'l1-11',
        phaseId: 1,
        lessonNumber: 11,
        title: 'Wallets & Self-Custody',
        difficulty: 'BEGINNER',
        estimatedTime: '25 min',
        objectives: [
          'Master the anatomy of a self-custody wallet: Public Key vs Private Key / Seed Phrase',
          'Implement a multi-wallet security architecture: Cold Storage vs Hot Trading Burner',
          'Prevent common phishing scams, drainer contracts, and malicious signatures'
        ],
        videos: [VERIFIED_VIDEOS.phantomWallet],
        keyConcepts: ['Public Address', 'Private Seed Phrase', 'Burner Wallet Strategy', 'Signature Simulation'],
        deepDive: [
          'Public Key: Your receiving address (like an email address). Safe to share publicly.',
          'Private Key / Seed Phrase: The master cryptographic key that controls all assets. Anyone with your 12 or 24 words owns everything in that wallet. Never enter your seed phrase online, ever.',
          'The 2-Wallet Architecture: (1) Safe Vault: Stores your core net worth, staking assets, and long-term holds. Never connects to unknown dApps. (2) Trench Burner Wallet: Only holds the exact capital allocated for active day trading. If a malicious contract is signed, only the burner capital is lost.'
        ],
        realWorldExample: 'A trader keeps 500 SOL in a cold ledger wallet. For trading memecoins, they transfer 5 SOL into a dedicated Phantom burner wallet. If they accidentally approve a phishing link, their 500 SOL remains completely secure.',
        commonMistakes: [
          'Storing seed phrases in Apple Notes, Google Docs, Telegram saved messages, or cloud screenshots.',
          'Connecting your primary savings wallet to unverified Telegram trading bots or new DEX websites.'
        ],
        checkQuestions: [
          {
            question: 'What should you do if an "official support agent" asks for your 12-word recovery seed phrase?',
            options: ['Give it to them immediately', 'Block and report them immediately; legitimate projects will NEVER ask for your seed phrase', 'Give them the first 6 words only', 'Email it to Solana Labs'],
            correctIndex: 1,
            explanation: 'Anyone asking for your seed phrase is an active scammer attempting to drain your funds.'
          }
        ],
        assignment: {
          title: 'Burner Wallet Setup',
          instructions: 'Create a distinct secondary wallet account in Phantom labeled "Trench Burner". Ensure it has its own private key and is segregated from your primary holdings.',
          deliverables: ['Confirm the burner wallet address and verify transaction history is isolated.']
        }
      },
      {
        id: 'l1-12',
        phaseId: 1,
        lessonNumber: 12,
        title: 'Solana Fundamentals for Traders',
        difficulty: 'BEGINNER',
        estimatedTime: '20 min',
        objectives: [
          'Understand Solana’s computational architecture: Program Derived Addresses (PDAs) and SPL Token standard',
          'Learn how priority fees and compute units determine transaction landing rate',
          'Synthesize all Phase 01 principles into a holistic market evaluation framework'
        ],
        videos: [VERIFIED_VIDEOS.solanaEcosystem],
        keyConcepts: ['Compute Budget', 'Priority Fee Markets', 'Transaction Landing', 'Phase 01 Synthesis'],
        deepDive: [
          'Solana uses a localized fee market. When a specific token is experiencing high demand, transactions targeting that specific account must compete by offering higher priority fees (measured in micro-lamports per compute unit).',
          'Understanding this mechanics prevents dropped transactions during critical entry and exit moments.',
          'You are now equipped with the vocabulary and mechanics needed to read live charts and order flow in Phase 02.'
        ],
        realWorldExample: 'During a volatile sell-off, standard 0.000005 SOL priority fee transactions fail because validators prioritize blocks with higher priority bids. A trader using dynamic 0.002 SOL priority exits cleanly at their target price.',
        commonMistakes: [
          'Using default minimum gas fees during peak network volatility.',
          'Not reviewing failed transaction logs on Solscan to understand why a swap reverted.'
        ],
        checkQuestions: [
          {
            question: 'What is the purpose of setting a priority fee on Solana during high-volume trading?',
            options: ['To donate funds to the DEX developers', 'To incentivize validators to include your transaction ahead of others in the current block', 'To lower your slippage to zero', 'To burn token supply'],
            correctIndex: 1,
            explanation: 'Priority fees reward validators for prioritizing your transaction in block construction during network congestion.'
          }
        ],
        assignment: {
          title: 'Phase 01 Final Synthesis Drill',
          instructions: 'Execute the Phase 01 Practical Assignment: Inspect 10 Solana tokens and document their MC, Liquidity, 24h Volume, Holder Count, and MC/Liquidity ratio.',
          deliverables: ['Submit your 10-token analysis sheet and complete the Phase 01 Quiz.']
        }
      }
    ]
  },

  // ==================== PHASE 02 ====================
  {
    id: 2,
    title: 'PHASE 02 — READING THE MARKET',
    subtitle: 'Price Action, Candlestick Anatomy, and Market Structure',
    description: 'Stop guessing and start reading raw price action. Master candlestick wicks, multi-timeframe structures, support/resistance zones, breaks of structure (BOS), and false breakouts.',
    levelRequired: 2,
    badge: 'MARKET_READER',
    practicalAssignment: {
      title: 'Analyze 20 Live Charts',
      description: 'Audit 20 memecoin charts on DexScreener across 5m and 15m timeframes.',
      task: 'For each chart, identify: (1) Primary trend direction, (2) Most recent Break of Structure (BOS), (3) Key support and resistance zones, (4) Wick rejection zones, and (5) State whether the market is in Expansion or Consolidation.'
    },
    quiz: {
      id: 'quiz-02',
      phaseId: 2,
      title: 'Phase 02 Assessment: Price Action & Market Structure',
      passingScore: 75,
      questions: [
        {
          id: 'q2-1',
          question: 'What does a long upper wick with a small candle body at key resistance indicate?',
          options: [
            'Aggressive buyer continuation and imminent breakout',
            'Strong selling pressure absorbing buyers and rejecting higher prices',
            'The chart is broken',
            'All holders have locked their tokens'
          ],
          correctIndex: 1,
          explanation: 'A long upper wick shows that price was driven higher during the period, but sellers overwhelmed buyers and drove price back down before candle close.',
          type: 'scenario'
        },
        {
          id: 'q2-2',
          question: 'In market structure, what constitutes a valid "Break of Structure" (BOS) in an uptrend?',
          options: [
            'Any momentary wick above a previous high',
            'A candle body clearly closing above the previous swing high on the reference timeframe',
            'Volume increasing by exactly 10%',
            'The developer sending a message in Telegram'
          ],
          correctIndex: 1,
          explanation: 'A true Break of Structure requires conviction, confirmed when a candle body closes beyond the previous swing high, invalidating previous resistance.',
          type: 'multiple-choice'
        },
        {
          id: 'q2-3',
          question: 'Why is analyzing higher timeframes (e.g. 1h / 15m) essential before entering on a 1m chart?',
          options: [
            'Because 1m charts are fake',
            'Higher timeframes dictate the dominant trend and key liquidity zones; 1m price action is mostly market noise',
            '1m charts only work for Bitcoin',
            'Higher timeframes have lower gas fees'
          ],
          correctIndex: 1,
          explanation: 'A 1-minute breakout inside a 1-hour downtrend is frequently just a minor pullback offering exit liquidity to higher-timeframe sellers.',
          type: 'scenario'
        },
        {
          id: 'q2-4',
          question: 'What is a "Failed Breakout" (Bull Trap)?',
          options: [
            'When the DEX shuts down',
            'When price pierces above resistance, traps breakout buyers, and then immediately plunges back below the level on heavy selling',
            'When a token doubles in price in 5 minutes',
            'When slippage is set to 0%'
          ],
          correctIndex: 1,
          explanation: 'Bull traps occur when smart money pushes price briefly above visible resistance to trigger stop orders and attract breakout buyers, only to dump large positions into the liquidity.',
          type: 'true-false'
        }
      ]
    },
    lessons: [
      {
        id: 'l2-01',
        phaseId: 2,
        lessonNumber: 1,
        title: 'Candlesticks Fundamentals',
        difficulty: 'BEGINNER',
        estimatedTime: '20 min',
        objectives: [
          'Deconstruct candlestick anatomy: Open, High, Low, Close (OHLC)',
          'Understand green (bullish) vs red (bearish) candle mechanics',
          'Read market sentiment directly from candle proportions'
        ],
        videos: [VERIFIED_VIDEOS.candlesticks],
        keyConcepts: ['OHLC Anatomy', 'Buyer vs Seller Equilibrium', 'Candle Range', 'Periodicity'],
        deepDive: [
          'Every candlestick represents a battle between buyers and sellers over a defined interval (e.g. 1m, 5m, 1h).',
          'The body represents the distance between Open and Close. The wicks (shadows) represent the extreme price points reached during that period before retreat.'
        ],
        realWorldExample: 'On a 5-minute DexScreener chart, a green candle with a large full body and no upper wick indicates persistent buying pressure from the opening second to the closing second.',
        commonMistakes: [
          'Focusing only on the color of the candle rather than the size of the body relative to the wicks.',
          'Judging a candle before it has officially closed.'
        ],
        checkQuestions: [
          {
            question: 'When is a candlestick pattern officially confirmed?',
            options: ['As soon as it touches a high', 'Only after the timeframe period has ended and the candle closes', 'Halfway through the minute', 'When a whale tweets'],
            correctIndex: 1,
            explanation: 'Candle patterns can change drastically in their final seconds; trading before the close is trading on incomplete data.'
          }
        ],
        assignment: {
          title: 'Candle Breakdown Sheet',
          instructions: 'Find 5 different candle shapes on a 15m chart: Marubozu (no wicks), Hammer, Shooting Star, Doji, and High-Wave. Sketch or annotate their OHLC.',
          deliverables: ['Submit annotated images or notes of all 5 patterns.']
        }
      },
      {
        id: 'l2-02',
        phaseId: 2,
        lessonNumber: 2,
        title: 'Wick vs Body: Who Won the Auction?',
        difficulty: 'BEGINNER',
        estimatedTime: '20 min',
        objectives: [
          'Interpret candle wicks as rejected liquidity zones',
          'Evaluate body size as proof of directional conviction',
          'Recognize absorption at key support and resistance boundaries'
        ],
        videos: [VERIFIED_VIDEOS.candlesticks],
        keyConcepts: ['Wick Rejection', 'Buyer Absorption', 'Exhaustion Wicks', 'Body Dominance'],
        deepDive: [
          'The body of the candle shows where the market accepted price (the close). The wicks show where the market tested price and rejected it.',
          'A long lower wick at support means sellers tried to break the level, but aggressive buyers stepped in, absorbed every sell order, and forced price back up.'
        ],
        realWorldExample: 'A token drops from $0.05 to $0.035. Within the same 5-minute candle, buyers push it back to $0.048. The resulting candle is a massive hammer with a 70% lower wick—signaling strong demand.',
        commonMistakes: [
          'Panic selling during a wick before seeing whether buyers absorb the drop and close the candle high.',
          'Buying the top of a long upper wick.'
        ],
        checkQuestions: [
          {
            question: 'What does a long lower wick at a known support level indicate?',
            options: ['Sellers have complete control', 'Buyers stepped in and absorbed all sell orders before the candle closed', 'The contract has a freeze authority', 'Volume has stopped'],
            correctIndex: 1,
            explanation: 'Long lower wicks represent strong buyer absorption and price rejection at lower levels.'
          }
        ],
        assignment: {
          title: 'Wick Rejection Catalog',
          instructions: 'Locate 3 distinct lower-wick rejection candles at support and 3 upper-wick rejection candles at resistance on live Solana pairs.',
          deliverables: ['Document price levels and outcome following the rejection candles.']
        }
      },
      {
        id: 'l2-03',
        phaseId: 2,
        lessonNumber: 3,
        title: 'Timeframes & Multi-Timeframe Alignment',
        difficulty: 'INTERMEDIATE',
        estimatedTime: '25 min',
        objectives: [
          'Establish a multi-timeframe hierarchy: 1h (Macro Trend), 15m (Structure), 5m/1m (Execution)',
          'Avoid the noise and emotional traps of looking exclusively at the 1-minute chart',
          'Align lower-timeframe entry triggers with higher-timeframe structural bias'
        ],
        videos: [VERIFIED_VIDEOS.candlesticks],
        keyConcepts: ['Timeframe Hierarchy', 'Macro vs Micro Trend', 'Execution Filtering', 'Noise Elimination'],
        deepDive: [
          'Top-down analysis rule: Never take a trade on the 1m chart that directly opposes the structure of the 15m chart.',
          'The 1-minute chart is filled with algorithmic bot noise and minor liquidity sweeps. The 15m and 1h charts show true institutional and whale footprint.'
        ],
        realWorldExample: 'A 1m chart shows a "double bottom" and appears ready to explode. But the 1h chart shows price is in a severe markdown cycle below key resistance. The 1m breakout instantly fails.',
        commonMistakes: [
          'Staring exclusively at the 1m chart and getting whipped out of positions by minor wicks.',
          'Ignoring the 1h trend when deciding whether to hold a runner.'
        ],
        checkQuestions: [
          {
            question: 'Which timeframe provides the most reliable market structure for a Solana day trade?',
            options: ['10-second chart', '1-minute chart', '15-minute chart aligned with 1-hour trend', 'The yearly chart'],
            correctIndex: 2,
            explanation: 'The 15m timeframe balances speed with structural clarity, filtering out the random noise of 1m ticks.'
          }
        ],
        assignment: {
          title: 'Multi-Timeframe Audit',
          instructions: 'Open a token on DexScreener. Screenshot the 1h, 15m, and 1m charts side by side. Determine whether all 3 timeframes are aligned in the same direction.',
          deliverables: ['State your structural bias (Bullish / Bearish / Neutral) with rationale.']
        }
      },
      {
        id: 'l2-04',
        phaseId: 2,
        lessonNumber: 4,
        title: 'Support, Resistance & Supply Zones',
        difficulty: 'BEGINNER',
        estimatedTime: '25 min',
        objectives: [
          'Draw horizontal support and resistance as dynamic zones rather than razor-thin lines',
          'Understand the psychology behind support: trapped buyers, unfulfilled limit orders, and value consensus',
          'Learn the Role Reversal Principle: Old Resistance Becomes New Support (Flip)'
        ],
        videos: [VERIFIED_VIDEOS.supportResistance],
        keyConcepts: ['Support & Resistance Zones', 'Role Reversal (S/R Flip)', 'Liquidity Pools', 'Touch Validation'],
        deepDive: [
          'Support is a price region where demand is strong enough to halt or reverse price depreciation.',
          'Resistance is a price ceiling where supply overwhelms incoming bids.',
          'The more times a level is touched, the weaker it often becomes in fast memecoin markets because resting limit orders get consumed.'
        ],
        realWorldExample: 'A token struggles to break $0.10, hitting it four times and falling. On the fifth attempt, heavy volume pushes price to $0.12. When price pulls back to $0.10, former resistance flips into support and bounces hard.',
        commonMistakes: [
          'Drawing 30 different lines on a chart until the chart becomes unreadable.',
          'Treating levels as exact numbers rather than price ranges (zones).'
        ],
        checkQuestions: [
          {
            question: 'What happens when price decisively breaks above a proven resistance level on high volume?',
            options: ['The token is immediately delisted', 'The old resistance level frequently flips into new support on subsequent pullbacks', 'Price must fall to zero immediately', 'Slippage increases to 100%'],
            correctIndex: 1,
            explanation: 'The S/R Flip principle is one of the most reliable technical setups in trading: former resistance becomes new support.'
          }
        ],
        assignment: {
          title: 'S/R Mapping Exercise',
          instructions: 'Map 3 key horizontal zones on a 15m chart of a top-50 Solana token. Mark at least one confirmed S/R flip.',
          deliverables: ['Submit chart screenshot showing the drawn zones and flip point.']
        }
      },
      {
        id: 'l2-05',
        phaseId: 2,
        lessonNumber: 5,
        title: 'Market Structure: Trend, Higher Highs & Higher Lows',
        difficulty: 'INTERMEDIATE',
        estimatedTime: '25 min',
        objectives: [
          'Identify bullish market structure: Higher Highs (HH) and Higher Lows (HL)',
          'Identify bearish market structure: Lower Highs (LH) and Lower Lows (LL)',
          'Spot the early warning signs of trend exhaustion'
        ],
        videos: [VERIFIED_VIDEOS.candlesticks],
        keyConcepts: ['Higher Highs (HH)', 'Higher Lows (HL)', 'Lower Highs (LH)', 'Lower Lows (LL)', 'Trend Definition'],
        deepDive: [
          'An uptrend is defined simply as a continuous sequence of Higher Highs and Higher Lows.',
          'As long as price produces Higher Lows, the structural trend remains intact. A trend is NOT invalidated by a red candle—it is only invalidated when a prior swing low is broken.'
        ],
        realWorldExample: 'A token pulls back 25% from its high. Inexperienced traders panic sell. A structural trader notices the pullback formed a Higher Low above the previous swing low, confirming the uptrend is still healthy.',
        commonMistakes: [
          'Calling a trend reversal on a single 1-minute red candle.',
          'Buying tokens that are in confirmed downtrends of Lower Highs and Lower Lows hoping for a random bounce.'
        ],
        checkQuestions: [
          {
            question: 'When is a bullish market structure officially intact?',
            options: ['Whenever price goes up 10%', 'As long as price continues creating Higher Highs and Higher Lows', 'When the developer conducts an AMA', 'Only when volume is 100% buys'],
            correctIndex: 1,
            explanation: 'A bullish trend is structurally verified by the formation of consecutive Higher Highs and Higher Lows.'
          }
        ],
        assignment: {
          title: 'Structure Annotation Drill',
          instructions: 'Annotate a 15m chart identifying 3 Higher Highs, 3 Higher Lows, and point out the key swing low that protects the uptrend.',
          deliverables: ['Marked chart with HH and HL tags labeled clearly.']
        }
      },
      {
        id: 'l2-06',
        phaseId: 2,
        lessonNumber: 6,
        title: 'Break of Structure (BOS) & Change of Character (CHoCH)',
        difficulty: 'INTERMEDIATE',
        estimatedTime: '25 min',
        objectives: [
          'Differentiate between minor internal breaks and major swing Break of Structure (BOS)',
          'Identify Change of Character (CHoCH) as the earliest structural warning of trend shifts',
          'Avoid entering prematurely before structural candle close confirmation'
        ],
        videos: [VERIFIED_VIDEOS.supportResistance],
        keyConcepts: ['Break of Structure (BOS)', 'Change of Character (CHoCH)', 'Swing Points', 'Structural Invalidation'],
        deepDive: [
          'BOS (Break of Structure): A continuation event where price breaks beyond a previous swing point in the direction of the dominant trend.',
          'CHoCH (Change of Character): The first structural shift where price breaks the most recent Higher Low in an uptrend (or Lower High in a downtrend), signaling that market control has flipped.'
        ],
        realWorldExample: 'A memecoin has made 5 higher lows. At $0.08, price suddenly closes below the previous $0.082 swing low. This is a CHoCH: the uptrend has lost structural integrity and smart money exits.',
        commonMistakes: [
          'Confusing a wick liquidity sweep with a true body close Break of Structure.',
          'Holding onto losing positions after a confirmed CHoCH to the downside.'
        ],
        checkQuestions: [
          {
            question: 'What is the primary significance of a Change of Character (CHoCH) in an uptrend?',
            options: ['It means you should double your position size', 'It is the first technical signal that buyers failed to protect the recent swing low, warning of an impending trend reversal', 'It means the liquidity pool was burned', 'It is an automated buy signal'],
            correctIndex: 1,
            explanation: 'CHoCH signals a structural shift where the market transitions from bullish higher-low progression to potential distribution or markdown.'
          }
        ],
        assignment: {
          title: 'CHoCH Identification',
          instructions: 'Find a chart on DexScreener that recently reversed from uptrend to downtrend. Pinpoint the exact candle where CHoCH occurred.',
          deliverables: ['Record the timestamp, price level, and post-CHoCH drawdown.']
        }
      },
      {
        id: 'l2-07',
        phaseId: 2,
        lessonNumber: 7,
        title: 'Reclaims & Liquidity Sweeps',
        difficulty: 'ADVANCED',
        estimatedTime: '30 min',
        objectives: [
          'Understand how smart money engineers liquidity sweeps below visible support',
          'Identify a valid "Reclaim" setup for high-probability, low-risk entries',
          'Define the exact stop loss placement below the sweep wick'
        ],
        videos: [VERIFIED_VIDEOS.supportResistance],
        keyConcepts: ['Liquidity Sweep', 'False Breakdown', 'Reclaim Validation', 'Stop Hunting'],
        deepDive: [
          'Retail traders place their stop losses just below obvious horizontal support levels. Whales and market makers know this.',
          'A Liquidity Sweep occurs when price deliberately pierces below support to trigger those retail stop-loss market sells. Smart money absorbs those cheap sell orders, and then price snaps right back above support.',
          'The Reclaim Entry: When price closes back ABOVE the broken support level, enter long with an invalidation stop loss just below the sweep wick.'
        ],
        realWorldExample: 'Support is at $1.00. Price flashes down to $0.94 for 3 minutes, wiping out retail stops, then closes the 5m candle at $1.02. A reclaim is confirmed. Price rallies 40% from the reclaimed level.',
        commonMistakes: [
          'Selling in panic at the exact moment support is pierced (selling into the sweep).',
          'Not waiting for the candle close to confirm the reclaim before entering.'
        ],
        checkQuestions: [
          {
            question: 'Why do reclaim setups offer exceptional risk-to-reward ratios?',
            options: ['Because you can use 100x leverage', 'Because your invalidation is clearly defined just below the sweep wick, providing a tight stop with massive upside potential', 'Because the token developer guarantees it', 'Because slippage is zero'],
            correctIndex: 1,
            explanation: 'Reclaims give you an objective structural invalidation: if price breaks back below the sweep wick, the trade setup is immediately dead.'
          }
        ],
        assignment: {
          title: 'Reclaim Study',
          instructions: 'Locate 2 successful reclaim setups and 1 failed reclaim setup on a 5m chart. Document the entry price, invalidation price, and eventual outcome.',
          deliverables: ['Summary writeup with risk/reward calculation.']
        }
      },
      {
        id: 'l2-08',
        phaseId: 2,
        lessonNumber: 8,
        title: 'Consolidation, Range Bounds & Volatility Contraction',
        difficulty: 'INTERMEDIATE',
        estimatedTime: '20 min',
        objectives: [
          'Identify trading ranges: Range High (RH), Range Low (RL), and Equilibrium (EQ)',
          'Understand Volatility Contraction: why tight ranges precede violent expansions',
          'Avoid getting chopped up inside the middle of a consolidation range'
        ],
        videos: [VERIFIED_VIDEOS.candlesticks],
        keyConcepts: ['Range Trading', 'Equilibrium (EQ)', 'Volatility Compression', 'Chop Zone Avoidance'],
        deepDive: [
          'Markets spend 70% of their time consolidating in ranges and only 30% trending.',
          'Inside a range, trading the middle (EQ) is financial suicide. Smart traders either trade the range extremes (buy at Range Low, sell at Range High) or wait for a confirmed breakout of the entire range.'
        ],
        realWorldExample: 'A token trades between $0.020 and $0.025 for 18 hours. Volatility compresses to narrow Doji candles. Suddenly, volume doubles, price breaks $0.025, and expands rapidly to $0.040.',
        commonMistakes: [
          'Taking aggressive breakout entries in the exact middle of a range.',
          'Failing to recognize that low volatility is the precursor to massive volatility.'
        ],
        checkQuestions: [
          {
            question: 'Where is the worst place to open a new position during a range-bound market?',
            options: ['At Range Low support', 'At Range High resistance', 'Directly in the middle of the range (Equilibrium) where probability is 50/50 chop', 'After a confirmed range breakout'],
            correctIndex: 2,
            explanation: 'The middle of a range offers poor risk/reward and is subject to random two-sided chop.'
          }
        ],
        assignment: {
          title: 'Range Box Identification',
          instructions: 'Draw a range box around a consolidating token on DexScreener. Identify Range High, Range Low, and EQ.',
          deliverables: ['Annotated range chart with clear bounds.']
        }
      },
      {
        id: 'l2-09',
        phaseId: 2,
        lessonNumber: 9,
        title: 'Breakouts vs Failed Breakouts (Bull Traps)',
        difficulty: 'ADVANCED',
        estimatedTime: '30 min',
        objectives: [
          'Define the strict criteria for a validated breakout: Close + Volume + Retest',
          'Detect the anatomy of a Bull Trap before you get trapped at the top',
          'Implement the Retest Entry strategy to eliminate false breakout risk'
        ],
        videos: [VERIFIED_VIDEOS.supportResistance],
        keyConcepts: ['Breakout Validation', 'Retest Entry', 'Bull Trap Anatomy', 'Volume Confirmation'],
        deepDive: [
          'Criteria for a real breakout: (1) Full candle body closes outside the resistance zone, (2) Relative volume is at least 2x the 20-period moving average, (3) Pullback retests former resistance as support without falling back inside.',
          'If a candle pierces resistance but closes with a long upper wick, it is NOT a breakout—it is a failed test and an invitation to get dumped on.'
        ],
        realWorldExample: 'Token hits resistance at $0.05. A green candle shoots to $0.058. FOMO buyers jump in at $0.056. By minute 4, the candle retraces all the way to $0.048, leaving a giant upper wick. Breakout buyers are trapped underwater.',
        commonMistakes: [
          'Buying the very top of the breakout candle while it is still forming.',
          'Not having an automatic invalidation plan if price closes back inside the prior range.'
        ],
        checkQuestions: [
          {
            question: 'What is the safest entry technique when trading a high-conviction breakout?',
            options: ['Market buy before the resistance is reached', 'Wait for the candle to close above resistance and enter on a successful retest of the broken level', 'Use 100% of your capital at the wick high', 'Buy only when gas fees are high'],
            correctIndex: 1,
            explanation: 'The retest entry confirms that old resistance has converted into new support, dramatically reducing false breakout risk.'
          }
        ],
        assignment: {
          title: 'Breakout vs Fakeout Audit',
          instructions: 'Find 2 real breakouts that sustained trend continuation, and 2 fakeouts that trapped buyers. Note the volume differences.',
          deliverables: ['4-chart comparison writeup highlighting volume and wick behavior.']
        }
      }
    ]
  }
];

export const CURRICULUM_DATA: Phase[] = [...INITIAL_PHASES, ...PHASES_3_TO_12];

export const TOTAL_CURRICULUM_LESSONS = CURRICULUM_DATA.reduce(
  (acc, phase) => acc + phase.lessons.length,
  0
);
export const TOTAL_CURRICULUM_PHASES = CURRICULUM_DATA.length;

export function getPhaseById(id: number): Phase | undefined {
  return CURRICULUM_DATA.find(p => p.id === id);
}

export function getLessonById(lessonId: string): { phase: Phase; lesson: Phase['lessons'][0] } | undefined {
  for (const phase of CURRICULUM_DATA) {
    const lesson = phase.lessons.find(l => l.id === lessonId);
    if (lesson) {
      return { phase, lesson };
    }
  }
  return undefined;
}
