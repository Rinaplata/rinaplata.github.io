export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  technologies: string[];
  responsibilities: string[];
  achievements: string[];
}

export interface Talk {
  title: string;
  event: string;
  date: string;
  description: string;
  topics: string[];
  image: string;
  url?: string;
}

export interface Community {
  name: string;
  role: string;
  description: string;
  impact: string;
  url?: string;
}

export interface Project {
  name: string;
  description: string;
  impact: string;
  technologies: string[];
  image: string;
  githubUrl?: string;
  demoUrl?: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface Achievement {
  title: string;
  description: string;
  year: string;
}
