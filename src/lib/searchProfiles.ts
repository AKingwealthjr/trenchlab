import { Lesson, LessonSearchProfile, Difficulty } from '../types';

export const GLOBAL_NEGATIVE_KEYWORDS: string[] = [
  '100x guaranteed',
  'get rich quick',
  'turn $10 into $10,000',
  'turn 10 into 10000',
  'secret strategy',
  'guaranteed profit',
  'guaranteed profits',
  'no loss',
  'free signals',
  'buy now',
  '100% win rate',
  'passive income guaranteed',
  'live trading',
  'telegram signals',
  'pump and dump',
  'moonshot call',
  'next shiba',
  'next doge',
  'easy money',
  'millionaire overnight',
  'copy trade signal'
];

export const EDUCATIONAL_CHANNELS_ALLOWLIST: string[] = [
  'Coin Bureau',
  'Whiteboard Crypto',
  'Finematics',
  'Rayner Teo',
  'CoinGecko',
  'Solana',
  'Jupiter Exchange',
  'DexScreener Educational Network',
  'Birdeye Academy',
  'Crypto Zombie',
  'Bankless',
  'The Defiant',
  'Trader Dante',
  'Benjamin Cowen',
  'TechnicalRoundup',
  'Investopedia'
];

/**
 * Generate a deterministic search profile for a curriculum lesson.
 */
