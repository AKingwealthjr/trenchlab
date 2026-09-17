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

function cleanLessonTitle(title: string): string {
  return title.replace(/^[0-9]+[:.\s-]+/, '').replace(/\([^)]*\)/g, '').trim();
}

/**
 * Generate 3 deterministic, lesson-specific search queries.
 * Guaranteed to produce unique, tailored search queries across the curriculum.
 */
export function generateSearchQueries(lesson: Lesson, phaseTitle?: string): string[] {
  const cleanTitle = cleanLessonTitle(lesson.title);
  const lowerTitle = cleanTitle.toLowerCase();
  const primaryConcept = lesson.keyConcepts && lesson.keyConcepts.length > 0 
    ? lesson.keyConcepts[0].replace(/\([^)]*\)/g, '').trim()
    : cleanTitle;

  const queries: string[] = [];

  // Phase 1: Foundations
  if (lesson.phaseId === 1) {
    if (lowerTitle.includes('what is crypto')) {
      queries.push('what is cryptocurrency explained for beginners', 'cryptocurrency basics explained simply', 'how crypto works beginner tutorial');
    } else if (lowerTitle.includes('blockchain')) {
      queries.push('blockchain explained simply whiteboard crypto', 'how does a blockchain work visually', 'blockchain technology fundamentals');
    } else if (lowerTitle.includes('coins vs tokens') || lowerTitle.includes('coin vs token')) {
      queries.push('coins vs tokens crypto explained whiteboard', 'difference between coin and token crypto', 'layer 1 coin vs spl token');
    } else if (lowerTitle.includes('market cap') && !lowerTitle.includes('fdv')) {
      queries.push('crypto market cap explained whiteboard crypto', 'what is market cap in cryptocurrency', 'market cap vs token price crypto');
    } else if (lowerTitle.includes('fdv') || lowerTitle.includes('fully diluted')) {
      queries.push('fully diluted valuation crypto explained', 'FDV vs market cap crypto', 'token fully diluted valuation explained');
    } else if (lowerTitle.includes('liquidity') && !lowerTitle.includes('pool')) {
      queries.push('crypto liquidity explained', 'token liquidity explained', 'memecoin liquidity explained');
    } else if (lowerTitle.includes('trading volume') || lowerTitle.includes('volume basics')) {
      queries.push('crypto trading volume explained for beginners', 'understanding 24h volume in crypto', 'trading volume vs liquidity crypto');
    } else if (lowerTitle.includes('slippage')) {
      queries.push('what is slippage in crypto trading explained', 'slippage tolerance dex trading tutorial', 'how slippage works uniswap raydium');
    } else if (lowerTitle.includes('price impact')) {
      queries.push('price impact explained crypto dex trading', 'price impact vs slippage raydium jupiter', 'amm constant product price impact formula');
    } else if (lowerTitle.includes('dex vs cex')) {
      queries.push('decentralized exchange vs centralized exchange explained', 'dex vs cex differences crypto', 'self custody dex vs binance coinbase');
    } else if (lowerTitle.includes('custodial') || lowerTitle.includes('wallet basics')) {
      queries.push('custodial vs non custodial crypto wallet explained', 'self custody crypto wallet security tutorial', 'private keys and seed phrases explained');
    } else if (lowerTitle.includes('solana fundamentals') || lowerTitle.includes('solana ecosystem')) {
      queries.push('solana blockchain architecture explained coin bureau', 'how solana works proof of history', 'solana ecosystem guide for beginners');
    }
  }

  // Phase 2: Technical Analysis & Candlesticks
  else if (lesson.phaseId === 2) {
    if (lowerTitle.includes('candlestick') && !lowerTitle.includes('wick') && !lowerTitle.includes('anatomy')) {
      queries.push('crypto candlestick charts explained', 'how to read candlestick charts crypto', 'candlestick patterns trading beginners');
    } else if (lowerTitle.includes('anatomy') || lowerTitle.includes('ohlc')) {
      queries.push('candlestick anatomy open high low close explained', 'reading candlestick bodies and ranges', 'how to read japanese candlesticks crypto');
    } else if (lowerTitle.includes('wick') || lowerTitle.includes('auction')) {
      queries.push('reading candlestick wicks price action tutorial', 'candlestick wick rejection explained', 'who won the auction candlestick trading');
    } else if (lowerTitle.includes('support') && lowerTitle.includes('resistance')) {
      queries.push('support and resistance trading strategy rayner teo', 'how to draw support and resistance crypto charts', 'supply and demand zones crypto trading');
    } else if (lowerTitle.includes('market structure') && !lowerTitle.includes('shift')) {
      queries.push('market structure trading higher highs higher lows', 'crypto market structure explained', 'how to identify market trend structure');
    } else if (lowerTitle.includes('break of structure') || lowerTitle.includes('bos') || lowerTitle.includes('choch')) {
      queries.push('break of structure bos change of character choch explained', 'bos vs choch smart money concepts', 'market structure shift confirmation tutorial');
    } else if (lowerTitle.includes('sweep') || lowerTitle.includes('liquidity grab')) {
      queries.push('liquidity sweep trading strategy price action', 'stop hunt liquidity grab crypto explained', 'identifying key highs lows liquidity sweeps');
    } else if (lowerTitle.includes('reclaim')) {
      queries.push('support reclaim trading strategy crypto', 'failed breakdown reclaim price action setup', 'level reclaim confirmation entry');
    } else if (lowerTitle.includes('trendline')) {
      queries.push('trendlines vs horizontal levels rayner teo', 'how to draw trendlines properly crypto', 'dynamic support and resistance trap');
    } else if (lowerTitle.includes('order block') || lowerTitle.includes('fair value')) {
      queries.push('order blocks crypto trading smart money concepts', 'fair value gap fvg explained trading', 'institutional order blocks tutorial');
    } else if (lowerTitle.includes('macro bias') || lowerTitle.includes('capstone') || lesson.id === 'l2-12') {
      queries.push('macro bias to low timeframe execution crypto confluence', 'top down trading macro to micro execution', 'multi timeframe execution price action');
    } else if (lowerTitle.includes('timeframe')) {
      queries.push('multi timeframe analysis crypto trading alignment', 'top down chart analysis daily 4h 15m', 'timeframe confluence price action');
    }
  }

  // Phase 3: Solana Stack
  else if (lesson.phaseId === 3) {
    if (lowerTitle.includes('phantom')) {
      queries.push('phantom wallet setup tutorial solana coin bureau', 'phantom wallet security tips burner account', 'how to use phantom wallet solana');
    } else if (lowerTitle.includes('jupiter')) {
      queries.push('jupiter exchange tutorial solana aggregator', 'how to use jupiter dex aggregator solana', 'jupiter routing slippage settings guide');
    } else if (lowerTitle.includes('raydium') && lowerTitle.includes('clmm')) {
      queries.push('raydium clmm concentrated liquidity tutorial', 'clmm vs cpmm pools raydium solana', 'how concentrated liquidity works solana');
    } else if (lowerTitle.includes('raydium')) {
      queries.push('raydium solana dex tutorial liquidity pool', 'how raydium amm works solana', 'swapping and pools on raydium guide');
    } else if (lowerTitle.includes('pump.fun') || lowerTitle.includes('bonding curve')) {
      queries.push('bonding curve crypto explained pump fun', 'how pump fun works step by step', 'pump fun bonding curve migration raydium');
    } else if (lowerTitle.includes('solscan')) {
      queries.push('solscan blockchain explorer tutorial solana', 'how to read transactions on solscan', 'solscan token account tracking guide');
    } else if (lesson.id === 'l3-05' || lowerTitle.includes('priority fees & jito tip')) {
      queries.push('solana priority fees and jito tips explained', 'how to set priority fees solana phantom', 'solana priority fees vs tip bundles');
    } else if (lesson.id === 'l3-13' || lowerTitle.includes('mev & sandwich')) {
      queries.push('solana mev sandwich attacks and protection guide', 'how to protect against sandwich bots solana', 'solana mev private transactions jito');
    } else if (lowerTitle.includes('priority fee') || lowerTitle.includes('compute budget')) {
      queries.push('solana priority fees and compute units tutorial', 'how to speed up solana transactions priority fees', 'setting custom priority fee phantom jupiter');
    } else if (lowerTitle.includes('rugcheck') || lowerTitle.includes('security tool')) {
      queries.push('how to use rugcheck xyz solana safety audit', 'checking solana token risk rugcheck', 'detecting malicious token contracts solana');
    } else if (lowerTitle.includes('rpc')) {
      queries.push('what is an rpc node solana trading', 'private rpc vs public rpc speed solana', 'helius quicknode solana rpc setup');
    } else if (lowerTitle.includes('telegram bot') || lowerTitle.includes('photon') || lowerTitle.includes('bullx')) {
      queries.push('solana telegram trading bots tutorial trojan bonkbot', 'how to trade with solana telegram bot safely', 'telegram bot settings auto slippage gas');
    }
  }

  // Phase 4: DexScreener
  else if (lesson.phaseId === 4) {
    if (lowerTitle.includes('interface') || lowerTitle.includes('overview')) {
      queries.push('DexScreener tutorial', 'how to use DexScreener', 'DexScreener crypto analysis tutorial');
    } else if (lowerTitle.includes('new pairs')) {
      queries.push('dexscreener new pairs filter strategy', 'how to find new solana tokens on dexscreener', 'filtering fresh liquidity pools dexscreener');
    } else if (lowerTitle.includes('trending')) {
      queries.push('dexscreener trending tokens algorithm explained', 'identifying real trend vs paid boost dexscreener', 'dexscreener trending page strategy');
    } else if (lowerTitle.includes('multi-chart') || lowerTitle.includes('multichart')) {
      queries.push('dexscreener multichart setup tutorial', 'monitoring multiple tokens simultaneously dexscreener', 'dexscreener workspace layout guide');
    } else if (lowerTitle.includes('top traders') || lowerTitle.includes('buyer')) {
      queries.push('dexscreener top traders tab analysis', 'how to analyze buyer vs seller bubble charts dexscreener', 'finding profitable wallets on dexscreener');
    } else if (lowerTitle.includes('alert') || lowerTitle.includes('watchlist')) {
      queries.push('setting up dexscreener price alerts telegram', 'dexscreener watchlist organization tutorial', 'crypto real time price alerts setup');
    } else if (lowerTitle.includes('filter') || lowerTitle.includes('preset')) {
      queries.push('best dexscreener filters for memecoin trading', 'dexscreener custom filter preset tutorial', 'how to filter out rug pulls on dexscreener');
    }
  }

  // Phase 5: Birdeye Analytics
  else if (lesson.phaseId === 5) {
    if (lesson.id === 'l5-01' || lowerTitle.includes('overview & statistical edge')) {
      queries.push('birdeye crypto platform overview statistical edge', 'how to use birdeye so for token research', 'birdeye analytics platform walkthrough');
    } else if (lesson.id === 'l5-04' || lowerTitle.includes('token overview & security scores')) {
      queries.push('birdeye token overview and security scores tutorial', 'checking token authorities and holders on birdeye', 'birdeye security tab audit');
    } else if (lesson.id === 'l5-09' || lowerTitle.includes('api & real-time')) {
      queries.push('birdeye api and real time websocket data feeds', 'using birdeye developer data for trading bots', 'real time crypto price feeds on chain');
    } else if (lowerTitle.includes('unique trader') || lowerTitle.includes('raw volume')) {
      queries.push('unique traders vs volume crypto analysis birdeye', 'detecting wash trading with unique trader count', 'birdeye unique buyers metric explained');
    } else if (lowerTitle.includes('leaderboard') || lowerTitle.includes('win-rate')) {
      queries.push('birdeye trader leaderboards finding high win rate wallets', 'how to track profitable traders on birdeye', 'birdeye top wallet tracking tutorial');
    } else if (lowerTitle.includes('gem wallet') || lowerTitle.includes('early buyer')) {
      queries.push('identifying early gem wallets on birdeye solana', 'tracking smart money early entries birdeye', 'finding profitable crypto wallet addresses');
    } else if (lowerTitle.includes('historical') || lowerTitle.includes('price data')) {
      queries.push('analyzing historical on chain token data birdeye', 'using birdeye pro charting features', 'on chain volume history and holder growth');
    } else if (lowerTitle.includes('volume spike') || lowerTitle.includes('unusual')) {
      queries.push('detecting unusual volume spikes crypto on chain', 'birdeye volume spike alerts and momentum', 'identifying early accumulation volume');
    } else if (lowerTitle.includes('pnl') || lowerTitle.includes('distribution')) {
      queries.push('token holder pnl distribution analysis birdeye', 'analyzing realize vs unrealized profits token holders', 'how holder cost basis impacts sell pressure');
    }
  }

  // Phase 6: Token Safety & Rug Detection
  else if (lesson.phaseId === 6) {
    if (lowerTitle.includes('mint authority')) {
      queries.push('solana mint authority explained rug pull risk', 'how to check if mint authority is disabled solana', 'mint authority revoked verification solscan');
    } else if (lowerTitle.includes('freeze authority')) {
      queries.push('solana freeze authority explained token blacklist', 'can dev freeze your tokens solana', 'checking freeze authority on rugcheck');
    } else if (lowerTitle.includes('bubblemaps')) {
      queries.push('bubblemaps tutorial crypto wallet cluster coingecko', 'how to use bubblemaps to spot rugs', 'bubblemaps insider wallet detection');
    } else if (lowerTitle.includes('top 10') || lowerTitle.includes('holder concentration')) {
      queries.push('token holder concentration analysis solana', 'checking top 10 holders percentage rugcheck', 'cabals and distributed supply crypto');
    } else if (lowerTitle.includes('liquidity pool burn') || lowerTitle.includes('lp burn') || lowerTitle.includes('lock')) {
      queries.push('how to check if liquidity pool is burned solana', 'lp lock vs lp burn explained crypto', 'rug pull check lp tokens destroyed');
    } else if (lowerTitle.includes('honeypot') || lowerTitle.includes('blacklist')) {
      queries.push('how to detect honeypot token on solana', 'honeypot detector crypto tutorial', 'tokens you cannot sell explained');
    } else if (lowerTitle.includes('bundled buy') || lowerTitle.includes('bundle sniper')) {
      queries.push('bundled buys on solana launch explained', 'how devs bundle sniper buy their own tokens', 'spotting block 0 bundle purchases solana');
    }
  }

  // Phase 7: Wallet Intelligence & Tracking
  else if (lesson.phaseId === 7) {
    if (lesson.id === 'l7-01' || lowerTitle.includes('reading raw wallets')) {
      queries.push('how to audit raw crypto wallet pnl and trades', 'solscan wallet transaction audit guide', 'reading raw wallet history solana');
    } else if (lesson.id === 'l7-02' || lowerTitle.includes('spl token transfer histories')) {
      queries.push('solscan deep dive deciphering spl token transfers', 'how to read token transfers on solscan', 'solana wallet token balance history');
    } else if (lesson.id === 'l7-03' || lowerTitle.includes('vs dev cabal')) {
      queries.push('identifying smart money wallets vs dev cabal wallets', 'how to spot insider wallets solana', 'filtering real traders from insider ring wallets');
    } else if (lesson.id === 'l7-12' || lowerTitle.includes('daily smart money flow routine')) {
      queries.push('daily smart money tracking routine crypto trader', 'morning wallet tracking workflow on chain', 'systematic wallet tracking routine');
    } else if (lowerTitle.includes('pnl audit') || lowerTitle.includes('win rate')) {
      queries.push('auditing crypto wallet pnl and trading history', 'how to calculate wallet win rate and roi', 'wallet tracker pnl verification tutorial');
    } else if (lowerTitle.includes('whale') || lowerTitle.includes('large holder')) {
      queries.push('tracking crypto whales solana blockchain', 'whale wallet movements impact on token price', 'how to set whale transaction alerts');
    } else if (lowerTitle.includes('copy trade') || lowerTitle.includes('copy trading')) {
      queries.push('copy trading memecoins risks and slippage reality', 'why copy trading wallets loses money slippage frontrun', 'how to copy trade smart money correctly');
    } else if (lowerTitle.includes('cluster') || lowerTitle.includes('funding')) {
      queries.push('tracking wallet funding sources exchange withdrawals', 'clustering connected wallets blockchain forensics', 'how to find the funding wallet solscan');
    }
  }

  // Phase 8: Volume & Demand
  else if (lesson.phaseId === 8) {
    if (lowerTitle.includes('raw volume vs') || lowerTitle.includes('acceleration')) {
      queries.push('volume acceleration vs raw volume crypto trading', 'how to measure volume velocity in breakouts', 'volume momentum indicators crypto');
    } else if (lowerTitle.includes('organic') || lowerTitle.includes('wash trading')) {
      queries.push('how to spot wash trading crypto volume', 'organic community volume vs bot volume', 'detecting fake volume on dexscreener');
    } else if (lowerTitle.includes('volume-to-market-cap') || lowerTitle.includes('v/mc')) {
      queries.push('volume to market cap ratio crypto trading benchmarks', 'what does high volume market cap ratio mean', 'v mc ratio liquidity health token');
    } else if (lowerTitle.includes('buy/sell') || lowerTitle.includes('order flow')) {
      queries.push('buy vs sell ratio order flow analysis crypto', 'reading delta and aggressive market orders', 'buyer exhaustion vs absorption price action');
    } else if (lowerTitle.includes('volume profile') || lowerTitle.includes('poc')) {
      queries.push('volume profile trading tutorial point of control', 'how to use volume profile in crypto trading', 'high volume node vs low volume node');
    }
  }

  // Phase 9: Entry Strategies
  else if (lesson.phaseId === 9) {
    if (lowerTitle.includes('pullback') || lowerTitle.includes('retest')) {
      queries.push('pullback and retest entry strategy crypto trading', 'how to enter on key level retest price action', 'buying the dip vs catching a falling knife');
    } else if (lowerTitle.includes('breakout confirmation')) {
      queries.push('breakout confirmation trading strategy crypto', 'avoiding false breakouts volume confirmation entry', 'how to trade breakouts with low risk');
    } else if (lowerTitle.includes('scale in') || lowerTitle.includes('dca')) {
      queries.push('scaling into trades position building strategy', 'how to scale into a crypto position properly', 'laddering buy limit orders risk management');
    } else if (lowerTitle.includes('invalidation')) {
      queries.push('trade invalidation level technical analysis', 'how to define stop loss and invalidation point', 'knowing when your trade thesis is wrong');
    } else if (lowerTitle.includes('risk to reward') || lowerTitle.includes('r:r')) {
      queries.push('risk to reward ratio trading tutorial rayner teo', 'how to calculate 1 to 3 risk reward ratio', 'why risk reward matters more than win rate');
    }
  }

  // Phase 10: Risk Management & Position Sizing
  else if (lesson.phaseId === 10) {
    if (lowerTitle.includes('survival') || lowerTitle.includes('capital preservation')) {
      queries.push('capital preservation the golden rule of trading', 'risk of ruin in trading explained mathematically', 'why surviving is winning in crypto trading');
    } else if (lowerTitle.includes('position sizing') || lowerTitle.includes('calculator')) {
      queries.push('position sizing risk management trading tutorial rayner teo', 'how to calculate position size trading', 'fixed fractional position sizing crypto');
    } else if (lowerTitle.includes('1-2%') || lowerTitle.includes('maximum risk')) {
      queries.push('the 1 percent risk rule trading account management', 'how much to risk per trade crypto', 'calculating stop loss dollar risk');
    } else if (lowerTitle.includes('drawdown')) {
      queries.push('how to recover from trading drawdowns psychology', 'managing account drawdown and equity curves', 'drawdown recovery math percentage needed');
    } else if (lowerTitle.includes('daily loss limit') || lowerTitle.includes('circuit breaker')) {
      queries.push('daily loss limit rule for day traders', 'setting personal trading circuit breakers', 'how to stop revenge trading after a red day');
    }
  }

  // Phase 11: Profit Taking & Psychology
  else if (lesson.phaseId === 11) {
    if (lowerTitle.includes('tiered profit') || lowerTitle.includes('tp1')) {
      queries.push('tiered profit taking strategy tp1 tp2 tp3', 'how to take profits crypto trading strategy', 'scaling out of winning crypto trades');
    } else if (lowerTitle.includes('free roll') || lowerTitle.includes('initial capital')) {
      queries.push('taking initials out crypto trading strategy', 'de risking to free roll winning tokens', 'when to take your initial investment out crypto');
    } else if (lowerTitle.includes('trailing stop')) {
      queries.push('how to use trailing stop loss crypto trading', 'trailing stops with market structure swing lows', 'locking in profits without getting wicked out');
    } else if (lowerTitle.includes('fomo') || lowerTitle.includes('psychology') || lowerTitle.includes('revenge')) {
      queries.push('trading psychology how to stop fomo and revenge trading', 'mastering trading psychology Mark Douglas', 'emotional discipline in volatile crypto markets');
    }
  }

  // Phase 12: Confluence & System Building
  else if (lesson.phaseId === 12) {
    if (lowerTitle.includes('confluence') || lowerTitle.includes('multi-signal')) {
      queries.push('confluence in trading strategy tutorial', 'multi signal confirmation price action volume', 'building a high probability confluence trading model');
    } else if (lesson.id === 'l12-02' || lowerTitle.includes('personal memecoin trading system')) {
      queries.push('building your personal memecoin trading system playbook', 'rules based crypto trading system development', 'how to build a trading strategy memecoins');
    } else if (lesson.id === 'l12-12' || lowerTitle.includes('graduation') || lowerTitle.includes('capstone')) {
      queries.push('complete crypto trading system checklist capstone defense', 'full trade execution review checklist', 'institutional on chain operator trading plan');
    } else if (lowerTitle.includes('system') || lowerTitle.includes('playbook')) {
      queries.push('building a systematic trading plan crypto', 'how to create a personal trading playbook rules', 'rules based trading strategy development');
    } else if (lowerTitle.includes('checklist') || lowerTitle.includes('pre-trade')) {
      queries.push('pre trade checklist for crypto traders', 'trade execution routine and confirmation checklist', 'disciplined trading routine before clicking buy');
    } else if (lowerTitle.includes('journal') || lowerTitle.includes('review')) {
      queries.push('how to keep a trading journal for crypto', 'reviewing your trades to improve win rate and pnl', 'tracking trading mistakes and edge metrics');
    }
  }

  // Default fallback if not matched above: Generate highly specific queries from lesson attributes
  if (queries.length === 0) {
    queries.push(
      `${cleanTitle} crypto explained tutorial`,
      `${primaryConcept} ${cleanTitle} trading guide`,
      `how to trade ${cleanTitle} in on-chain crypto`
    );
  }

  return queries;
}

/**
 * Alias for generateSearchQueries for backward-compatibility.
 */
export const generateLessonQueries = generateSearchQueries;

/**
 * Generate a deterministic search profile for a curriculum lesson.
 */
export function generateSearchProfile(lesson: Lesson, phaseTitle: string): LessonSearchProfile {
  const cleanTitle = cleanLessonTitle(lesson.title);
  const primaryConcept = lesson.keyConcepts && lesson.keyConcepts.length > 0 
    ? lesson.keyConcepts[0] 
    : cleanTitle;
  const learningObjective = lesson.objectives && lesson.objectives.length > 0 
    ? lesson.objectives[0] 
    : `Master ${cleanTitle} in on-chain trading`;

  const queries = generateSearchQueries(lesson, phaseTitle);
  const primaryQuery = queries[0];
  const secondaryQueries = queries.slice(1);
  const lowerTitle = cleanTitle.toLowerCase();

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
