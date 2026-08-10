import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleShell } from "@/components/editorial/article-shell";
import { EditorialKicker } from "@/components/editorial/editorial-meta";
import {
  blogPosts,
  getBlogPost,
  getBlogPostSlugs,
  siteConfig,
} from "@/lib/site-content";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getBlogPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post" };

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `${siteConfig.siteUrl}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <ArticleShell
      backHref="/blog"
      backLabel="All posts"
      kicker={post.kicker}
      title={post.title}
      meta={`${post.date} · ${post.readTime} · ${siteConfig.name}`}
      aside={
        <>
          <div>
            <EditorialKicker className="mb-3 text-muted-foreground">
              Tags
            </EditorialKicker>
            <ul className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="border border-border px-2 py-1 text-xs uppercase tracking-wider"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <EditorialKicker className="mb-3 text-muted-foreground">
              More reading
            </EditorialKicker>
            <ul className="space-y-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/blog/${item.slug}`}
                    className="font-display text-base text-foreground transition-colors hover:text-accent-brand"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      }
    >
      {post.body.map((paragraph) => (
        <p key={paragraph.slice(0, 24)}>{paragraph}</p>
      ))}
    </ArticleShell>
  );
}
