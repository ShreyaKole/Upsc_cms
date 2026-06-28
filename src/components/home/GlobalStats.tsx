import React from 'react';
import type { ExamResult } from '../../types';
import { Award, CheckCircle, PieChart, TrendingUp, Zap } from 'lucide-react';

interface GlobalStatsProps {
  results: ExamResult[];
}

export const GlobalStats: React.FC<GlobalStatsProps> = ({ results }) => {
  if (results.length === 0) return null;

  const totalAttempts = results.length;
  const avgAccuracy = Math.round(results.reduce((acc, r) => acc + r.accuracy, 0) / totalAttempts);
  const highestScore = Math.max(...results.map((r) => r.score));
  const totalQuestionsSolved = results.reduce((acc, r) => acc + r.totalCorrect + r.totalWrong, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
      <div className="glass-panel p-6 rounded-2xl border border-indigo-500/30 bg-slate-900/90 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center space-x-2 mb-4 text-indigo-400 font-semibold text-sm">
          <TrendingUp className="w-4 h-4" />
          <span>Your Preparation Dashboard Summary</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 flex items-center space-x-3">
            <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-white">{totalAttempts}</div>
              <div className="text-xs text-slate-400 font-medium">Tests Completed</div>
            </div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 flex items-center space-x-3">
            <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400">
              <PieChart className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-emerald-400">{avgAccuracy}%</div>
              <div className="text-xs text-slate-400 font-medium">Average Accuracy</div>
            </div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 flex items-center space-x-3">
            <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-amber-400">{highestScore}</div>
              <div className="text-xs text-slate-400 font-medium">Best Net Marks</div>
            </div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 flex items-center space-x-3">
            <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-cyan-400">{totalQuestionsSolved}</div>
              <div className="text-xs text-slate-400 font-medium">Questions Attempted</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
