import { seedImages } from "@/lib/seed/images";

export type SeedCaseStudy = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  content_html: string;
  year: string;
  role: string;
  client_type: string;
  stack: string[];
  live_url: string | null;
  github_url: string | null;
  image_url: string;
  image_alt: string;
  featured: boolean;
  problem: string;
  approach: string[];
  outcomes: string[];
  status: "published";
};

export const seedCaseStudies: SeedCaseStudy[] = [
  {
    slug: "piplog",
    title: "PipLog: trading journal with AI coaching and MT5 sync",
    kicker: "SaaS",
    summary:
      "A full-stack journal for forex and crypto traders: trade logs, equity analytics, Stripe billing, AI coaching on real history, and MetaTrader 5 auto-sync.",
    year: "2025",
    role: "Full-stack developer",
    client_type: "Product / SaaS",
    stack: ["React", "Express.js", "React Native", "Supabase", "Stripe"],
    live_url: "https://tradeflow-trading-journal.vercel.app",
    github_url: null,
    image_url: seedImages.tradingChart,
    image_alt: "PipLog trading journal dashboard with equity curve",
    featured: true,
    problem:
      "Traders needed one place to log trades, see equity over time, and get coaching grounded in their own history - not generic tips. Manual CSV imports and disconnected billing slowed adoption.",
    approach: [
      "Built trade logging, equity curve analytics, and a ledger for deposits and withdrawals on Supabase-backed APIs.",
      "Added an AI coaching layer that reads real trade history instead of generic prompts.",
      "Shipped Stripe subscriptions with idempotent webhook handling for plan state.",
      "Integrated MetaTrader 5 auto-sync via Expert Advisor so trades push from MT5 without manual entry.",
      "Extended the product surface with React Native for on-the-go review.",
    ],
    outcomes: [
      "Live product traders can run day to day with billing and sync in place.",
      "Coaching tied to actual trades instead of disconnected advice.",
      "Clear path from desktop journal to mobile review.",
    ],
    status: "published",
    content_html: `
<p>PipLog started as a practical journal: log the trade, see the equity curve, track deposits and withdrawals. The hard part was keeping that data honest when traders live inside MetaTrader.</p>
<h2>Data before intelligence</h2>
<p>We shipped logging, ledgers, and charts first. AI coaching came after sync was reliable. The model reads closed positions and session stats - not a blank chat prompt.</p>
<img src="${seedImages.tradingChart}" alt="Trading chart and analytics interface" />
<h2>Billing that survives retries</h2>
<p>Stripe webhooks update plan access in Supabase. Handlers are idempotent so duplicate events do not double-grant premium features. Support should not be the billing system of record.</p>
<h2>MT5 Expert Advisor sync</h2>
<p>Trades push from MetaTrader 5 through an EA into the journal API. Traders stopped exporting CSVs after every session. When sync fails, the UI shows it clearly so the equity curve never lies by omission.</p>
`.trim(),
  },
  {
    slug: "ai-resume-builder",
    title: "AI Resume Builder: ATS content with OpenAI and Stripe gates",
    kicker: "AI Product",
    summary:
      "Users paste experience; the app drafts keyword-rich resume content with OpenAI, scores ATS fit, and unlocks premium templates through Stripe.",
    year: "2024",
    role: "Full-stack developer",
    client_type: "Product",
    stack: ["Next.js", "OpenAI API", "Tailwind CSS", "Stripe"],
    live_url: "https://ai-resume-builder-seven-theta.vercel.app",
    github_url: null,
    image_url: seedImages.resume,
    image_alt: "Resume document and laptop on a desk",
    featured: true,
    problem:
      "Job seekers needed faster first drafts that still read as their experience, with ATS-aware wording and a clear free-to-paid path for templates.",
    approach: [
      "Next.js app that takes structured experience input and generates resume sections through OpenAI.",
      "Multiple downloadable templates and real-time ATS scoring on the draft.",
      "Stripe-gated premium features so free users can try the core flow before paying.",
      "Token limits per generation so API costs stay predictable at scale.",
    ],
    outcomes: [
      "Live builder with scoring and paid unlocks.",
      "Drafts that stay editable instead of locked black-box output.",
      "Clear upgrade path without blocking the first useful result.",
    ],
    status: "published",
    content_html: `
<p>The product job is simple: turn messy experience notes into clean, keyword-aware resume copy without pretending AI replaces the candidate.</p>
<h2>Structured input, editable output</h2>
<p>Users enter roles, bullets, and skills in a form. The model expands and tightens wording. Everything lands in editable fields so the human stays in control.</p>
<img src="${seedImages.resume}" alt="Professional resume layout on a desk" />
<h2>ATS scoring as feedback</h2>
<p>Scoring gives a concrete signal to iterate on - missing keywords, dense blocks, weak action verbs. It is a checklist, not a guarantee of an interview.</p>
<h2>Stripe gates on templates</h2>
<p>Free tier proves value with one solid template. Premium layouts unlock after checkout. Webhooks keep access in sync; the app reads plan state from the database, not Stripe on every request.</p>
`.trim(),
  },
  {
    slug: "zaivor",
    title: "Zaivor: custom Shopify theme for luxury jewelry and watches",
    kicker: "E-commerce",
    summary:
      "A Liquid theme built from scratch for a luxury brand - collections, filters, wishlist, and multi-category navigation with a premium mobile feel.",
    year: "2024",
    role: "Shopify developer",
    client_type: "E-commerce brand",
    stack: ["Shopify Liquid", "JavaScript", "Custom Theme"],
    live_url: "https://zaivor.com",
    github_url: null,
    image_url: seedImages.luxuryRetail,
    image_alt: "Luxury jewelry retail display",
    featured: true,
    problem:
      "A jewelry and watch brand needed a storefront that matched the product quality - not a stock theme with heavy apps bolted on.",
    approach: [
      "Custom Liquid theme from scratch: sections, templates, and dynamic product logic.",
      "Collection filtering, wishlist, and branded multi-category navigation.",
      "Performance and mobile responsiveness treated as part of the luxury experience.",
      "Minimal third-party apps so checkout and browse stayed fast.",
    ],
    outcomes: [
      "Live storefront at zaivor.com.",
      "Theme owned by the brand instead of locked to a marketplace preset.",
      "Browse and checkout tuned for mobile shoppers.",
    ],
    status: "published",
    content_html: `
<p>Luxury retail online fails when the theme feels generic. Zaivor needed custom sections and navigation that match how people browse jewelry and watches - by collection, material, and occasion - not by whatever the default theme guessed.</p>
<img src="${seedImages.luxuryRetail}" alt="Zaivor luxury jewelry storefront aesthetic" />
<h2>Liquid as source of truth</h2>
<p>Filters and wishlist sit in the theme JavaScript and Liquid templates. The client controls layout without paying five apps to fight over the cart drawer.</p>
<h2>Mobile-first luxury</h2>
<p>Large product photography, restrained typography, and fast first paint on mid-range phones. We tested on real devices, not just Chrome responsive mode.</p>
`.trim(),
  },
  {
    slug: "namastheusa",
    title: "NamastheUSA: classified marketplace across US cities",
    kicker: "Marketplace",
    summary:
      "Full-stack classifieds for services, rentals, and local events - geolocation, Maps, email notifications, and SEO handled end to end.",
    year: "2024",
    role: "Full-stack developer",
    client_type: "Marketplace",
    stack: ["Next.js", "TypeScript", "Node.js", "MongoDB"],
    live_url: "https://namastheusa.com",
    github_url: null,
    image_url: seedImages.marketplace,
    image_alt: "Local marketplace shopping street",
    featured: false,
    problem:
      "Users needed to post and discover local listings across US cities with location-aware browse and reliable notifications.",
    approach: [
      "Next.js and TypeScript front end with Node APIs and MongoDB persistence.",
      "IPAPI for geolocation and Google Maps for location-based discovery.",
      "Email API for notifications on new messages and listing activity.",
      "SEO with dynamic sitemaps, Open Graph tags, and Core Web Vitals attention.",
    ],
    outcomes: [
      "Live marketplace at namastheusa.com.",
      "Location and SEO treated as product features, not afterthoughts.",
      "Listing discovery works from search and direct city browse.",
    ],
    status: "published",
    content_html: `
<p>Classifieds only work when discovery matches where the user is. Geolocation and Maps sit in the browse path, not as a decorative widget on the about page.</p>
<img src="${seedImages.marketplace}" alt="Busy local marketplace street" />
<h2>City-first information architecture</h2>
<p>Listings attach to metros and categories. Search and filters respect location so a user in Houston is not drowning in New York rentals.</p>
<h2>SEO as part of shipping</h2>
<p>Dynamic sitemaps, OG tags per listing, and performance work shipped with the feature set so organic traffic could grow without a later "SEO sprint."</p>
`.trim(),
  },
  {
    slug: "bank-ledger",
    title: "Bank Ledger: transaction and account API backend",
    kicker: "Backend",
    summary:
      "Node and Express system for account creation, credit and debit flows, balance tracking, and transaction history on MongoDB.",
    year: "2023",
    role: "Backend developer",
    client_type: "Systems / learning product",
    stack: ["Node.js", "Express.js", "MongoDB"],
    live_url: null,
    github_url: "https://github.com/talibabbas77/bank-ledger-backend",
    image_url: seedImages.apiServer,
    image_alt: "Server room infrastructure for API backend",
    featured: false,
    problem:
      "Needed a clear backend model for banking-style ledgers: accounts, credits, debits, balances, and history with structured endpoints.",
    approach: [
      "Express routes for account creation and transaction handling.",
      "MongoDB persistence for balances and history with explicit schemas.",
      "Structured API endpoints that keep credit and debit rules explicit.",
      "Validation and error responses suitable for client apps or tests.",
    ],
    outcomes: [
      "Open-source backend reference on GitHub.",
      "Reusable patterns for ledger-style APIs in later client work.",
      "Clear separation of account state and transaction log.",
    ],
    status: "published",
    content_html: `
<p>Ledger systems punish vague schemas. This project keeps account state and transaction history explicit so balances stay auditable.</p>
<img src="${seedImages.apiServer}" alt="Backend API server infrastructure" />
<h2>Explicit credit and debit rules</h2>
<p>Every transaction type maps to a handler that updates balance and appends history in one logical unit. UI code never sneaks in balance math.</p>
<h2>Open source as reference</h2>
<p>The repo on GitHub documents patterns I reused when client projects needed wallet, invoice, or deposit flows without building a bank, but needing bank-like discipline.</p>
`.trim(),
  },
  {
    slug: "ghl-crm-automation-suite",
    title: "GoHighLevel automation suite for agency client onboarding",
    kicker: "CRM",
    summary:
      "OAuth integrations, pipeline automation, and referral licensing inside GoHighLevel that cut manual CRM work by over 60% for DevExcel agency clients.",
    year: "2025",
    role: "Full-stack developer",
    client_type: "Agency / CRM",
    stack: ["GoHighLevel", "OAuth 2.0", "Node.js", "REST APIs"],
    live_url: null,
    github_url: null,
    image_url: seedImages.crmDashboard,
    image_alt: "CRM pipeline dashboard with contact stages",
    featured: true,
    problem:
      "Agency clients lived in GoHighLevel but still copied data by hand from web forms, spreadsheets, and product events. Onboarding consultants required repetitive sub-account setup.",
    approach: [
      "OAuth 2.0 connection so each client grants scoped access without shared passwords.",
      "Webhook and API flows to create contacts, apply tags, and move pipeline stages from product events.",
      "Referral-based licensing flow for consultant access with approval steps inside GHL.",
      "Error logging and retry notes so ops can fix failed syncs without developer access.",
    ],
    outcomes: [
      "Manual CRM effort dropped by over 60% on automated workflows.",
      "Consultant onboarding reduced from multi-email setup to a single approval path.",
      "Repeatable pattern for new GHL clients at DevExcel.",
    ],
    status: "published",
    content_html: `
<p>This work ran across multiple client accounts at DevExcel, not as a single public URL. The product was time back for ops teams who were tired of updating GoHighLevel by hand.</p>
<img src="${seedImages.crmDashboard}" alt="GoHighLevel style CRM analytics view" />
<h2>One event, one write</h2>
<p>Form submit creates a contact. Purchase moves a deal. Support ticket adds a tag. Keeping the mapping boring made debugging possible when GHL rate-limited or a token expired.</p>
<h2>Licensing flow for consultants</h2>
<p>Referral codes tied to sub-account templates. Approved consultants landed in the right pipeline with tags already applied. That alone cut onboarding emails from a thread into a checklist.</p>
`.trim(),
  },
  {
    slug: "portfolio-admin-cms",
    title: "Portfolio CMS: Supabase admin for blog, case studies, and inbox",
    kicker: "CMS",
    summary:
      "This portfolio's admin panel - TipTap editor, media uploads, contact inbox, newsletter list, and public pages that read published content from Postgres.",
    year: "2026",
    role: "Full-stack developer",
    client_type: "Personal product",
    stack: ["Next.js", "Supabase", "TipTap", "PostgreSQL"],
    live_url: "https://talibabbas.vercel.app",
    github_url: "https://github.com/talibabbas77",
    image_url: seedImages.cmsAdmin,
    image_alt: "Developer building a CMS admin interface",
    featured: false,
    problem:
      "Updating blog posts and case studies required code changes and redeploys. Contact form messages lived only in email. There was no single place to publish content or review inbound work.",
    approach: [
      "Supabase Postgres tables for blog_posts, case_studies, contact_submissions, and newsletter_subscribers.",
      "Row Level Security: public read on published content, authenticated admin for writes.",
      "TipTap rich text with image upload to a Supabase media bucket or external URL.",
      "Admin routes protected by Supabase Auth middleware.",
      "Public pages with ISR revalidate reading CMS data with static fallback.",
    ],
    outcomes: [
      "Publish blog and case study updates without redeploying the site.",
      "Contact inbox with status workflow alongside SMTP notifications.",
      "Newsletter signups stored for export from admin.",
    ],
    status: "published",
    content_html: `
<p>I dogfood the same stack I sell: Next.js on Vercel, Supabase for data and auth, Sonner toasts in admin, and plain copy rules so posts do not read like AI filler.</p>
<img src="${seedImages.cmsAdmin}" alt="Portfolio CMS admin workspace" />
<h2>Editor experience</h2>
<p>TipTap handles headings, lists, links, and inline images. Cover images use file upload or paste URL with live preview. Draft and publish states keep half-finished work off the public site.</p>
<h2>Security model</h2>
<p>Service role only on server routes for contact insert. Admin APIs check session on every request. Media bucket allows public read but authenticated upload.</p>
`.trim(),
  },
  {
    slug: "wordpress-client-operations",
    title: "WordPress client sites: plugins, REST, and stable releases",
    kicker: "WordPress",
    summary:
      "Ongoing WordPress maintenance at DevExcel - custom plugins, page builder fixes, REST bridges to CRM, and staged releases for client sites that cannot afford downtime.",
    year: "2025",
    role: "Full-stack developer",
    client_type: "Client services",
    stack: ["WordPress", "PHP", "REST API", "JavaScript"],
    live_url: null,
    github_url: null,
    image_url: seedImages.wordpress,
    image_alt: "WordPress development on a laptop",
    featured: false,
    problem:
      "Clients relied on WordPress for marketing sites but hit limits with off-the-shelf plugins. They needed custom behavior, CRM hooks, and updates without breaking SEO or forms.",
    approach: [
      "Custom plugins for forms, member content, and external API calls.",
      "REST endpoints where a small React widget or automation needed structured data.",
      "Staging copies before plugin updates; documented load-bearing plugins.",
      "Integration hooks to GoHighLevel for lead routing on submit.",
    ],
    outcomes: [
      "Stable release cadence with rollback path.",
      "Leads flow into CRM without manual CSV exports.",
      "Clients keep WordPress editors; dev owns the fragile parts.",
    ],
    status: "published",
    content_html: `
<p>WordPress is still the right tool for many marketing sites in 2026. The work is not glamorous: plugin boundaries, security updates, and REST bridges so the site talks to the rest of the stack.</p>
<img src="${seedImages.wordpress}" alt="WordPress site customization workflow" />
<h2>Custom plugins over plugin soup</h2>
<p>When a requirement is specific, a small custom plugin beats three premium plugins that overlap. Less attack surface, clearer ownership.</p>
<h2>CRM on submit</h2>
<p>Form plugins often stop at email. We forward validated leads to GoHighLevel with tags and pipeline stages already set so sales sees context on first open.</p>
`.trim(),
  },
  {
    slug: "jwt-auth-api-platform",
    title: "JWT auth and role-based APIs for client dashboards",
    kicker: "Backend",
    summary:
      "REST APIs with JWT authentication, role-based access, and structured errors - patterns reused across DevExcel client dashboards and internal tools.",
    year: "2025",
    role: "Full-stack developer",
    client_type: "Client services",
    stack: ["Node.js", "Express.js", "JWT", "PostgreSQL", "TypeScript"],
    live_url: null,
    github_url: null,
    image_url: seedImages.jwtAuth,
    image_alt: "Secure authentication and API access concept",
    featured: false,
    problem:
      "Client dashboards needed login, role separation between admin and staff, and APIs that mobile or web front ends could share without duplicating business rules.",
    approach: [
      "JWT access tokens with refresh strategy and explicit expiry handling.",
      "Role-based middleware on Express routes aligned with product permissions.",
      "Consistent error shape so front ends can show field-level validation.",
      "PostgreSQL or MongoDB depending on client stack; auth layer stayed consistent.",
    ],
    outcomes: [
      "One auth model reused across multiple client projects.",
      "Front-end teams integrated against documented REST contracts.",
      "Fewer 'works on my machine' auth bugs in production.",
    ],
    status: "published",
    content_html: `
<p>Auth is boring until it breaks in production. These APIs follow the same shape: register/login, refresh, protected routes, role checks, and errors that return useful codes instead of generic 500s.</p>
<img src="${seedImages.jwtAuth}" alt="JWT authentication security concept" />
<h2>Roles that match the product</h2>
<p>Admin, staff, and read-only roles map to real job functions - not fifty boolean flags on the user row. Middleware enforces roles once; route handlers stay thin.</p>
<h2>Shared with Next.js front ends</h2>
<p>Next.js apps call the same APIs as future mobile clients. Business rules live on the server. The UI only renders what the token allows.</p>
`.trim(),
  },
  {
    slug: "piplog-react-native-mobile",
    title: "PipLog mobile: React Native for journal review on the go",
    kicker: "Mobile",
    summary:
      "React Native companion for PipLog so traders review sessions, equity snapshots, and recent trades without opening the desktop journal.",
    year: "2025",
    role: "Full-stack developer",
    client_type: "Product / SaaS",
    stack: ["React Native", "Supabase", "Express.js", "TypeScript"],
    live_url: "https://tradeflow-trading-journal.vercel.app",
    github_url: null,
    image_url: seedImages.mobileApp,
    image_alt: "Mobile app showing trading journal on a phone",
    featured: false,
    problem:
      "Traders wanted to check today's results and recent entries between sessions. The web app worked on mobile browsers but felt slow for a daily habit loop.",
    approach: [
      "React Native app sharing auth and API contracts with the web product.",
      "Read-focused first release: recent trades, equity snapshot, session summary.",
      "Supabase auth session reuse where possible for one account across surfaces.",
      "Push notification hooks planned for sync completion and daily recap.",
    ],
    outcomes: [
      "Mobile surface for the same journal data as desktop.",
      "Faster daily check-in loop for active traders.",
      "Foundation for alerts without rebuilding backend logic.",
    ],
    status: "published",
    content_html: `
<p>Mobile was not a rewrite. It is the same Express and Supabase backend with a native shell optimized for glanceable review - today's result, last five trades, sync status.</p>
<img src="${seedImages.mobileApp}" alt="React Native mobile trading journal app" />
<h2>Read before write</h2>
<p>V1 focused on review, not full trade entry on a phone keyboard. That kept scope honest and still solved the daily check-in use case.</p>
<h2>Shared auth</h2>
<p>One account across web and mobile. Traders log in once and see the same plan state Stripe already enforced on the server.</p>
`.trim(),
  },
];
