export type CaseStudy = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  year: string;
  role: string;
  clientType: string;
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl: string;
  imageAlt: string;
  featured?: boolean;
  problem: string;
  approach: string[];
  outcomes: string[];
  body: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "piplog",
    title: "PipLog: trading journal with AI coaching and MT5 sync",
    kicker: "SaaS",
    summary:
      "A full-stack journal for forex and crypto traders: trade logs, equity analytics, Stripe billing, AI coaching on real history, and MetaTrader 5 auto-sync.",
    year: "2025",
    role: "Full-stack developer",
    clientType: "Product / SaaS",
    stack: ["React", "Express.js", "React Native", "Supabase", "Stripe"],
    liveUrl: "https://tradeflow-trading-journal.vercel.app",
    imageUrl: "/projects/piplog.svg",
    imageAlt: "PipLog trading journal product preview",
    featured: true,
    problem:
      "Traders needed one place to log trades, see equity over time, and get coaching grounded in their own history - not generic tips. Manual CSV imports and disconnected billing slowed adoption.",
    approach: [
      "Built trade logging, equity curve analytics, and a ledger for deposits and withdrawals on Supabase-backed APIs.",
      "Added an AI coaching layer that reads real trade history instead of generic prompts.",
      "Shipped Stripe subscriptions with webhook handling for plan state.",
      "Integrated MetaTrader 5 auto-sync via Expert Advisor so trades push from MT5 without manual entry.",
      "Extended the product surface with React Native for on-the-go review.",
    ],
    outcomes: [
      "Live product traders can run day to day with billing and sync in place.",
      "Coaching tied to actual trades instead of disconnected advice.",
      "Clear path from desktop journal to mobile review.",
    ],
    body: [
      "PipLog started as a practical journal: log the trade, see the equity curve, track deposits and withdrawals. The hard part was keeping that data honest when traders live inside MetaTrader.",
      "The AI layer only works if it sees real history. Feedback is grounded in the trades already stored - not a blank chat box. Stripe handles plans and webhooks keep access in sync with payment state.",
      "MT5 auto-sync via Expert Advisor removes the CSV grind. Trades land in the journal so the analytics and coaching stay current.",
    ],
  },
  {
    slug: "ai-resume-builder",
    title: "AI Resume Builder: ATS content with OpenAI and Stripe gates",
    kicker: "AI Product",
    summary:
      "Users paste experience; the app drafts keyword-rich resume content with OpenAI, scores ATS fit, and unlocks premium templates through Stripe.",
    year: "2024",
    role: "Full-stack developer",
    clientType: "Product",
    stack: ["Next.js", "OpenAI API", "Tailwind CSS", "Stripe"],
    liveUrl: "https://ai-resume-builder-seven-theta.vercel.app",
    imageUrl: "/projects/ai-resume-builder.svg",
    imageAlt: "AI Resume Builder app preview",
    problem:
      "Job seekers needed faster first drafts that still read as their experience, with ATS-aware wording and a clear free-to-paid path for templates.",
    approach: [
      "Next.js app that takes structured experience input and generates resume sections through OpenAI.",
      "Multiple downloadable templates and real-time ATS scoring on the draft.",
      "Stripe-gated premium features so free users can try the core flow before paying.",
    ],
    outcomes: [
      "Live builder with scoring and paid unlocks.",
      "Drafts that stay editable instead of locked black-box output.",
    ],
    body: [
      "The product job is simple: turn messy experience notes into clean, keyword-aware resume copy without pretending AI replaces the candidate.",
      "ATS scoring gives a concrete signal to iterate on. Stripe gates premium templates so the free path still proves value.",
    ],
  },
  {
    slug: "zaivor",
    title: "Zaivor: custom Shopify theme for luxury jewelry and watches",
    kicker: "E-commerce",
    summary:
      "A Liquid theme built from scratch for a luxury brand - collections, filters, wishlist, and multi-category navigation with a premium mobile feel.",
    year: "2024",
    role: "Shopify developer",
    clientType: "E-commerce brand",
    stack: ["Shopify Liquid", "JavaScript", "Custom Theme"],
    liveUrl: "https://zaivor.com",
    imageUrl: "/projects/zaivor.svg",
    imageAlt: "Zaivor Shopify storefront preview",
    problem:
      "A jewelry and watch brand needed a storefront that matched the product quality - not a stock theme with heavy apps bolted on.",
    approach: [
      "Custom Liquid theme from scratch: sections, templates, and dynamic product logic.",
      "Collection filtering, wishlist, and branded multi-category navigation.",
      "Performance and mobile responsiveness treated as part of the luxury experience.",
    ],
    outcomes: [
      "Live storefront at zaivor.com.",
      "Theme owned by the brand instead of locked to a marketplace preset.",
    ],
    body: [
      "Luxury retail online fails when the theme feels generic. Zaivor needed custom sections and navigation that match how people browse jewelry and watches.",
      "Liquid stayed the source of truth for storefront logic. Filters and wishlist sit in the theme so the brand keeps control without a pile of conflicting apps.",
    ],
  },
  {
    slug: "namastheusa",
    title: "NamastheUSA: classified marketplace across US cities",
    kicker: "Marketplace",
    summary:
      "Full-stack classifieds for services, rentals, and local events - geolocation, Maps, email notifications, and SEO handled end to end.",
    year: "2024",
    role: "Full-stack developer",
    clientType: "Marketplace",
    stack: ["Next.js", "TypeScript", "Node.js", "MongoDB"],
    liveUrl: "https://namastheusa.com",
    imageUrl: "/projects/namastheusa.svg",
    imageAlt: "NamastheUSA marketplace preview",
    problem:
      "Users needed to post and discover local listings across US cities with location-aware browse and reliable notifications.",
    approach: [
      "Next.js and TypeScript front end with Node APIs and MongoDB persistence.",
      "IPAPI for geolocation and Google Maps for location-based discovery.",
      "Email API for notifications.",
      "SEO with dynamic sitemaps, Open Graph tags, and Core Web Vitals attention.",
    ],
    outcomes: [
      "Live marketplace at namastheusa.com.",
      "Location and SEO treated as product features, not afterthoughts.",
    ],
    body: [
      "Classifieds only work when discovery matches where the user is. Geolocation and Maps sit in the browse path, not as a decorative widget.",
      "SEO work - sitemaps, OG tags, performance - was part of shipping, so listings can be found outside paid traffic.",
    ],
  },
  {
    slug: "bank-ledger",
    title: "Bank Ledger: transaction and account API backend",
    kicker: "Backend",
    summary:
      "Node and Express system for account creation, credit and debit flows, balance tracking, and transaction history on MongoDB.",
    year: "2023",
    role: "Backend developer",
    clientType: "Systems / learning product",
    stack: ["Node.js", "Express.js", "MongoDB"],
    githubUrl: "https://github.com/talibabbas77/bank-ledger-backend",
    imageUrl: "/projects/piplog.svg",
    imageAlt: "Bank ledger API project",
    problem:
      "Needed a clear backend model for banking-style ledgers: accounts, credits, debits, balances, and history with structured endpoints.",
    approach: [
      "Express routes for account creation and transaction handling.",
      "MongoDB persistence for balances and history.",
      "Structured API endpoints that keep credit and debit rules explicit.",
    ],
    outcomes: [
      "Open-source backend reference on GitHub.",
      "Reusable patterns for ledger-style APIs in later client work.",
    ],
    body: [
      "Ledger systems punish vague schemas. This project keeps account state and transaction history explicit so balances stay auditable.",
      "It is backend-first: clear endpoints, MongoDB persistence, and rules for credit and debit that do not hide inside UI code.",
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export function getCaseStudySlugs() {
  return caseStudies.map((c) => c.slug);
}
