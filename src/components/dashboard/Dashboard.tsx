import React from 'react';
import { 
  Award, 
  Flame, 
  Zap, 
  BookOpenCheck, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Calculator, 
  GraduationCap,
  Swords,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useUniversity } from '../../context/UniversityContext';
import { CURRICULUM_DATA } from '../../data/curriculumData';
import { CHALLENGES } from '../../data/challengesData';
import { NavigationTab } from '../layout/Sidebar';

interface DashboardProps {
  onNavigate: (tab: NavigationTab) => void;
  onOpenLessonModal?: (lessonId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { 
    user, 
    currentLevel, 
    nextLevel, 
    xp, 
    xpToNextLevel, 
    progress, 
    totalLessonsCompleted, 
    progressPercentage 
  } = useUniversity();

  // Find the first uncompleted lesson
  let nextUpLesson = null;
  let nextUpPhase = null;

  for (const phase of CURRICULUM_DATA) {
    for (const lesson of phase.lessons) {
      if (!progress.completedLessons.includes(lesson.id)) {
        nextUpLesson = lesson;
        nextUpPhase = phase;
        break;
      }
    }
    if (nextUpLesson) break;
  }

  const passedQuizzesCount = Object.values(progress.quizScores).filter(score => (score as number) >= 75).length;
  const recentTrades = progress.journalEntries.slice(0, 3);
  const spotlightChallenge = CHALLENGES[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Hero Welcome & Level Status Banner */}
      <div className="bg-[#131316] border border-[#242429] p-5 sm:p-7 rounded-2xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute right-0 top-0 w-72 h-72 bg-[#E8A33D]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#E8A33D]">
              <span className="w-2 h-2 rounded-full bg-[#E8A33D]" />
              <span className="font-semibold uppercase tracking-wider">
                {currentLevel.title}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-display font-bold text-[#EDEDEF]">
              Welcome to the Terminal, {user.name}
            </h1>

            <p className="text-xs text-[#8E8E98] max-w-2xl leading-relaxed">
              {currentLevel.description} You have completed <strong className="text-[#EDEDEF]">{totalLessonsCompleted}</strong> lessons and unlocked <strong className="text-[#EDEDEF]">{passedQuizzesCount}</strong> phase certificates.
            </p>
          </div>

          {/* Level Progress Pill & Quick Action */}
          <div className="bg-[#0A0A0B] border border-[#242429] p-4 rounded-xl flex-shrink-0 w-full lg:w-80 space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[#8E8E98]">NEXT MILESTONE:</span>
              <span className="text-[#E8A33D] font-bold">
                {nextLevel ? nextLevel.shortTitle : 'Mastery'}
              </span>
            </div>

            <div className="w-full bg-[#1C1C22] h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#E8A33D] to-amber-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.max(5, progressPercentage)}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#8E8E98]">
              <span>{xp.toLocaleString()} XP Earned</span>
              <span>{xpToNextLevel > 0 ? `${xpToNextLevel} XP to Level-Up` : 'MAX'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 font-mono">
        <div className="bg-[#131316] border border-[#242429] p-4 rounded-xl">
          <div className="flex items-center justify-between text-[#8E8E98] text-xs">
            <span>CURRICULUM</span>
            <GraduationCap className="w-4 h-4 text-[#E8A33D]" />
          </div>
          <div className="text-xl font-bold text-[#EDEDEF] mt-1">
            {totalLessonsCompleted} / 148
          </div>
          <span className="text-[10px] text-[#8E8E98]">{progressPercentage}% Overall Progress</span>
        </div>

        <div className="bg-[#131316] border border-[#242429] p-4 rounded-xl">
          <div className="flex items-center justify-between text-[#8E8E98] text-xs">
            <span>QUIZZES PASSED</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-emerald-400 mt-1">
            {passedQuizzesCount} of 12
          </div>
          <span className="text-[10px] text-[#8E8E98]">Phase Certifications</span>
        </div>

        <div className="bg-[#131316] border border-[#242429] p-4 rounded-xl">
          <div className="flex items-center justify-between text-[#8E8E98] text-xs">
            <span>DISCIPLINE STREAK</span>
            <Flame className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-xl font-bold text-orange-400 mt-1">
            {progress.learningStreak} Days
          </div>
          <span className="text-[10px] text-[#8E8E98]">Consecutive daily training</span>
        </div>

        <div className="bg-[#131316] border border-[#242429] p-4 rounded-xl">
          <div className="flex items-center justify-between text-[#8E8E98] text-xs">
            <span>JOURNAL TRADES</span>
            <BookOpenCheck className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-xl font-bold text-[#EDEDEF] mt-1">
            {progress.journalEntries.length} Trades
          </div>
          <span className="text-[10px] text-[#8E8E98]">Logged in journal</span>
        </div>
      </div>

      {/* Main Content Split: Next Up Lesson & Phase Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left (7 Cols): Next Up Lesson & Tools Shortcuts */}
        <div className="lg:col-span-7 space-y-6">
          {/* Next Up Lesson Card */}
          {nextUpLesson && nextUpPhase && (
            <div className="bg-[#131316] border border-[#E8A33D]/40 p-5 sm:p-6 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#E8A33D] font-bold uppercase tracking-wider flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#E8A33D] animate-pulse" />
                  <span>NEXT RECOMMENDED LESSON</span>
                </span>
                <span className="text-xs font-mono text-[#8E8E98] flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{nextUpLesson.estimatedTime}</span>
                </span>
              </div>

              <div>
                <span className="text-[11px] font-mono text-[#8E8E98] uppercase">
                  {nextUpPhase.title} • Lesson {nextUpLesson.lessonNumber}
                </span>
                <h2 className="text-lg font-display font-bold text-[#EDEDEF] mt-0.5">
                  {nextUpLesson.title}
                </h2>
                <p className="text-xs text-[#8E8E98] mt-1 line-clamp-2">
                  {nextUpLesson.deepDive[0]}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {nextUpLesson.keyConcepts.slice(0, 4).map((concept, i) => (
                  <span 
                    key={i} 
                    className="text-[10px] font-mono bg-[#0A0A0B] border border-[#242429] px-2 py-0.5 rounded text-[#EDEDEF]"
                  >
                    {concept}
                  </span>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-[#242429]">
                <span className="text-xs font-mono text-emerald-400">
                  +{50} XP on completion
                </span>
                <button
                  onClick={() => onNavigate('curriculum')}
                  className="bg-[#E8A33D] hover:bg-amber-500 text-[#0A0A0B] px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center space-x-1.5 transition-colors"
                >
                  <span>RESUME LESSON</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Practical Challenge Spotlight */}
          {spotlightChallenge && (
            <div className="bg-[#131316] border border-[#242429] p-5 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#EDEDEF]">
                  <Swords className="w-4 h-4 text-orange-400" />
                  <span>SPOTLIGHT PRACTICAL DRILL: {spotlightChallenge.title}</span>
                </div>
                <span className="text-[10px] font-mono bg-[#0A0A0B] text-[#E8A33D] px-2 py-0.5 rounded border border-[#242429]">
                  +150 XP
                </span>
              </div>

              <p className="text-xs text-[#8E8E98]">
                {spotlightChallenge.description}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-[#242429]">
                <span className="text-[11px] font-mono text-[#8E8E98]">
                  Target: {spotlightChallenge.targetCriteria[0]}
                </span>
                <button
                  onClick={() => onNavigate('challenges')}
                  className="text-xs font-mono text-[#E8A33D] hover:underline flex items-center space-x-1"
                >
                  <span>Open Challenge Checklist</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right (5 Cols): 12-Phase Matrix & Journal Quickview */}
        <div className="lg:col-span-5 space-y-6">
          {/* Phase Roadmap Matrix */}
          <div className="bg-[#131316] border border-[#242429] p-5 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold text-[#EDEDEF] uppercase tracking-wider">
                12-Phase Progression Track
              </h3>
              <button
                onClick={() => onNavigate('curriculum')}
                className="text-[11px] font-mono text-[#E8A33D] hover:underline"
              >
                View Full Syllabus
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {CURRICULUM_DATA.map((p) => {
                const completedInPhase = p.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
                const isAllCompleted = completedInPhase === p.lessons.length;
                const isPassed = progress.quizScores[p.quiz.id] >= p.quiz.passingScore;

                return (
                  <button
                    key={p.id}
                    onClick={() => onNavigate('curriculum')}
                    className={`p-2.5 rounded-lg border text-left transition-colors flex flex-col justify-between ${
                      isAllCompleted
                        ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                        : completedInPhase > 0
                          ? 'bg-[#1C1C22] border-[#E8A33D]/50 text-[#EDEDEF]'
                          : 'bg-[#0A0A0B] border-[#242429] text-[#8E8E98]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="font-bold">P{String(p.id).padStart(2, '0')}</span>
                      {isPassed && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                    </div>
                    <div className="text-[11px] font-display font-medium truncate mt-1">
                      {p.badge}
                    </div>
                    <div className="text-[9px] font-mono text-[#8E8E98] mt-1">
                      {completedInPhase}/{p.lessons.length}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recent Journal Activity */}
          <div className="bg-[#131316] border border-[#242429] p-5 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold text-[#EDEDEF] uppercase tracking-wider">
                Recent Journal Entries
              </h3>
              <button
                onClick={() => onNavigate('journal')}
                className="text-[11px] font-mono text-[#E8A33D] hover:underline"
              >
                Open Journal
              </button>
            </div>

            {recentTrades.length === 0 ? (
              <p className="text-xs font-mono text-[#8E8E98]">
                No trades logged yet. Use the Position Calculator or Trade Journal to log setups.
              </p>
            ) : (
              <div className="space-y-2">
                {recentTrades.map((t) => (
                  <div 
                    key={t.id}
                    className="p-2.5 bg-[#0A0A0B] border border-[#242429] rounded-lg flex items-center justify-between text-xs font-mono"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-[#EDEDEF]">${t.tokenSymbol}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded ${
                        t.result === 'WIN' ? 'bg-emerald-950 text-emerald-400' :
                        t.result === 'LOSS' ? 'bg-rose-950 text-rose-400' : 'bg-[#1C1C22] text-[#8E8E98]'
                      }`}>
                        {t.result}
                      </span>
                    </div>

                    <div className="text-right">
                      {t.pnlUsd !== undefined ? (
                        <span className={t.pnlUsd >= 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                          {t.pnlUsd >= 0 ? `+$${t.pnlUsd.toFixed(1)}` : `-$${Math.abs(t.pnlUsd).toFixed(1)}`}
                        </span>
                      ) : (
                        <span className="text-[#8E8E98]">Open</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
