import React from 'react';
import { motion } from 'motion/react';
import { Case, UserRole } from '../types';
import { ArrowRight, Zap, BarChart3, Globe } from 'lucide-react';
import { cn } from '../lib/utils';

interface CaseListProps {
  role: UserRole;
  onSelect: (c: Case) => void;
}

export const CaseList: React.FC<CaseListProps> = ({ role, onSelect }) => {
  const schoolCases: Case[] = [
    { id: 's1', title: 'Eco-Project Launch', description: 'Launch a sustainable recycling initiative for your local school community.', difficulty: 'Easy', type: 'Entrepreneurship', role: 'schoolchild' },
    { id: 's2', title: 'Urban Space Solution', description: 'Redesign a public park to make it more inclusive for teenagers and kids.', difficulty: 'Medium', type: 'Social', role: 'schoolchild' },
    { id: 's3', title: 'Teen Service App', description: 'Develop a digital platform that helps teens find local volunteering opportunities.', difficulty: 'Medium', type: 'Digital', role: 'schoolchild' },
    { id: 's4', title: 'Startup Idea', description: 'Create a business plan for a small local startup with minimal initial investment.', difficulty: 'Hard', type: 'Entrepreneurship', role: 'schoolchild' },
    { id: 's5', title: 'Olympiad Business Case', description: 'Solve a complex economic problem from a national business olympiad.', difficulty: 'Hard', type: 'Strategy', role: 'schoolchild' },
    { id: 's6', title: 'Social Problem Case', description: 'Address the issue of digital literacy among the elderly in your city.', difficulty: 'Medium', type: 'Social', role: 'schoolchild' },
    { id: 's7', title: 'Digital Product Case', description: 'Design a new feature for a popular educational app to increase engagement.', difficulty: 'Easy', type: 'Digital', role: 'schoolchild' },
  ];

  const studentCases: Case[] = [
    { id: 'st1', title: 'Marketing for Tech Co', description: 'Develop a go-to-market strategy for a new AI-powered productivity tool.', difficulty: 'Medium', type: 'Marketing', role: 'student' },
    { id: 'st2', title: 'New Product Launch', description: 'Define the MVP and launch roadmap for a fintech app targeting Gen Z.', difficulty: 'Hard', type: 'Product', role: 'student' },
    { id: 'st3', title: 'Customer Experience', description: 'Optimize the user journey for a major e-commerce platform to reduce churn.', difficulty: 'Medium', type: 'Service', role: 'student' },
    { id: 'st4', title: 'Small Business Solution', description: 'Help a local bakery digitize their operations and expand to online sales.', difficulty: 'Easy', type: 'Strategy', role: 'student' },
    { id: 'st5', title: 'EdTech Case', description: 'Design a scalable monetization model for a free language learning platform.', difficulty: 'Hard', type: 'Growth', role: 'student' },
    { id: 'st6', title: 'Urban Environment', description: 'Propose a smart city solution to improve public transport efficiency.', difficulty: 'Medium', type: 'Strategy', role: 'student' },
    { id: 'st7', title: 'Service Digitalization', description: 'Transform a traditional banking service into a fully digital experience.', difficulty: 'Hard', type: 'Analytics', role: 'student' },
  ];

  const cases = role === 'schoolchild' ? schoolCases : studentCases;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cases.map((c, i) => (
        <motion.div
          key={c.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="premium-card p-6 flex flex-col group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className={cn(
              "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
              c.difficulty === 'Easy' ? "bg-emerald-500/10 text-emerald-500" :
              c.difficulty === 'Medium' ? "bg-amber-500/10 text-amber-500" :
              "bg-rose-500/10 text-rose-500"
            )}>
              {c.difficulty}
            </div>
            <div className="text-[var(--text-muted)]">
              {c.type === 'Marketing' && <BarChart3 size={18} />}
              {c.type === 'Digital' && <Zap size={18} />}
              {c.type === 'Strategy' && <Globe size={18} />}
            </div>
          </div>
          
          <h3 className="text-lg font-bold mb-2 text-[var(--text-main)] group-hover:text-brand-500 transition-colors">
            {c.title}
          </h3>
          <p className="text-sm text-[var(--text-muted)] mb-6 flex-1 leading-relaxed">
            {c.description}
          </p>
          
          <button 
            onClick={() => onSelect(c)}
            className="flex items-center gap-2 text-sm font-bold text-brand-500 group-hover:gap-3 transition-all"
          >
            Open Case
            <ArrowRight size={16} />
          </button>
        </motion.div>
      ))}
    </div>
  );
};
