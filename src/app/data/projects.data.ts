import { Project } from '../models/portfolio.models';

export const PROJECTS: Project[] = [
  {
    name: 'projects.items.portfolio.name',
    description: 'projects.items.portfolio.description',
    impact: 'projects.items.portfolio.impact',
    technologies: ['projects.items.portfolio.technologies.0', 'projects.items.portfolio.technologies.1', 'projects.items.portfolio.technologies.2', 'projects.items.portfolio.technologies.3'],
    image: 'assets/images/optimized/portfolio1-900.jpg',
    githubUrl: 'https://github.com/Rinaplata/rinaplata.github.io',
    demoUrl: 'https://rinaplata.github.io'
  },
  {
    name: 'projects.items.communities.name',
    description: 'projects.items.communities.description',
    impact: 'projects.items.communities.impact',
    technologies: ['projects.items.communities.technologies.0', 'projects.items.communities.technologies.1', 'projects.items.communities.technologies.2'],
    image: 'assets/images/optimized/portafolio3-900.jpg'
  }
];
