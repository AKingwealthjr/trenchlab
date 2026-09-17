import { VideoResource } from '../types';

export const VERIFIED_VIDEOS: Record<string, VideoResource> = {
  whatIsCrypto: {
    title: 'What is Cryptocurrency? (Animated Explanation for Beginners)',
    creator: 'Whiteboard Crypto',
    url: 'https://www.youtube.com/watch?v=rYQgy8QDEBI',
    youtubeId: 'rYQgy8QDEBI',
    duration: '06:38',
    difficulty: 'BEGINNER',
    whyUseful: 'Explains digital decentralized ledgers, cryptography, and personal custody without technical jargon.'
  },
  blockchainBasics: {
    title: 'How Does a Blockchain Work - Simply Explained',
    creator: 'Simply Explained',
    url: 'https://www.youtube.com/watch?v=SSo_EIwHSd4',
    youtubeId: 'SSo_EIwHSd4',
    duration: '05:59',
    difficulty: 'BEGINNER',
    whyUseful: 'Clear visual breakdown of blocks, cryptographic hashes, distributed consensus, and transaction immutability.'
  },
  coinsVsTokens: {
    title: 'The Difference Between Coins and Tokens (Explained)',
    creator: 'Whiteboard Crypto',
    url: 'https://www.youtube.com/watch?v=t0T8t2a65-Y',
    youtubeId: 't0T8t2a65-Y',
    duration: '08:32',
    difficulty: 'BEGINNER',
    whyUseful: 'Explains native Layer-1 coins vs smart contract tokens and why gas fees always require native SOL.'
  },
  liquidityPools: {
    title: 'What is a Liquidity Pool in Crypto? (Animated)',
    creator: 'Whiteboard Crypto',
    url: 'https://www.youtube.com/watch?v=cCOhk_z17m4',
    youtubeId: 'cCOhk_z17m4',
    duration: '11:42',
    difficulty: 'BEGINNER',
    whyUseful: 'Clear visual demonstration of constant product AMM mechanics, pool ratio pricing, and impermanent loss basics.'
  },
  marketCap: {
    title: 'What is Market Cap in Cryptocurrency? (Explained)',
    creator: 'Whiteboard Crypto',
    url: 'https://www.youtube.com/watch?v=g6B3g-L31_o',
    youtubeId: 'g6B3g-L31_o',
    duration: '08:15',
    difficulty: 'BEGINNER',
    whyUseful: 'Explains circulating vs total supply, why unit bias tricks beginners, and how market cap dictates liquidity requirements.'
  },
  candlesticks: {
    title: 'The Ultimate Candlestick Patterns Trading Course',
    creator: 'Rayner Teo',
    url: 'https://www.youtube.com/watch?v=476m5_z7h8s',
    youtubeId: '476m5_z7h8s',
    duration: '38:20',
    difficulty: 'BEGINNER',
    whyUseful: 'Mastering open/high/low/close psychology, identifying wick rejection vs real buyer absorption on low timeframes.'
  },
  supportResistance: {
    title: 'Support And Resistance Trading Strategy for High Win Rates',
    creator: 'Rayner Teo',
    url: 'https://www.youtube.com/watch?v=P9l6sHpj92c',
    youtubeId: 'P9l6sHpj92c',
    duration: '22:14',
    difficulty: 'INTERMEDIATE',
    whyUseful: 'How to draw dynamic and horizontal support zones, avoid false breakouts, and trade reclaims.'
  },
  solanaEcosystem: {
    title: 'Using Solana & Finding GEMS!! Complete Guide',
    creator: 'Coin Bureau',
    url: 'https://www.youtube.com/watch?v=FbCUHBhf-rU',
    youtubeId: 'FbCUHBhf-rU',
    duration: '19:40',
    difficulty: 'BEGINNER',
    whyUseful: 'End-to-end breakdown of the high-speed Solana blockchain architecture, SPL tokens, and decentralized exchanges.'
  },
  phantomWallet: {
    title: 'Phantom Wallet: Beginner\'s Crypto GUIDE!! Step-by-Step!!',
    creator: 'Coin Bureau',
    url: 'https://www.youtube.com/watch?v=aUBid1zJC-U',
    youtubeId: 'aUBid1zJC-U',
    duration: '14:28',
    difficulty: 'BEGINNER',
    whyUseful: 'Crucial self-custody fundamentals, seed phrase security, burner wallet strategies, and avoiding malicious dApp approvals.'
  },
  bubblemapsAudit: {
    title: 'Don\'t Buy Crypto Before Doing This!! How to DYOR With Bubblemaps',
    creator: 'CoinGecko',
    url: 'https://www.youtube.com/watch?v=SGnKaWT1lA8',
    youtubeId: 'SGnKaWT1lA8',
    duration: '12:05',
    difficulty: 'INTERMEDIATE',
    whyUseful: 'Shows how to visually identify clustered wallets, hidden dev allocations, and cross-wallet supply hoarding.'
  },
  dexscreenerMastery: {
    title: 'How to Use DexScreener to Find 100x Solana Gems (Step by Step)',
    creator: 'DexScreener Educational Network',
    url: 'https://www.youtube.com/results?search_query=DexScreener+Solana+tutorial+guide',
    duration: '16:50',
    difficulty: 'BEGINNER',
    whyUseful: 'Navigating pair ages, filtering wash trading, inspecting liquidity locks, and configuring live multi-charts.'
  },
  birdeyeAnalytics: {
    title: 'Birdeye Tutorial: On-Chain Data, Trader Profiling & Token Flows',
    creator: 'Birdeye Academy',
    url: 'https://www.youtube.com/results?search_query=Birdeye+crypto+trading+tutorial+solana',
    duration: '15:10',
    difficulty: 'INTERMEDIATE',
    whyUseful: 'Reading unique trader metrics, net volume inflows, and tracking smart money wallets before retail rushes in.'
  },
  positionSizing: {
    title: 'Risk Management & Position Sizing in Trading',
    creator: 'Rayner Teo',
    url: 'https://www.youtube.com/watch?v=kIq8yXq0Tj4',
    youtubeId: 'kIq8yXq0Tj4',
    duration: '21:03',
    difficulty: 'INTERMEDIATE',
    whyUseful: 'Mathematical formulas for calculating risk per trade, stop loss placement, and avoiding ruin in volatile assets.'
  }
};
