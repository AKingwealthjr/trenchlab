import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  GraduationCap, 
  ExternalLink, 
  AlertTriangle, 
  Lightbulb, 
  ChevronLeft, 
  ChevronRight, 
  Save, 
  Play,
  FileCheck2,
  BookOpen,
  Tv,
  Award
} from 'lucide-react';
import { Lesson, Phase, LessonResource } from '../../types';
import { useUniversity } from '../../context/UniversityContext';

interface LessonViewerModalProps {
  lesson: Lesson;
  phase: Phase;
  onClose: () => void;
  onSelectLesson: (lessonId: string) => void;
}

export const LessonViewerModal: React.FC<LessonViewerModalProps> = ({
  lesson,
  phase,
  onClose,
  onSelectLesson
}) => {
  const { progress, toggleLessonComplete, saveAssignment } = useUniversity();

  const isCompleted = progress.completedLessons.includes(lesson.id);
  const currentAssignmentText = progress.completedAssignments[lesson.id] || '';

  const [assignmentInput, setAssignmentInput] = useState(currentAssignmentText);
  const [savedAssignmentNotice, setSavedAssignmentNotice] = useState(false);
  const [selectedCheckOption, setSelectedCheckOption] = useState<number | null>(null);
  const [dynamicResource, setDynamicResource] = useState<LessonResource | null>(null);

  // Lesson indexing
  const currentIdx = phase.lessons.findIndex(l => l.id === lesson.id);
  const prevLesson = currentIdx > 0 ? phase.lessons[currentIdx - 1] : null;
  const nextLesson = currentIdx < phase.lessons.length - 1 ? phase.lessons[currentIdx + 1] : null;

  // Static verified video fallback strictly for this lesson if no dynamic resource loaded
  const staticVideo = (lesson.videos && lesson.videos.length > 0 && lesson.videos[0].youtubeId) 
    ? {
        title: lesson.videos[0].title,
        channelName: lesson.videos[0].creator,
        embedUrl: `https://www.youtube-nocookie.com/embed/${lesson.videos[0].youtubeId}`,
        youtubeUrl: lesson.videos[0].url || `https://www.youtube.com/watch?v=${lesson.videos[0].youtubeId}`,
        durationFormatted: lesson.videos[0].duration,
        whyUseful: lesson.videos[0].whyUseful
      }
    : null;

  const activeVideo = dynamicResource || staticVideo;

  // Fetch approved dynamic resource from server cache
  useEffect(() => {
    let mounted = true;
    fetch(`/api/discovery/resources?lessonId=${lesson.id}&status=APPROVED`)
      .then(r => r.json())
      .then(data => {
        if (mounted && data.resources && data.resources.length > 0) {
          const primary = data.resources.find((r: LessonResource) => r.isPrimary) || data.resources[0];
          setDynamicResource(primary);
        } else {
          setDynamicResource(null);
        }
      })
      .catch(() => {
        if (mounted) setDynamicResource(null);
      });
    return () => { mounted = false; };
  }, [lesson.id]);

  const handleSaveAssignment = () => {
    saveAssignment(lesson.id, assignmentInput);
    setSavedAssignmentNotice(true);
    setTimeout(() => setSavedAssignmentNotice(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
      <div className="bg-[#131316] border border-[#242429] w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Topbar */}
        <div className="p-4 sm:p-5 border-b border-[#242429] flex items-center justify-between bg-[#0A0A0B]">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#E8A33D]/10 text-[#E8A33D] rounded border border-[#E8A33D]/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-[#8E8E98] tracking-wider uppercase">
                {phase.title} • LESSON {lesson.lessonNumber} OF {phase.lessons.length}
              </div>
              <h2 className="text-base sm:text-lg font-display font-bold text-[#EDEDEF]">
                {lesson.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => toggleLessonComplete(lesson.id)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors ${
                isCompleted 
                  ? 'bg-emerald-950/60 border border-emerald-500 text-emerald-400' 
                  : 'bg-[#1C1C22] border border-[#3A3A42] hover:border-[#E8A33D] text-[#EDEDEF]'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isCompleted ? 'COMPLETED' : 'MARK COMPLETE (+50 XP)'}</span>
            </button>

            <button 
              onClick={onClose}
              className="text-[#8E8E98] hover:text-[#EDEDEF] text-sm font-mono p-1"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <div className="flex items-center space-x-1.5 bg-[#0A0A0B] border border-[#242429] px-2.5 py-1 rounded text-[#8E8E98]">
              <Clock className="w-3.5 h-3.5 text-[#E8A33D]" />
              <span>ESTIMATED TIME:</span>
              <span className="text-[#EDEDEF]">{lesson.estimatedTime}</span>
            </div>

            <div className="bg-[#0A0A0B] border border-[#242429] px-2.5 py-1 rounded">
              <span className="text-[#8E8E98]">DIFFICULTY: </span>
              <span className={`font-semibold ${
                lesson.difficulty === 'BEGINNER' ? 'text-emerald-400' :
                lesson.difficulty === 'INTERMEDIATE' ? 'text-amber-400' : 'text-rose-400'
              }`}>
                {lesson.difficulty}
              </span>
            </div>
          </div>

          {/* Video Player Section (Dynamic Curated Resource or Verified Unique Lesson Masterclass) */}
          {activeVideo ? (
            <div className="bg-[#0A0A0B] border border-emerald-500/30 rounded-xl overflow-hidden shadow-lg">
              <div className="aspect-video w-full bg-black relative">
                <iframe
                  className="w-full h-full"
                  src={`${activeVideo.embedUrl}?rel=0&modestbranding=1`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video Info Bar */}
              <div className="p-4 bg-[#131316] border-t border-[#242429] space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <div className="flex items-center space-x-2">
                    <span className="bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 px-2 py-0.5 rounded font-bold flex items-center space-x-1">
                      <Award className="w-3 h-3" />
                      <span>VERIFIED MASTERCLASS</span>
                    </span>
                    <span className="text-[#8E8E98]">by</span>
                    <span className="text-[#EDEDEF] font-bold">{activeVideo.channelName}</span>
                    {activeVideo.durationFormatted && (
                      <span className="text-[#E8A33D]">({activeVideo.durationFormatted})</span>
                    )}
                  </div>

                  <a
                    href={activeVideo.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#E8A33D] hover:underline flex items-center space-x-1"
                  >
                    <span>Watch on YouTube</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="text-sm font-semibold text-[#EDEDEF]">
                  {activeVideo.title}
                </div>

                {activeVideo.whyUseful && (
                  <div className="text-xs text-[#9A9AA3] font-sans bg-[#0A0A0B] p-2.5 rounded-lg border border-[#242429]">
                    <span className="text-[#E8A33D] font-mono font-bold mr-1">CURATOR NOTES:</span>
                    {activeVideo.whyUseful}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-[#0A0A0B] border border-[#242429] rounded-xl p-6 sm:p-8 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#131316] border border-[#242429] flex items-center justify-center text-[#E8A33D]">
                <Tv className="w-6 h-6" />
              </div>
              <div className="space-y-1.5 max-w-lg">
                <div className="font-display font-bold text-[#EDEDEF] text-base">
                  Educational Resource Pending Curation
                </div>
                <p className="text-xs text-[#8E8E98] leading-relaxed">
                  A high-relevance video for <span className="text-[#EDEDEF] font-semibold">"{lesson.title}"</span> is currently being verified by the automated discovery pipeline. Check the Content Studio or search directly on YouTube below.
                </p>
              </div>
              <a
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(lesson.title + ' crypto tutorial')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-[#1B1B1F] hover:bg-[#242429] text-[#EDEDEF] border border-[#242429] hover:border-[#E8A33D]/50 px-4 py-2 rounded-lg text-xs font-mono transition-colors"
              >
                <span>Search Lesson on YouTube</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#E8A33D]" />
              </a>
            </div>
          )}

          {/* Objectives */}
          <div className="bg-[#0A0A0B] border border-[#242429] p-4 rounded-xl space-y-2">
            <h3 className="text-xs font-mono font-bold text-[#E8A33D] uppercase tracking-wider flex items-center space-x-1.5">
              <GraduationCap className="w-4 h-4" />
              <span>Core Learning Objectives</span>
            </h3>
            <ul className="space-y-1.5">
              {lesson.objectives.map((obj, i) => (
                <li key={i} className="flex items-start space-x-2 text-xs text-[#EDEDEF]">
                  <span className="text-[#E8A33D] font-mono mt-0.5">•</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Concepts Pills */}
          <div>
            <span className="text-[11px] font-mono text-[#8E8E98] block mb-2 uppercase">
              Key Concepts & Vocabulary
            </span>
            <div className="flex flex-wrap gap-2">
              {lesson.keyConcepts.map((concept, i) => (
                <span 
                  key={i} 
                  className="bg-[#1C1C22] border border-[#242429] text-[#EDEDEF] text-xs font-mono px-2.5 py-1 rounded"
                >
                  {concept}
                </span>
              ))}
            </div>
          </div>

          {/* Deep Dive Breakdown */}
          <div className="space-y-3">
            <h3 className="text-sm font-display font-bold text-[#EDEDEF] uppercase tracking-wider">
              Technical Deep Dive
            </h3>
            <div className="space-y-2.5 text-xs text-[#8E8E98] leading-relaxed">
              {lesson.deepDive.map((paragraph, i) => (
                <p key={i} className="text-[#EDEDEF]/90 bg-[#0A0A0B]/60 p-3 rounded border border-[#242429]">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Real World Example */}
          {lesson.realWorldExample && (
            <div className="bg-amber-950/20 border border-amber-500/30 p-4 rounded-xl space-y-1 text-xs">
              <div className="flex items-center space-x-1.5 text-[#E8A33D] font-mono font-bold">
                <Lightbulb className="w-4 h-4" />
                <span>REAL WORLD TRENCH CASE STUDY</span>
              </div>
              <p className="text-[#EDEDEF] leading-relaxed">
                {lesson.realWorldExample}
              </p>
            </div>
          )}

          {/* Common Mistakes */}
          {lesson.commonMistakes && lesson.commonMistakes.length > 0 && (
            <div className="bg-rose-950/20 border border-rose-500/30 p-4 rounded-xl space-y-2 text-xs">
              <div className="flex items-center space-x-1.5 text-rose-400 font-mono font-bold">
                <AlertTriangle className="w-4 h-4" />
                <span>FATAL TRADER MISTAKES TO AVOID</span>
              </div>
              <ul className="space-y-1 text-[#EDEDEF]">
                {lesson.commonMistakes.map((mistake, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-rose-400 font-mono">✕</span>
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Check Understanding Interactive Question */}
          {lesson.checkQuestions && lesson.checkQuestions.length > 0 && (
            <div className="bg-[#0A0A0B] border border-[#242429] p-4 rounded-xl space-y-3">
              <span className="text-xs font-mono font-bold text-[#E8A33D] uppercase">
                Checkpoint Drill
              </span>
              <p className="text-xs font-medium text-[#EDEDEF]">
                {lesson.checkQuestions[0].question}
              </p>

              <div className="space-y-1.5">
                {lesson.checkQuestions[0].options.map((opt, i) => {
                  const isSelected = selectedCheckOption === i;
                  const isCorrect = i === lesson.checkQuestions[0].correctIndex;
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedCheckOption(i)}
                      className={`w-full text-left p-2.5 rounded border text-xs font-mono transition-colors flex items-center justify-between ${
                        selectedCheckOption === null
                          ? 'border-[#242429] hover:border-[#3A3A42] bg-[#131316] text-[#8E8E98]'
                          : isCorrect
                            ? 'border-emerald-500/50 bg-emerald-950/30 text-emerald-300'
                            : isSelected
                              ? 'border-rose-500/50 bg-rose-950/30 text-rose-300'
                              : 'border-[#242429] bg-[#131316] opacity-50 text-[#8E8E98]'
                      }`}
                    >
                      <span>{opt}</span>
                      {selectedCheckOption !== null && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      )}
                    </button>
                  );
                })}
              </div>

              {selectedCheckOption !== null && (
                <p className="text-[11px] font-mono text-[#8E8E98] mt-2 pt-2 border-t border-[#242429]">
                  {lesson.checkQuestions[0].explanation}
                </p>
              )}
            </div>
          )}

          {/* Practical Assignment Submission */}
          {lesson.assignment && (
            <div className="bg-[#131316] border border-[#E8A33D]/30 p-4 sm:p-5 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-[#E8A33D] font-mono font-bold text-xs">
                  <FileCheck2 className="w-4 h-4" />
                  <span>PRACTICAL ASSIGNMENT: {lesson.assignment.title}</span>
                </div>
                {savedAssignmentNotice && (
                  <span className="text-emerald-400 text-xs font-mono">Saved to Storage!</span>
                )}
              </div>

              <p className="text-xs text-[#8E8E98]">
                {lesson.assignment.instructions}
              </p>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#8E8E98] uppercase">Required Deliverables:</span>
                <ul className="text-xs text-[#EDEDEF] list-disc list-inside">
                  {lesson.assignment.deliverables.map((del, i) => (
                    <li key={i}>{del}</li>
                  ))}
                </ul>
              </div>

              <textarea
                rows={3}
                value={assignmentInput}
                onChange={e => setAssignmentInput(e.target.value)}
                placeholder="Paste your findings, token metrics, explorer tx hashes, or notes here..."
                className="w-full bg-[#0A0A0B] border border-[#242429] focus:border-[#E8A33D] rounded-lg p-3 text-xs font-mono text-[#EDEDEF] outline-none"
              />

              <div className="flex justify-end">
                <button
                  onClick={handleSaveAssignment}
                  className="flex items-center space-x-1.5 bg-[#E8A33D] hover:bg-amber-500 text-[#0A0A0B] text-xs font-mono font-bold px-4 py-2 rounded-lg transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>SAVE ASSIGNMENT PROGRESS</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Previous / Next Navigation */}
        <div className="p-4 border-t border-[#242429] bg-[#0A0A0B] flex items-center justify-between">
          <div>
            {prevLesson ? (
              <button
                onClick={() => onSelectLesson(prevLesson.id)}
                className="flex items-center space-x-1 text-xs font-mono text-[#8E8E98] hover:text-[#EDEDEF]"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev: {prevLesson.title}</span>
              </button>
            ) : (
              <div />
            )}
          </div>

          <div>
            {nextLesson ? (
              <button
                onClick={() => onSelectLesson(nextLesson.id)}
                className="flex items-center space-x-1 text-xs font-mono text-[#E8A33D] hover:text-amber-400 font-semibold"
              >
                <span>Next: {nextLesson.title}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="text-xs font-mono text-[#8E8E98] hover:text-[#EDEDEF]"
              >
                End of Phase
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
