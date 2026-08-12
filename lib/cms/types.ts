export type ContentStatus = "draft" | "published";

export type BlogPostRow = {
  id: string;
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  content_html: string;
  published_at: string | null;
  read_time: string;
  featured: boolean;
  tags: string[];
  cover_image_url: string | null;
  status: ContentStatus;
  created_at: string;
  updated_at: string;
};

export type CaseStudyRow = {
  id: string;
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
  status: ContentStatus;
  created_at: string;
  updated_at: string;
};

export type NewsletterSubscriberRow = {
  id: string;
  email: string;
  status: "active" | "unsubscribed";
  source: string;
  created_at: string;
};

export type BlogPostInput = Omit<
  BlogPostRow,
  "id" | "created_at" | "updated_at"
>;

export type CaseStudyInput = Omit<
  CaseStudyRow,
  "id" | "created_at" | "updated_at"
>;
