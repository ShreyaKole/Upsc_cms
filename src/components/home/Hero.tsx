import React from 'react';
import { Award, Flame, Sparkles, Target, Zap } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-950/40 via-slate-950 to-slate-950 border-b border-slate-800/60">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-900/50 border border-indigo-700/50 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Real Exam Simulator & Deep Analytics</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Master UPSC Prelims with <br />
          <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Year-wise Test Series & Analytics
          </span>
        </h1>

        <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
          Attempt authentic past question papers in a simulated exam condition with real-time timers, negative marking, subject tagging, and rich performance diagnostics.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mt-8">
          <div className="glass-card p-4 rounded-xl text-center border border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-2">
              <Target className="w-4 h-4" />
            </div>
            <div className="text-2xl font-bold text-white">100%</div>
            <div className="text-xs text-slate-400 mt-1">Exam Accuracy</div>
          </div>

          <div className="glass-card p-4 rounded-xl text-center border border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-2">
              <Zap className="w-4 h-4" />
            </div>
            <div className="text-2xl font-bold text-white">Instant</div>
            <div className="text-xs text-slate-400 mt-1">Score Evaluation</div>
          </div>

          <div className="glass-card p-4 rounded-xl text-center border border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-2">
              <Flame className="w-4 h-4" />
            </div>
            <div className="text-2xl font-bold text-white">-0.66</div>
            <div className="text-xs text-slate-400 mt-1">Negative Marking</div>
          </div>

          <div className="glass-card p-4 rounded-xl text-center border border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2">
              <Award className="w-4 h-4" />
            </div>
            <div className="text-2xl font-bold text-white">Detailed</div>
            <div className="text-xs text-slate-400 mt-1">Explanations</div>
          </div>
        </div>
      </div>
    </div>
  );
};
