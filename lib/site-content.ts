export const siteConfig = {
  name: "Talib Abbas",
  role: "Full-Stack Developer",
  tagline: "Next.js, MERN, and AI integrations for client products that ship.",
  summary:
    "Full-stack developer with 2+ years building production web apps across client services, e-commerce, and SaaS. I own features from database design through deployed UI, including Shopify themes, GoHighLevel CRM automation, and OpenAI or Gemini integrations.",
  location: "Lahore, Pakistan",
  email: "talibali303@gmail.com",
  phone: "+92 318 4189654",
  phoneDisplay: "0318 4189654",
  siteUrl: "https://talibabbas.vercel.app",
  availability: "Open for freelance and full-time roles",
} as const;

export const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/talibabbas77",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/talib-abbas/",
  },
  {
    name: "Upwork",
    href: "https://www.upwork.com/freelancers/~014ceb5dbaef0d4fa3",
  },
] as const;

export const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Work", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
] as const;

export const heroCopy = {
  headline: "I build production web apps clients can run on.",
  support:
    "From Next.js frontends to Node APIs, Shopify themes, and AI features wired into live products.",
  detail:
    "I take features from schema and API through UI and deploy, then stick around for the bugs that show up in production.",
  primaryCta: "View work",
  secondaryCta: "Hire me",
} as const;

export const aboutCopy = {
  title: "About",
  lead: "I ship full-stack features for real client work, not demos.",
  paragraphs: [
    "At DevExcel IT Solutions I build with Next.js, TypeScript, and Node.js end to end: data models, APIs, and UI that ships to Vercel.",
    "Day to day that also means Shopify Liquid themes, WordPress maintenance, GoHighLevel OAuth workflows that cut manual CRM work, and OpenAI or Gemini RAG features with token costs kept under control.",
    "Before that at TecShield I turned Figma into React interfaces and wrote Express routes, MongoDB schemas, and payment integrations under team review.",
  ],
  highlights: [
    {
      label: "Experience",
      value: "2+ years",
      detail: "Client services, e-commerce, and SaaS",
    },
    {
      label: "Focus",
      value: "Next.js & MERN",
      detail: "Plus Shopify, CRM, and AI APIs",
    },
    {
      label: "Recent",
      value: "PipLog",
      detail: "Trading journal with AI coaching and Stripe",
    },
  ],
  techStrip: [
    "Next.js",
    "TypeScript",
    "React",
    "Node.js",
    "MongoDB",
    "PostgreSQL",
    "Redis",
    "Docker",
    "AWS",
    "Azure",
    "Supabase",
    "Shopify",
    "OpenAI",
    "Stripe",
    "Vercel",
  ],
} as const;

export const experience = [
  {
    company: "DevExcel IT Solutions",
    role: "Full-Stack Developer",
    period: "Mar 2024 - Present",
    location: "Lahore, Pakistan",
  },
  {
    company: "TecShield Technologies",
    role: "Junior Web Developer",
    period: "Aug 2023 - Feb 2024",
    location: "Lahore, Pakistan",
  },
] as const;

export type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  status: "Live" | "Completed";
  liveUrl?: string;
  githubUrl?: string;
  imageUrl: string;
  imageAlt: string;
};

export const projects: Project[] = [
  {
    id: "piplog",
    title: "PipLog",
    description:
      "Trading journal for forex and crypto with equity analytics, AI coaching on real trade history, Stripe billing, and MetaTrader 5 auto-sync.",
    technologies: ["React", "Express.js", "React Native", "Supabase", "Stripe"],
    category: "SaaS",
    status: "Live",
    liveUrl: "https://tradeflow-trading-journal.vercel.app",
    imageUrl: "/projects/piplog.svg",
    imageAlt: "PipLog trading journal product preview",
  },
  {
    id: "ai-resume-builder",
    title: "AI Resume Builder",
    description:
      "ATS-focused resume builder that turns experience into keyword-rich content with OpenAI, downloadable templates, scoring, and Stripe-gated premium features.",
    technologies: ["Next.js", "OpenAI API", "Tailwind CSS", "Stripe"],
    category: "AI Product",
    status: "Live",
    liveUrl: "https://ai-resume-builder-seven-theta.vercel.app",
    imageUrl: "/projects/ai-resume-builder.svg",
    imageAlt: "AI Resume Builder app preview",
  },
  {
    id: "zaivor",
    title: "Zaivor",
    description:
      "Custom Shopify storefront for a luxury jewelry and watch brand: Liquid theme from scratch, collection filters, wishlist, and multi-category navigation.",
    technologies: ["Shopify Liquid", "JavaScript", "Custom Theme"],
    category: "E-commerce",
    status: "Live",
    liveUrl: "https://zaivor.com",
    imageUrl: "/projects/zaivor.svg",
    imageAlt: "Zaivor Shopify storefront preview",
  },
  {
    id: "namastheusa",
    title: "NamastheUSA",
    description:
      "Classified marketplace for services, rentals, and local events across US cities, with geolocation, Maps, email notifications, and SEO built in.",
    technologies: ["Next.js", "TypeScript", "Node.js", "MongoDB"],
    category: "Marketplace",
    status: "Live",
    liveUrl: "https://namastheusa.com",
    imageUrl: "/projects/namastheusa.svg",
    imageAlt: "NamastheUSA marketplace preview",
  },
];

export const skillCategories = [
  {
    title: "Languages",
    skills: ["JavaScript", "TypeScript"],
  },
  {
    title: "Frontend",
    skills: ["React.js", "Next.js", "Tailwind CSS", "Shadcn/UI", "Radix UI"],
  },
  {
    title: "Backend",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "JWT",
      "OAuth 2.0",
      "Stripe",
    ],
  },
  {
    title: "Databases",
    skills: ["MongoDB", "PostgreSQL", "Supabase", "Redis"],
  },
  {
    title: "Cloud & DevOps",
    skills: ["AWS", "Azure", "Docker", "Vercel", "CI/CD", "Git"],
  },
  {
    title: "CMS & CRM",
    skills: ["Shopify Liquid", "WordPress", "GoHighLevel"],
  },
  {
    title: "AI & Tooling",
    skills: ["OpenAI API", "Gemini API", "RAG Pipelines"],
  },
] as const;

export const contactCopy = {
  title: "Contact",
  lead: "Tell me about the product, the stack, and the timeline. I reply within a day.",
  formTitle: "Send a message",
  successTitle: "Message sent",
  successBody: "Thanks. I will reply to your email soon.",
} as const;

export const ctaLabels = {
  viewWork: "View work",
  hireMe: "Hire me",
  bookCall: "Book a call",
} as const;
