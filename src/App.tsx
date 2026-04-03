import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Sparkles, 
  History, 
  BarChart3, 
  FileText, 
  Presentation, 
  Settings, 
  Moon, 
  Sun, 
  LogOut, 
  ChevronRight,
  Plus,
  Trophy,
  Target,
  Zap
} from 'lucide-react';
import { AuthScreen } from './components/AuthScreen';
import { Onboarding } from './components/Onboarding';
import { CaseList } from './components/CaseList';
import { CaseGenerator } from './components/CaseGenerator';
import { Workspace } from './components/Workspace';
import { UserRole, Goal, Case, ProjectData } from './types';
import { cn } from './lib/utils';

type AppState = 'auth' | 'onboarding' | 'dashboard' | 'workspace';
type DashboardSection = 'ready_cases' | 'generate_case' | 'past_tasks' | 'progress' | 'solutions' | 'pitch' | 'settings';

export default function App() {
  const [state, setState] = useState<AppState>('auth');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [role, setRole] = useState<UserRole | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [activeSection, setActiveSection] = useState<DashboardSection>('ready_cases');
  const [activeCase, setActiveCase] = useState<Case | null>(null);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [currentProject, setCurrentProject] = useState<ProjectData | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const handleStartCase = (c: Case) => {
    const newProject: ProjectData = {
      id: Math.random().toString(36).substr(2, 9),
      caseId: c.id,
      title: c.title,
      role: role!,
      goal: goal!,
      solution: {
        problem: '',
        audience: '',
        solution: '',
        advantages: '',
        monetization: '',
        presentation: ''
      },
      status: 'draft',
      updatedAt: Date.now()
    };
    setActiveCase(c);
    setCurrentProject(newProject);
    setState('workspace');
  };

  const handleUpdateProject = (solution: ProjectData['solution']) => {
    if (currentProject) {
      setCurrentProject({ ...currentProject, solution, updatedAt: Date.now() });
    }
  };

  const handleFinishProject = () => {
    if (currentProject) {
      const finished = { ...currentProject, status: 'completed' as const };
      setProjects([finished, ...projects]);
      setState('dashboard');
      setActiveSection('past_tasks');
      setCurrentProject(null);
      setActiveCase(null);
    }
  };

  const renderDashboardContent = () => {
    switch (activeSection) {
      case 'ready_cases':
        return (
          <div className="space-y-8">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-3xl font-bold font-display text-[var(--text-main)]">Ready Cases</h2>
                <p className="text-[var(--text-muted)] mt-1">Hand-picked challenges for your level</p>
              </div>
              <button 
                onClick={() => setActiveSection('generate_case')}
                className="btn-primary flex items-center gap-2"
              >
                <Plus size={18} />
                Generate Custom
              </button>
            </div>
            <CaseList role={role!} onSelect={handleStartCase} />
          </div>
        );
      case 'generate_case':
        return <CaseGenerator role={role!} onGenerated={handleStartCase} />;
      case 'past_tasks':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold font-display text-[var(--text-main)]">Past Tasks</h2>
            {projects.length === 0 ? (
              <div className="premium-card p-20 text-center">
                <History className="mx-auto text-[var(--text-muted)] mb-4" size={48} />
                <p className="text-[var(--text-muted)]">No tasks solved yet. Start your first case!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {projects.map(p => (
                  <div key={p.id} className="premium-card p-6 flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-brand-500/10 text-brand-500 rounded-xl flex items-center justify-center">
                        <FileText size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-[var(--text-main)]">{p.title}</h3>
                        <p className="text-xs text-[var(--text-muted)]">
                          {new Date(p.updatedAt).toLocaleDateString()} • {p.status}
                        </p>
                      </div>
                    </div>
                    <button className="text-brand-500 font-bold text-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      Open Again
                      <ChevronRight size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 'progress':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="premium-card p-8 text-center">
              <Trophy className="mx-auto text-brand-500 mb-4" size={40} />
              <div className="text-4xl font-bold text-[var(--text-main)] mb-1">{projects.length}</div>
              <div className="text-sm text-[var(--text-muted)] uppercase tracking-widest font-bold">Cases Solved</div>
            </div>
            <div className="premium-card p-8 text-center">
              <Target className="mx-auto text-brand-500 mb-4" size={40} />
              <div className="text-4xl font-bold text-[var(--text-main)] mb-1">85%</div>
              <div className="text-sm text-[var(--text-muted)] uppercase tracking-widest font-bold">Success Rate</div>
            </div>
            <div className="premium-card p-8 text-center">
              <Zap className="mx-auto text-brand-500 mb-4" size={40} />
              <div className="text-4xl font-bold text-[var(--text-main)] mb-1">Level 4</div>
              <div className="text-sm text-[var(--text-muted)] uppercase tracking-widest font-bold">Current Rank</div>
            </div>
          </div>
        );
      default:
        return (
          <div className="premium-card p-20 text-center">
            <Settings className="mx-auto text-[var(--text-muted)] mb-4 animate-spin-slow" size={48} />
            <p className="text-[var(--text-muted)]">This section is coming soon...</p>
          </div>
        );
    }
  };

  if (state === 'auth') return <AuthScreen onLogin={() => setState('onboarding')} />;
  if (state === 'onboarding') return (
    <Onboarding 
      role={role} 
      setRole={setRole} 
      goal={goal} 
      setGoal={setGoal} 
      onComplete={() => setState('dashboard')} 
    />
  );

  if (state === 'workspace' && activeCase && currentProject) {
    return (
      <Workspace 
        caseData={activeCase} 
        project={currentProject} 
        onUpdate={handleUpdateProject}
        onBack={() => setState('dashboard')}
        onComplete={handleFinishProject}
      />
    );
  }

  const sidebarItems: { id: DashboardSection; label: string; icon: React.ReactNode }[] = [
    { id: 'ready_cases', label: 'Ready Cases', icon: <BookOpen size={20} /> },
    { id: 'generate_case', label: 'Generate Case', icon: <Sparkles size={20} /> },
    { id: 'past_tasks', label: 'Past Tasks', icon: <History size={20} /> },
    { id: 'progress', label: 'My Progress', icon: <BarChart3 size={20} /> },
    { id: 'solutions', label: 'My Solutions', icon: <FileText size={20} /> },
    { id: 'pitch', label: 'Pitch & Presentations', icon: <Presentation size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-[var(--bg-main)] transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-72 border-r border-[var(--border-color)] flex flex-col bg-[var(--bg-sidebar)]">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
            <Sparkles size={20} />
          </div>
          <span className="text-xl font-bold font-display tracking-tight text-[var(--text-main)]">CaseMaster</span>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                activeSection === item.id 
                  ? "bg-brand-500 text-white shadow-lg shadow-brand-500/20" 
                  : "text-[var(--text-muted)] hover:bg-slate-200 dark:hover:bg-white/5 hover:text-[var(--text-main)]"
              )}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-[var(--border-color)] space-y-2">
          <button 
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-[var(--text-muted)] hover:bg-slate-200 dark:hover:bg-white/5 transition-all"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button 
            onClick={() => setState('auth')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-rose-500 hover:bg-rose-500/10 transition-all"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[var(--bg-main)]">
        <header className="h-20 border-b border-[var(--border-color)] flex items-center justify-between px-10 sticky top-0 bg-[var(--bg-main)]/80 backdrop-blur-md z-20">
          <div>
            <h1 className="text-xl font-bold text-[var(--text-main)]">
              {activeSection === 'ready_cases' && 'Dashboard'}
              {activeSection === 'generate_case' && 'AI Generator'}
              {activeSection === 'past_tasks' && 'History'}
              {activeSection === 'progress' && 'Statistics'}
              {activeSection === 'solutions' && 'My Solutions'}
              {activeSection === 'pitch' && 'Presentations'}
              {activeSection === 'settings' && 'Settings'}
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm font-bold text-[var(--text-main)]">Hello, Alex!</p>
              <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-bold">
                {role === 'student' ? 'University Student' : 'High School Student'}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-500 to-amber-400 border-2 border-[var(--bg-main)] shadow-lg" />
          </div>
        </header>

        <div className="p-10 max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeSection === 'ready_cases' && (
                <div className="mb-12 premium-card p-10 bg-gradient-to-br from-brand-500 to-brand-600 text-white border-none shadow-2xl shadow-brand-500/30 relative overflow-hidden">
                  <div className="relative z-10">
                    <h2 className="text-4xl font-bold font-display mb-4">Ready to solve a new case?</h2>
                    <p className="text-white/80 max-w-lg mb-8">
                      Your current goal is <span className="text-white font-bold underline decoration-white/30 underline-offset-4 capitalize">{goal?.replace('_', ' ')}</span>. 
                      We've prepared some challenges that match your profile.
                    </p>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => setActiveSection('ready_cases')}
                        className="bg-white text-brand-600 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-lg"
                      >
                        Continue Learning
                      </button>
                      <button 
                        onClick={() => setActiveSection('generate_case')}
                        className="bg-brand-400/20 backdrop-blur-md text-white border border-white/20 px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition-all"
                      >
                        Try AI Generation
                      </button>
                    </div>
                  </div>
                  <Sparkles className="absolute -right-10 -bottom-10 text-white/10 w-64 h-64 rotate-12" />
                </div>
              )}
              {renderDashboardContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
