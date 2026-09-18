import React, { useState } from 'react';
import { 
  GraduationCap, 
  Lock, 
  CheckCircle2, 
  Award, 
  Search, 
  Clock, 
  BookOpen, 
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Filter
} from 'lucide-react';
import { CURRICULUM_DATA } from '../../data/curriculumData';
import { Phase, Lesson } from '../../types';
import { useUniversity } from '../../context/UniversityContext';
import { LessonViewerModal } from './LessonViewerModal';
import { QuizModal } from './QuizModal';

export const CurriculumView: React.FC = () => {
  const { progress, isPhaseUnlocked, isLessonUnlocked, isPhaseAssessmentUnlocked, currentLevel } = useUniversity();

  const [selectedPhaseId, setSelectedPhaseId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeQuizPhase, setActiveQuizPhase] = useState<Phase | null>(null);

  const currentPhase = CURRICULUM_DATA.find(p => p.id === selectedPhaseId) || CURRICULUM_DATA[0];
  const isUnlocked = isPhaseUnlocked(currentPhase);

  // Phase progress
  const completedInCurrentPhase = currentPhase.lessons.filter(l => 
    progress.completedLessons.includes(l.id)
  ).length;
  const phaseProgressPercent = Math.round((completedInCurrentPhase / currentPhase.lessons.length) * 100);

  // Search across all curriculum
  const filteredSearchResults = searchQuery.trim() !== '' 
    ? CURRICULUM_DATA.flatMap(p => 
        p.lessons
          .filter(l => 
            l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            l.keyConcepts.some(c => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
            l.deepDive.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()))
          )
          .map(l => ({ phase: p, lesson: l }))
      )
    : null;

  const currentQuizScore = progress.quizScores[currentPhase.quiz.id];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Search & Header Bar */}
      <div className="bg-[#131316] border border-[#242429] p-4 sm:p-5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-display font-bold text-[#EDEDEF] flex items-center space-x-2">
            <GraduationCap className="w-6 h-6 text-[#E8A33D]" />
            <span>The 12-Phase Curriculum</span>
          </h1>
          <p className="text-xs text-[#8E8E98] mt-0.5">
            148 rigorously structured lessons. Transition from zero to disciplined on-chain operator.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#8E8E98]" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search lessons, concepts (e.g. MEV, LP, Candlesticks)..."
            className="w-full bg-[#0A0A0B] border border-[#242429] focus:border-[#E8A33D] rounded-lg pl-9 pr-3 py-2 text-xs font-mono text-[#EDEDEF] outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-[#8E8E98] hover:text-[#EDEDEF]"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* If Searching, show search results */}
      {filteredSearchResults !== null ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-[#8E8E98]">
            <span>SEARCH RESULTS: FOUND {filteredSearchResults.length} LESSONS</span>
            <button onClick={() => setSearchQuery('')} className="text-[#E8A33D] hover:underline">
              Clear Search
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSearchResults.map(({ phase, lesson }) => {
              const isCompleted = progress.completedLessons.includes(lesson.id);
              return (
                <div
                  key={lesson.id}
                  onClick={() => setActiveLesson(lesson)}
                  className="bg-[#131316] border border-[#242429] hover:border-[#E8A33D]/60 p-4 rounded-xl cursor-pointer transition-all hover:translate-y-[-2px] space-y-3"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[#E8A33D] font-semibold">{phase.badge}</span>
                    <span className="text-[#8E8E98]">{lesson.estimatedTime}</span>
                  </div>

                  <div>
                    <h3 className="text-sm font-display font-bold text-[#EDEDEF] line-clamp-1">
                      {lesson.title}
                    </h3>
                    <div className="text-[11px] font-mono text-[#8E8E98] mt-0.5">
                      {phase.title} • Lesson {lesson.lessonNumber}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {lesson.keyConcepts.slice(0, 3).map((concept, i) => (
                      <span key={i} className="text-[9px] font-mono bg-[#0A0A0B] border border-[#242429] px-2 py-0.5 rounded text-[#8E8E98]">
                        {concept}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#242429] text-xs font-mono">
                    <span className={`text-[10px] ${
                      lesson.difficulty === 'BEGINNER' ? 'text-emerald-400' :
                      lesson.difficulty === 'INTERMEDIATE' ? 'text-amber-400' : 'text-rose-400'
                    }`}>
                      {lesson.difficulty}
                    </span>

                    {isCompleted ? (
                      <span className="text-emerald-400 flex items-center space-x-1 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Completed</span>
                      </span>
                    ) : (
                      <span className="text-[#8E8E98] flex items-center space-x-1 text-[11px]">
                        <span>Start</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <>
          {/* Phase Selector Horizontal Scroller */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
            {CURRICULUM_DATA.map((phase) => {
              const unlocked = isPhaseUnlocked(phase);
              const isSelected = phase.id === selectedPhaseId;
              const completedCount = phase.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
              const isPhaseDone = completedCount === phase.lessons.length;

              return (
                <button
                  key={phase.id}
                  onClick={() => setSelectedPhaseId(phase.id)}
                  className={`flex-shrink-0 px-3.5 py-2 rounded-lg border text-xs font-mono transition-all flex items-center space-x-2 ${
                    isSelected 
                      ? 'bg-[#1C1C22] border-[#E8A33D] text-[#EDEDEF] shadow-[0_0_12px_rgba(232,163,61,0.15)]' 
                      : 'bg-[#131316] border-[#242429] text-[#8E8E98] hover:text-[#EDEDEF] hover:border-[#3A3A42]'
                  }`}
                >
                  {!unlocked ? (
                    <Lock className="w-3.5 h-3.5 text-rose-400" />
                  ) : isPhaseDone ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-[#E8A33D]" />
                  )}
                  <span className="font-semibold">P{String(phase.id).padStart(2, '0')}</span>
                  <span className="hidden sm:inline text-[11px] opacity-80">{phase.badge}</span>
                </button>
              );
            })}
          </div>

          {/* Current Phase Active Banner */}
          <div className="bg-[#131316] border border-[#242429] p-5 sm:p-6 rounded-xl space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold text-[#E8A33D] bg-[#E8A33D]/10 px-2 py-0.5 rounded border border-[#E8A33D]/30">
                    {currentPhase.badge}
                  </span>
                  <span className="text-xs font-mono text-[#8E8E98]">
                    PHASE {String(currentPhase.id).padStart(2, '0')} OF 12
                  </span>
                  {!isUnlocked && (
                    <span className="text-xs font-mono text-rose-400 bg-rose-950/40 border border-rose-800/40 px-2 py-0.5 rounded flex items-center space-x-1">
                      <Lock className="w-3 h-3" />
                      <span>LOCKED (Complete Phase {currentPhase.id - 1} lessons & assessment ≥75%)</span>
                    </span>
                  )}
                </div>

                <h2 className="text-lg sm:text-xl font-display font-bold text-[#EDEDEF]">
                  {currentPhase.subtitle}
                </h2>
                <p className="text-xs text-[#8E8E98] max-w-3xl leading-relaxed">
                  {currentPhase.description}
                </p>
              </div>

              {/* Assessment Action */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveQuizPhase(currentPhase)}
                  className="bg-[#1C1C22] hover:bg-[#26262E] border border-[#3A3A42] hover:border-[#E8A33D] text-[#EDEDEF] px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center space-x-2 transition-all"
                >
                  <Award className="w-4 h-4 text-[#E8A33D]" />
                  <span>TAKE PHASE ASSESSMENT</span>
                  {currentQuizScore !== undefined && (
                    <span className={`ml-1 text-[10px] px-1.5 py-0.5 rounded ${
                      currentQuizScore >= currentPhase.quiz.passingScore 
                        ? 'bg-emerald-950 text-emerald-400 font-bold' 
                        : 'bg-rose-950 text-rose-400'
                    }`}>
                      {currentQuizScore}%
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Progress Bar & Practical Assignment Teaser */}
            <div className="pt-2 border-t border-[#242429] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <span className="text-[#8E8E98]">PROGRESS:</span>
                <div className="w-32 bg-[#0A0A0B] h-2 rounded-full overflow-hidden border border-[#242429]">
                  <div 
                    className="bg-[#E8A33D] h-full rounded-full transition-all duration-300"
                    style={{ width: `${phaseProgressPercent}%` }}
                  />
                </div>
                <span className="text-[#EDEDEF] font-bold">
                  {completedInCurrentPhase} / {currentPhase.lessons.length}
                </span>
              </div>

              <div className="text-[#8E8E98] text-[11px] truncate">
                <span className="text-[#E8A33D]">Capstone Assignment: </span>
                {currentPhase.practicalAssignment.title}
              </div>
            </div>
          </div>

          {/* Lessons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentPhase.lessons.map((lesson) => {
              const isCompleted = progress.completedLessons.includes(lesson.id);

              return (
                <div
                  key={lesson.id}
                  onClick={() => setActiveLesson(lesson)}
                  className={`bg-[#131316] border rounded-xl p-4 sm:p-5 transition-all cursor-pointer space-y-3 flex flex-col justify-between ${
                    isCompleted
                      ? 'border-emerald-500/40 bg-emerald-950/10 hover:border-emerald-500'
                      : 'border-[#242429] hover:border-[#E8A33D]/60 hover:translate-y-[-2px]'
                  }`}
                >
                  <div className="space-y-2">
                    {/* Card Header */}
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#E8A33D] font-bold">
                        LESSON {lesson.lessonNumber}
                      </span>
                      <div className="flex items-center space-x-1.5 text-[#8E8E98]">
                        <Clock className="w-3 h-3" />
                        <span>{lesson.estimatedTime}</span>
                      </div>
                    </div>

                    <h3 className="text-sm font-display font-bold text-[#EDEDEF]">
                      {lesson.title}
                    </h3>

                    {/* Key Concepts */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {lesson.keyConcepts.slice(0, 3).map((concept, i) => (
                        <span 
                          key={i} 
                          className="text-[9px] font-mono bg-[#0A0A0B] border border-[#242429] px-2 py-0.5 rounded text-[#8E8E98]"
                        >
                          {concept}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom */}
                  <div className="pt-3 border-t border-[#242429] flex items-center justify-between text-xs font-mono">
                    <span className={`text-[10px] ${
                      lesson.difficulty === 'BEGINNER' ? 'text-emerald-400' :
                      lesson.difficulty === 'INTERMEDIATE' ? 'text-amber-400' : 'text-rose-400'
                    }`}>
                      {lesson.difficulty}
                    </span>

                    {isCompleted ? (
                      <span className="text-emerald-400 font-semibold flex items-center space-x-1 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Completed</span>
                      </span>
                    ) : (
                      <span className="text-[#8E8E98] hover:text-[#EDEDEF] flex items-center space-x-1 text-[11px]">
                        <span>Study Lesson</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Lesson Viewer Modal */}
      {activeLesson && (
        <LessonViewerModal
          lesson={activeLesson}
          phase={CURRICULUM_DATA.find(p => p.id === activeLesson.phaseId) || currentPhase}
          onClose={() => setActiveLesson(null)}
          onSelectLesson={(lessonId) => {
            const nextL = currentPhase.lessons.find(l => l.id === lessonId);
            if (nextL) setActiveLesson(nextL);
          }}
        />
      )}

      {/* Quiz Modal */}
      {activeQuizPhase && (
        <QuizModal
          quiz={activeQuizPhase.quiz}
          onClose={() => setActiveQuizPhase(null)}
        />
      )}
    </div>
  );
};
