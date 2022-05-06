import { RiCodepenLine, RiLinkedinLine, RiGithubLine } from 'react-icons/ri'

export default {
  header: {
    socialLinks: [
      {
        icon: RiCodepenLine,
        url: 'https://codepen.io/yousefomar724',
      },
      {
        icon: RiLinkedinLine,
        url: 'https://www.linkedin.com/in/yousefomar724/',
      },
      {
        icon: RiGithubLine,
        url: 'https://github.com/yousefomar724',
      },
    ],
    experience: [
      {
        num: 7,
        text1: 'Years of',
        text2: 'work',
      },
      {
        num: 124,
        text1: 'Completed',
        text2: 'projects',
      },
      {
        num: 96,
        text1: 'Satisfied',
        text2: 'customers',
      },
    ],
    colors: [
      {
        color: 'Blue',
        hue: '207',
        sat: '90%',
        lig: '61%',
      },
      {
        color: 'Purple',
        hue: '250',
        sat: '66%',
        lig: '75%',
      },
      {
        color: 'Pink',
        hue: '356',
        sat: '90%',
        lig: '61%',
      },
      {
        color: 'Teal',
        hue: '174',
        sat: '63%',
        lig: '62%',
      },
    ],
  },
  tabs: [
    {
      text: 'Projects',
    },
    {
      text: 'Skills',
    },
  ],
  projects: [
    {
      img: '/project2extra.png',
      title: 'Disney+ clone',
      subtitle: 'web',
      tags: ['nextjs', 'tailwind', 'nextauth', 'TMDB api'],
      url: {
        github: 'https://github.com/yousefomar724/disney-clone',
        live: '',
      },
    },
    {
      img: '/project2.png',
      title: 'Recipe Maker',
      subtitle: 'web',
      tags: ['react', 'redux', 'fairebase', 'bootstrap'],
      url: {
        github: 'https://github.com/AmanySirajAl-Din/Wasfity-RecipeMaker',
        live: '',
      },
    },
  ],
  skills: {
    frontend: {
      title: 'Frontend',
      frontendSkills: [
        {
          tech: 'HTML',
          level: 'Basic',
        },
        {
          tech: 'React',
          level: 'Intermediate',
        },
        {
          tech: 'CSS',
          level: 'Advanced',
        },
        {
          tech: 'Bootstrap',
          level: 'Intermediate',
        },
        {
          tech: 'JavaScript',
          level: 'Intermediate',
        },
        {
          tech: 'Git',
          level: 'Intermediate',
        },
      ],
    },
    backend: {
      title: 'Backend',
      backendSkills: [
        {
          tech: 'Node Js',
          level: 'Intermediate',
        },
        {
          tech: 'Python',
          level: 'Basic',
        },
        {
          tech: 'Mongo DB',
          level: 'Basic',
        },
        {
          tech: 'Firebase',
          level: 'Intermediate',
        },
        {
          tech: 'Ruby & Rails',
          level: 'Basic',
        },
      ],
    },
  },
}
