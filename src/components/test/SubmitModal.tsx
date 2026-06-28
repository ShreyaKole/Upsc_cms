import React from 'react';
import type { Paper, AnswerRecord, Question } from '../../types';
import { AlertTriangle, Send, X } from 'lucide-react';

interface SubmitModalProps {
  paper: Paper;
  questions: Question[];
  answers: Record<number, AnswerRecord>;
  isOpen: boolean;
  onClose: () => void;
  onConfirmSubmit: () => void;
}

export const SubmitModal: React.FC<SubmitModalProps> = ({
  paper,
  questions,
  answers,
  isOpen,
  onClose,
  onConfirmSubmit
}) => {
  if (!isOpen) return null;

  let answeredCount = 0;
  let flaggedCount = 0;
  let unattemptedCount = 0;

  questions.forEach((q) => {
    const rec = answers[q.id];
    const hasAns = rec?.selectedOption !== null && rec?.selectedOption !== undefined;
    const isFlagged = rec?.isMarkedForReview ?? false;

    if (hasAns) answeredCount++;
    else unattemptedCount++;

    if (isFlagged) flaggedCount++;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Submit Test Paper</h3>
            <p className="text-xs text-slate-400">{paper.title}</p>
          </div>
        </div>

        <p className="text-sm text-slate-300 mb-6 leading-relaxed">
          Are you sure you want to finish and submit your test? Once submitted, you will immediately see your complete analytical report.
        </p>

        <div className="grid grid-cols-3 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6 text-center">
          <div>
            <div className="text-xl font-black text-emerald-400">{answeredCount}</div>
            <div className="text-[11px] text-slate-400 font-medium">Answered</div>
          </div>
          <div className="border-x border-slate-800">
            <div className="text-xl font-black text-purple-400">{flaggedCount}</div>
            <div className="text-[11px] text-slate-400 font-medium">Flagged</div>
          </div>
          <div>
            <div className="text-xl font-black text-amber-400">{unattemptedCount}</div>
            <div className="text-[11px] text-slate-400 font-medium">Left Blank</div>
          </div>
        </div>

        {unattemptedCount > 0 && (
          <div className="flex items-center space-x-2 text-xs text-amber-300 bg-amber-950/40 border border-amber-800/50 p-3 rounded-xl mb-6">
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>You have {unattemptedCount} unanswered questions remaining.</span>
          </div>
        )}

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            Resume Test
          </button>
          <button
            onClick={onConfirmSubmit}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25 transition-colors"
          >
            Confirm & Finish
          </button>
        </div>
      </div>
    </div>
  );
};
