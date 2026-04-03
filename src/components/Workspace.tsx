import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Case, ProjectData, ChatMessage } from '../types';
import { BookOpen, Target, Users, Zap, Coins, Presentation, Sparkles, Send, Loader2, Bot, User, ArrowLeft, CheckCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getAiAssistantAdvice } from '../services/gemini';
import { cn } from '../lib/utils';

interface WorkspaceProps {
  caseData: Case;
  project: ProjectData;
  onUpdate: (solution: ProjectData['solution']) => void;
  onBack: () => void;
  onComplete: () => void;
}

export const Workspace: React.FC<WorkspaceProps> = ({ caseData, project, onUpdate, onBack, onComplete }) => {
  const [activeTab, setActiveTab] = useState<'problem' | 'audience' | 'solution' | 'advantages' | 'monetization' | 'presentation'>('problem');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: `Hello! I'm your AI Assistant for this case. I've analyzed the task. Let's start with defining the root problem. What do you think is the main challenge here?` }
  ]);
  const [input, setInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAiSend = async () => {
    if (!input.trim() || isAiLoading) return;
    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsAiLoading(true);

    try {
      const response = await getAiAssistantAdvice(input, project, caseData, messages);
      setMessages(prev => [...prev, { role: 'model', text: response || 'I am sorry, I could not process that.' }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAiLoading(false);
    }
  };

  const tabs = [
    { id: 'problem', label: 'Problem', icon: <BookOpen size={18} /> },
    { id: 'audience', label: 'Audience', icon: <Users size={18} /> },
    { id: 'solution', label: 'Solution', icon: <Target size={18} /> },
    { id: 'advantages', label: 'Advantages', icon: <Zap size={18} /> },
    { id: 'monetization', label: 'Realization', icon: <Coins size={18} /> },
    { id: 'presentation', label: 'Presentation', icon: <Presentation size={18} /> },
  ];

  return (
    <div className="flex h-full bg-[var(--bg-main)] transition-colors duration-300">
      {/* Left: Case Info */}
      <div className="w-1/3 border-r border-[var(--border-color)] flex flex-col bg-[var(--bg-sidebar)]">
        <div className="p-6 border-b border-[var(--border-color)] flex items-center justify-between">
          <button onClick={onBack} className="text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center gap-2 text-sm font-bold">
            <ArrowLeft size={16} />
            Back
          </button>
          <div className="px-3 py-1 bg-brand-500/10 text-brand-500 text-[10px] font-bold rounded-full uppercase tracking-widest">
            {caseData.difficulty}
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <div>
            <h1 className="text-2xl font-bold font-display mb-4 text-[var(--text-main)]">{caseData.title}</h1>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">{caseData.description}</p>
          </div>

          <div className="space-y-6">
            <section>
              <h3 className="text-xs font-bold text-brand-500 uppercase tracking-widest mb-3">Situation</h3>
              <div className="text-sm text-[var(--text-main)] leading-relaxed prose prose-sm dark:prose-invert">
                <ReactMarkdown>{caseData.situation || ''}</ReactMarkdown>
              </div>
            </section>
            <section>
              <h3 className="text-xs font-bold text-brand-500 uppercase tracking-widest mb-3">The Problem</h3>
              <div className="text-sm text-[var(--text-main)] leading-relaxed prose prose-sm dark:prose-invert">
                <ReactMarkdown>{caseData.problem || ''}</ReactMarkdown>
              </div>
            </section>
            <section>
              <h3 className="text-xs font-bold text-brand-500 uppercase tracking-widest mb-3">Your Task</h3>
              <div className="text-sm text-[var(--text-main)] leading-relaxed prose prose-sm dark:prose-invert">
                <ReactMarkdown>{caseData.task || ''}</ReactMarkdown>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Center: Workspace */}
      <div className="flex-1 flex flex-col bg-[var(--bg-main)]">
        <div className="h-16 border-b border-[var(--border-color)] flex items-center px-6 gap-1 overflow-x-auto no-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap",
                activeTab === tab.id 
                  ? "bg-brand-500/10 text-brand-500" 
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 p-10 overflow-y-auto">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold font-display mb-8 text-[var(--text-main)] capitalize">{activeTab}</h2>
            <textarea
              value={project.solution[activeTab as keyof typeof project.solution] || ''}
              onChange={(e) => onUpdate({ ...project.solution, [activeTab]: e.target.value })}
              placeholder={`Describe the ${activeTab} here...`}
              className="w-full h-[400px] bg-slate-50 dark:bg-white/5 border border-[var(--border-color)] rounded-3xl p-8 text-lg text-[var(--text-main)] focus:border-brand-500 outline-none transition-all resize-none shadow-inner"
            />
            
            <div className="mt-8 flex justify-between items-center">
              <p className="text-xs text-[var(--text-muted)]">Auto-saved just now</p>
              <button 
                onClick={onComplete}
                className="btn-primary flex items-center gap-2"
              >
                <CheckCircle size={18} />
                Finish Solution
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right: AI Assistant */}
      <div className="w-80 border-l border-[var(--border-color)] flex flex-col bg-[var(--bg-card)]">
        <div className="p-4 border-b border-[var(--border-color)] flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white">
            <Sparkles size={16} />
          </div>
          <h3 className="font-bold text-sm text-[var(--text-main)]">AI Assistant</h3>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={cn("flex gap-2", msg.role === 'user' ? "flex-row-reverse" : "")}>
              <div className={cn("w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mt-1", msg.role === 'user' ? "bg-slate-200 dark:bg-slate-800" : "bg-brand-500/10 text-brand-500")}>
                {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
              </div>
              <div className={cn("p-3 rounded-xl text-xs leading-relaxed", msg.role === 'user' ? "bg-brand-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-[var(--text-main)]")}>
                <div className="prose prose-xs dark:prose-invert">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {isAiLoading && (
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full bg-brand-500/10 text-brand-500 flex items-center justify-center mt-1">
                <Bot size={12} />
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl flex items-center">
                <Loader2 className="animate-spin text-brand-500" size={12} />
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-[var(--border-color)]">
          <div className="relative">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAiSend()}
              placeholder="Ask for help..."
              className="w-full bg-slate-50 dark:bg-slate-900 border border-[var(--border-color)] rounded-xl py-2 pl-3 pr-10 text-xs text-[var(--text-main)] focus:border-brand-500 outline-none"
            />
            <button onClick={handleAiSend} className="absolute right-2 top-1/2 -translate-y-1/2 text-brand-500">
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
