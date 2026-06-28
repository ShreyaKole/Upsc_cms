import React from 'react';
import type { Subject } from '../../types';
import type { SubjectPracticeProgress } from '../../store/practiceStore';
import { CheckCircle2, Play, Sparkles } from 'lucide-react';

interface SubjectCardProps {
  subject: Subject;
  totalQuestions: number;
  progress: SubjectPracticeProgress;
  onStartPractice: (subject: Subject) => void;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({
  subject,
  totalQuestions,
  progress,
  onStartPractice
}) => {
  const accuracy = progress.attempted > 0 ? Math.round((progress.correct / progress.attempted) * 100) : 0;

  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1 group relative overflow-hidden border border-slate-800/80">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-indigo-400 to-emerald-500 opacity-80 group-hover:opacity-100 transition-opacity" />

      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-800/50">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Practice Bank</span>
          </span>
          <span className="text-xs font-mono text-slate-400 font-semibold">{totalQuestions} PYQ MCQs</span>
        </div>

        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors leading-snug">
          {subject}
        </h3>

        <p className="text-sm text-slate-400 mb-6 leading-relaxed">
          Master {subject} topic-wise with real UPSC PYQs. Get instant answers and clinical rationale on every question.
        </p>

        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/60 mb-6">
          <div className="flex items-center justify-between text-xs font-semibold mb-2">
            <span className="text-slate-300">Completion Progress</span>
            <span className="text-cyan-400">{progress.attempted} / {totalQuestions} Practiced</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
            <div
              className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, (progress.attempted / Math.max(1, totalQuestions)) * 100))}%` }}
            />
          </div>
          {progress.attempted > 0 && (
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3 h-3" /> {progress.correct} Correct
              </span>
              <span className="font-bold text-slate-200">{accuracy}% Accuracy</span>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => onStartPractice(subject)}
        className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white shadow-lg shadow-cyan-600/20 transition-all transform active:scale-95"
      >
        <Play className="w-4 h-4 fill-current" />
        <span>Start Instant Practice Session</span>
      </button>
    </div>
  );
};
