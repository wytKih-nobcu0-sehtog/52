import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UserRole } from '../types';
import { Sparkles, Building2, Globe, Layout, Loader2, ChevronRight } from 'lucide-react';
import { generateCase } from '../services/gemini';
import { Case } from '../types';

interface CaseGeneratorProps {
  role: UserRole;
  onGenerated: (c: Case) => void;
}

export const CaseGenerator: React.FC<CaseGeneratorProps> = ({ role, onGenerated }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState({
    company: '',
    industry: '',
    theme: '',
    difficulty: 'Medium',
    type: ''
  });

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const c = await generateCase(role, options);
      onGenerated(c);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="premium-card p-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-brand-500/10 text-brand-500 rounded-xl">
            <Sparkles size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[var(--text-main)]">AI Case Generator</h2>
            <p className="text-[var(--text-muted)] text-sm">Create a unique case tailored to your interests</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {role === 'student' ? (
            <>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Company</label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
                  <input 
                    type="text" 
                    placeholder="e.g. Tesla, Starbucks"
                    value={options.company}
                    onChange={(e) => setOptions({...options, company: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-[var(--border-color)] rounded-xl py-3 pl-12 pr-4 text-sm focus:border-brand-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Industry</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
                  <select 
                    value={options.industry}
                    onChange={(e) => setOptions({...options, industry: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-[var(--border-color)] rounded-xl py-3 pl-12 pr-4 text-sm focus:border-brand-500 outline-none transition-all appearance-none"
                  >
                    <option value="">Select Industry</option>
                    <option value="Tech">Technology</option>
                    <option value="Retail">Retail</option>
                    <option value="Finance">Finance</option>
                    <option value="EdTech">EdTech</option>
                    <option value="Energy">Energy</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Task Type</label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {['Marketing', 'Product', 'Strategy', 'Service', 'Growth', 'Analytics'].map(t => (
                    <button
                      key={t}
                      onClick={() => setOptions({...options, type: t})}
                      className={`py-2 rounded-lg text-xs font-bold border transition-all ${options.type === t ? 'bg-brand-500 text-white border-brand-500' : 'border-[var(--border-color)] text-[var(--text-muted)] hover:border-brand-500/50'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Theme</label>
                <div className="relative">
                  <Layout className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
                  <input 
                    type="text" 
                    placeholder="e.g. Ecology, Education, City Life"
                    value={options.theme}
                    onChange={(e) => setOptions({...options, theme: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-[var(--border-color)] rounded-xl py-3 pl-12 pr-4 text-sm focus:border-brand-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Format</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Championship', 'Olympiad', 'Project', 'Pitch'].map(t => (
                    <button
                      key={t}
                      onClick={() => setOptions({...options, type: t})}
                      className={`py-2 rounded-lg text-xs font-bold border transition-all ${options.type === t ? 'bg-brand-500 text-white border-brand-500' : 'border-[var(--border-color)] text-[var(--text-muted)] hover:border-brand-500/50'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
          
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Difficulty</label>
            <div className="grid grid-cols-3 gap-2">
              {['Easy', 'Medium', 'Hard'].map(d => (
                <button
                  key={d}
                  onClick={() => setOptions({...options, difficulty: d})}
                  className={`py-2 rounded-lg text-xs font-bold border transition-all ${options.difficulty === d ? 'bg-brand-500 text-white border-brand-500' : 'border-[var(--border-color)] text-[var(--text-muted)] hover:border-brand-500/50'}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full btn-primary flex items-center justify-center gap-3"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Generating Case...
            </>
          ) : (
            <>
              Generate Custom Case
              <ChevronRight size={20} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
