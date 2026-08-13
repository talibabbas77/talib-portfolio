import { unstable_cache } from "next/cache";
import { blogPosts as staticPosts } from "@/lib/content/blog-posts";
import { paragraphsToHtml, sanitizeHtml } from "@/lib/cms/sanitize";
import type { BlogPostRow } from "@/lib/cms/types";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { createPublicClient } from "@/lib/supabase/public";

export type PublicBlogPost = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  date: string;
  readTime: string;
  featured?: boolean;
  tags: string[];
  body: string[];
  contentHtml: string;
  coverImageUrl?: string | null;
};

function mapRow(row: BlogPostRow): PublicBlogPost | null {
  try {
    const safeHtml = sanitizeHtml(row.content_html || "");
    return {
      slug: row.slug,
      title: row.title,
      kicker: row.kicker,
      summary: row.summary,
      date: row.published_at ?? row.created_at.slice(0, 10),
      readTime: row.read_time,
      featured: row.featured,
      tags: row.tags ?? [],
      contentHtml: safeHtml,
      coverImageUrl: row.cover_image_url,
      body: safeHtml
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<\/p>/gi, "\n\n")
        .replace(/<[^>]+>/g, "")
        .split(/\n{2,}/)
        .map((p) => p.trim())
        .filter(Boolean),
    };
  } catch {
    return null;
  }
}

function mapStatic(post: (typeof staticPosts)[number]): PublicBlogPost {
  const contentHtml = paragraphsToHtml(post.body);
  return {
    ...post,
    contentHtml,
    coverImageUrl: null,
  };
}

async function fetchPublishedBlogPosts(): Promise<PublicBlogPost[]> {
  if (!isSupabaseConfigured()) {
    return staticPosts.map(mapStatic);
  }

  try {
    const supabase = createPublicClient();
    if (!supabase) {
      return staticPosts.map(mapStatic);
    }

    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error || !data?.length) {
      return staticPosts.map(mapStatic);
    }

    const mapped = (data as BlogPostRow[])
      .map(mapRow)
      .filter((post): post is PublicBlogPost => post !== null);

    return mapped.length ? mapped : staticPosts.map(mapStatic);
  } catch {
    return staticPosts.map(mapStatic);
  }
}

const getCachedPublishedBlogPosts = unstable_cache(
  fetchPublishedBlogPosts,
  ["published-blog-posts"],
  { revalidate: 60, tags: ["blog-posts"] }
);

export async function getPublishedBlogPosts(): Promise<PublicBlogPost[]> {
  return getCachedPublishedBlogPosts();
}

export async function getPublishedBlogPost(slug: string) {
  const posts = await getPublishedBlogPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getPublishedBlogSlugs() {
  const posts = await getPublishedBlogPosts();
  return posts.map((post) => post.slug);
}

export async function getAllBlogPostsAdmin() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as BlogPostRow[];
}
