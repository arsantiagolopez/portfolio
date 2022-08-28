import { DetailedProject, Project, Tech } from "../types";

// Projects
const projects: Project[] = [
  {
    name: "tri",
    alt: "Tri Marketplace",
    href: "https://trimarketplace.vercel.app",
  },
  {
    name: "maize",
    alt: "Maize Picks",
    href: "https://maizepicks.vercel.app",
  },
  {
    name: "model",
    alt: "The Model",
    href: "https://themodel.vercel.app",
  },
  {
    name: "instaccounts",
    alt: "Instaccounts",
    href: "https://instaccounts.vercel.app",
  },
  {
    name: "flavors",
    alt: "Flavors",
    href: "https://tryflavors.com",
  },
  {
    name: "fight",
    alt: "Who Fights Today",
    href: "https://whofights.today",
  },
  {
    name: "preppy",
    alt: "Preppy",
    href: "https://preppy.golf",
  },
  {
    name: "auth",
    alt: "Auth",
    href: "https://auth.golf",
  },
  {
    name: "slide",
    alt: "Slide",
    href: "https://slide.golf",
  },
];

// Detailed project info
const detailedProjects: DetailedProject[] = [
  // Tri
  {
    id: 1,
    name: "tri",
    label: "Tri Marketplace",
    height: "4.5vh",
    href: "trimarketplace.vercel.app",
    github: "https://github.com/arsantiagolopez/marketplace",
    desktopVideo: "",
    mobileVideo: "",
    description:
      "Full stack Dapp Marketplace. Solidity, Hardhat, Typescript, React & Next.js. Beautiful NFT marketplace solution built with the latest blockchain technology.",
    frontend: [
      "TypeScript",
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "IPFS Http Client",
      "MetaMask",
      "NFT.Storage",
      "React Hook Form",
      "React Three Fiber",
      "Formidable",
      "React Dropzone",
      "SWR",
      "Axios",
      "Moment.js",
    ],
    backend: [
      "Solidity",
      "TypeScript",
      "Hardhat",
      "Ethers.js",
      "Typechain",
      "OpenZeppelin Contracts",
      "PostgreSQL",
      "Supabase",
      "JSON Web Tokens",
      "NextAuth.js",
      "Axios",
      "REST API",
    ],
    devops: [
      "Polygon Mumbai testnet contract deployment",
      "IPFS image hosting",
      "NFT.Storage",
      "Hardhat",
      "Ethers.js",
      "Alchemy",
      "Mocha/Chai testing",
      "Vercel frontend deployment",
    ],
  },
  // Maize Picks
  {
    id: 2,
    name: "maize",
    label: "Maize Picks",
    height: "6vh",
    href: "maizepicks.vercel.app",
    github: "https://github.com/arsantiagolopez/picks",
    desktopVideo: "https://www.youtube.com/embed/vVZw7afVYsI",
    mobileVideo: "https://www.youtube.com/embed/Swv1_iX51YE",
    description:
      "A platform to post daily sports betting picks. Stats like profits, ROI, streaks, and many more tracked over intervals of time.",
    frontend: [
      "TypeScript",
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Headless UI",
      "React Hook Form",
      "React Select",
      "React Virtuoso",
      "Nivo Graphs",
      "SWR",
      "Axios",
      "Moment.js",
    ],
    backend: [
      "TypeScript",
      "Node.js",
      "Next.js API",
      "MongoDB",
      "Mongoose",
      "NextAuth.js",
      "Axios",
      "REST API",
    ],
    devops: ["Vercel deployment", "MongoDB Atlas database hosting"],
  },
  // The Model
  {
    id: 3,
    name: "model",
    label: "The Model",
    height: "6vh",
    href: "themodel.vercel.app",
    github: "https://github.com/arsantiagolopez/model",
    desktopVideo: "https://www.youtube.com/embed/psdlIRTQsX4",
    mobileVideo: "https://www.youtube.com/embed/0qrMD7X2Wfw",
    description:
      "Tennis model to display, analize and predict upcoming ATP, WTA and ITF matches. Stats like surface records, form, home court advantage, ELOs and others are calculated.",
    frontend: [
      "TypeScript",
      "React.js",
      "Next.js",
      "Puppeteer",
      "Puppeteer Cluster",
      "Recharts",
      "Tailwind CSS",
      "Headless UI",
      "React Hook Form",
      "SWR",
      "Axios",
      "Moment.js",
    ],
    backend: [
      "TypeScript",
      "Node.js",
      "Next.js API",
      "MongoDB",
      "Mongoose",
      "NextAuth.js",
      "Axios",
      "REST API",
    ],
    devops: ["Vercel deployment", "MongoDB Atlas database hosting"],
  },
  // Instaccounts
  {
    id: 4,
    name: "instaccounts",
    label: "Instaccounts",
    height: "4vh",
    github: "https://github.com/arsantiagolopez/instaccounts",
    desktopVideo: "https://www.youtube.com/embed/cL9Dhw_SpO4",
    mobileVideo: "https://www.youtube.com/embed/-bXJNH-8XtA",
    description:
      "Instaccounts is a solution to organically grow your instagram. Manage multiple accounts, interact with target audiences, preview posts, and much more.",
    frontend: [
      "TypeScript",
      "React.js",
      "Next.js",
      "React Hook Form",
      "React Dropzone",
      "React Virtuoso",
      "SWR",
      "Axios",
      "Moment.js",
      "Chakra UI",
    ],
    backend: [
      "TypeScript",
      "Node.js",
      "Express",
      "NestJS",
      "TypeORM",
      "PostgreSQL",
      "Python",
      "InstaPy",
      "Instaloader",
      "Swagger UI",
      "NextAuth.js",
      "Sendgrid Mail",
      "Axios",
      "Session with Cookies",
      "REST API",
    ],
    devops: [
      "Docker",
      "Docker Compose",
      "Self-hosted frontend",
      "Self-hosted backend",
    ],
  },
  // Flavors
  {
    id: 5,
    name: "flavors",
    label: "Flavors",
    height: "2.5vh",
    href: "www.tryflavors.com",
    github:
      "https://gitfront.io/r/arsantiagolopez/5a99dd9761551bcf30a1ea63660f73ab718a949e/flavors/",
    desktopVideo: "https://www.youtube.com/embed/GgkOGRpQj7I",
    mobileVideo: "https://www.youtube.com/embed/5NlSDRaR01U",
    description: "",
    frontend: [
      "React.js",
      "Next.js",
      "React Hook Form",
      "React Dropzone",
      "React Geosuggest",
      "React Swipeable Views",
      "Google Places API",
      "SWR",
      "Axios",
      "CompressorJS",
      "Moment.js",
      "Chakra UI",
    ],
    backend: [
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "NextAuth.js",
      "CompressorJS",
      "AWS S3 Buckets",
      "Sendgrid Mail",
      "Axios",
      "Session with Cookies",
      "REST API",
    ],
    devops: [
      "Vercel frontend deployment",
      "Heroku backend hosting",
      "AWS S3 image hosting",
      "Babel",
    ],
  },
  // Who Fights Today
  {
    id: 6,
    name: "fight",
    label: "Who Fights Today",
    height: "6vh",
    href: "www.whofights.today",
    github: "https://github.com/arsantiagolopez/whofightstoday",
    desktopVideo: "https://www.youtube.com/embed/iucUzoCZU9A",
    mobileVideo: "https://www.youtube.com/embed/HlScccXq2Tc",
    description: "",
    frontend: [
      "React.js",
      "Next.js",
      "Puppeteer",
      "SWR",
      "Axios",
      "Moment.js",
      "Chakra UI",
    ],
    backend: ["Next.js SSR", "MongoDB", "Mongoose", "REST API"],
    devops: ["Vercel full stack deployment", "Babel"],
  },
  // Preppy
  {
    id: 7,
    name: "preppy",
    label: "Preppy",
    height: "4.5vh",
    href: "www.preppy.golf",
    github: "https://github.com/arsantiagolopez/preppy",
    desktopVideo: "https://www.youtube.com/embed/Ce8l6RW3rn8",
    mobileVideo: "https://www.youtube.com/embed/0cvWwuMm_MM",
    description: "",
    frontend: [
      "React.js",
      "Next.js",
      "Dnd Kit",
      "React Hook Form",
      "React Select",
      "React Dropzone",
      "SWR",
      "Moment.js",
      "Axios",
      "Chakra UI",
    ],
    backend: [
      "MongoDB",
      "Mongoose",
      "Next.js API",
      "NextAuth.js",
      "AWS S3 Buckets",
      "CompressorJS",
      "Axios",
      "Session with Cookies",
      "REST API",
    ],
    devops: ["Vercel full stack deployment", "AWS S3 image hosting", "Babel"],
  },
  // Auth
  {
    id: 8,
    name: "auth",
    label: "Auth",
    height: "3vh",
    href: "www.auth.golf",
    github: "https://github.com/arsantiagolopez/auth",
    desktopVideo: "https://www.youtube.com/embed/6_-P5502tsA",
    mobileVideo: "https://www.youtube.com/embed/2EjoyqJBdoU",
    description: "",
    frontend: [
      "React.js",
      "Next.js",
      "URQL",
      "GraphQL",
      "React Hook Form",
      "Moment.js",
      "Chakra UI",
    ],
    backend: [
      "Node.js",
      "Express",
      "GraphQL",
      "PostgreSQL",
      "Redis",
      "Sequelize",
      "Apollo Server Express",
      "Passport.js",
      "Sendgrid Mail",
      "Session with Cookies",
      "GraphQL API",
    ],
    devops: [
      "VPS",
      "Docker",
      "Vultr backend hosting",
      "Vercel frontend deployment",
      "Babel",
    ],
  },
  // Slide
  {
    id: 9,
    name: "slide",
    label: "Slide",
    height: "4vh",
    href: "www.slide.golf",
    github: "https://github.com/arsantiagolopez/slide",
    desktopVideo: "https://www.youtube.com/embed/6OGhnJwZwUs",
    mobileVideo: "https://www.youtube.com/embed/z8yW3kxNv2M",
    description:
      "Fast, simple, secure messaging between users. Start a conversation with any user in the platform. Add them as friends, and get notified on incoming messages.",
    frontend: [
      "React.js",
      "Next.js",
      "URQL",
      "GraphQL",
      "Websockets",
      "Reack Hook Form",
      "React Dropzone",
      "Dnd Kit",
      "Moment.js",
      "Chakra UI",
    ],
    backend: [
      "Node.js",
      "Express",
      "GraphQL",
      "PostgreSQL",
      "Redis",
      "Sequelize",
      "Apollo Server Express",
      "GOT",
      "Session with Cookies",
      "GraphQL API",
    ],
    devops: ["Vercel frontend deployment", "Heroku backend hosting", "Babel"],
  },
];

