import type { Metadata } from "next";
import { EditorialIndex } from "@/components/editorial/editorial-index";
import { blogPosts, siteConfig } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes from Talib Abbas on CRM automation, Shopify themes, AI integrations, and shipping SaaS.",
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    description:
      "Practical writing on Next.js, Shopify, GoHighLevel, and AI features from client work.",
    url: `${siteConfig.siteUrl}/blog`,
  },
};

export default function BlogPage() {
  const items = blogPosts.map((post) => ({
    href: `/blog/${post.slug}`,
    kicker: post.kicker,
    title: post.title,
    summary: post.summary,
    meta: `${post.date} · ${post.readTime}`,
    featured: post.featured,
  }));

  return (
    <EditorialIndex
      kicker="Writing"
      title="Blog"
      description="Short notes from shipped work - CRM automation, Shopify themes, AI costs, and SaaS lessons."
      items={items}
    />
  );
}