export function generateSearchProfile(lesson: Lesson, phaseTitle: string): LessonSearchProfile {
  const cleanTitle = lesson.title.replace(/[0-9]+[:.]\s*/g, '').trim();
  const primaryConcept = lesson.keyConcepts && lesson.keyConcepts.length > 0 
    ? lesson.keyConcepts[0] 
    : cleanTitle;
  const learningObjective = lesson.objectives && lesson.objectives.length > 0 
    ? lesson.objectives[0] 
    : `Master ${cleanTitle} in on-chain trading`;

  let primaryQuery = '';
  const secondaryQueries: string[] = [];

  const lowerTitle = cleanTitle.toLowerCase();
  const lowerPhase = phaseTitle.toLowerCase();

  // Phase 1: Foundations
  if (lesson.phaseId === 1) {
    if (lowerTitle.includes('what is crypto')) {
      primaryQuery = 'what is cryptocurrency explained for beginners';
      secondaryQueries.push('cryptocurrency basics explained simply', 'how crypto works beginner tutorial');
    } else if (lowerTitle.includes('blockchain')) {
      primaryQuery = 'blockchain explained simply whiteboard crypto';
      secondaryQueries.push('how does a blockchain work visually', 'blockchain technology fundamentals');
    } else if (lowerTitle.includes('market cap')) {
      primaryQuery = 'crypto market cap vs fdv explained';
      secondaryQueries.push('market capitalization in cryptocurrency whiteboard', 'unit bias crypto explained');
    } else if (lowerTitle.includes('fdv')) {
      primaryQuery = 'fully diluted valuation fdv crypto explained';
      secondaryQueries.push('market cap vs fully diluted valuation tokenomics', 'token unlocks fdv price impact');
    } else if (lowerTitle.includes('liquidity')) {
      primaryQuery = 'crypto liquidity explained whiteboard crypto';
      secondaryQueries.push('liquidity pools explained crypto', 'token liquidity vs market cap');
    } else if (lowerTitle.includes('slippage') || lowerTitle.includes('price impact')) {
      primaryQuery = 'crypto slippage and price impact explained';
      secondaryQueries.push('what is slippage in dex trading', 'constant product amm price impact');
    } else if (lowerTitle.includes('dex vs cex')) {
      primaryQuery = 'decentralized exchange vs centralized exchange explained';
      secondaryQueries.push('dex vs cex differences crypto', 'uniswap raydium vs binance');
    } else if (lowerTitle.includes('solana fundamentals')) {
      primaryQuery = 'solana blockchain explained for beginners';
      secondaryQueries.push('how solana works architecture guide', 'solana ecosystem guide coin bureau');
    } else {
      primaryQuery = `${cleanTitle} crypto explained tutorial`;
      secondaryQueries.push(`${primaryConcept} cryptocurrency explained`, `${cleanTitle} educational guide`);
    }
  }
  // Phase 2: Technical Analysis & Candlesticks
  else if (lesson.phaseId === 2) {
    if (lowerTitle.includes('candlestick')) {
      primaryQuery = 'candlestick patterns trading course rayner teo';
      secondaryQueries.push('how to read candlestick charts crypto', 'candlestick basics open high low close');
    } else if (lowerTitle.includes('wick') || lowerTitle.includes('auction')) {
      primaryQuery = 'reading candlestick wicks price action tutorial';
      secondaryQueries.push('candlestick wick rejection explained', 'who won the auction candlestick trading');
    } else if (lowerTitle.includes('support') || lowerTitle.includes('resistance')) {
      primaryQuery = 'support and resistance trading strategy rayner teo';
      secondaryQueries.push('how to draw support and resistance crypto charts', 'supply and demand zones crypto trading');
    } else if (lowerTitle.includes('market structure') || lowerTitle.includes('trend')) {
      primaryQuery = 'market structure trading higher highs higher lows';
      secondaryQueries.push('crypto market structure explained', 'how to trade market structure shifts');
    } else if (lowerTitle.includes('break of structure') || lowerTitle.includes('bos') || lowerTitle.includes('choch')) {
      primaryQuery = 'break of structure bos change of character choch explained';
      secondaryQueries.push('bos vs choch smart money concepts', 'market structure shift confirmation tutorial');
    } else if (lowerTitle.includes('reclaim') || lowerTitle.includes('sweep')) {
      primaryQuery = 'liquidity sweep and support reclaim trading';
      secondaryQueries.push('failed breakdown reclaim price action', 'stop hunt liquidity grab trading');
    } else {
      primaryQuery = `${cleanTitle} price action trading tutorial`;
      secondaryQueries.push(`${primaryConcept} technical analysis crypto`, `how to trade ${cleanTitle}`);
    }
  }
  // Phase 3: Solana Stack
  else if (lesson.phaseId === 3) {
    if (lowerTitle.includes('phantom')) {
      primaryQuery = 'phantom wallet setup tutorial solana coin bureau';
      secondaryQueries.push('phantom wallet security tips burner account', 'how to use phantom wallet solana');
    } else if (lowerTitle.includes('jupiter')) {
      primaryQuery = 'jupiter exchange tutorial solana aggregator';
      secondaryQueries.push('how to use jupiter dex aggregator solana', 'jupiter routing slippage settings guide');
    } else if (lowerTitle.includes('raydium')) {
      primaryQuery = 'raydium solana dex tutorial liquidity pool';
      secondaryQueries.push('how raydium amm works solana', 'raydium swap and pools guide');
    } else if (lowerTitle.includes('pump.fun') || lowerTitle.includes('bonding curve')) {
      primaryQuery = 'bonding curve crypto explained pump fun';
      secondaryQueries.push('how bonding curves work in defi', 'pump fun bonding curve migration explained');
    } else {
      primaryQuery = `${cleanTitle} solana trading stack tutorial`;
      secondaryQueries.push(`${primaryConcept} solana guide`, `${cleanTitle} practical walkthrough`);
    }
  }
  // Phase 4: DexScreener
  else if (lesson.phaseId === 4) {
    if (lowerTitle.includes('interface') || lowerTitle.includes('layout')) {
      primaryQuery = 'dexscreener tutorial for beginners how to use dexscreener';
      secondaryQueries.push('dexscreener interface walkthrough tips', 'how to read dexscreener charts');
    } else if (lowerTitle.includes('new pairs') || lowerTitle.includes('trending')) {
      primaryQuery = 'dexscreener filters tutorial find tokens';
      secondaryQueries.push('how to filter tokens on dexscreener', 'dexscreener new pairs vs trending');
    } else {
      primaryQuery = `dexscreener ${cleanTitle} tutorial`;
      secondaryQueries.push(`how to use dexscreener for ${primaryConcept}`, `dexscreener trading guide`);
    }
  }
  // Phase 5: Birdeye Analytics
  else if (lesson.phaseId === 5) {
    primaryQuery = 'birdeye crypto tutorial on chain analytics solana';
    secondaryQueries.push('how to use birdeye so for token research', 'birdeye solana analytics guide');
  }
  // Phase 6: Token Safety & Rug Detection
  else if (lesson.phaseId === 6) {
    if (lowerTitle.includes('mint authority') || lowerTitle.includes('freeze authority')) {
      primaryQuery = 'solana mint authority freeze authority rug pull check';
      secondaryQueries.push('how to check solana token security rugcheck', 'mint authority revoked solscan tutorial');
    } else if (lowerTitle.includes('bubblemaps')) {
      primaryQuery = 'bubblemaps tutorial crypto wallet cluster coingecko';
      secondaryQueries.push('how to use bubblemaps to spot rugs', 'bubblemaps insider wallet detection');
    } else {
      primaryQuery = `solana rug pull detection ${cleanTitle} tutorial`;
      secondaryQueries.push(`how to verify token safety ${primaryConcept}`, `token security audit solana`);
    }
  }
  // Phase 7: Wallet Intelligence & Tracking
  else if (lesson.phaseId === 7) {
    primaryQuery = 'how to track crypto smart money wallets solscan';
    secondaryQueries.push('tracking insider wallets solana tutorial', 'on chain wallet tracking guide');
  }
  // Phase 8: Volume & Demand
  else if (lesson.phaseId === 8) {
    primaryQuery = 'crypto volume analysis trading tutorial';
    secondaryQueries.push('organic volume vs wash trading crypto', 'volume price analysis explained');
  }
  // Phase 9: Entry Strategies
  else if (lesson.phaseId === 9) {
    primaryQuery = `${cleanTitle} price action strategy tutorial`;
    secondaryQueries.push('crypto pullback entry strategy retest', 'support resistance reclaim entry setup');
  }
  // Phase 10: Risk Management & Position Sizing
  else if (lesson.phaseId === 10) {
    primaryQuery = 'position sizing risk management trading tutorial rayner teo';
    secondaryQueries.push('how to calculate position size trading', 'risk management rules for crypto traders');
  }
  // Phase 11: Profit Taking & Psychology
  else if (lesson.phaseId === 11) {
    if (lowerTitle.includes('psychology') || lowerTitle.includes('fomo')) {
      primaryQuery = 'trading psychology how to stop fomo and revenge trading';
      secondaryQueries.push('trading discipline and emotional control guide', 'mastering trading psychology Mark Douglas');
    } else {
      primaryQuery = 'how to take profits crypto trading strategy';
      secondaryQueries.push('tiered profit taking strategy tp1 tp2 tp3', 'when to sell crypto profit plan');
    }
  }
  // Phase 12: Confluence & System Building
  else {
    primaryQuery = 'confluence in trading strategy tutorial';
    secondaryQueries.push('building a systematic trading plan crypto', 'multi time frame confluence price action');
  }

  // Determine preferred video duration
  let preferredVideoLength: 'SHORT' | 'MEDIUM' | 'LONG' = 'MEDIUM';
  if (lowerTitle.includes('fundamentals') || lowerTitle.includes('course') || lowerTitle.includes('candlestick')) {
    preferredVideoLength = 'LONG'; // 15-40 min comprehensive
  } else if (lowerTitle.includes('quick') || lowerTitle.includes('setup') || lowerTitle.includes('wallet')) {
    preferredVideoLength = 'MEDIUM'; // 10-20 min
  }

  return {
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    lessonDescription: lesson.deepDive && lesson.deepDive.length > 0 ? lesson.deepDive[0] : lesson.title,
    phaseId: lesson.phaseId,
    phaseTitle,
    topic: primaryConcept,
    difficulty: lesson.difficulty,
    learningObjective,
    primarySearchQuery: primaryQuery,
    secondarySearchQueries: secondaryQueries,
    negativeKeywords: GLOBAL_NEGATIVE_KEYWORDS,
    preferredVideoLength,
    preferredContentType: 'educational_tutorial'
  };
}
