import { Achievement } from '../models/portfolio.models';

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: 'Mujer destacada en el área de la tecnología',
    description: 'Reconocimiento otorgado por el Tecnológico de Antioquia Institución Universitaria por contribuciones en tecnología, liderazgo comunitario, WiDS, Women Techmakers y Guardianes Ancestrales.',
    year: 'Marzo 2024',
    images: [
      {
        src: 'assets/images/speaker/optimized/reconocimiento-rina-900.jpg',
        alt: 'Rina Plata sosteniendo el reconocimiento Mujer destacada en el área de tecnología otorgado por el Tecnológico de Antioquia'
      }
    ],
    url: 'https://tdea.edu.co/',
    urlLabel: 'Ver institución'
  },
  {
    title: 'Speaker en JSConf',
    description: 'Charla sobre su experiencia como desarrolladora wayuu en la industria tecnológica.',
    year: '2023'
  },
  {
    title: 'Liderazgo comunitario indígena',
    description: 'Impulso de Guardianes Ancestrales como puente entre identidad, educación y tecnología.',
    year: 'Actualidad'
  },
  {
    title: 'Formación en ingeniería de software',
    description: 'Estudiante de Ingeniería de Software en el Tecnológico de Antioquia.',
    year: '2020 - 2025'
  },
  {
    title: 'Lenguas e identidad',
    description: 'Español y Wayuunaiki nativos, con inglés en nivel A2.',
    year: 'Perfil'
  }
];

