import React from 'react';
import type { Question, AnswerRecord } from '../../types';
import { Grid } from 'lucide-react';

interface QuestionPaletteProps {
  questions: Question[];
  currentIndex: number;
  answers: Record<number, AnswerRecord>;
  onSelectQuestion: (index: number) => void;
}

export const QuestionPalette: React.FC<QuestionPaletteProps> = ({
  questions,
  currentIndex,
  answers,
  onSelectQuestion
}) => {
  let answeredCount = 0;
  let flaggedCount = 0;
  let answeredFlaggedCount = 0;
  let unattemptedCount = 0;

  questions.forEach((q) => {
    const rec = answers[q.id];
    const hasAns = rec?.selectedOption !== null && rec?.selectedOption !== undefined;
    const isFlagged = rec?.isMarkedForReview ?? false;

    if (hasAns && isFlagged) answeredFlaggedCount++;
    else if (hasAns) answeredCount++;
    else if (isFlagged) flaggedCount++;
    else unattemptedCount++;
  });

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Grid className="w-4 h-4 text-indigo-400" />
            <span>Question Palette</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">{questions.length} Items</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-5 text-[11px]">
          <div className="flex items-center space-x-2 text-slate-300">
            <div className="w-3.5 h-3.5 rounded bg-emerald-500 flex-shrink-0" />
            <span>Answered ({answeredCount})</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-300">
            <div className="w-3.5 h-3.5 rounded bg-purple-600 flex-shrink-0" />
            <span>Review ({flaggedCount})</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-300">
            <div className="w-3.5 h-3.5 rounded bg-amber-500 flex-shrink-0" />
            <span>Ans & Review ({answeredFlaggedCount})</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-300">
            <div className="w-3.5 h-3.5 rounded bg-slate-800 border border-slate-700 flex-shrink-0" />
            <span>Unanswered ({unattemptedCount})</span>
          </div>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-5 gap-2 max-h-[380px] overflow-y-auto pr-1">
          {questions.map((q, idx) => {
            const rec = answers[q.id];
            const hasAns = rec?.selectedOption !== null && rec?.selectedOption !== undefined;
            const isFlagged = rec?.isMarkedForReview ?? false;
            const isCurrent = idx === currentIndex;

            let statusStyle = 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700';

            if (hasAns && isFlagged) {
              statusStyle = 'bg-amber-500/20 text-amber-300 border-amber-500/50 font-bold';
            } else if (hasAns) {
              statusStyle = 'bg-emerald-600 text-white border-emerald-500 font-bold shadow';
            } else if (isFlagged) {
              statusStyle = 'bg-purple-600 text-white border-purple-500 font-bold shadow';
            }

            if (isCurrent) {
              statusStyle += ' ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-950 scale-105 z-10';
            }

            return (
              <button
                key={q.id}
                onClick={() => onSelectQuestion(idx)}
                className={`h-9 rounded-lg text-xs transition-all flex items-center justify-center border ${statusStyle}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
