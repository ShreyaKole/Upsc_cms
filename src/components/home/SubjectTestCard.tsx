import React from 'react';
import type { ExamResult } from '../../types';
import type { SubjectTestPaper } from '../../store/subjectTestStore';
import { ArrowRight, Award, RotateCcw, BarChart2, Sparkles } from 'lucide-react';

interface SubjectTestCardProps {
  paper: SubjectTestPaper;
  latestResult?: ExamResult;
  onStartTest: (paper: SubjectTestPaper) => void;
  onViewAnalysis: (resultId: string) => void;
}

export const SubjectTestCard: React.FC<SubjectTestCardProps> = ({
  paper,
  latestResult,
  onStartTest,
  onViewAnalysis
}) => {
  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 group relative overflow-hidden border border-slate-800/80">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 opacity-80 group-hover:opacity-100 transition-opacity" />

      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-950/80 text-indigo-300 border border-indigo-800/50">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Test {paper.testNumber}</span>
          </span>

          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-slate-800 text-slate-300">
            {paper.subject}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors leading-snug">
          {paper.title}
        </h3>

        <p className="text-sm text-slate-400 mb-6 line-clamp-2 leading-relaxed">
          {paper.description}
        </p>

        <div className="grid grid-cols-3 gap-2 bg-slate-950/60 rounded-xl p-3 border border-slate-800/60 text-center mb-6">
          <div>
            <div className="text-xs text-slate-400 font-medium">Questions</div>
            <div className="text-sm font-bold text-slate-200 mt-0.5">{paper.totalQuestions} MCQs</div>
          </div>
          <div className="border-x border-slate-800/60 px-1">
            <div className="text-xs text-slate-400 font-medium">Duration</div>
            <div className="text-sm font-bold text-slate-200 mt-0.5">{paper.durationMinutes} mins</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Marks</div>
            <div className="text-sm font-bold text-slate-200 mt-0.5">{paper.totalMarks} Marks</div>
          </div>
        </div>
      </div>

      <div>
        {latestResult ? (
          <div className="bg-indigo-950/40 border border-indigo-800/40 rounded-xl p-3 mb-4">
            <div className="flex items-center justify-between mb-1.5 text-xs">
              <span className="text-indigo-300 font-semibold flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-indigo-400" /> Latest Attempt Score
              </span>
              <span className="text-slate-400">{new Date(latestResult.submittedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xl font-black text-white">{latestResult.score}</span>
                <span className="text-xs text-slate-400 font-medium"> / {latestResult.totalMarks}</span>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                latestResult.accuracy >= 60 ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
              }`}>
                {latestResult.accuracy}% Accuracy
              </span>
            </div>
          </div>
        ) : null}

        <div className="flex gap-2">
          {latestResult ? (
            <>
              <button
                onClick={() => onViewAnalysis(latestResult.id)}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-indigo-500/30 transition-colors"
              >
                <BarChart2 className="w-4 h-4" />
                <span>Analytics</span>
              </button>
              <button
                onClick={() => onStartTest(paper)}
                className="flex items-center justify-center space-x-1.5 px-3 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 transition-colors"
                title="Re-attempt Subject Test"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button
              onClick={() => onStartTest(paper)}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-600/25 transition-all transform active:scale-95"
            >
              <span>Start Timed Subject Test</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
