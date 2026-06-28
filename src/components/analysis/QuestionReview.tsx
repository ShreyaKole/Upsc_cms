import React, { useState } from 'react';
import type { Question, AnswerRecord } from '../../types';
import { BookOpen, CheckCircle, XCircle, Sparkles, Flag } from 'lucide-react';

interface QuestionReviewProps {
  questions: Question[];
  answers: AnswerRecord[];
}

export const QuestionReview: React.FC<QuestionReviewProps> = ({ questions, answers }) => {
  const [filter, setFilter] = useState<'all' | 'correct' | 'wrong' | 'unattempted' | 'flagged'>('all');

  const answerMap = new Map<number, AnswerRecord>();
  answers.forEach((a) => answerMap.set(a.questionId, a));

  const filteredQuestions = questions.filter((q) => {
    const ans = answerMap.get(q.id);
    const hasAns = ans?.selectedOption !== null && ans?.selectedOption !== undefined;
    const isCorrect = hasAns && ans?.selectedOption === q.correctOption;
    const isWrong = hasAns && ans?.selectedOption !== q.correctOption;
    const isUnattempted = !hasAns;
    const isFlagged = ans?.isMarkedForReview ?? false;

    if (filter === 'correct' && !isCorrect) return false;
    if (filter === 'wrong' && !isWrong) return false;
    if (filter === 'unattempted' && !isUnattempted) return false;
    if (filter === 'flagged' && !isFlagged) return false;

    return true;
  });

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-800">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <span>Complete Question-by-Question Review</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">Review correct answers, explanations, and your choices.</p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${filter === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            All ({questions.length})
          </button>
          <button
            onClick={() => setFilter('correct')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${filter === 'correct' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-emerald-400'}`}
          >
            Correct
          </button>
          <button
            onClick={() => setFilter('wrong')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${filter === 'wrong' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-rose-400'}`}
          >
            Wrong
          </button>
          <button
            onClick={() => setFilter('unattempted')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${filter === 'unattempted' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-amber-400'}`}
          >
            Unattempted
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            No questions match your selected filter criteria.
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const ans = answerMap.get(q.id);
            const userSelected = ans?.selectedOption ?? null;
            const isCorrect = userSelected === q.correctOption;
            const isWrong = userSelected !== null && userSelected !== q.correctOption;
            const isUnattempted = userSelected === null;

            return (
              <div
                key={q.id}
                className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                  isCorrect
                    ? 'bg-emerald-950/10 border-emerald-800/40'
                    : isWrong
                    ? 'bg-rose-950/10 border-rose-800/40'
                    : 'bg-slate-950/40 border-slate-800'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-800 text-white">
                      Q{q.id}
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-900 text-slate-300 border border-slate-800">
                      {q.subject}
                    </span>
                    {ans?.isMarkedForReview && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-950 text-purple-400 border border-purple-800 flex items-center gap-1">
                        <Flag className="w-3 h-3" /> Flagged
                      </span>
                    )}
                  </div>

                  <div>
                    {isCorrect && (
                      <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Correct (+2.0 Marks)</span>
                      </span>
                    )}
                    {isWrong && (
                      <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-950 text-rose-400 border border-rose-800">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Incorrect (-0.66 Marks)</span>
                      </span>
                    )}
                    {isUnattempted && (
                      <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-950 text-amber-400 border border-amber-800">
                        <span>Unattempted (0 Marks)</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-slate-100 font-medium text-base sm:text-lg mb-5 whitespace-pre-line leading-relaxed">
                  {q.text}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {q.options.map((opt) => {
                    const isUserChoice = userSelected === opt.id;
                    const isRightChoice = q.correctOption === opt.id;

                    let optionStyle = 'bg-slate-900/50 border-slate-800 text-slate-300';

                    if (isRightChoice) {
                      optionStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold ring-1 ring-emerald-500/50';
                    } else if (isUserChoice && !isRightChoice) {
                      optionStyle = 'bg-rose-950/60 border-rose-500 text-rose-200 font-semibold ring-1 ring-rose-500/50';
                    }

                    return (
                      <div
                        key={opt.id}
                        className={`p-3.5 rounded-xl border flex items-start space-x-3 text-sm ${optionStyle}`}
                      >
                        <span className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 ${
                          isRightChoice ? 'bg-emerald-600 text-white' :
                          isUserChoice ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {opt.id}
                        </span>
                        <span className="leading-relaxed">{opt.text}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-indigo-950/30 border border-indigo-800/40 rounded-xl p-4 sm:p-5">
                  <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span>Official Explanation & Key Takeaways</span>
                  </div>
                  <p className="text-sm text-indigo-100/90 leading-relaxed font-normal">
                    {q.explanation}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
