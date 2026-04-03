import React from 'react';
import { motion } from 'motion/react';
import { UserRole, Goal } from '../types';
import { GraduationCap, BookOpen, Trophy, Target, Lightbulb, Presentation, Briefcase, TrendingUp, Users } from 'lucide-react';
import { cn } from '../lib/utils';

interface OnboardingProps {
  role: UserRole | null;
  setRole: (role: UserRole) => void;
  goal: Goal | null;
  setGoal: (goal: Goal) => void;
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ role, setRole, goal, setGoal, onComplete }) => {
  const schoolGoals: { id: Goal; label: string; icon: React.ReactNode }[] = [
    { id: 'championships', label: 'Prepare for championships', icon: <Trophy size={20} /> },
    { id: 'olympiads', label: 'Prepare for olympiads', icon: <BookOpen size={20} /> },
    { id: 'solve_cases', label: 'Learn to solve cases', icon: <Target size={20} /> },
    { id: 'project_thinking', label: 'Develop project thinking', icon: <Lightbulb size={20} /> },
    { id: 'pitching', label: 'Learn to pitch & present', icon: <Presentation size={20} /> },
  ];

  const studentGoals: { id: Goal; label: string; icon: React.ReactNode }[] = [
    { id: 'real_business', label: 'Solve real business cases', icon: <Briefcase size={20} /> },
    { id: 'championships', label: 'Prepare for championships', icon: <Trophy size={20} /> },
    { id: 'business_thinking', label: 'Develop business thinking', icon: <TrendingUp size={20} /> },
    { id: 'internships', label: 'Train for internships', icon: <Users size={20} /> },
    { id: 'pitching', label: 'Create strong presentations', icon: <Presentation size={20} /> },
  ];

  const currentGoals = role === 'schoolchild' ? schoolGoals : studentGoals;

  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        {!role ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold font-display mb-12 text-[var(--text-main)]">Who are you?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <button 
                onClick={() => setRole('schoolchild')}
                className="premium-card p-12 group flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 bg-brand-50 dark:bg-brand-500/10 text-brand-500 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <BookOpen size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[var(--text-main)]">Schoolchild</h3>
                <p className="text-[var(--text-muted)]">Ready to conquer olympiads and championships</p>
              </button>
              <button 
                onClick={() => setRole('student')}
                className="premium-card p-12 group flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 bg-brand-50 dark:bg-brand-500/10 text-brand-500 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <GraduationCap size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[var(--text-main)]">Student</h3>
                <p className="text-[var(--text-muted)]">Focused on real business tasks and careers</p>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold font-display mb-4 text-[var(--text-main)]">What is your goal?</h2>
            <p className="text-[var(--text-muted)] mb-12">We will personalize your experience based on your choice</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12">
              {currentGoals.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGoal(g.id)}
                  className={cn(
                    "p-6 rounded-2xl border transition-all flex flex-col items-center gap-4",
                    goal === g.id 
                      ? "bg-brand-500 text-white border-brand-500 shadow-lg shadow-brand-500/20" 
                      : "bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-main)] hover:border-brand-500/50"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    goal === g.id ? "bg-white/20" : "bg-brand-50 dark:bg-brand-500/10 text-brand-500"
                  )}>
                    {g.icon}
                  </div>
                  <span className="font-bold text-sm">{g.label}</span>
                </button>
              ))}
            </div>

            <div className="flex justify-center gap-4">
              <button 
                onClick={() => { setRole(null as any); setGoal(null as any); }}
                className="btn-secondary"
              >
                Back
              </button>
              <button 
                disabled={!goal}
                onClick={onComplete}
                className="btn-primary disabled:opacity-50"
              >
                Continue to Dashboard
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
