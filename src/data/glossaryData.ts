import { GlossaryItem } from '../types';

export const GLOSSARY_DATA: GlossaryItem[] = [
  {
    id: 'amm',
    term: 'AMM (Automated Market Maker)',
    category: 'Solana & DeFi',
    shortDef: 'A decentralized exchange protocol that relies on mathematical formulas (like x * y = k) to price assets rather than an order book.',
    fullExplanation: 'Instead of matching individual buyers and sellers, an AMM uses liquidity pools containing pairs of tokens (e.g., SOL and a memecoin). Trades automatically execute against the pool balance, moving the price along a predetermined mathematical curve.',
    practicalTip: 'Always check pool depth before trading. If pool liquidity is thin, even a modest $500 order can trigger severe price impact.'
  },
  {
    id: 'ath',
    term: 'ATH (All-Time High)',
    category: 'Market Structure',
    shortDef: 'The highest historical price or market capitalization a token has ever recorded.',
    fullExplanation: 'ATH represents peak historical valuation. When a token is in "price discovery" above previous resistance, there are no trapped overhead sellers—only prospective profit takers.',
    practicalTip: 'Buying directly at ATH without a base or consolidation carries extreme risk of mean-reversion pullbacks.'
  },
  {
    id: 'atl',
    term: 'ATL (All-Time Low)',
    category: 'Market Structure',
    shortDef: 'The lowest recorded market price of a token since its public trading inception.',
    fullExplanation: 'ATL indicates complete market abandonment or severe initial sell-offs. In memecoins, tokens that break below launch prices rarely recover unless a completely new community takeover occurs.',
    practicalTip: 'Never average down on a memecoin cascading toward all-time lows unless verified dev abandonment has transitioned into genuine organic volume.'
  },
  {
    id: 'bonding-curve',
    term: 'Bonding Curve',
    category: 'Solana & DeFi',
    shortDef: 'A smart contract pricing mechanism that increases the token price mathematically as more tokens are purchased from the pool.',
    fullExplanation: 'Platforms like Pump.fun use bonding curves to eliminate initial liquidity requirements. Users buy tokens directly from the curve; once the pool accumulates a set threshold (e.g. ~$69k–$85k market cap), the curve completes and the liquidity is migrated into a Raydium pool with burned LP.',
    practicalTip: 'Monitor bonding curve completion percentages carefully; volatility surges drastically as a token approaches 100% and prepares to migrate.'
  },
  {
    id: 'breakout',
    term: 'Breakout',
    category: 'Market Structure',
    shortDef: 'When price cleanly breaches and closes above an established horizontal resistance zone accompanied by volume expansion.',
    fullExplanation: 'A valid breakout represents an imbalance where aggressive buyers overpower passive sellers at key price levels, shifting market structure upward into a new range.',
    practicalTip: 'Do not enter immediately on the first candle piercing resistance. Wait for a candle close or a successful retest of former resistance acting as new support.'
  },
  {
    id: 'bundled-wallet',
    term: 'Bundled Wallet',
    category: 'On-Chain & Safety',
    shortDef: 'A group of separate wallet addresses controlled by a single actor or team, funded in a single block transaction to secretly hoard supply.',
    fullExplanation: 'Malicious developers use bundling tools (such as Jito bundles) to distribute 40%–80% of a token supply across 20–50 seemingly independent fresh wallets at launch, making holder distribution appear organic on basic explorers.',
    practicalTip: 'Always use Bubblemaps or inspect transaction origin blocks on Solscan. If 30 wallets were funded by the exact same source within seconds of launch, the token is heavily bundled.'
  },
  {
    id: 'dex',
    term: 'DEX (Decentralized Exchange)',
    category: 'Solana & DeFi',
    shortDef: 'A peer-to-peer marketplace where users trade cryptocurrencies directly from non-custodial wallets without an intermediary.',
    fullExplanation: 'Examples on Solana include Raydium, Orca, and Meteora, with Jupiter acting as an aggregator. Unlike centralized exchanges (Binance, Coinbase), anyone can list a token on a DEX without permission.',
    practicalTip: 'Because anyone can launch a pool on a DEX, you must personally audit the contract code and liquidity guarantees before swapping.'
  },
  {
    id: 'fdv',
    term: 'FDV (Fully Diluted Valuation)',
    category: 'Market Structure',
    shortDef: 'The theoretical market cap of a project if 100% of its maximum possible token supply were unlocked and in circulation at current price.',
    fullExplanation: 'Formula: FDV = Current Price × Max Total Supply. In most Solana memecoins, 100% of the supply is created at launch, meaning Market Cap and FDV are identical.',
    practicalTip: 'If a token has a $1M Market Cap but an FDV of $50M, massive team or investor token unlocks will create continuous downward selling pressure.'
  },
  {
    id: 'freeze-authority',
    term: 'Freeze Authority',
    category: 'On-Chain & Safety',
    shortDef: 'An SPL token program permission that allows the creator address to freeze specific user token accounts, blocking transfers.',
    fullExplanation: 'If freeze authority is enabled, the developer can prevent buyers from selling their tokens, effectively creating a honeypot where money can enter the pool but cannot exit.',
    practicalTip: 'Freeze authority MUST be revoked (`null`). Never trade a memecoin where Freeze Authority is active.'
  },
  {
    id: 'holder-concentration',
    term: 'Holder Concentration',
    category: 'On-Chain & Safety',
    shortDef: 'The percentage of the total circulating supply controlled by the top 10 to 20 individual wallet addresses.',
    fullExplanation: 'If the top 10 holders (excluding the liquidity pool itself) control more than 20% to 30% of the token supply, any single wallet selling can collapse the price by 50% or more.',
    practicalTip: 'Healthy distribution features top non-LP holders owning under 2% to 3% each, with a diversified curve across hundreds of distinct holders.'
  },
  {
    id: 'insider',
    term: 'Insider Allocation',
    category: 'On-Chain & Safety',
    shortDef: 'Tokens secretly distributed to friends, team members, or paid promoters prior to or immediately at the moment of public announcement.',
    fullExplanation: 'Insiders receive tokens at essentially zero cost. Their objective is almost always to unload into incoming retail liquidity as promotional marketing generates volume.',
    practicalTip: 'Cross-reference early buyers with known Twitter influencers and dev wallets. Heavy insider allocations create persistent resistance walls.'
  },
  {
    id: 'liquidity',
    term: 'Liquidity',
    category: 'Solana & DeFi',
    shortDef: 'The reserve of base assets (usually SOL or USDC) locked in the trading pool to facilitate instantaneous buying and selling.',
    fullExplanation: 'Liquidity determines how much capital can be exchanged without distorting the market price. High liquidity allows large trades with low slippage; low liquidity causes severe slippage and vulnerability to sudden price crashes.',
    practicalTip: 'Look at the Liquidity-to-Market-Cap ratio. A healthy ratio is typically between 15% and 30%. A $1M MC token with only $20k liquidity is fragile and illiquid.'
  },
  {
    id: 'lp-burn',
    term: 'LP Burn (Liquidity Pool Burn)',
    category: 'On-Chain & Safety',
    shortDef: 'Permanently sending the liquidity provider tokens to an unrecoverable burn address (such as `1111...` or `Incinerator`).',
    fullExplanation: 'When LP tokens are burned, nobody—not even the original creator—can ever withdraw the base SOL backing the trading pair. This guarantees that the pool will remain permanently tradable.',
    practicalTip: 'Verify on Solscan or DexScreener that LP is 100% burned or securely locked with a verifiable time lock.'
  },
  {
    id: 'market-cap',
    term: 'Market Cap (Market Capitalization)',
    category: 'Market Structure',
    shortDef: 'The total dollar value of all circulating tokens at the current market trading price.',
    fullExplanation: 'Formula: Market Cap = Current Token Price × Circulating Supply. Market Cap dictates how much capital is required to double or halve the asset price.',
    practicalTip: 'Do not judge token affordability by unit price (e.g. $0.00003 vs $1.00). Always evaluate Market Cap to understand scale and capital requirements.'
  },
  {
    id: 'mint-authority',
    term: 'Mint Authority',
    category: 'On-Chain & Safety',
    shortDef: 'The cryptographic permission on an SPL token that enables creating new tokens out of thin air.',
    fullExplanation: 'If mint authority is still active, the developer can mint trillions of additional tokens and dump them directly into the liquidity pool, draining all locked SOL in seconds.',
    practicalTip: 'Mint Authority MUST be revoked (`null` or disabled). In TRENCHLAB audits, any unrevoked mint authority is an instant disqualifier (PASS).'
  },
  {
    id: 'momentum',
    term: 'Momentum',
    category: 'Market Structure',
    shortDef: 'The rate of acceleration in price movement accompanied by expanding volume and buyer participation.',
    fullExplanation: 'Momentum occurs when aggressive market orders overwhelm resting limit orders, driving sustained multi-candle expansions with minimal counter-trend retracements.',
    practicalTip: 'Trade momentum in the direction of the dominant timeframe trend. Never fade or short high-volume Solana momentum on a 1-minute chart.'
  },
  {
    id: 'pair',
    term: 'Trading Pair',
    category: 'Solana & DeFi',
    shortDef: 'The smart contract liquidity pool uniting two specific tokens, typically TOKEN/SOL.',
    fullExplanation: 'Each pair has a unique contract address distinct from the token mint address itself. Trades on DEXs interact directly with the pair contract.',
    practicalTip: 'Always verify you are analyzing the official pair address. Scammers often clone legitimate token names and deploy fake pairs with trapped liquidity.'
  },
  {
    id: 'priority-fee',
    term: 'Priority Fee',
    category: 'Execution & Risk',
    shortDef: 'An optional additional fee paid to Solana validators to prioritize inclusion of a transaction in the current block.',
    fullExplanation: 'Solana uses localized fee markets. When network congestion or memecoin trading surges, standard transactions can be dropped. Priority fees ensure fast execution and prevent stale slippage failures.',
    practicalTip: 'Configure your wallet or aggregator with a dynamic "Turbo" priority fee (e.g., 0.001–0.005 SOL) during fast-moving market setups.'
  },
  {
    id: 'reclaim',
    term: 'Reclaim',
    category: 'Market Structure',
    shortDef: 'When price drops below a significant support level (trapping aggressive sellers or triggering stops) and then aggressively closes back above that level.',
    fullExplanation: 'A reclaim indicates that the breakdown was a liquidity sweep / false breakout. The swift re-entry back into the value zone signals that buyers have absorbed the supply and are taking control.',
    practicalTip: 'Reclaim setups offer some of the highest risk/reward ratios: enter on the retest of the reclaimed level with your stop loss just below the sweep wick.'
  },
  {
    id: 'slippage',
    term: 'Slippage',
    category: 'Execution & Risk',
    shortDef: 'The difference between the expected execution price of a trade and the actual price at which the transaction confirms on-chain.',
    fullExplanation: 'Slippage occurs due to rapid price movement during block execution or due to pool price impact from low liquidity. Setting slippage tolerance defines the maximum adverse price shift you permit before the swap reverts.',
    practicalTip: 'Be cautious with high slippage settings (e.g., 10%–20%). Excessive slippage exposes your transaction to MEV sandwich bots that extract value from your swap.'
  },
  {
    id: 'smart-money',
    term: 'Smart Money',
    category: 'On-Chain & Safety',
    shortDef: 'Wallet addresses that demonstrate statistically verified long-term profitability, early access, or superior analytical execution.',
    fullExplanation: 'Tracking smart money involves auditing historical wallet PnL, holding duration, and entry timing. However, smart wallets frequently rotate addresses or use bait wallets to front-run copy-traders.',
    practicalTip: 'Never blindly copy-trade a smart money wallet without independent confirmation of the chart structure and safety metrics.'
  },
  {
    id: 'sniper',
    term: 'Sniper',
    category: 'On-Chain & Safety',
    shortDef: 'Automated algorithmic trading bots that buy tokens in block zero (the very first transaction block) of liquidity addition.',
    fullExplanation: 'Snipers acquire massive portions of supply at fractions of a penny. Once retail buyers push the price up 2x–5x, snipers systematically dump their inventory into incoming volume.',
    practicalTip: 'Inspect the block 0 transactions. If the first 5 transactions absorbed 30% of the token supply, prepare for severe sniper sell-offs on any initial pump.'
  },
  {
    id: 'support-resistance',
    term: 'Support & Resistance',
    category: 'Market Structure',
    shortDef: 'Price zones where buying interest is sufficiently strong to overcome selling pressure (Support), or where selling pressure halts advances (Resistance).',
    fullExplanation: 'These represent psychological and historical liquidity clusters. Old resistance frequently flips to become new support once broken cleanly.',
    practicalTip: 'Treat support and resistance as horizontal zones, not razor-thin lines. Look for candle wick reactions to confirm level validity.'
  },
  {
    id: 'volume',
    term: 'Trading Volume',
    category: 'Market Structure',
    shortDef: 'The total cumulative dollar value of all buy and sell transactions executed across a defined timeframe (e.g. 5m, 1h, 24h).',
    fullExplanation: 'Volume confirms price action. A breakout on high relative volume has high conviction; a price increase on declining volume suggests exhaustion and vulnerability to reversal.',
    practicalTip: 'Compare 5m volume to pool liquidity. If 5m volume exceeds 50% of the entire liquidity pool, a major momentum expansion is underway.'
  },
  {
    id: 'wash-trading',
    term: 'Wash Trading',
    category: 'On-Chain & Safety',
    shortDef: 'A fraudulent market manipulation tactic where an entity repeatedly buys and sells the same token between controlled wallets to simulate artificial volume.',
    fullExplanation: 'Wash trading is designed to trick DexScreener and Birdeye trending algorithms to rank the token on "Trending" lists and lure real traders.',
    practicalTip: 'Check the unique maker count and transaction size consistency. If a token shows $2M in 24h volume but only 40 unique traders with identical $200 swap sizes, it is wash traded.'
  }
];
