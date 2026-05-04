import { Project } from '../models/portfolio.models';

export const PROJECTS: Project[] = [
  {
    name: 'Portafolio profesional',
    description: 'Sitio personal construido para presentar experiencia, charlas, comunidades y proyectos destacados.',
    impact: 'Comunica una identidad profesional conectada con tecnología, accesibilidad e interculturalidad.',
    technologies: ['Angular', 'TypeScript', 'SCSS', 'Accesibilidad'],
    image: 'assets/images/optimized/portfolio1-900.jpg',
    githubUrl: 'https://github.com/Rinaplata/rinaplata.github.io',
    demoUrl: 'https://rinaplata.github.io'
  },
  {
    name: 'Tecnología para comunidades',
    description: 'Prototipos y contenidos digitales para educación, comunidad e impacto social.',
    impact: 'Acerca herramientas tecnológicas a conversaciones sobre territorio, educación e identidad.',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    image: 'assets/images/optimized/portafolio3-900.jpg'
  }
];
