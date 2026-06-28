import React from 'react';
import type { Question, OptionKey, AnswerRecord } from '../../types';
import { ChevronLeft, ChevronRight, Eraser, Flag } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  answerRecord?: AnswerRecord;
  onSelectOption: (option: OptionKey) => void;
  onToggleReview: () => void;
  onClearAnswer: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  answerRecord,
  onSelectOption,
  onToggleReview,
  onClearAnswer,
  onNext,
  onPrev
}) => {
  const selectedOption = answerRecord?.selectedOption ?? null;
  const isFlagged = answerRecord?.isMarkedForReview ?? false;

  return (
    <div className="glass-card rounded-2xl p-5 sm:p-7 flex flex-col justify-between min-h-[550px] border border-slate-800 shadow-xl relative">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-slate-800/80">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-lg text-xs font-bold bg-indigo-600 text-white">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
              {question.subject}
            </span>
            {question.difficulty && (
              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                question.difficulty === 'Easy' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                question.difficulty === 'Medium' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                'bg-red-950 text-red-400 border border-red-800'
              }`}>
                {question.difficulty}
              </span>
            )}
          </div>

          <button
            onClick={onToggleReview}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isFlagged
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
            }`}
          >
            <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-current text-white' : 'text-purple-400'}`} />
            <span>{isFlagged ? 'Marked for Review' : 'Mark for Review'}</span>
          </button>
        </div>

        <div className="text-slate-100 text-base sm:text-lg font-medium leading-relaxed mb-8 whitespace-pre-line select-text">
          {question.text}
        </div>

        <div className="space-y-3.5 mb-8">
          {question.options.map((option) => {
            const isSelected = selectedOption === option.id;

            return (
              <button
                key={option.id}
                onClick={() => onSelectOption(option.id)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-200 flex items-start space-x-3.5 border text-sm sm:text-base font-medium ${
                  isSelected
                    ? 'bg-indigo-600/20 border-indigo-500 text-white ring-2 ring-indigo-500/50 shadow-lg shadow-indigo-500/10'
                    : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 transition-colors ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}>
                  {option.id}
                </div>
                <span className="leading-relaxed pt-0.5">{option.text}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onClearAnswer}
          disabled={selectedOption === null}
          className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
        >
          <Eraser className="w-3.5 h-3.5" />
          <span>Clear Response</span>
        </button>

        <div className="flex items-center space-x-3">
          <button
            onClick={onPrev}
            disabled={currentIndex === 0}
            className="flex items-center space-x-1 px-4 py-2.5 rounded-xl text-sm font-semibold bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={onNext}
            disabled={currentIndex === totalQuestions - 1}
            className="flex items-center space-x-1 px-5 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white shadow-md shadow-indigo-600/20 transition-all"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
