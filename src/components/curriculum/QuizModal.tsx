import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Award, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw,
  ShieldCheck
} from 'lucide-react';
import { Quiz } from '../../types';
import { useUniversity } from '../../context/UniversityContext';

interface QuizModalProps {
  quiz: Quiz;
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ quiz, onClose }) => {
  const { submitQuizScore, progress } = useUniversity();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const previousScore = progress.quizScores[quiz.id];

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    quiz.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });
    return Math.round((correctCount / quiz.questions.length) * 100);
  };

  const score = calculateScore();
  const hasPassed = score >= quiz.passingScore;
  const allAnswered = quiz.questions.every(q => selectedAnswers[q.id] !== undefined);

  const handleSubmit = () => {
    setSubmitted(true);
    submitQuizScore(quiz.id, score);
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#131316] border border-[#242429] w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-[#242429] flex items-center justify-between bg-[#0A0A0B]">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#E8A33D]/10 text-[#E8A33D] rounded border border-[#E8A33D]/30">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-display font-bold text-[#EDEDEF]">
                {quiz.title}
              </h2>
              <span className="text-xs font-mono text-[#8E8E98]">
                Pass threshold: {quiz.passingScore}% • {quiz.questions.length} Questions
              </span>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="text-[#8E8E98] hover:text-[#EDEDEF] text-sm font-mono p-1"
          >
            ✕
          </button>
        </div>

        {/* Question List */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1">
          {submitted && (
            <div className={`p-4 rounded-lg border font-mono text-xs flex items-center justify-between ${
              hasPassed 
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300' 
                : 'bg-rose-950/40 border-rose-500/50 text-rose-300'
            }`}>
              <div className="flex items-center space-x-3">
                {hasPassed ? <ShieldCheck className="w-6 h-6 text-emerald-400" /> : <AlertCircle className="w-6 h-6 text-rose-400" />}
                <div>
                  <div className="font-bold text-sm">
                    {hasPassed ? 'ASSESSMENT PASSED — +100 XP AWARDED' : 'ASSESSMENT FAILED — REVIEW REQUIRED'}
                  </div>
                  <div>
                    Your Score: {score}% (Required: {quiz.passingScore}%)
                  </div>
                </div>
              </div>

              {!hasPassed && (
                <button
                  onClick={handleRetake}
                  className="flex items-center space-x-1.5 bg-rose-900/60 hover:bg-rose-800 text-rose-200 px-3 py-1.5 rounded transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>RETRY</span>
                </button>
              )}
            </div>
          )}

          {quiz.questions.map((q, qIndex) => {
            const selected = selectedAnswers[q.id];
            const isCorrect = selected === q.correctIndex;

            return (
              <div 
                key={q.id}
                className="bg-[#0A0A0B] border border-[#242429] p-4 rounded-lg space-y-3"
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs font-mono text-[#E8A33D] font-bold">
                    QUESTION {qIndex + 1} OF {quiz.questions.length}
                  </span>
                  <span className="text-[10px] font-mono uppercase bg-[#1C1C22] text-[#8E8E98] px-2 py-0.5 rounded">
                    {q.type}
                  </span>
                </div>

                <p className="text-sm font-medium text-[#EDEDEF]">
                  {q.question}
                </p>

                {/* Options */}
                <div className="space-y-2 pt-1">
                  {q.options.map((opt, optIndex) => {
                    const isSelected = selected === optIndex;
                    let optionStyle = 'border-[#242429] hover:border-[#3A3A42] bg-[#131316] text-[#8E8E98]';

                    if (submitted) {
                      if (optIndex === q.correctIndex) {
                        optionStyle = 'border-emerald-500/60 bg-emerald-950/30 text-emerald-300';
                      } else if (isSelected) {
                        optionStyle = 'border-rose-500/60 bg-rose-950/30 text-rose-300';
                      }
                    } else if (isSelected) {
                      optionStyle = 'border-[#E8A33D] bg-[#E8A33D]/10 text-[#EDEDEF]';
                    }

                    return (
                      <button
                        key={optIndex}
                        disabled={submitted}
                        onClick={() => handleSelect(q.id, optIndex)}
                        className={`w-full text-left p-3 rounded-lg border text-xs font-mono flex items-start space-x-3 transition-colors ${optionStyle}`}
                      >
                        <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                          {String.fromCharCode(65 + optIndex)}
                        </span>
                        <span className="flex-1 text-xs">{opt}</span>
                        {submitted && optIndex === q.correctIndex && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        )}
                        {submitted && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {submitted && (
                  <div className="mt-3 p-3 bg-[#131316] border border-[#242429] rounded text-xs font-mono text-[#8E8E98] leading-relaxed">
                    <strong className="text-[#EDEDEF] block mb-1">DEEP EXPLANATION:</strong>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#242429] bg-[#0A0A0B] flex items-center justify-between">
          <div className="text-xs font-mono text-[#8E8E98]">
            {Object.keys(selectedAnswers).length} of {quiz.questions.length} answered
          </div>

          <div className="flex items-center space-x-3">
            {!submitted ? (
              <button
                disabled={!allAnswered}
                onClick={handleSubmit}
                className={`px-5 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
                  allAnswered
                    ? 'bg-[#E8A33D] hover:bg-amber-500 text-[#0A0A0B]'
                    : 'bg-[#242429] text-[#8E8E98] cursor-not-allowed'
                }`}
              >
                SUBMIT ASSESSMENT
              </button>
            ) : (
              <button
                onClick={onClose}
                className="bg-[#1C1C22] hover:bg-[#2A2A32] text-[#EDEDEF] border border-[#3A3A42] px-5 py-2 rounded-lg font-mono text-xs font-bold"
              >
                CLOSE ASSESSMENT
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
