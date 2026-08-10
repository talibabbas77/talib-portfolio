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

/** Home hash links + multi-page routes */
export const navItems = [
  { name: "Home", href: "/", type: "route" as const },
  { name: "Portfolio", href: "/portfolio", type: "route" as const },
  { name: "Case Studies", href: "/case-studies", type: "route" as const },
  { name: "Blog", href: "/blog", type: "route" as const },
  { name: "About", href: "/about", type: "route" as const },
  { name: "Contact", href: "/contact", type: "route" as const },
] as const;

export const footerNavItems = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
] as const;

export const heroCopy = {
  headline: "I build production web apps that teams can keep running.",
  support:
    "Next.js frontends, Node APIs, Shopify themes, and AI features wired into products people already use.",
  detail:
    "I take a feature from schema and API through UI and deploy, then stay for the bugs that only show up in production.",
  primaryCta: "View case studies",
  secondaryCta: "Get in touch",
} as const;

export const aboutCopy = {
  title: "About",
  lead: "I do full-stack client work. The goal is steady delivery, not noise.",
  paragraphs: [
    "At DevExcel IT Solutions I work with Next.js, TypeScript, and Node.js from data models through UI that deploys on Vercel.",
    "That also covers Shopify Liquid themes, WordPress upkeep, GoHighLevel OAuth workflows that reduce manual CRM steps, and OpenAI or Gemini features with token use kept in check.",
    "Earlier at TecShield I turned Figma into React interfaces and wrote Express routes, MongoDB schemas, and payment integrations with team review.",
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

export type ExperienceRole = {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
};

export const experience: ExperienceRole[] = [
  {
    company: "DevExcel IT Solutions",
    role: "Full-Stack Developer",
    period: "Mar 2024 - Present",
    location: "Lahore, Pakistan",
    bullets: [
      "Built and shipped production features with Next.js, TypeScript, and Node.js across client projects, owning work from database design through deployed UI.",
      "Developed and customized Shopify storefronts with Liquid: custom sections, theme templates, and dynamic product logic.",
      "Maintained WordPress sites with custom plugins, page builders, and REST API connections.",
      "Integrated GoHighLevel CRM via OAuth 2.0 for contact management, pipeline updates, and tagging - cutting manual client effort by over 60%.",
      "Built a referral-based licensing and consultant-access system inside GHL that reduced onboarding overhead for multiple clients.",
      "Integrated OpenAI and Gemini APIs into live products, including RAG pipelines with token usage kept under control.",
      "Designed REST APIs with JWT auth, role-based access, and structured error handling.",
      "Built reusable Tailwind and Shadcn/UI components that sped up recurring UI work.",
      "Managed Vercel deployments with clean staging and production environment configs.",
    ],
  },
  {
    company: "TecShield Technologies",
    role: "Junior Web Developer",
    period: "Aug 2023 - Feb 2024",
    location: "Lahore, Pakistan",
    bullets: [
      "Built responsive React interfaces from Figma into production-ready layouts.",
      "Wrote Node.js and Express routes for auth, form validation, and third-party APIs.",
      "Designed and queried MongoDB collections for internal tools, with schema patterns reused across projects.",
      "Integrated payment and notification APIs under senior guidance for client-facing releases.",
      "Worked in a team Git workflow with daily branching, PRs, and structured code reviews.",
    ],
  },
];

export const education = {
  degree: "Bachelor of Science in Computer Science",
  school: "National College of Business Administration & Economics (NCBA&E)",
  period: "Nov 2020 - Oct 2024",
  location: "Lahore, Pakistan",
} as const;

export type Certification = {
  title: string;
  issuer: string;
  year: string;
};

export const certifications: Certification[] = [
  {
    title: "Claude Code Cohort Certificate",
    issuer: "DevExcel IT Solutions",
    year: "May 2026",
  },
  {
    title: "Problem Solving",
    issuer: "HackerRank",
    year: "2023",
  },
];

export const services = [
  {
    title: "Next.js & MERN apps",
    description:
      "Full-stack product features from schema and API through UI and Vercel deploy.",
  },
  {
    title: "Shopify themes",
    description:
      "Custom Liquid storefronts: sections, templates, filters, and mobile-first performance.",
  },
  {
    title: "CRM automation",
    description:
      "GoHighLevel OAuth workflows for contacts, pipelines, tagging, and licensing flows.",
  },
  {
    title: "AI integrations",
    description:
      "OpenAI and Gemini features with RAG where it helps, and token costs kept in check.",
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
  caseStudySlug?: string;
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
    caseStudySlug: "piplog",
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
    caseStudySlug: "ai-resume-builder",
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
    caseStudySlug: "zaivor",
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
    caseStudySlug: "namastheusa",
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
  headline: "Start with a short brief",
  lead: "Share the product, the stack, and the timeline. I usually reply within a day.",
  formTitle: "Send a message",
  successTitle: "Message received",
  successBody: "Thanks. I will reply to your email soon.",
} as const;

export const ctaLabels = {
  viewWork: "View case studies",
  hireMe: "Get in touch",
  bookCall: "Book a call",
  readCaseStudy: "Read case study",
  viewAllWork: "All case studies",
  viewAllPosts: "All posts",
  viewPortfolio: "View portfolio",
} as const;

export type { CaseStudy } from "@/lib/content/case-studies";
export type { BlogPost } from "@/lib/content/blog-posts";
export {
  caseStudies,
  getCaseStudy,
  getCaseStudySlugs,
} from "@/lib/content/case-studies";
export {
  blogPosts,
  getBlogPost,
  getBlogPostSlugs,
} from "@/lib/content/blog-posts";
