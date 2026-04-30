import { SkillGroup } from '../models/portfolio.models';

export const SKILLS: SkillGroup[] = [
  { category: 'Frontend', skills: ['Angular', 'React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind', 'PrimeNG'] },
  { category: 'Backend / APIs', skills: ['C#', '.NET', 'REST APIs', 'SQL'] },
  { category: 'Accesibilidad', skills: ['WCAG', 'Lighthouse', 'WAVE', 'axe DevTools', 'HTML semántico'] },
  { category: 'Herramientas', skills: ['GitHub', 'Azure DevOps', 'Vercel', 'Figma', 'Jira', 'WinSof', 'Claude', 'Prompt engineering'] },
  { category: 'Comunidad y liderazgo', skills: ['Mentoría', 'Charlas', 'Voluntariado', 'Organización de eventos', 'Educación'] }
];
