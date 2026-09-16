import React, { useState } from 'react';
import { 
  BookOpenCheck, 
  Plus, 
  Trash2, 
  TrendingUp, 
  TrendingDown, 
  MinusCircle, 
  Filter, 
  Smile, 
  AlertCircle,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { useUniversity } from '../../context/UniversityContext';
import { TradeJournalEntry } from '../../types';

export const TradeJournal: React.FC = () => {
  const { progress, addJournalEntry, deleteJournalEntry } = useUniversity();
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterResult, setFilterResult] = useState<string>('ALL');
  const [filterEmotion, setFilterEmotion] = useState<string>('ALL');

  // Form State
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [entryPrice, setEntryPrice] = useState<number | ''>('');
  const [exitPrice, setExitPrice] = useState<number | ''>('');
  const [positionSizeUsd, setPositionSizeUsd] = useState<number | ''>('');
  const [reasonForEntry, setReasonForEntry] = useState('');
  const [invalidation, setInvalidation] = useState('');
  const [takeProfitPlan, setTakeProfitPlan] = useState('');
  const [result, setResult] = useState<'WIN' | 'LOSS' | 'BREAKEVEN' | 'OPEN'>('OPEN');
  const [emotion, setEmotion] = useState<'Disciplined' | 'FOMO' | 'Patient' | 'Anxious' | 'Greedy' | 'Revenge'>('Disciplined');
  const [whatILearned, setWhatILearned] = useState('');

  // Stats Calculations
  const totalTrades = progress.journalEntries.length;
  const closedTrades = progress.journalEntries.filter(t => t.result !== 'OPEN');
  const wins = progress.journalEntries.filter(t => t.result === 'WIN');
  const losses = progress.journalEntries.filter(t => t.result === 'LOSS');
  const winRate = closedTrades.length > 0 ? Math.round((wins.length / closedTrades.length) * 100) : 0;
  
  const totalNetPnl = progress.journalEntries.reduce((acc, t) => acc + (t.pnlUsd || 0), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenSymbol || !entryPrice || !positionSizeUsd) return;

    let computedPnlUsd: number | undefined = undefined;
    let computedPnlPercent: number | undefined = undefined;

    if (exitPrice && typeof exitPrice === 'number' && typeof entryPrice === 'number') {
      computedPnlPercent = ((exitPrice - entryPrice) / entryPrice) * 100;
      computedPnlUsd = (computedPnlPercent / 100) * Number(positionSizeUsd);
    }

    addJournalEntry({
      tokenSymbol: tokenSymbol.toUpperCase(),
      contractAddress: contractAddress || undefined,
      entryPrice: Number(entryPrice),
      exitPrice: exitPrice ? Number(exitPrice) : undefined,
      positionSizeUsd: Number(positionSizeUsd),
      reasonForEntry,
      invalidation,
      takeProfitPlan,
      result,
      pnlUsd: computedPnlUsd,
      pnlPercent: computedPnlPercent,
      emotion,
      whatILearned
    });

    // Reset Form
    setTokenSymbol('');
    setContractAddress('');
    setEntryPrice('');
    setExitPrice('');
    setPositionSizeUsd('');
    setReasonForEntry('');
    setInvalidation('');
    setTakeProfitPlan('');
    setResult('OPEN');
    setEmotion('Disciplined');
    setWhatILearned('');
    setShowAddForm(false);
  };

  // Filtered List
  const filteredEntries = progress.journalEntries.filter(entry => {
    if (filterResult !== 'ALL' && entry.result !== filterResult) return false;
    if (filterEmotion !== 'ALL' && entry.emotion !== filterEmotion) return false;
    return true;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-[#131316] border border-[#242429] p-5 sm:p-6 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start space-x-3">
          <div className="p-2.5 bg-[#E8A33D]/10 border border-[#E8A33D]/30 rounded-lg text-[#E8A33D]">
            <BookOpenCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold text-[#EDEDEF]">
              The TRENCHLAB Trade Journal
            </h1>
            <p className="text-xs text-[#8E8E98] mt-0.5">
              Review your setups, track emotional leaks, and measure statistical expectancy over time.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-[#E8A33D] hover:bg-amber-500 text-[#0A0A0B] font-mono font-bold text-xs px-4 py-2.5 rounded-lg flex items-center justify-center space-x-2 transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{showAddForm ? 'CLOSE FORM' : 'LOG NEW TRADE'}</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-[#131316] border border-[#242429] p-4 rounded-xl">
          <span className="text-[10px] font-mono text-[#8E8E98] uppercase block">TOTAL LOGGED</span>
          <div className="text-xl font-mono font-bold text-[#EDEDEF] mt-1">
            {totalTrades} Trades
          </div>
          <span className="text-[10px] font-mono text-[#8E8E98]">
            {closedTrades.length} closed, {totalTrades - closedTrades.length} open
          </span>
        </div>

        <div className="bg-[#131316] border border-[#242429] p-4 rounded-xl">
          <span className="text-[10px] font-mono text-[#8E8E98] uppercase block">WIN RATE</span>
          <div className={`text-xl font-mono font-bold mt-1 ${winRate >= 50 ? 'text-emerald-400' : 'text-amber-400'}`}>
            {winRate}%
          </div>
          <span className="text-[10px] font-mono text-[#8E8E98]">
            {wins.length}W — {losses.length}L
          </span>
        </div>

        <div className="bg-[#131316] border border-[#242429] p-4 rounded-xl">
          <span className="text-[10px] font-mono text-[#8E8E98] uppercase block">NET REALIZED PnL</span>
          <div className={`text-xl font-mono font-bold mt-1 ${totalNetPnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {totalNetPnl >= 0 ? `+$${totalNetPnl.toFixed(2)}` : `-$${Math.abs(totalNetPnl).toFixed(2)}`}
          </div>
          <span className="text-[10px] font-mono text-[#8E8E98]">
            Across tracked trades
          </span>
        </div>

        <div className="bg-[#131316] border border-[#242429] p-4 rounded-xl">
          <span className="text-[10px] font-mono text-[#8E8E98] uppercase block">EMOTIONAL DISCIPLINE</span>
          <div className="text-xl font-mono font-bold text-[#E8A33D] mt-1">
            {progress.journalEntries.filter(t => t.emotion === 'Disciplined').length} / {totalTrades || 1}
          </div>
          <span className="text-[10px] font-mono text-[#8E8E98]">
            Disciplined executions
          </span>
        </div>
      </div>

      {/* Log Trade Modal/Form */}
      {showAddForm && (
        <form 
          onSubmit={handleSubmit}
          className="bg-[#131316] border border-[#E8A33D]/40 p-5 sm:p-6 rounded-xl space-y-4 transition-all"
        >
          <div className="flex items-center justify-between border-b border-[#242429] pb-3">
            <h2 className="text-sm font-display font-bold text-[#EDEDEF] uppercase tracking-wider">
              Log Trade Setup & Post-Mortem
            </h2>
            <span className="text-xs font-mono text-[#8E8E98]">Phase 11 Compliance</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-[#8E8E98] mb-1">Token Symbol *</label>
              <input
                type="text"
                required
                value={tokenSymbol}
                onChange={e => setTokenSymbol(e.target.value)}
                placeholder="e.g. BONK"
                className="w-full bg-[#0A0A0B] border border-[#242429] focus:border-[#E8A33D] rounded-lg py-2 px-3 text-sm font-mono text-[#EDEDEF] uppercase outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#8E8E98] mb-1">Contract Address (Mint CA)</label>
              <input
                type="text"
                value={contractAddress}
                onChange={e => setContractAddress(e.target.value)}
                placeholder="e.g. 7xKX...pump"
                className="w-full bg-[#0A0A0B] border border-[#242429] focus:border-[#E8A33D] rounded-lg py-2 px-3 text-sm font-mono text-[#EDEDEF] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#8E8E98] mb-1">Position Size ($ USD) *</label>
              <input
                type="number"
                required
                value={positionSizeUsd}
                onChange={e => setPositionSizeUsd(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="e.g. 500"
                className="w-full bg-[#0A0A0B] border border-[#242429] focus:border-[#E8A33D] rounded-lg py-2 px-3 text-sm font-mono text-[#EDEDEF] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-[#8E8E98] mb-1">Entry Price ($) *</label>
              <input
                type="number"
                step="0.0000001"
                required
                value={entryPrice}
                onChange={e => setEntryPrice(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="0.025"
                className="w-full bg-[#0A0A0B] border border-[#242429] focus:border-[#E8A33D] rounded-lg py-2 px-3 text-sm font-mono text-[#EDEDEF] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#8E8E98] mb-1">Exit Price ($)</label>
              <input
                type="number"
                step="0.0000001"
                value={exitPrice}
                onChange={e => setExitPrice(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="0.035 (leave blank if open)"
                className="w-full bg-[#0A0A0B] border border-[#242429] focus:border-[#E8A33D] rounded-lg py-2 px-3 text-sm font-mono text-[#EDEDEF] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#8E8E98] mb-1">Trade Result</label>
              <select
                value={result}
                onChange={e => setResult(e.target.value as any)}
                className="w-full bg-[#0A0A0B] border border-[#242429] focus:border-[#E8A33D] rounded-lg py-2 px-3 text-sm font-mono text-[#EDEDEF] outline-none"
              >
                <option value="OPEN">OPEN (Still Holding)</option>
                <option value="WIN">WIN (Profitable Exit)</option>
                <option value="LOSS">LOSS (Stopped Out)</option>
                <option value="BREAKEVEN">BREAKEVEN (0%)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-[#8E8E98] mb-1">
                Reason for Entry (Setup Playbook) *
              </label>
              <textarea
                required
                rows={2}
                value={reasonForEntry}
                onChange={e => setReasonForEntry(e.target.value)}
                placeholder="e.g. Breakout retest of 15m resistance with 3x volume acceleration."
                className="w-full bg-[#0A0A0B] border border-[#242429] focus:border-[#E8A33D] rounded-lg p-2.5 text-xs font-mono text-[#EDEDEF] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-rose-400 mb-1">
                Invalidation Thesis (Stop Loss Trigger) *
              </label>
              <textarea
                required
                rows={2}
                value={invalidation}
                onChange={e => setInvalidation(e.target.value)}
                placeholder="e.g. 5m candle close below the $0.021 support level."
                className="w-full bg-[#0A0A0B] border border-[#242429] focus:border-[#E8A33D] rounded-lg p-2.5 text-xs font-mono text-[#EDEDEF] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-emerald-400 mb-1">
                Take Profit Plan (TP1, TP2, Runner)
              </label>
              <input
                type="text"
                value={takeProfitPlan}
                onChange={e => setTakeProfitPlan(e.target.value)}
                placeholder="e.g. Sell 50% at 2x, 25% at $0.05, 25% moonbag"
                className="w-full bg-[#0A0A0B] border border-[#242429] focus:border-[#E8A33D] rounded-lg py-2 px-3 text-xs font-mono text-[#EDEDEF] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#8E8E98] mb-1">
                Emotional State During Trade *
              </label>
              <select
                value={emotion}
                onChange={e => setEmotion(e.target.value as any)}
                className="w-full bg-[#0A0A0B] border border-[#242429] focus:border-[#E8A33D] rounded-lg py-2 px-3 text-xs font-mono text-[#EDEDEF] outline-none"
              >
                <option value="Disciplined">Disciplined (Waited for trigger)</option>
                <option value="Patient">Patient (Calm execution)</option>
                <option value="FOMO">FOMO (Chased green candle)</option>
                <option value="Anxious">Anxious (Position too large)</option>
                <option value="Greedy">Greedy (Failed to take profit)</option>
                <option value="Revenge">Revenge (Trading to recover loss)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-[#8E8E98] mb-1">
              What I Learned / Notes for Next Trade
            </label>
            <input
              type="text"
              value={whatILearned}
              onChange={e => setWhatILearned(e.target.value)}
              placeholder="e.g. The 15m S/R flip held cleanly; sticking to the scale-out plan prevented emotional panic."
              className="w-full bg-[#0A0A0B] border border-[#242429] focus:border-[#E8A33D] rounded-lg py-2 px-3 text-xs font-mono text-[#EDEDEF] outline-none"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-xs font-mono text-[#8E8E98] hover:text-[#EDEDEF]"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="bg-[#E8A33D] hover:bg-amber-500 text-[#0A0A0B] font-mono font-bold text-xs px-5 py-2 rounded-lg"
            >
              SAVE TRADE RECORD
            </button>
          </div>
        </form>
      )}

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#131316] border border-[#242429] p-3 rounded-lg text-xs font-mono">
        <div className="flex items-center space-x-2 text-[#8E8E98]">
          <Filter className="w-3.5 h-3.5" />
          <span>FILTER:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Result Filter */}
          <div className="flex items-center space-x-1 bg-[#0A0A0B] p-1 rounded border border-[#242429]">
            {['ALL', 'WIN', 'LOSS', 'OPEN'].map((res) => (
              <button
                key={res}
                onClick={() => setFilterResult(res)}
                className={`px-2 py-1 rounded text-[10px] transition-colors ${
                  filterResult === res 
                    ? 'bg-[#1C1C22] text-[#EDEDEF] font-bold border border-[#3A3A42]' 
                    : 'text-[#8E8E98] hover:text-[#EDEDEF]'
                }`}
              >
                {res}
              </button>
            ))}
          </div>

          {/* Emotion Filter */}
          <select
            value={filterEmotion}
            onChange={e => setFilterEmotion(e.target.value)}
            className="bg-[#0A0A0B] border border-[#242429] text-[#8E8E98] text-[10px] rounded px-2 py-1 outline-none"
          >
            <option value="ALL">All Emotions</option>
            <option value="Disciplined">Disciplined</option>
            <option value="FOMO">FOMO</option>
            <option value="Patient">Patient</option>
            <option value="Anxious">Anxious</option>
            <option value="Greedy">Greedy</option>
            <option value="Revenge">Revenge</option>
          </select>
        </div>
      </div>

      {/* Entries List */}
      <div className="space-y-3">
        {filteredEntries.length === 0 ? (
          <div className="bg-[#131316] border border-[#242429] p-8 text-center rounded-xl">
            <p className="text-xs font-mono text-[#8E8E98]">
              No trade records found matching active filters.
            </p>
          </div>
        ) : (
          filteredEntries.map((entry) => {
            const isWin = entry.result === 'WIN';
            const isLoss = entry.result === 'LOSS';
            const isOpen = entry.result === 'OPEN';

            return (
              <div 
                key={entry.id}
                className="bg-[#131316] border border-[#242429] hover:border-[#3A3A42] p-4 sm:p-5 rounded-xl transition-colors space-y-3"
              >
                {/* Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#242429] pb-3">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono font-bold text-base text-[#EDEDEF]">
                      ${entry.tokenSymbol}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      isWin ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                      isLoss ? 'bg-rose-950 text-rose-400 border border-rose-800' :
                      'bg-amber-950 text-amber-400 border border-amber-800'
                    }`}>
                      {entry.result}
                    </span>
                    <span className="text-[11px] font-mono text-[#8E8E98]">
                      {entry.date}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    {entry.pnlUsd !== undefined && (
                      <div className={`text-sm font-mono font-bold ${entry.pnlUsd >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {entry.pnlUsd >= 0 ? `+$${entry.pnlUsd.toFixed(2)}` : `-$${Math.abs(entry.pnlUsd).toFixed(2)}`}
                        {entry.pnlPercent !== undefined && (
                          <span className="text-xs font-normal ml-1">
                            ({entry.pnlPercent >= 0 ? '+' : ''}{entry.pnlPercent.toFixed(1)}%)
                          </span>
                        )}
                      </div>
                    )}

                    <button
                      onClick={() => deleteJournalEntry(entry.id)}
                      className="text-[#8E8E98] hover:text-rose-400 transition-colors p-1"
                      title="Delete record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                  <div>
                    <span className="text-[#8E8E98] text-[10px] block">POSITION SIZE</span>
                    <span className="text-[#EDEDEF] font-medium">${entry.positionSizeUsd}</span>
                  </div>
                  <div>
                    <span className="text-[#8E8E98] text-[10px] block">ENTRY PRICE</span>
                    <span className="text-[#EDEDEF] font-medium">${entry.entryPrice}</span>
                  </div>
                  <div>
                    <span className="text-[#8E8E98] text-[10px] block">EXIT PRICE</span>
                    <span className="text-[#EDEDEF] font-medium">{entry.exitPrice ? `$${entry.exitPrice}` : 'Holding'}</span>
                  </div>
                  <div>
                    <span className="text-[#8E8E98] text-[10px] block">MINDSET</span>
                    <span className={`font-semibold ${
                      entry.emotion === 'Disciplined' || entry.emotion === 'Patient' ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {entry.emotion}
                    </span>
                  </div>
                </div>

                {/* Setup & Invalidation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="bg-[#0A0A0B] border border-[#242429] p-2.5 rounded">
                    <span className="text-[10px] font-mono text-[#8E8E98] block mb-0.5">SETUP PLAYBOOK:</span>
                    <p className="text-[#EDEDEF] text-xs leading-relaxed">{entry.reasonForEntry}</p>
                  </div>
                  <div className="bg-[#0A0A0B] border border-[#242429] p-2.5 rounded">
                    <span className="text-[10px] font-mono text-rose-400 block mb-0.5">HARD INVALIDATION:</span>
                    <p className="text-[#EDEDEF] text-xs leading-relaxed">{entry.invalidation}</p>
                  </div>
                </div>

                {/* Reflection */}
                {entry.whatILearned && (
                  <div className="text-xs text-[#8E8E98] bg-[#0A0A0B]/50 p-2 rounded border border-[#242429]">
                    <strong className="text-[#E8A33D] font-mono">POST-MORTEM REFLECTION: </strong>
                    <span className="italic">{entry.whatILearned}</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
