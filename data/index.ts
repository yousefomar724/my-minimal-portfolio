import { RiCodepenLine, RiLinkedinLine, RiGithubLine } from 'react-icons/ri'
import {
  SiAuth0,
  SiBootstrap,
  SiChakraui,
  SiNextdotjs,
  SiTailwindcss,
  SiThemoviedatabase,
  SiTypescript,
  SiVite,
} from 'react-icons/si'
import Posts from '../components/posts'
import Projects from '../components/projects'
import Skills from '../components/skills'

export default {
  header: {
    socialLinks: [
      {
        title: 'Codepen',
        icon: RiCodepenLine,
        url: 'https://codepen.io/yousefomar724',
      },
      {
        title: 'Linkedin',
        icon: RiLinkedinLine,
        url: 'https://www.linkedin.com/in/yousefomar724/',
      },
      {
        title: 'GitHub',
        icon: RiGithubLine,
        url: 'https://github.com/yousefomar724',
      },
    ],
    experience: [
      {
        num: 1,
        text1: 'Year of',
        text2: 'work',
      },
      {
        num: '20+',
        text1: 'Completed',
        text2: 'projects',
      },
      {
        num: 6,
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
    {
      text: 'Posts',
    },
  ],
  sections: [Projects, Skills, Posts],
  projects: [
    {
      img: '/disney.png',
      title: 'Disney+ clone',
      subtitle: 'web',
      tags: [
        { title: 'Next.js', icon: SiNextdotjs, color: 'hsl(0, 0%, 100%)' },
        {
          title: 'TypeScript',
          icon: SiTypescript,
          color: 'hsl(214, 55%, 51%)',
        },
        {
          title: 'Tailwindcss',
          icon: SiTailwindcss,
          color: 'hsl(203, 91%, 67%)',
        },
        { title: 'Nextauth', icon: SiAuth0, color: 'hsl(283, 72%, 50%)' },
        {
          title: 'TMDB API',
          icon: SiThemoviedatabase,
          color: 'hsl(185, 40%, 53%)',
        },
      ],
      url: {
        github: 'https://github.com/yousefomar724/disney-clone',
        live: '',
      },
    },
    {
      img: '/historyquiz.png',
      title: 'History Quick Quiz',
      subtitle: 'web',
      tags: [
        { title: 'Next.js', icon: SiNextdotjs, color: 'hsl(0, 0%, 100%)' },
        {
          title: 'TypeScript',
          icon: SiTypescript,
          color: 'hsl(214, 55%, 51%)',
        },
        { title: 'Vite', icon: SiVite, color: '#646CFF' },
        { title: 'Chakra UI', icon: SiChakraui, color: '#319795' },
      ],
      url: {
        github: 'https://github.com/yousefomar724/quiz-app',
        live: 'https://quiz-app-sigma-blond.vercel.app/',
      },
    },
    {
      img: '/rick-morty-universe.png',
      title: 'Rick & Morty Universe',
      subtitle: 'web',
      tags: [
        { title: 'Next.js', icon: SiNextdotjs, color: 'hsl(0, 0%, 100%)' },
        {
          title: 'TypeScript',
          icon: SiTypescript,
          color: 'hsl(214, 55%, 51%)',
        },
        { title: 'Bootstrap', icon: SiBootstrap, color: 'hsl(267, 94%, 52%)' },
      ],
      url: {
        github: 'https://github.com/yousefomar724/rick-morty-universe',
        live: 'https://rick-morty-universe.vercel.app/',
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
