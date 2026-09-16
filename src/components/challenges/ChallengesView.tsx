import React, { useState } from 'react';
import { 
  Swords, 
  CheckCircle2, 
  Clock, 
  Target, 
  ListChecks, 
  FileText, 
  Award, 
  Filter,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { CHALLENGES_DATA } from '../../data/challengesData';
import { useUniversity } from '../../context/UniversityContext';
import { Difficulty } from '../../types';

export const ChallengesView: React.FC = () => {
  const { progress, toggleChallengeComplete } = useUniversity();
  const [filterDifficulty, setFilterDifficulty] = useState<string>('ALL');
  const [expandedChallengeId, setExpandedChallengeId] = useState<string | null>(CHALLENGES_DATA[0].id);

  const filteredChallenges = CHALLENGES_DATA.filter(c => {
    if (filterDifficulty !== 'ALL' && c.difficulty !== filterDifficulty) return false;
    return true;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-[#131316] border border-[#242429] p-5 sm:p-6 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start space-x-3">
          <div className="p-2.5 bg-[#E8A33D]/10 border border-[#E8A33D]/30 rounded-lg text-[#E8A33D]">
            <Swords className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold text-[#EDEDEF]">
              Practical Trench Challenges
            </h1>
            <p className="text-xs text-[#8E8E98] mt-0.5">
              Live exercises testing on-chain verification, cluster forensics, and execution discipline.
            </p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center space-x-2 text-xs font-mono">
          <Filter className="w-3.5 h-3.5 text-[#8E8E98]" />
          <span className="text-[#8E8E98]">DIFFICULTY:</span>
          <select
            value={filterDifficulty}
            onChange={e => setFilterDifficulty(e.target.value)}
            className="bg-[#0A0A0B] border border-[#242429] text-[#EDEDEF] text-xs rounded px-2.5 py-1.5 outline-none"
          >
            <option value="ALL">All Difficulties</option>
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
          </select>
        </div>
      </div>

      {/* Challenge Cards */}
      <div className="space-y-4">
        {filteredChallenges.map((c) => {
          const isCompleted = progress.completedChallenges.includes(c.id);
          const isExpanded = expandedChallengeId === c.id;

          return (
            <div
              key={c.id}
              className={`bg-[#131316] border rounded-xl overflow-hidden transition-all ${
                isCompleted 
                  ? 'border-emerald-500/40 bg-emerald-950/10' 
                  : 'border-[#242429] hover:border-[#3A3A42]'
              }`}
            >
              {/* Card Header (Always Visible) */}
              <div 
                onClick={() => setExpandedChallengeId(isExpanded ? null : c.id)}
                className="p-5 flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleChallengeComplete(c.id);
                    }}
                    className={`p-1 rounded-full transition-colors ${
                      isCompleted ? 'text-emerald-400' : 'text-[#8E8E98] hover:text-[#EDEDEF]'
                    }`}
                    title={isCompleted ? 'Mark as incomplete' : 'Mark as completed (+150 XP)'}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </button>

                  <div>
                    <div className="flex items-center space-x-2">
                      <h2 className="text-base font-display font-bold text-[#EDEDEF]">
                        {c.title}
                      </h2>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                        c.difficulty === 'BEGINNER' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40' :
                        c.difficulty === 'INTERMEDIATE' ? 'bg-amber-950/60 text-amber-400 border border-amber-800/40' :
                        'bg-rose-950/60 text-rose-400 border border-rose-800/40'
                      }`}>
                        {c.difficulty}
                      </span>
                    </div>

                    <p className="text-xs text-[#8E8E98] mt-1">
                      {c.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="hidden sm:flex items-center space-x-1 text-xs font-mono text-[#E8A33D]">
                    <Award className="w-3.5 h-3.5" />
                    <span>+150 XP</span>
                  </div>

                  <div className="text-[#8E8E98] p-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="p-5 pt-0 border-t border-[#242429] space-y-4 text-xs font-mono mt-2">
                  {/* Criteria Checklist */}
                  <div className="space-y-1.5 pt-3">
                    <span className="text-[#E8A33D] font-bold flex items-center space-x-1.5">
                      <Target className="w-3.5 h-3.5" />
                      <span>TARGET AUDIT CRITERIA</span>
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {c.targetCriteria.map((crit, i) => (
                        <div key={i} className="flex items-start space-x-2 bg-[#0A0A0B] p-2.5 rounded border border-[#242429] text-[#EDEDEF]">
                          <span className="text-[#E8A33D] font-bold">[{i+1}]</span>
                          <span className="text-xs font-sans">{crit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Methodology */}
                  <div className="space-y-1.5">
                    <span className="text-sky-400 font-bold flex items-center space-x-1.5">
                      <ListChecks className="w-3.5 h-3.5" />
                      <span>STEP-BY-STEP DRILL METHODOLOGY</span>
                    </span>
                    <ol className="space-y-1 text-[#8E8E98] list-decimal list-inside font-sans">
                      {c.methodology.map((step, i) => (
                        <li key={i} className="text-xs text-[#EDEDEF]">
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Output Requirement */}
                  <div className="bg-[#0A0A0B] p-3 rounded-lg border border-[#242429] space-y-1">
                    <span className="text-[#8E8E98] font-bold block text-[10px] uppercase">
                      VERIFICATION DELIVERABLE:
                    </span>
                    <p className="text-xs font-sans text-[#EDEDEF]">
                      {c.outputRequirement}
                    </p>
                  </div>

                  {/* Action Button */}
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => toggleChallengeComplete(c.id)}
                      className={`px-4 py-2 rounded-lg font-mono font-bold text-xs flex items-center space-x-2 transition-colors ${
                        isCompleted
                          ? 'bg-emerald-950 border border-emerald-500 text-emerald-300'
                          : 'bg-[#E8A33D] hover:bg-amber-500 text-[#0A0A0B]'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isCompleted ? 'COMPLETED & VERIFIED' : 'MARK CHALLENGE AS COMPLETED (+150 XP)'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
