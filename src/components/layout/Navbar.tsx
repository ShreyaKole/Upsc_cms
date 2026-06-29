import React from 'react';
import type { User } from '../../types';
import { BookOpen, Clock, LogOut, ShieldCheck, Sparkles, User as UserIcon } from 'lucide-react';

interface NavbarProps {
  activeView: 'home' | 'test' | 'analysis' | 'practice';
  homeTab: 'mock' | 'practice' | 'subjtest';
  currentUser: User | null;
  onGoHome: (tab?: 'mock' | 'practice' | 'subjtest') => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeView, homeTab, currentUser, onGoHome, onLogout }) => {
  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div 
          onClick={() => onGoHome('mock')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <span className="text-xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              UPSC<span className="text-indigo-400 font-bold ml-1">PrepLab</span>
            </span>
            <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest text-indigo-400/80 font-semibold ml-2 px-2 py-0.5 rounded bg-indigo-950/60 border border-indigo-800/40">
              Exam Simulator & Practice
            </span>
          </div>
        </div>

        <nav className="flex items-center space-x-1.5 sm:space-x-3">
          <button
            onClick={() => onGoHome('mock')}
            className={`flex items-center space-x-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
              activeView === 'home' && homeTab === 'mock'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Year Mocks</span>
          </button>

          <button
            onClick={() => onGoHome('subjtest')}
            className={`flex items-center space-x-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
              activeView === 'home' && homeTab === 'subjtest'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Clock className="w-4 h-4 text-purple-300" />
            <span>Subject Tests</span>
          </button>

          <button
            onClick={() => onGoHome('practice')}
            className={`flex items-center space-x-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
              (activeView === 'home' && homeTab === 'practice') || activeView === 'practice'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="hidden md:inline">Instant Practice</span>
          </button>

          {currentUser && (
            <div className="flex items-center space-x-3 pl-2 sm:pl-3 border-l border-slate-800">
              <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-indigo-300">
                <UserIcon className="w-3.5 h-3.5 text-indigo-400" />
                <span className="capitalize">{currentUser.username}</span>
              </div>

              <button
                onClick={onLogout}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 border border-transparent hover:border-rose-800/50 transition-colors"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
