import React, { useState } from 'react';
import type { Subject, OptionKey } from '../../types';
import { PracticeManager } from '../../store/practiceStore';
import { ArrowLeft, CheckCircle2, ChevronLeft, ChevronRight, RotateCcw, Sparkles, XCircle } from 'lucide-react';

interface SubjectPracticeEngineProps {
  userId: string;
  subject: Subject;
  onBack: () => void;
}

export const SubjectPracticeEngine: React.FC<SubjectPracticeEngineProps> = ({
  userId,
  subject,
  onBack
}) => {
  const questions = PracticeManager.getSubjectQuestions(subject);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(() => PracticeManager.getProgress(userId, subject));

  if (questions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-white mb-2">No practice questions available for {subject}</h2>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-slate-800 text-slate-200 rounded-xl text-sm font-semibold">
          Return to Subjects
        </button>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const qKey = `${currentQ.year}_${currentQ.paper}_${currentQ.id}`;
  const currentSavedAns = progress.answers[qKey];
  const selectedOption = currentSavedAns?.selectedOption ?? null;
  const isEvaluated = selectedOption !== null;

  const handleSelectOption = (option: OptionKey) => {
    if (selectedOption !== null) return;
    const isCorrect = option === currentQ.correctOption;
    const updatedProgress = PracticeManager.recordAnswer(userId, subject, qKey, option, isCorrect);
    setProgress(updatedProgress);
  };

  const handleResetCurrent = () => {
    const updatedAnswers = { ...progress.answers };
    delete updatedAnswers[qKey];
    const updatedProgress = { ...progress, answers: updatedAnswers };
    setProgress(updatedProgress);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Subject Practice</span>
        </button>

        <div className="flex items-center space-x-3 text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-cyan-950/80 text-cyan-300 font-bold border border-cyan-800/50 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> {subject} Bank
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-slate-900 text-slate-300 font-mono font-semibold border border-slate-800">
            {progress.correct} / {progress.attempted} Correct
          </span>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative mb-6">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800/80 text-xs">
          <span className="px-3 py-1 rounded-lg font-bold bg-cyan-600 text-white">
            Question {currentIndex + 1} of {questions.length}
          </span>

          <div className="flex items-center space-x-2">
            {isEvaluated && (
              <button
                onClick={handleResetCurrent}
                className="flex items-center space-x-1 px-2.5 py-1 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors text-[11px] font-semibold"
                title="Retry Question"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Retry</span>
              </button>
            )}
            <span className="text-slate-400 font-medium">Topic Practice Mode</span>
          </div>
        </div>

        <div className="text-slate-100 text-base sm:text-lg font-medium leading-relaxed mb-8 whitespace-pre-line">
          {currentQ.text}
        </div>

        <div className="space-y-3.5 mb-8">
          {currentQ.options.map((option) => {
            const isUserChoice = selectedOption === option.id;
            const isRightChoice = currentQ.correctOption === option.id;

            let optionStyle = 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800 text-slate-300';

            if (isEvaluated) {
              if (isRightChoice) {
                optionStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-semibold ring-2 ring-emerald-500/40 shadow-lg shadow-emerald-500/10';
              } else if (isUserChoice && !isRightChoice) {
                optionStyle = 'bg-rose-950/70 border-rose-500 text-rose-200 font-semibold ring-2 ring-rose-500/40 shadow-lg shadow-rose-500/10';
              } else {
                optionStyle = 'bg-slate-950/40 border-slate-900 opacity-50 text-slate-500';
              }
            }

            return (
              <button
                key={option.id}
                disabled={isEvaluated}
                onClick={() => handleSelectOption(option.id)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-200 flex items-start space-x-3.5 border text-sm sm:text-base font-medium ${optionStyle}`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 transition-colors ${
                  isEvaluated
                    ? isRightChoice ? 'bg-emerald-600 text-white' : isUserChoice ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-500'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {option.id}
                </div>
                <div className="flex-1 pt-0.5 leading-relaxed flex items-center justify-between">
                  <span>{option.text}</span>
                  {isEvaluated && isRightChoice && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 ml-2" />
                  )}
                  {isEvaluated && isUserChoice && !isRightChoice && (
                    <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 ml-2" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {isEvaluated && (
          <div className="bg-gradient-to-br from-indigo-950/40 to-slate-950 border border-indigo-800/50 rounded-2xl p-5 sm:p-6 shadow-xl animate-fade-in mb-8">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2.5">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Instant Official Clinical Rationale</span>
            </div>
            <p className="text-sm text-indigo-100/90 leading-relaxed font-normal">
              {currentQ.explanation}
            </p>
          </div>
        )}

        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="flex items-center space-x-1 px-4 py-2.5 rounded-xl text-sm font-semibold bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <span className="text-xs text-slate-400 font-mono">
            {currentIndex + 1} / {questions.length}
          </span>

          <button
            onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
            disabled={currentIndex === questions.length - 1}
            className="flex items-center space-x-1 px-5 py-2.5 rounded-xl text-sm font-bold bg-cyan-600 hover:bg-cyan-500 disabled:opacity-30 text-white shadow-md shadow-cyan-600/20 transition-all"
          >
            <span>Next Question</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
