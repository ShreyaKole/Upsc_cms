import React from 'react';
import type { SubjectStats } from '../../types';
import { Layers } from 'lucide-react';

interface SubjectBreakdownProps {
  subjects: SubjectStats[];
}

export const SubjectBreakdown: React.FC<SubjectBreakdownProps> = ({ subjects }) => {
  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-800 mb-8">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          <span>Subject-wise Performance Breakdown</span>
        </h3>
        <span className="text-xs text-slate-400 font-medium">{subjects.length} Categories Tagged</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subjects.map((stat, idx) => {
          const accColor =
            stat.accuracy >= 70 ? 'bg-emerald-500' :
            stat.accuracy >= 40 ? 'bg-amber-500' : 'bg-rose-500';

          return (
            <div key={idx} className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-slate-200">{stat.subject}</span>
                <span className="text-xs font-mono font-semibold text-indigo-400">
                  {stat.marksGained} Marks
                </span>
              </div>

              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden mb-3">
                <div
                  className={`h-full ${accColor} transition-all duration-500 rounded-full`}
                  style={{ width: `${Math.max(5, stat.accuracy)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                <div>
                  <span className="text-emerald-400">{stat.correct} Correct</span>
                  <span className="mx-1 font-bold">•</span>
                  <span className="text-rose-400">{stat.wrong} Wrong</span>
                  <span className="mx-1 font-bold">•</span>
                  <span className="text-slate-500">{stat.totalQuestions - stat.attempted} Left</span>
                </div>
                <div className="font-bold text-white">{stat.accuracy}% Acc</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
