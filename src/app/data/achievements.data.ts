import { Achievement } from '../models/portfolio.models';

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: 'achievements.items.featured.title',
    description: 'achievements.items.featured.description',
    year: 'achievements.items.featured.year',
    images: [
      {
        src: 'assets/images/speaker/optimized/reconocimiento-rina-900.jpg',
        alt: 'achievements.items.featured.alt'
      }
    ],
    url: 'https://tdea.edu.co/',
    urlLabel: 'achievements.items.featured.urlLabel'
  },
  {
    title: 'achievements.items.jsconf.title',
    description: 'achievements.items.jsconf.description',
    year: '2023'
  },
  {
    title: 'achievements.items.community.title',
    description: 'achievements.items.community.description',
    year: 'achievements.items.community.year'
  },
  {
    title: 'achievements.items.education.title',
    description: 'achievements.items.education.description',
    year: '2020 - 2025'
  },
  {
    title: 'achievements.items.languages.title',
    description: 'achievements.items.languages.description',
    year: 'achievements.items.languages.year'
  }
];