// Tech stack
const tech: Tech[] = [
  {
    name: "solidity",
    label: "Solidity",
    width: 50,
  },
  {
    name: "hardhat",
    label: "Hardhat",
    width: 250,
  },
  {
    name: "metamask",
    label: "MetaMask",
    width: 300,
  },
  {
    name: "ethers",
    label: "Ethers.js",
    width: 90,
  },
  {
    name: "open",
    label: "Open Zeppelin",
    width: 60,
  },
  {
    name: "ipfs",
    label: "IPFS",
    width: 150,
  },
  {
    name: "polygon",
    label: "Polygon",
    width: 80,
  },
  {
    name: "mocha",
    label: "Mocha",
    width: 75,
  },
  {
    name: "chai",
    label: "Chai",
    width: 75,
  },
  {
    name: "typescript",
    label: "TypeScript",
    width: 200,
  },
  {
    name: "tailwind",
    label: "Tailwind CSS",
    width: 90,
  },
  {
    name: "nest",
    label: "NestJS",
    width: 80,
  },
  {
    name: "nodejs",
    label: "Node.js",
    width: 120,
  },
  {
    name: "react",
    label: "React.js",
    width: 75,
  },
  {
    name: "nextjs",
    label: "Next.js",
    width: 120,
  },
  {
    name: "gatsby",
    label: "Gatsby.js",
    width: 75,
  },
  {
    name: "maps",
    label: "Google Places API",
    width: 60,
  },
  {
    name: "puppeteer",
    label: "Puppeteer",
    width: 60,
  },
  {
    name: "momentjs",
    label: "Moment.js",
    width: 75,
  },
  {
    name: "mongodb",
    label: "MongoDB",
    width: 220,
  },
  {
    name: "vercel",
    label: "Vercel",
    width: 150,
  },
  {
    name: "babel",
    label: "Babel",
    width: 100,
  },
  {
    name: "aws",
    label: "AWS",
    width: 75,
  },
  {
    name: "express",
    label: "Express.js",
    width: 150,
  },
  {
    name: "graphql",
    label: "GraphQL",
    width: 75,
  },
  {
    name: "postgresql",
    label: "PostgreSQL",
    width: 75,
  },
  {
    name: "redis",
    label: "Redis",
    width: 90,
  },
  {
    name: "heroku",
    label: "Heroku",
    width: 190,
  },
  {
    name: "sequelize",
    label: "Sequelize",
    width: 75,
  },
  {
    name: "passport",
    label: "Passport.js",
    width: 60,
  },
  {
    name: "sendgrid",
    label: "Sendgrid Mail",
    width: 220,
  },
  {
    name: "vultr",
    label: "Vultr",
    width: 120,
  },
  {
    name: "got",
    label: "GOT",
    width: 100,
  },
  {
    name: "apollo",
    label: "Apollo Server Express",
    width: 75,
  },
  {
    name: "dnd",
    label: "Dnd Kit",
    width: 150,
  },
  {
    name: "docker",
    label: "Docker",
    width: 100,
  },
  {
    name: "netlifycms",
    label: "Netlify CMS",
    width: 250,
  },
  {
    name: "lodash",
    label: "Lodash",
    width: 75,
  },
  {
    name: "semantic",
    label: "Semantic UI",
    width: 75,
  },
  {
    name: "netlify",
    label: "Netlify",
    width: 75,
  },
  {
    name: "axios",
    label: "Axios",
    width: 150,
  },
  {
    name: "chakra",
    label: "Chakra UI",
    width: 190,
  },
  {
    name: "dropzone",
    label: "React Dropzone",
    width: 75,
  },
  {
    name: "mongoose",
    label: "Mongoose",
    width: 150,
  },
  {
    name: "nextauth",
    label: "Next Auth",
    width: 75,
  },
  {
    name: "nivo",
    label: "Nivo Graphs",
    width: 150,
  },
  {
    name: "rhf",
    label: "React Hook Form",
    width: 150,
  },
  {
    name: "swr",
    label: "SWR",
    width: 220,
  },
  {
    name: "urql",
    label: "URQL",
    width: 90,
  },
];

export { projects, detailedProjects, tech };
