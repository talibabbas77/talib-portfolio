export type BlogPost = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  date: string;
  readTime: string;
  featured?: boolean;
  tags: string[];
  body: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "ghl-oauth-automation",
    title: "Cutting CRM busywork with GoHighLevel OAuth workflows",
    kicker: "CRM",
    summary:
      "How OAuth 2.0 integrations for contacts, pipelines, and tagging cut manual client effort by over 60% on real GHL work.",
    date: "2025-11-12",
    readTime: "6 min",
    featured: true,
    tags: ["GoHighLevel", "OAuth", "Automation"],
    body: [
      "CRM work fails quietly. Someone forgets a tag, a pipeline stage stays stale, and the client pays for hours that should have been a webhook.",
      "At DevExcel I integrated GoHighLevel through OAuth 2.0 so contact management, pipeline updates, and tagging could run from product events instead of spreadsheets.",
      "The win was not a flashy dashboard. It was fewer handoffs. Clients saw manual effort drop by more than 60% on the workflows we automated.",
      "We also shipped a referral-based licensing and consultant-access flow inside GHL. Onboarding stopped being a pile of one-off admin tasks.",
      "If you are wiring a CRM into a product, start with OAuth scopes you actually need, map one event to one write, and log failures where a human can retry. Fancy orchestration can wait.",
    ],
  },
  {
    slug: "shopify-liquid-luxury-theme",
    title: "Building a Shopify theme when the brand has to feel expensive",
    kicker: "Shopify",
    summary:
      "Lessons from a custom Liquid theme for a jewelry and watch brand: sections you own, filters that belong in the theme, and mobile as part of the product.",
    date: "2025-08-04",
    readTime: "5 min",
    tags: ["Shopify", "Liquid", "E-commerce"],
    body: [
      "Stock themes plus five apps is how luxury storefronts start looking like everyone else. For Zaivor we built the Liquid theme from scratch.",
      "Custom sections and templates meant collection filtering, wishlist, and multi-category navigation lived in the theme - not in a fragile stack of apps fighting for the cart drawer.",
      "Performance and mobile were not a later sprint. Jewelry shoppers browse on phones. If the first scroll feels heavy, the brand already lost the room.",
      "Own the theme when the brand is the product. Use apps for payment and ops, not for the look of the store.",
    ],
  },
  {
    slug: "ai-rag-token-costs",
    title: "Shipping OpenAI and Gemini features without burning the budget",
    kicker: "AI",
    summary:
      "Practical notes on RAG pipelines and token control from client products that had to stay live after the demo.",
    date: "2025-05-20",
    readTime: "7 min",
    tags: ["OpenAI", "Gemini", "RAG"],
    body: [
      "AI demos are cheap. AI in production is a line item. On client work I integrate OpenAI and Gemini with retrieval where it helps - and with hard limits where it does not.",
      "RAG only earns its keep when the corpus is yours and the question needs that corpus. Otherwise you are paying for a chat toy.",
      "Token control is product work: truncate context, cache stable prompts, stream when latency matters, and refuse to send the whole database into the model.",
      "The same discipline shows up in products like the AI Resume Builder. Generate a draft the user can edit. Score it. Do not hide a blank check behind a generate button.",
      "If you cannot explain the monthly token ceiling to the client in one sentence, you are not ready to ship the feature.",
    ],
  },
  {
    slug: "piplog-saas-lessons",
    title: "What PipLog taught me about billing, sync, and coaching data",
    kicker: "SaaS",
    summary:
      "Stripe webhooks, MetaTrader sync, and AI coaching that only works when the journal already holds real trades.",
    date: "2026-02-18",
    readTime: "6 min",
    tags: ["SaaS", "Stripe", "Supabase"],
    body: [
      "PipLog is a trading journal first. Equity curves and ledgers only matter if the data is complete.",
      "Stripe subscriptions look simple until a webhook is late. Plan state has to survive retries and partial failures, or support becomes the billing system.",
      "MetaTrader 5 auto-sync via Expert Advisor removed the worst UX: asking traders to export CSVs after every session.",
      "AI coaching was deliberately late in the stack. Feedback grounded in stored trades beats a generic chatbot every time.",
      "Ship the journal and the sync. Add intelligence on top of data you trust.",
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function getBlogPostSlugs() {
  return blogPosts.map((p) => p.slug);
}
