import React, { useEffect } from 'react';
import type { ExamResult } from '../../types';
import confetti from 'canvas-confetti';
import { Award, CheckCircle, Clock, RefreshCw, XCircle } from 'lucide-react';

interface ScoreCardProps {
  result: ExamResult;
  onRetake: () => void;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ result, onRetake }) => {
  useEffect(() => {
    if (result.accuracy >= 50) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Ignore confetti error
      }
    }
  }, [result]);

  const formatSeconds = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  const positiveMarks = (result.totalCorrect * 2.0).toFixed(2);
  const negativeMarks = (result.totalWrong * 0.66).toFixed(2);

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/30 bg-slate-900/90 shadow-2xl backdrop-blur-xl mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 mb-6 border-b border-slate-800 relative z-10">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-950 text-indigo-400 border border-indigo-800 mb-3 inline-block">
            {result.year} Official Paper Evaluation
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{result.paperTitle}</h1>
          <p className="text-xs text-slate-400 mt-1">Attempted on {new Date(result.submittedAt).toLocaleString()}</p>
        </div>

        <button
          onClick={onRetake}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all transform active:scale-95"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Re-attempt Test</span>
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
        <div className="col-span-2 lg:col-span-1 bg-gradient-to-br from-indigo-900/50 via-slate-950 to-slate-950 p-6 rounded-2xl border border-indigo-500/40 text-center flex flex-col justify-center shadow-lg">
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-300 mb-1">Net Score</div>
          <div className="text-4xl sm:text-5xl font-black text-white">{result.score}</div>
          <div className="text-xs text-slate-400 mt-1 font-medium">Out of {result.totalMarks} Marks</div>
        </div>

        <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 text-center flex flex-col justify-center">
          <div className="flex items-center justify-center space-x-1.5 text-xs font-semibold text-emerald-400 mb-1">
            <CheckCircle className="w-4 h-4" />
            <span>Accuracy</span>
          </div>
          <div className="text-3xl font-black text-emerald-400">{result.accuracy}%</div>
          <div className="text-xs text-slate-400 mt-1">Success Rate</div>
        </div>

        <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 text-center flex flex-col justify-center">
          <div className="flex items-center justify-center space-x-1.5 text-xs font-semibold text-cyan-400 mb-1">
            <Award className="w-4 h-4" />
            <span>Correct</span>
          </div>
          <div className="text-3xl font-black text-cyan-400">{result.totalCorrect}</div>
          <div className="text-xs text-emerald-400/80 mt-1 font-mono">+{positiveMarks} pts</div>
        </div>

        <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 text-center flex flex-col justify-center">
          <div className="flex items-center justify-center space-x-1.5 text-xs font-semibold text-rose-400 mb-1">
            <XCircle className="w-4 h-4" />
            <span>Wrong</span>
          </div>
          <div className="text-3xl font-black text-rose-400">{result.totalWrong}</div>
          <div className="text-xs text-rose-400/80 mt-1 font-mono">-{negativeMarks} pts</div>
        </div>

        <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 text-center flex flex-col justify-center">
          <div className="flex items-center justify-center space-x-1.5 text-xs font-semibold text-amber-400 mb-1">
            <Clock className="w-4 h-4" />
            <span>Time Taken</span>
          </div>
          <div className="text-2xl font-black text-amber-400 font-mono">{formatSeconds(result.totalTimeSeconds)}</div>
          <div className="text-xs text-slate-400 mt-1">Total Duration</div>
        </div>
      </div>
    </div>
  );
};
