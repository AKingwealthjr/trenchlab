import React, { useState } from 'react';
import { 
  BookMarked, 
  Search, 
  Filter, 
  Lightbulb, 
  ChevronDown, 
  ChevronUp,
  Tag
} from 'lucide-react';
import { GLOSSARY_DATA } from '../../data/glossaryData';
import { GlossaryItem } from '../../types';

export const GlossaryView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [expandedId, setExpandedId] = useState<string | null>(GLOSSARY_DATA[0].id);

  const categories = ['ALL', 'Market Structure', 'Solana & DeFi', 'On-Chain & Safety', 'Execution & Risk'];

  const filteredItems = GLOSSARY_DATA.filter(item => {
    if (selectedCategory !== 'ALL' && item.category !== selectedCategory) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        item.term.toLowerCase().includes(q) ||
        item.shortDef.toLowerCase().includes(q) ||
        item.fullExplanation.toLowerCase().includes(q) ||
        item.practicalTip.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-[#131316] border border-[#242429] p-5 sm:p-6 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start space-x-3">
          <div className="p-2.5 bg-[#E8A33D]/10 border border-[#E8A33D]/30 rounded-lg text-[#E8A33D]">
            <BookMarked className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold text-[#EDEDEF]">
              The TRENCHLAB Technical Glossary
            </h1>
            <p className="text-xs text-[#8E8E98] mt-0.5">
              Comprehensive reference of on-chain trading mechanics, market structures, and risk concepts.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#8E8E98]" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search definitions (e.g. MEV, AMM, Slippage)..."
            className="w-full bg-[#0A0A0B] border border-[#242429] focus:border-[#E8A33D] rounded-lg pl-8 pr-3 py-1.5 text-xs font-mono text-[#EDEDEF] outline-none"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs font-mono">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg border transition-colors whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-[#1C1C22] border-[#E8A33D] text-[#EDEDEF] font-bold'
                : 'bg-[#131316] border-[#242429] text-[#8E8E98] hover:text-[#EDEDEF]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Glossary Items List */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="bg-[#131316] border border-[#242429] p-8 text-center rounded-xl">
            <p className="text-xs font-mono text-[#8E8E98]">
              No glossary terms matching "{searchQuery}".
            </p>
          </div>
        ) : (
          filteredItems.map((item) => {
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                className="bg-[#131316] border border-[#242429] hover:border-[#3A3A42] rounded-xl overflow-hidden transition-all"
              >
                <div
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2.5">
                      <h2 className="text-base font-display font-bold text-[#EDEDEF]">
                        {item.term}
                      </h2>
                      <span className="text-[10px] font-mono bg-[#0A0A0B] border border-[#242429] text-[#8E8E98] px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                    </div>

                    <p className="text-xs text-[#8E8E98] line-clamp-1 sm:line-clamp-none">
                      {item.shortDef}
                    </p>
                  </div>

                  <div className="text-[#8E8E98] p-1 ml-4 shrink-0">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-4 sm:p-5 pt-0 border-t border-[#242429] space-y-3 text-xs mt-1">
                    <div className="space-y-1 pt-3">
                      <span className="text-[10px] font-mono text-[#8E8E98] uppercase">
                        EXHAUSTIVE EXPLANATION:
                      </span>
                      <p className="text-[#EDEDEF] leading-relaxed">
                        {item.fullExplanation}
                      </p>
                    </div>

                    <div className="bg-amber-950/20 border border-amber-500/30 p-3 rounded-lg flex items-start space-x-2.5">
                      <Lightbulb className="w-4 h-4 text-[#E8A33D] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-mono text-[#E8A33D] font-bold block mb-0.5 uppercase">
                          TACTICAL OPERATOR RULE:
                        </span>
                        <p className="text-[#EDEDEF] text-xs leading-relaxed">
                          {item.practicalTip}
                        </p>
                      </div>
                    </div>
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
