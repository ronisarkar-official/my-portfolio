export const navLinks = [
  {
    id: 1,
    name: 'Home',
    href: '#home',
  },
  {
    id: 2,
    name: 'About',
    href: '#about',
  },
  {
    id: 3,
    name: 'Projects',
    href: '#work',
  },
  {
    id: 4,
    name: 'Contact',
    href: '#contact',
  },
];

export const logoIconsList = [
  {
    imgPath: '/images/company-logo-1.png',
  },
  {
    imgPath: '/images/company-logo-2.png',
  },
  {
    imgPath: '/images/company-logo-3.png',
  },
  {
    imgPath: '/images/company-logo-4.png',
  },
  {
    imgPath: '/images/company-logo-5.png',
  },
  {
    imgPath: '/images/company-logo-6.png',
  },
];

export const clientReviews = [
  {
    id: 1,
    name: 'Emily Johnson',
    position: 'Marketing Director at GreenLeaf',
    img: 'assets/review1.png',
    review:
      'Working with Roni was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.',
  },
  {
    id: 2,
    name: 'Mark Rogers',
    position: 'Founder of TechGear Shop',
    img: 'assets/review2.png',
    review:
      'Roni’s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He’s a true professional! Fantastic work.',
  },
  {
    id: 3,
    name: 'John Dohsas',
    position: 'Project Manager at UrbanTech ',
    img: 'assets/review3.png',
    review:
      'I can’t say enough good things about Roni. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.',
  },
  {
    id: 4,
    name: 'Ether Smith',
    position: 'CEO of BrightStar Enterprises',
    img: 'assets/review4.png',
    review:
      'Roni was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend backend dev are top-notch.',
  },
];

export const myProjects = [
  {
    title: 'Pixivo – A Creative Visual Sharing Platform',
    desc: 'Pixivo is a modern web-based application designed for effortless image discovery and sharing, much like a personalized visual inspiration hub. With its clean and engaging interface, users can explore, post, like, and comment on visual content, making it an interactive community-driven platform.',
    subdesc:
      'Developed using EJS, Express.js, MongoDB, and Node.js, Pixivo is built to deliver a smooth user experience with dynamic rendering and real-time interactions. It is optimized for scalability and performance, ensuring that users can seamlessly browse and engage with content anytime.',
    href: 'https://pixivo.vercel.app',
    githubUrl: 'https://github.com/ronisarkar-official/pixivo',
    texture: '/textures/project/project3.mp4',
    logo: '/assets/project-logo3.png',
    logoStyle: {
      backgroundColor: '#2A1816',
      border: '0.2px solid #2840f4',
      boxShadow: '0px 0px 60px 0px #6f38ca',
    },
    spotlight: '/assets/spotlight1.png',
    tags: [
      {
        id: 1,
        name: 'Mongodb',
        path: '/assets/mongodb.png',
      },
      {
        id: 2,
        name: 'Express js',
        path: 'assets/express.png',
      },
      {
        id: 3,
        name: 'Ejs',
        path: '/assets/ejs.png',
      },
      {
        id: 4,
        name: 'Node js',
        path: '/assets/nodejs.png',
      },
    ],
  },
  {
    title: 'SmartLibrary - A Modern Library Management System',
    desc: 'SmartLibrary is a full-featured web-based application designed to simplify and streamline library operations. Built with a clean user interface and functional backend, the system allows administrators to manage book inventory, track users, and handle lending activities efficiently.',
    subdesc:
      'Built as a dynamic web application with HTML, CSS, PHP, and MySQL, SmartLibrary is designed for optimal performance and scalability, ensuring a seamless user experience and efficient backend management.',
    href: 'https://mcet.free.nf',
    githubUrl: 'https://github.com/ronisarkar-official/Library-Management-System',
    texture: '/textures/project/project1.mp4',
    logo: '/assets/project-logo1.png',
    logoStyle: {
      backgroundColor: '#2A1816',
      border: '0.2px solid #055895',
      boxShadow: '0px 0px 60px 0px #0476c6',
    },
    spotlight: '/assets/spotlight1.png',
    tags: [
      {
        id: 1,
        name: 'Html',
        path: '/assets/html.png',
      },
      {
        id: 2,
        name: 'CSS',
        path: 'assets/css.png',
      },
      {
        id: 3,
        name: 'JavaScript',
        path: '/assets/js.png',
      },
      {
        id: 4,
        name: 'Php',
        path: '/assets/php.png',
      },
      {
        id: 4,
        name: 'Mysql',
        path: '/assets/mysql.png',
      },
    ],
  },
  {
    title: 'SpecHype - Game News & System Requirements',
    desc: 'Spechype is a fast, clean, and content-rich site for gamers and tech enthusiasts. It offers detailed system requirements, game reviews, and performance insights to help users make informed choices. Optimized for speed, mobile use, and SEO, Spechype ensures a smooth experience while targeting top search engine visibility.',
    subdesc:
      'Built as a dynamic web application using HTML, CSS, and JavaScript. Spechype is optimized for speed, responsiveness, and scalability. It delivers a smooth user experience with a lightweight frontend and efficient content delivery, ensuring fast load times and seamless browsing across all devices.',
    href: 'https://www.spechype.com',
    texture: '/textures/project/project2.mp4',
    logo: '/assets/project-logo2.png',
    logoStyle: {
      backgroundColor: '#2A1816',
      border: '0.2px solid #4538f2',
      boxShadow: '0px 0px 60px 0px #8b2ef5',
    },
    spotlight: '/assets/spotlight5.png',
    tags: [
      {
        id: 1,
        name: 'Html',
        path: '/assets/html.png',
      },
      {
        id: 2,
        name: 'CSS',
        path: 'assets/css.png',
      },
      {
        id: 3,
        name: 'JavaScript',
        path: '/assets/js.png',
      },
    ],
  },
];

export const calculateSizes = (isSmall, isMobile, isTablet) => {
  return {
    deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
    deskPosition: isMobile ? [0.5, -3.5, 0] : [0.25, -6.0, 0],
    cubePosition: isSmall ? [4, -6, 0] : isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [9, -5.5, 0],
    reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [12, 3, 0],
    ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-24, 10, 0],
    targetPosition: isSmall ? [-5, -10, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-13, -13, -10],
  };
};

export const workExperiences = [
  {
    id: 1,
    name: 'Framer',
    pos: 'Lead Web Developer',
    duration: '(Sample experience for demo purposes.)',
    title:
      'Framer serves as my go-to tool for creating interactive prototypes. I use it to bring designs to  life, allowing stakeholders to experience the user flow and interactions before development.',
    icon: '/assets/framer.svg',
    animation: 'victory',
  },
  {
    id: 2,
    name: 'Figma',
    pos: 'Web Developer',
    duration: '(Sample experience for demo purposes.)',
    title:
      'Figma is my collaborative design platform of choice. I utilize it to work seamlessly with team members and clients, facilitating real-time feedback and design iterations. Its cloud-based.',
    icon: '/assets/figma.svg',
    animation: 'clapping',
  },
  {
    id: 3,
    name: 'Notion',
    pos: 'Junior Web Developer',
    duration: '(Sample experience for demo purposes.)',
    title:
      'Notion helps me keep my projects organized. I use it for project management, task tracking, and as a central hub for documentation, ensuring that everything from design notes to.',
    icon: '/assets/notion.svg',
    animation: 'salute',
  },
];
