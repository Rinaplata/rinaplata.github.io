import { Talk } from '../models/portfolio.models';

export const TALKS: Talk[] = [
  {
    title: 'My experience as a Wayuu developer in the tech industry',
    event: 'JSConf',
    date: '2023',
    description: 'Charla sobre experiencia profesional, identidad wayuu y participación de comunidades indígenas en tecnología.',
    topics: ['Wayuu', 'Frontend', 'Comunidad', 'Inclusión'],
    image: 'assets/images/about.jpg',
    url: 'https://www.jsconf.co/'
  },
  {
    title: 'Mujeres liderando comunidades tecnológicas',
    event: 'Women Techmakers',
    date: '2025',
    description: 'Charla sobre liderazgo femenino, mentoría, representación y construcción de comunidad en tecnología.',
    topics: ['Liderazgo', 'Comunidad', 'Mujeres en tecnología'],
    image: 'assets/images/perfil.jpg'
  },
  {
    title: 'Frontend con impacto social',
    event: 'Pioneras Dev',
    date: '2024',
    description: 'Cómo crear experiencias web útiles, accesibles y pensadas para necesidades reales de las comunidades.',
    topics: ['Angular', 'React', 'UX', 'Impacto social'],
    image: 'assets/images/preview.png'
  },
  {
    title: 'Comunidades indígenas y tecnología',
    event: 'BoyaConf / JSConf',
    date: '2024',
    description: 'Reflexiones sobre educación, territorio, software y nuevas narrativas para comunidades indígenas.',
    topics: ['Educación', 'Comunidades indígenas', 'Software'],
    image: 'assets/images/project.png'
  }
];
