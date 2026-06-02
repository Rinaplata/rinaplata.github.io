import { SkillGroup } from '../models/portfolio.models';

export const SKILLS: SkillGroup[] = [
  { category: 'skills.groups.frontend', skills: ['Angular', 'React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind', 'PrimeNG'] },
  { category: 'skills.groups.backend', skills: ['C#', '.NET', 'REST APIs', 'SQL'] },
  { category: 'skills.groups.accessibility', skills: ['WCAG', 'Lighthouse', 'WAVE', 'axe DevTools', 'skills.items.semanticHtml'] },
  { category: 'skills.groups.tools', skills: ['GitHub', 'Azure DevOps', 'Vercel', 'Jira', 'winsuft', 'Claude', 'Prompt engineering'] },
  { category: 'skills.groups.community', skills: ['skills.items.mentorship', 'skills.items.talks', 'skills.items.volunteering', 'skills.items.eventOrganization', 'skills.items.education'] }
];
