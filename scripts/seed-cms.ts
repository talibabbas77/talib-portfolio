/**
 * Seeds blog posts and case studies into Supabase.
 * Requires migrations 001 and 002 applied first.
 *
 * Usage: pnpm seed:cms
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { createServiceClient } from "@/lib/supabase/admin";
import { seedBlogPosts } from "@/lib/seed/blog-posts";
import { seedCaseStudies } from "@/lib/seed/case-studies";

function loadEnvLocal() {
  const envPath = resolve(process.cwd(), ".env.local");
  if (!existsSync(envPath)) return;

  const lines = readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

async function main() {
  loadEnvLocal();

  const supabase = createServiceClient();

  console.log(`Seeding ${seedBlogPosts.length} blog posts...`);
  const { error: blogError } = await supabase.from("blog_posts").upsert(
    seedBlogPosts.map((post) => ({
      slug: post.slug,
      title: post.title,
      kicker: post.kicker,
      summary: post.summary,
      content_html: post.content_html,
      published_at: post.published_at,
      read_time: post.read_time,
      featured: post.featured,
      tags: post.tags,
      cover_image_url: post.cover_image_url,
      status: post.status,
    })),
    { onConflict: "slug" }
  );

  if (blogError) {
    console.error("Blog seed failed:", blogError.message);
    process.exit(1);
  }

  console.log(`Seeding ${seedCaseStudies.length} case studies...`);
  const { error: caseError } = await supabase.from("case_studies").upsert(
    seedCaseStudies.map((study) => ({
      slug: study.slug,
      title: study.title,
      kicker: study.kicker,
      summary: study.summary,
      content_html: study.content_html,
      year: study.year,
      role: study.role,
      client_type: study.client_type,
      stack: study.stack,
      live_url: study.live_url,
      github_url: study.github_url,
      image_url: study.image_url,
      image_alt: study.image_alt,
      featured: study.featured,
      problem: study.problem,
      approach: study.approach,
      outcomes: study.outcomes,
      status: study.status,
    })),
    { onConflict: "slug" }
  );

  if (caseError) {
    console.error("Case study seed failed:", caseError.message);
    process.exit(1);
  }

  console.log("Done. Public /blog and /case-studies will read from Supabase.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
