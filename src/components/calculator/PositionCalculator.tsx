import React, { useState } from 'react';
import { 
  Calculator as CalcIcon, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  ShieldAlert, 
  HelpCircle,
  TrendingUp,
  Percent,
  DollarSign,
  BookOpen
} from 'lucide-react';
import { useUniversity } from '../../context/UniversityContext';

interface PositionCalculatorProps {
  onNavigateToJournal?: () => void;
}

export const PositionCalculator: React.FC<PositionCalculatorProps> = ({ onNavigateToJournal }) => {
  const { addJournalEntry } = useUniversity();

  const [accountSize, setAccountSize] = useState<number>(5000);
  const [riskPercent, setRiskPercent] = useState<number>(1.5);
  const [tokenSymbol, setTokenSymbol] = useState<string>('SOLCAT');
  const [entryPrice, setEntryPrice] = useState<number>(0.025);
  const [stopPrice, setStopPrice] = useState<number>(0.0212);
  const [targetPrice, setTargetPrice] = useState<number>(0.038);
  const [liquidityPool, setLiquidityPool] = useState<number>(65000);
  const [loggedNotification, setLoggedNotification] = useState<boolean>(false);

  // Core Math
  const dollarRisk = (accountSize * (riskPercent / 100));
  const stopDistancePercent = entryPrice > 0 
    ? Math.abs((entryPrice - stopPrice) / entryPrice) * 100 
    : 0;
  
  const positionSizeUsd = stopDistancePercent > 0 
    ? (dollarRisk / (stopDistancePercent / 100)) 
    : 0;

  const tokenQuantity = entryPrice > 0 ? (positionSizeUsd / entryPrice) : 0;
  const rewardDistancePercent = entryPrice > 0 
    ? ((targetPrice - entryPrice) / entryPrice) * 100 
    : 0;
  const potentialProfitUsd = (rewardDistancePercent / 100) * positionSizeUsd;
  const riskRewardRatio = stopDistancePercent > 0 
    ? (rewardDistancePercent / stopDistancePercent) 
    : 0;

  const poolImpactPercent = liquidityPool > 0 ? (positionSizeUsd / liquidityPool) * 100 : 0;
  const isHighSlippageRisk = poolImpactPercent > 5;
  const isSevereSlippageRisk = poolImpactPercent > 10;

  const handleExportToJournal = () => {
    addJournalEntry({
      tokenSymbol: tokenSymbol.toUpperCase() || 'TOKEN',
      entryPrice,
      exitPrice: undefined,
      positionSizeUsd: Math.round(positionSizeUsd),
      reasonForEntry: `Systematic Calculator Setup: ${riskRewardRatio.toFixed(2)}:1 R:R target. Risked $${dollarRisk.toFixed(0)} (${riskPercent}%).`,
      invalidation: `Hard stop at $${stopPrice} (-${stopDistancePercent.toFixed(1)}%).`,
      takeProfitPlan: `TP Target at $${targetPrice} (+${rewardDistancePercent.toFixed(1)}%).`,
      result: 'OPEN',
      emotion: 'Disciplined',
      whatILearned: 'Position sized mathematically prior to trade execution.'
    });

    setLoggedNotification(true);
    setTimeout(() => setLoggedNotification(false), 4000);

    if (onNavigateToJournal) {
      setTimeout(() => onNavigateToJournal(), 600);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-[#131316] border border-[#242429] p-5 sm:p-6 rounded-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-3">
            <div className="p-2.5 bg-[#E8A33D]/10 border border-[#E8A33D]/30 rounded-lg text-[#E8A33D]">
              <CalcIcon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-[#EDEDEF]">
                TRENCHLAB Position Sizing Terminal
              </h1>
              <p className="text-xs text-[#8E8E98] mt-0.5">
                Mathematical risk calibration. Prevent catastrophic account drawdowns before touching an order router.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono bg-[#0A0A0B] border border-[#242429] px-3 py-1.5 rounded">
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[#8E8E98]">RECOMMENDED RISK:</span>
            <span className="text-[#EDEDEF] font-semibold">1.0% — 2.0%</span>
          </div>
        </div>
      </div>

      {loggedNotification && (
        <div className="bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 px-4 py-3 rounded-lg flex items-center justify-between text-xs font-mono">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>TRADE SETUP EXPORTED TO TRADE JOURNAL SUCCESSFULLY</span>
          </div>
          <span className="text-emerald-400/70">Check Journal Tab</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs (7 Cols) */}
        <div className="lg:col-span-7 bg-[#131316] border border-[#242429] p-5 sm:p-6 rounded-xl space-y-5">
          <h2 className="text-sm font-display font-semibold text-[#EDEDEF] uppercase tracking-wider flex items-center space-x-2">
            <span>Trade Parameters</span>
            <span className="text-[10px] font-mono text-[#8E8E98] lowercase">(account & price triggers)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Account Bankroll */}
            <div>
              <label className="block text-xs font-mono text-[#8E8E98] mb-1.5">
                Total Trading Account ($)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-[#8E8E98] font-mono">$</span>
                <input
                  type="number"
                  value={accountSize}
                  onChange={(e) => setAccountSize(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-[#0A0A0B] border border-[#242429] focus:border-[#E8A33D] rounded-lg py-2 pl-7 pr-3 text-sm font-mono text-[#EDEDEF] outline-none transition-colors"
                />
              </div>
            </div>

            {/* Risk Percent */}
            <div>
              <label className="block text-xs font-mono text-[#8E8E98] mb-1.5 flex justify-between">
                <span>Risk Per Trade (%)</span>
                <span className={`font-semibold ${riskPercent > 2.5 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {riskPercent > 2.5 ? 'High Risk' : 'Conservative'}
                </span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="10"
                  value={riskPercent}
                  onChange={(e) => setRiskPercent(Number(e.target.value))}
                  className="w-full bg-[#0A0A0B] border border-[#242429] focus:border-[#E8A33D] rounded-lg py-2 px-3 text-sm font-mono text-[#EDEDEF] outline-none transition-colors"
                />
                <span className="absolute right-3 top-2.5 text-xs text-[#8E8E98] font-mono">%</span>
              </div>
            </div>

            {/* Token Symbol */}
            <div>
              <label className="block text-xs font-mono text-[#8E8E98] mb-1.5">
                Token Symbol / Ticker
              </label>
              <input
                type="text"
                value={tokenSymbol}
                onChange={(e) => setTokenSymbol(e.target.value)}
                placeholder="e.g. BONK"
                className="w-full bg-[#0A0A0B] border border-[#242429] focus:border-[#E8A33D] rounded-lg py-2 px-3 text-sm font-mono text-[#EDEDEF] uppercase outline-none transition-colors"
              />
            </div>

            {/* Liquidity Pool Size */}
            <div>
              <label className="block text-xs font-mono text-[#8E8E98] mb-1.5">
                Total Pool Liquidity ($)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-[#8E8E98] font-mono">$</span>
                <input
                  type="number"
                  value={liquidityPool}
                  onChange={(e) => setLiquidityPool(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-[#0A0A0B] border border-[#242429] focus:border-[#E8A33D] rounded-lg py-2 pl-7 pr-3 text-sm font-mono text-[#EDEDEF] outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-[#242429] pt-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Entry Price */}
              <div>
                <label className="block text-xs font-mono text-[#8E8E98] mb-1.5">
                  Planned Entry ($)
                </label>
                <input
                  type="number"
                  step="0.0000001"
                  value={entryPrice}
                  onChange={(e) => setEntryPrice(Math.max(0.0000001, Number(e.target.value)))}
                  className="w-full bg-[#0A0A0B] border border-[#242429] focus:border-[#E8A33D] rounded-lg py-2 px-3 text-sm font-mono text-[#EDEDEF] outline-none transition-colors"
                />
              </div>

              {/* Stop Loss Price */}
              <div>
                <label className="block text-xs font-mono text-rose-400 mb-1.5">
                  Invalidation Stop ($)
                </label>
                <input
                  type="number"
                  step="0.0000001"
                  value={stopPrice}
                  onChange={(e) => setStopPrice(Math.max(0.0000001, Number(e.target.value)))}
                  className="w-full bg-[#0A0A0B] border border-rose-900/50 focus:border-rose-500 rounded-lg py-2 px-3 text-sm font-mono text-[#EDEDEF] outline-none transition-colors"
                />
              </div>

              {/* Target Price */}
              <div>
                <label className="block text-xs font-mono text-emerald-400 mb-1.5">
                  Target Price ($)
                </label>
                <input
                  type="number"
                  step="0.0000001"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(Math.max(0.0000001, Number(e.target.value)))}
                  className="w-full bg-[#0A0A0B] border border-emerald-900/50 focus:border-emerald-500 rounded-lg py-2 px-3 text-sm font-mono text-[#EDEDEF] outline-none transition-colors"
                />
              </div>
            </div>

            {/* Stop / Target Quick Sliders */}
            <div className="flex items-center justify-between text-xs font-mono text-[#8E8E98] bg-[#0A0A0B] p-2.5 rounded border border-[#242429]">
              <span>Stop Distance: <strong className="text-rose-400">{stopDistancePercent.toFixed(2)}%</strong></span>
              <span>Target Distance: <strong className="text-emerald-400">{rewardDistancePercent.toFixed(2)}%</strong></span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleExportToJournal}
              className="w-full bg-[#E8A33D] hover:bg-amber-500 text-[#0A0A0B] font-mono font-bold py-2.5 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors text-xs tracking-wider"
            >
              <span>EXPORT SETUP TO TRADE JOURNAL</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Output Dashboard (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Primary Result Card */}
          <div className="bg-[#131316] border border-[#242429] p-5 sm:p-6 rounded-xl space-y-4">
            <div className="text-xs font-mono text-[#8E8E98] uppercase tracking-wider">
              Exact Order Execution Output
            </div>

            {/* Position Size Highlight */}
            <div className="bg-[#0A0A0B] border border-[#242429] p-4 rounded-lg">
              <span className="text-xs font-mono text-[#8E8E98] block">MAX ALLOWED POSITION SIZE</span>
              <div className="text-2xl font-mono font-bold text-[#EDEDEF] mt-1">
                ${positionSizeUsd.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <span className="text-[11px] font-mono text-[#8E8E98] block mt-0.5">
                ≈ {tokenQuantity.toLocaleString(undefined, { maximumFractionDigits: 0 })} {tokenSymbol || 'Tokens'}
              </span>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="bg-[#0A0A0B] border border-[#242429] p-3 rounded">
                <span className="text-[#8E8E98] block text-[10px]">MAX DOLLAR RISK</span>
                <span className="text-rose-400 font-bold text-base mt-0.5 block">
                  -${dollarRisk.toFixed(2)}
                </span>
                <span className="text-[10px] text-[#8E8E98]">{riskPercent}% of Bankroll</span>
              </div>

              <div className="bg-[#0A0A0B] border border-[#242429] p-3 rounded">
                <span className="text-[#8E8E98] block text-[10px]">POTENTIAL GAIN</span>
                <span className="text-emerald-400 font-bold text-base mt-0.5 block">
                  +${potentialProfitUsd.toFixed(2)}
                </span>
                <span className="text-[10px] text-[#8E8E98]">+{rewardDistancePercent.toFixed(1)}% Move</span>
              </div>
            </div>

            {/* Risk to Reward */}
            <div className="bg-[#0A0A0B] border border-[#242429] p-3 rounded flex items-center justify-between font-mono text-xs">
              <span className="text-[#8E8E98]">RISK-TO-REWARD (R:R):</span>
              <span className={`font-bold text-sm ${riskRewardRatio >= 2 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {riskRewardRatio.toFixed(2)} : 1
              </span>
            </div>

            {/* Liquidity Impact Warning */}
            <div className={`p-3 rounded-lg border text-xs font-mono ${
              isSevereSlippageRisk 
                ? 'bg-rose-950/40 border-rose-600/50 text-rose-300'
                : isHighSlippageRisk 
                  ? 'bg-amber-950/40 border-amber-600/50 text-amber-300'
                  : 'bg-[#0A0A0B] border-[#242429] text-[#8E8E98]'
            }`}>
              <div className="flex items-start space-x-2">
                {isHighSlippageRisk ? (
                  <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                )}
                <div>
                  <div className="font-semibold text-[#EDEDEF]">
                    Pool Liquidity Impact: {poolImpactPercent.toFixed(1)}%
                  </div>
                  <p className="text-[11px] mt-0.5">
                    {isSevereSlippageRisk
                      ? 'DANGER: Your order exceeds 10% of total pool liquidity. Slippage and price impact will decimate your execution.'
                      : isHighSlippageRisk
                        ? 'WARNING: Position exceeds 5% of pool. Split entries into 2-3 smaller swaps.'
                        : 'SAFE: Order is well within pool depth limits (<5%). Low price impact expected.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Educational Principle Callout */}
          <div className="bg-[#0A0A0B] border border-[#242429] p-4 rounded-xl text-xs space-y-2">
            <div className="flex items-center space-x-2 text-[#E8A33D] font-mono font-semibold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>TRENCHLAB PRINCIPLE: MATH OF RUIN</span>
            </div>
            <p className="text-[#8E8E98] leading-relaxed">
              If you lose 10% on a trade, you only need +11% to recover. But if you gamble 50% on an all-in trade, you need a <strong className="text-[#EDEDEF]">+100% gain</strong> just to get back to zero. Asymmetric downside destroys portfolios.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
