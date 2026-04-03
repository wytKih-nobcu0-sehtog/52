export type UserRole = 'schoolchild' | 'student';

export type Goal = 
  | 'championships' 
  | 'olympiads' 
  | 'solve_cases' 
  | 'project_thinking' 
  | 'pitching'
  | 'real_business'
  | 'business_thinking'
  | 'internships';

export interface Case {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type: string;
  role: UserRole;
  company?: string;
  industry?: string;
  situation?: string;
  problem?: string;
  task?: string;
  data?: string;
}

export interface CaseSolution {
  problem: string;
  audience: string;
  solution: string;
  advantages: string;
  monetization: string;
  presentation: string;
}

export interface ProjectData {
  id: string;
  caseId: string;
  title: string;
  role: UserRole;
  goal: Goal;
  solution: CaseSolution;
  status: 'draft' | 'completed';
  updatedAt: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
