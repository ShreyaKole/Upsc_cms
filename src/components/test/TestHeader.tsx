import React, { useEffect } from 'react';
import type { Paper } from '../../types';
import { Clock, Save, Send } from 'lucide-react';

interface TestHeaderProps {
  paper: Paper;
  timeRemainingSeconds: number;
  onTimeExpired: () => void;
  onSubmitClick: () => void;
}

export const TestHeader: React.FC<TestHeaderProps> = ({
  paper,
  timeRemainingSeconds,
  onTimeExpired,
  onSubmitClick
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isTimeCritical = timeRemainingSeconds <= 300;

  useEffect(() => {
    if (timeRemainingSeconds <= 0) {
      onTimeExpired();
    }
  }, [timeRemainingSeconds, onTimeExpired]);

  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-slate-800 bg-slate-950/90 backdrop-blur-md py-3 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center space-x-3 truncate">
          <div className="hidden sm:flex w-9 h-9 rounded-lg bg-indigo-600/20 text-indigo-400 items-center justify-center font-bold text-sm border border-indigo-500/30">
            {paper.year}
          </div>
          <div className="truncate">
            <h1 className="text-base sm:text-lg font-bold text-white truncate">{paper.title}</h1>
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <span className="flex items-center text-emerald-400 font-medium gap-1">
                <Save className="w-3 h-3 animate-pulse" /> Auto-saved
              </span>
              <span>•</span>
              <span>{paper.totalQuestions} Questions</span>
              <span>•</span>
              <span>-0.66 Neg. Marking</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0">
          <div className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl border font-mono text-sm sm:text-base font-bold shadow-inner ${
            isTimeCritical
              ? 'bg-red-950/80 text-red-400 border-red-800/80 animate-pulse'
              : 'bg-slate-900 text-indigo-300 border-slate-800'
          }`}>
            <Clock className={`w-4 h-4 ${isTimeCritical ? 'text-red-400' : 'text-indigo-400'}`} />
            <span>{formatTime(timeRemainingSeconds)}</span>
          </div>

          <button
            onClick={onSubmitClick}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 transition-all transform active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Submit Exam</span>
            <span className="sm:hidden">Submit</span>
          </button>
        </div>
      </div>
    </header>
  );
};
