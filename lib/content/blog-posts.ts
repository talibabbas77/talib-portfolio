import { seedBlogPosts } from "@/lib/seed/blog-posts";
import { htmlToPlainParagraphs } from "@/lib/cms/sanitize";

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
  coverImageUrl?: string;
};

export const blogPosts: BlogPost[] = seedBlogPosts.map((post) => ({
  slug: post.slug,
  title: post.title,
  kicker: post.kicker,
  summary: post.summary,
  date: post.published_at,
  readTime: post.read_time,
  featured: post.featured,
  tags: post.tags,
  body: htmlToPlainParagraphs(post.content_html),
  coverImageUrl: post.cover_image_url,
}));

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function getBlogPostSlugs() {
  return blogPosts.map((p) => p.slug);
}
