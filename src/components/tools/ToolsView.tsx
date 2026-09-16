import React, { useState } from 'react';
import { 
  Wrench, 
  ExternalLink, 
  Search, 
  Filter, 
  CheckCircle2, 
  Sparkles, 
  BookOpen,
  Compass,
  Zap
} from 'lucide-react';
import { TOOLS_DATA } from '../../data/toolsData';

export const ToolsView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['ALL', 'DISCOVERY', 'ON-CHAIN', 'TRADING', 'WALLET INTELLIGENCE'];

  const filteredTools = TOOLS_DATA.filter(tool => {
    if (selectedCategory !== 'ALL' && tool.category !== selectedCategory) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        tool.name.toLowerCase().includes(q) ||
        tool.purpose.toLowerCase().includes(q) ||
        tool.whenToUse.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-[#131316] border border-[#242429] p-5 sm:p-6 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start space-x-3">
          <div className="p-2.5 bg-[#E8A33D]/10 border border-[#E8A33D]/30 rounded-lg text-[#E8A33D]">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold text-[#EDEDEF]">
              The Trench Operator's Tool Suite
            </h1>
            <p className="text-xs text-[#8E8E98] mt-0.5">
              Curated, battle-tested software and analytics terminals used by professional Solana traders.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#8E8E98]" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search tools & features..."
            className="w-full bg-[#0A0A0B] border border-[#242429] focus:border-[#E8A33D] rounded-lg pl-8 pr-3 py-1.5 text-xs font-mono text-[#EDEDEF] outline-none"
          />
        </div>
      </div>

      {/* Category Tabs */}
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

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            className="bg-[#131316] border border-[#242429] hover:border-[#3A3A42] p-5 rounded-xl flex flex-col justify-between space-y-4 transition-all"
          >
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <h2 className="text-base font-display font-bold text-[#EDEDEF]">
                    {tool.name}
                  </h2>
                  {tool.badge && (
                    <span className="text-[10px] font-mono bg-[#E8A33D]/10 text-[#E8A33D] border border-[#E8A33D]/30 px-2 py-0.5 rounded font-semibold">
                      {tool.badge}
                    </span>
                  )}
                </div>

                <span className="text-[10px] font-mono text-[#8E8E98] bg-[#0A0A0B] border border-[#242429] px-2 py-0.5 rounded">
                  {tool.category}
                </span>
              </div>

              {/* Purpose */}
              <p className="text-xs text-[#8E8E98] leading-relaxed">
                {tool.purpose}
              </p>

              {/* When to use */}
              <div className="bg-[#0A0A0B] border border-[#242429] p-3 rounded-lg text-xs font-mono">
                <span className="text-[#E8A33D] block text-[10px] uppercase font-bold mb-1">
                  TACTICAL USE CASE:
                </span>
                <p className="text-[#EDEDEF] leading-relaxed font-sans text-xs">
                  {tool.whenToUse}
                </p>
              </div>

              {/* Key Features */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#8E8E98] uppercase">CORE CAPABILITIES:</span>
                <ul className="grid grid-cols-1 gap-1">
                  {tool.keyFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start space-x-1.5 text-xs text-[#EDEDEF]">
                      <span className="text-[#E8A33D] font-mono">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-[#242429] flex items-center justify-between text-xs font-mono">
              <div className="text-[10px] text-[#8E8E98]">
                {tool.relevantLessons.length > 0 && (
                  <span>Taught in: {tool.relevantLessons[0]}</span>
                )}
              </div>

              <a
                href={tool.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 bg-[#1C1C22] hover:bg-[#282832] border border-[#3A3A42] hover:border-[#E8A33D] text-[#EDEDEF] px-3 py-1.5 rounded-lg text-xs font-mono transition-colors"
              >
                <span>LAUNCH TOOL</span>
                <ExternalLink className="w-3 h-3 text-[#E8A33D]" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
