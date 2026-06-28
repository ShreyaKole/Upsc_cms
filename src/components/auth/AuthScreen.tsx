import React, { useState } from 'react';
import { AuthManager } from '../../store/authStore';
import type { User } from '../../types';
import { AlertCircle, CheckCircle2, Lock, ShieldCheck, User as UserIcon, UserPlus, LogIn } from 'lucide-react';

interface AuthScreenProps {
  onAuthSuccess: (user: User) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthSuccess }) => {
  const [mode, setMode] = useState<'signin' | 'login'>('signin'); // Default to Sign In as requested
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (mode === 'signin') {
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match! Please check again.');
        return;
      }
      const res = AuthManager.register(username, password);
      if (res.success && res.user) {
        setSuccessMsg(res.message);
        setTimeout(() => onAuthSuccess(res.user!), 800);
      } else {
        setErrorMsg(res.message);
      }
    } else {
      const res = AuthManager.login(username, password);
      if (res.success && res.user) {
        setSuccessMsg(res.message);
        setTimeout(() => onAuthSuccess(res.user!), 600);
      } else {
        setErrorMsg(res.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-indigo-500/30 max-w-md w-full shadow-2xl relative z-10 bg-slate-900/90 backdrop-blur-xl">
        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-0.5 shadow-xl shadow-indigo-500/30 mx-auto mb-4">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-indigo-400" />
            </div>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            UPSC<span className="text-indigo-400">PrepLab</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Simulated Year-wise Exam Portal & Analytics</p>
        </div>

        {/* Tab Selectors */}
        <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 mb-6">
          <button
            onClick={() => { setMode('signin'); setErrorMsg(null); setSuccessMsg(null); }}
            className={`py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
              mode === 'signin' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Sign In (Create Account)</span>
          </button>
          <button
            onClick={() => { setMode('login'); setErrorMsg(null); setSuccessMsg(null); }}
            className={`py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
              mode === 'login' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Log In</span>
          </button>
        </div>

        {/* Alert Messages */}
        {errorMsg && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs flex items-start space-x-2.5 leading-relaxed">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="mb-6 p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 text-xs flex items-center space-x-2.5 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
              Username
            </label>
            <div className="relative">
              <UserIcon className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter unique username"
                className="w-full pl-10 pr-4 py-3 bg-slate-950 rounded-xl border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-100 text-sm outline-none transition-colors placeholder:text-slate-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-4 py-3 bg-slate-950 rounded-xl border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-100 text-sm outline-none transition-colors placeholder:text-slate-600"
              />
            </div>
          </div>

          {mode === 'signin' && (
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 rounded-xl border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-100 text-sm outline-none transition-colors placeholder:text-slate-600"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-lg shadow-indigo-600/30 transition-all transform active:scale-98 mt-2"
          >
            {mode === 'signin' ? 'Create Account & Continue' : 'Log In to Account'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          {mode === 'signin' ? (
            <p>Already have an account? <button onClick={() => setMode('login')} className="text-indigo-400 font-bold hover:underline">Log In</button></p>
          ) : (
            <p>New candidate? <button onClick={() => setMode('signin')} className="text-indigo-400 font-bold hover:underline">Sign In (Register) first</button></p>
          )}
        </div>
      </div>
    </div>
  );
};
