import { seedImages } from "@/lib/seed/images";

export type SeedBlogPost = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  content_html: string;
  published_at: string;
  read_time: string;
  featured: boolean;
  tags: string[];
  cover_image_url: string;
  status: "published";
};

export const seedBlogPosts: SeedBlogPost[] = [
  {
    slug: "ghl-oauth-automation",
    title: "Cutting CRM busywork with GoHighLevel OAuth workflows",
    kicker: "CRM",
    summary:
      "How OAuth 2.0 integrations for contacts, pipelines, and tagging cut manual client effort by over 60% on real GHL work at DevExcel.",
    published_at: "2025-11-12",
    read_time: "8 min",
    featured: true,
    tags: ["GoHighLevel", "OAuth", "Automation"],
    cover_image_url: seedImages.crmDashboard,
    status: "published",
    content_html: `
<p>CRM work fails quietly. Someone forgets a tag, a pipeline stage stays stale, and the client pays for hours that should have been a webhook.</p>
<p>At DevExcel I integrated GoHighLevel through OAuth 2.0 so contact management, pipeline updates, and tagging could run from product events instead of spreadsheets. This was not a side experiment. It shipped on live client accounts where missed updates meant lost leads.</p>
<h2>Why OAuth instead of API keys in a doc</h2>
<p>GHL accounts belong to the client. OAuth lets them grant scopes once, revoke access cleanly, and rotate tokens without you storing a master password in Slack. For agency work that matters.</p>
<ul>
<li><strong>Contacts:</strong> create and update from form submissions and in-app events</li>
<li><strong>Pipelines:</strong> move deals when a user completes a step in your product</li>
<li><strong>Tags:</strong> segment users by plan, source, or feature usage</li>
</ul>
<img src="${seedImages.crmDashboard}" alt="CRM analytics dashboard on a laptop screen" />
<h2>Referral licensing inside GHL</h2>
<p>We also shipped a referral-based licensing and consultant-access flow inside GHL. Onboarding stopped being a pile of one-off admin tasks. New consultants got the right sub-account access from a single approval path instead of three manual emails.</p>
<p>The win was not a flashy dashboard. It was fewer handoffs. Clients saw manual effort drop by more than 60% on the workflows we automated.</p>
<h2>What I would do again</h2>
<p>Start with OAuth scopes you actually need. Map one product event to one CRM write. Log failures where a human can retry. Fancy orchestration can wait until the basic sync is boring and reliable.</p>
<p>If you are wiring a CRM into a product in 2026, treat GHL like any other external system: idempotent writes, clear error surfaces, and a runbook for when their API hiccups on a Friday night.</p>
`.trim(),
  },
  {
    slug: "shopify-liquid-luxury-theme",
    title: "Building a Shopify theme when the brand has to feel expensive",
    kicker: "Shopify",
    summary:
      "Lessons from a custom Liquid theme for Zaivor, a jewelry and watch brand: owned sections, filters in the theme, and mobile treated as part of the product.",
    published_at: "2025-08-04",
    read_time: "7 min",
    featured: false,
    tags: ["Shopify", "Liquid", "E-commerce"],
    cover_image_url: seedImages.luxuryRetail,
    status: "published",
    content_html: `
<p>Stock themes plus five apps is how luxury storefronts start looking like everyone else. For Zaivor we built the Liquid theme from scratch because the product is the brand. A generic grid with a countdown timer app does not sell a watch.</p>
<h2>Own the sections that define the browse path</h2>
<p>Custom sections and templates meant collection filtering, wishlist, and multi-category navigation lived in the theme - not in a fragile stack of apps fighting for the cart drawer.</p>
<ul>
<li>Hero and collection headers matched photography from the client shoot</li>
<li>Filter UI stayed in Liquid so it worked without a third-party script on every page</li>
<li>Wishlist state used theme JavaScript with local storage plus account tie-in where needed</li>
</ul>
<img src="${seedImages.luxuryRetail}" alt="Luxury jewelry displayed in a retail setting" />
<h2>Mobile is not a resize pass</h2>
<p>Performance and mobile were not a later sprint. Jewelry shoppers browse on phones. If the first scroll feels heavy, the brand already lost the room. We kept image sizes disciplined, lazy-loaded below-the-fold media, and tested checkout on mid-range Android devices, not just the latest iPhone.</p>
<h2>When to use apps</h2>
<p>Own the theme when the brand is the product. Use apps for payment, fulfillment, and ops - not for the look of the store. Zaivor ships at <a href="https://zaivor.com">zaivor.com</a> with a theme the client can reason about instead of a black box from the theme store.</p>
`.trim(),
  },
  {
    slug: "ai-rag-token-costs",
    title: "Shipping OpenAI and Gemini features without burning the budget",
    kicker: "AI",
    summary:
      "Practical notes on RAG pipelines and token control from client products that had to stay live after the demo, including the AI Resume Builder.",
    published_at: "2025-05-20",
    read_time: "9 min",
    featured: true,
    tags: ["OpenAI", "Gemini", "RAG"],
    cover_image_url: seedImages.aiCode,
    status: "published",
    content_html: `
<p>AI demos are cheap. AI in production is a line item. On client work I integrate OpenAI and Gemini with retrieval where it helps - and with hard limits where it does not.</p>
<h2>RAG only when the corpus is yours</h2>
<p>RAG earns its keep when the question needs your documents and your vocabulary. A support bot that reads your PDFs makes sense. A chat box that retrieves the entire internet does not.</p>
<p>We chunk docs with clear metadata, embed once, and query with a tight top-k. If the retrieved context does not answer the question, the UI says so instead of hallucinating a confident wrong answer.</p>
<img src="${seedImages.aiCode}" alt="Abstract visualization of AI and code on a screen" />
<h2>Token control is product work</h2>
<ul>
<li>Truncate context to what the model actually needs</li>
<li>Cache stable system prompts and repeated instructions</li>
<li>Stream responses when latency matters to the user</li>
<li>Refuse to send the whole database into the model on every click</li>
</ul>
<p>The same discipline shows up in the AI Resume Builder. Generate a draft the user can edit. Score ATS fit on the result. Do not hide a blank check behind a generate button.</p>
<h2>Model choice in 2026</h2>
<p>Gemini and OpenAI both moved fast on pricing and context windows. Pick the model for the task: cheap classification on a small model, longer drafting on a larger one. Log token usage per feature so you can show the client a number before the invoice surprises them.</p>
<p>If you cannot explain the monthly token ceiling to the client in one sentence, you are not ready to ship the feature.</p>
`.trim(),
  },
  {
    slug: "piplog-saas-lessons",
    title: "What PipLog taught me about billing, sync, and coaching data",
    kicker: "SaaS",
    summary:
      "Stripe webhooks, MetaTrader 5 sync, and AI coaching that only works when the journal already holds real trades.",
    published_at: "2026-02-18",
    read_time: "8 min",
    featured: true,
    tags: ["SaaS", "Stripe", "Supabase"],
    cover_image_url: seedImages.tradingChart,
    status: "published",
    content_html: `
<p>PipLog is a trading journal first. Equity curves and ledgers only matter if the data is complete. Everything else - billing, mobile review, AI coaching - sits on top of trades you trust.</p>
<h2>Stripe looks simple until a webhook is late</h2>
<p>Plan state has to survive retries and partial failures, or support becomes the billing system. We store subscription status in Supabase, reconcile on every webhook, and treat checkout.session.completed and customer.subscription.updated as separate paths with the same idempotent handler pattern.</p>
<img src="${seedImages.tradingChart}" alt="Financial trading chart on a monitor" />
<h2>MetaTrader 5 auto-sync</h2>
<p>MetaTrader 5 auto-sync via Expert Advisor removed the worst UX: asking traders to export CSVs after every session. Trades push from MT5 into the journal API. If sync fails, the user sees a clear error instead of a silent gap in their equity curve.</p>
<h2>AI coaching came last on purpose</h2>
<p>AI coaching was deliberately late in the stack. Feedback grounded in stored trades beats a generic chatbot every time. The model reads closed positions, drawdown periods, and session timing - not a blank prompt that says "give trading advice."</p>
<p>Ship the journal and the sync. Add intelligence on top of data you trust. That order saved us from shipping a chat toy before the product could stand on its own.</p>
`.trim(),
  },
  {
    slug: "nextjs-16-server-components-production",
    title: "Next.js 16 in production: what changed for how I ship client apps",
    kicker: "Next.js",
    summary:
      "App Router patterns, Turbopack builds, and where server components actually save work on real DevExcel projects in 2026.",
    published_at: "2026-03-01",
    read_time: "10 min",
    featured: false,
    tags: ["Next.js", "React", "TypeScript"],
    cover_image_url: seedImages.nextjsDev,
    status: "published",
    content_html: `
<p>Next.js 16 is what I reach for on new client work at DevExcel. Not because it is new, but because the defaults finally match how we deploy: Vercel, TypeScript, and a clear split between server data fetching and client interactivity.</p>
<h2>Server components for data, client for motion</h2>
<p>Portfolio and CMS pages fetch from Supabase on the server. GSAP scroll sections stay in client components. Mixing both in one tree without a boundary still breaks builds - so the rule is simple: if it touches window, scroll, or upload, it is client.</p>
<img src="${seedImages.nextjsDev}" alt="Developer workspace with analytics on screen" />
<h2>Turbopack on build</h2>
<p>Turbopack cut local feedback time on this portfolio rebuild. Production builds still need the same discipline: type-check, lint, and a real env file for Supabase keys before you assume green locally means green on Vercel.</p>
<h2>ISR and revalidate for CMS content</h2>
<p>Blog and case study routes use revalidate so published posts update within a minute without redeploying the whole site. That pairs well with a Supabase-backed admin: edit in the panel, refresh the public page, see the change.</p>
<h2>Middleware and auth</h2>
<p>Admin routes sit behind Supabase session middleware. Public routes stay static or ISR where possible. In 2026 the trend is fewer all-client SPAs for marketing sites and more hybrid apps that fetch on the server and hydrate only what moves.</p>
`.trim(),
  },
  {
    slug: "supabase-portfolio-cms-rls",
    title: "Building a portfolio CMS on Supabase without leaking the admin keys",
    kicker: "Supabase",
    summary:
      "How this site stores blog posts, case studies, and contact submissions with RLS, a media bucket, and a service role only on the server.",
    published_at: "2026-03-10",
    read_time: "9 min",
    featured: false,
    tags: ["Supabase", "PostgreSQL", "Next.js"],
    cover_image_url: seedImages.cmsAdmin,
    status: "published",
    content_html: `
<p>I wanted to update case studies and blog posts without redeploying the whole portfolio. Supabase was the obvious fit: Postgres, auth, storage, and Row Level Security in one place I already use on PipLog.</p>
<h2>Schema split: public read, admin write</h2>
<p>Published blog posts and case studies are readable by anon. Inserts and updates require an authenticated admin session. Contact submissions insert through the API with the service role - never from the browser.</p>
<ul>
<li><strong>blog_posts</strong> and <strong>case_studies</strong> with a published/draft enum</li>
<li><strong>newsletter_subscribers</strong> with public insert for the footer form</li>
<li><strong>contact_submissions</strong> with no public insert policy</li>
</ul>
<img src="${seedImages.database}" alt="Database server racks in a data center" />
<h2>Media bucket for cover images</h2>
<p>Admin uploads go to a public media bucket. Rich text can also reference external URLs. TipTap handles the body; ImageField handles cover previews with upload or paste URL.</p>
<h2>Fallback to static content</h2>
<p>If the database is empty or unreachable, public pages still render from static files in the repo. That kept the site up during migration. After seeding, the DB becomes the source of truth.</p>
<p>RLS is not optional on client projects. Even a solo admin portfolio should model the same boundaries you would use when a second editor shows up later.</p>
`.trim(),
  },
  {
    slug: "ai-coding-tools-2026-claude-cohort",
    title: "AI coding tools in 2026: speed without skipping the review",
    kicker: "Industry",
    summary:
      "Notes from daily use of Cursor, Claude, and agent workflows on client delivery - plus what the DevExcel Claude Code cohort changed in how I write and review code.",
    published_at: "2026-04-02",
    read_time: "8 min",
    featured: false,
    tags: ["AI", "Developer Tools", "Workflow"],
    cover_image_url: seedImages.aiCode,
    status: "published",
    content_html: `
<p>AI coding tools are part of my stack in 2026, not a novelty. I finished the Claude Code cohort certificate at DevExcel in May 2026, and the useful part was not "let the model write everything." It was learning where agents save time and where they create review debt.</p>
<h2>What agents do well on client work</h2>
<ul>
<li>Boilerplate: forms, API route stubs, migration SQL from a schema sketch</li>
<li>Refactors with a clear target file list and a test command</li>
<li>Docs and setup guides from an existing codebase</li>
</ul>
<h2>What still needs a human</h2>
<p>Auth boundaries, RLS policies, payment webhooks, and anything that touches PII. I treat agent output like a junior PR: read the diff, run the build, check edge cases.</p>
<img src="${seedImages.teamRemote}" alt="Developers collaborating at a laptop" />
<h2>Current trend: MCP and connected context</h2>
<p>Connecting Supabase and GitHub into the editor context reduced tab switching. It did not remove the need to understand the project. The win is fewer copy-paste errors when running migrations or checking env vars.</p>
<p>If you hire a full-stack dev in 2026, ask how they verify AI-generated code - not whether they use it.</p>
`.trim(),
  },
  {
    slug: "stripe-webhooks-idempotent-billing",
    title: "Stripe webhooks in 2026: idempotency beats clever handlers",
    kicker: "Payments",
    summary:
      "Patterns from PipLog and the AI Resume Builder for subscription state, webhook retries, and support tickets that are not about billing.",
    published_at: "2026-01-15",
    read_time: "7 min",
    featured: false,
    tags: ["Stripe", "SaaS", "Webhooks"],
    cover_image_url: seedImages.payments,
    status: "published",
    content_html: `
<p>Every SaaS project eventually learns the same lesson: Stripe's dashboard looks calm while your database is wrong. Webhooks retry. Users refresh checkout twice. Your handler runs three times for one payment.</p>
<h2>One table for subscription truth</h2>
<p>Store customer id, subscription id, plan, and status in Postgres or Supabase. Update from webhooks only through idempotent handlers keyed by event id. If you have seen the event before, return 200 and stop.</p>
<img src="${seedImages.payments}" alt="Online payment concept with card and laptop" />
<h2>Separate user-facing state from Stripe state</h2>
<p>The app shows "Pro" based on your database, not a live Stripe API call on every page load. Sync on webhook. Reconcile nightly if volume warrants it. Users do not care about Stripe's internal object graph; they care whether the export button works.</p>
<h2>Testing without fake cards in production</h2>
<p>Use Stripe CLI forward webhooks locally. Script checkout.session.completed with test clocks for renewal. PipLog and the resume builder both shipped billing only after webhook replay stopped surprising us.</p>
`.trim(),
  },
  {
    slug: "wordpress-rest-api-client-sites",
    title: "WordPress in 2026: when clients still need REST and custom plugins",
    kicker: "WordPress",
    summary:
      "Maintaining client WordPress sites at DevExcel - custom plugins, page builders, and REST connections without turning every site into a headless science project.",
    published_at: "2025-09-22",
    read_time: "6 min",
    featured: false,
    tags: ["WordPress", "PHP", "REST API"],
    cover_image_url: seedImages.wordpress,
    status: "published",
    content_html: `
<p>Not every client wants Next.js. Some already run on WordPress with SEO history, editor workflows, and a plugin budget. At DevExcel I maintain those sites with custom plugins, page builder tweaks, and REST API connections to external services.</p>
<h2>REST when the front end stays WordPress</h2>
<p>Full headless WordPress is rarely the cheapest move for a local business site. More often we expose custom post types or form endpoints via REST and let a small React widget or mobile app consume them.</p>
<ul>
<li>Custom endpoints for lead capture with validation server-side</li>
<li>Authenticated routes for member-only content</li>
<li>Webhooks out to CRM when GHL or another system owns the pipeline</li>
</ul>
<img src="${seedImages.wordpress}" alt="Developer typing code on a laptop" />
<h2>Plugin hygiene</h2>
<p>Fewer plugins, updated often, with staging before production. I document which plugins are load-bearing so the next person does not delete "the one that fixes checkout."</p>
`.trim(),
  },
  {
    slug: "remote-fullstack-hiring-2026",
    title: "Hiring full-stack devs in 2026: what clients actually ask for",
    kicker: "Career",
    summary:
      "From Lahore and remote-friendly work: the stacks, proof, and delivery signals that show up in every serious brief I see this year.",
    published_at: "2026-04-18",
    read_time: "7 min",
    featured: false,
    tags: ["Career", "Remote", "Full-Stack"],
    cover_image_url: seedImages.teamRemote,
    status: "published",
    content_html: `
<p>I work from Lahore on client projects across SaaS, e-commerce, and CRM automation. In 2026 the briefs look similar even when the logos change: ship a feature end to end, integrate something that already exists, and do not disappear after deploy.</p>
<h2>Stacks that repeat</h2>
<ul>
<li>Next.js or React on the front, Node or Supabase on the back</li>
<li>Shopify Liquid for brands that outgrew the theme store</li>
<li>Stripe plus auth plus one AI feature with a cost ceiling</li>
<li>GoHighLevel or HubSpot wiring for agencies selling ops, not just code</li>
</ul>
<img src="${seedImages.teamRemote}" alt="Remote team meeting around a laptop" />
<h2>Proof beats adjectives</h2>
<p>Clients open live URLs and GitHub. Case studies with problem, approach, and outcome matter more than a skill cloud. That is why this portfolio puts PipLog, Zaivor, and NamastheUSA front and center with plain write-ups.</p>
<h2>Remote-friendly is a delivery standard</h2>
<p>Async updates, written handoffs, and staging links before demo calls. Time zone overlap helps but clear PRs and Loom walkthroughs close the gap when it is partial.</p>
<p>If you are hiring, ask for one recent feature they owned from schema to production. If you are applying, show that feature in one URL and three paragraphs.</p>
`.trim(),
  },
];
