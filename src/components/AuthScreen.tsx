import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react';

interface AuthScreenProps {
  onLogin: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-500/10 rounded-full blur-[120px] -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[2.5rem] p-10 shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-brand-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-brand-500/30 mb-6">
            <Sparkles size={32} />
          </div>
          <h1 className="text-3xl font-bold font-display tracking-tight text-[var(--text-main)]">CaseMaster AI</h1>
          <p className="text-[var(--text-muted)] text-sm mt-2">The future of business education</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
            <input 
              type="email" 
              placeholder="Email address"
              className="w-full bg-slate-50 dark:bg-white/5 border border-[var(--border-color)] rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
            <input 
              type="password" 
              placeholder="Password"
              className="w-full bg-slate-50 dark:bg-white/5 border border-[var(--border-color)] rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
            />
          </div>
        </div>

        <button 
          onClick={onLogin}
          className="w-full btn-primary flex items-center justify-center gap-2 mb-6"
        >
          {isLogin ? 'Sign In' : 'Create Account'}
          <ArrowRight size={18} />
        </button>

        <div className="relative flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-[var(--border-color)]" />
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-widest font-bold">Or continue with</span>
          <div className="flex-1 h-px bg-[var(--border-color)]" />
        </div>

        <div className="grid grid-cols-3 gap-3 mb-8">
          <button className="flex items-center justify-center p-3 border border-[var(--border-color)] rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
            <Chrome size={20} />
          </button>
          <button className="flex items-center justify-center p-3 border border-[var(--border-color)] rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
            <Github size={20} />
          </button>
          <button className="flex items-center justify-center p-3 border border-[var(--border-color)] rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
            <div className="w-5 h-5 bg-blue-500 rounded-sm flex items-center justify-center text-[10px] text-white font-bold">TG</div>
          </button>
        </div>

        <p className="text-center text-sm text-[var(--text-muted)]">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-brand-500 font-bold hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};
