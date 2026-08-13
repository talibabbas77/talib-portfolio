import { unstable_cache } from "next/cache";
import { caseStudies as staticStudies } from "@/lib/content/case-studies";
import { paragraphsToHtml, sanitizeHtml } from "@/lib/cms/sanitize";
import type { CaseStudyRow } from "@/lib/cms/types";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { createPublicClient } from "@/lib/supabase/public";

export type PublicCaseStudy = {
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
  contentHtml: string;
};

function mapRow(row: CaseStudyRow): PublicCaseStudy | null {
  try {
    const safeHtml = sanitizeHtml(row.content_html || "");
    return {
      slug: row.slug,
      title: row.title,
      kicker: row.kicker,
      summary: row.summary,
      year: row.year,
      role: row.role,
      clientType: row.client_type,
      stack: row.stack ?? [],
      liveUrl: row.live_url ?? undefined,
      githubUrl: row.github_url ?? undefined,
      imageUrl: row.image_url,
      imageAlt: row.image_alt,
      featured: row.featured,
      problem: row.problem,
      approach: row.approach ?? [],
      outcomes: row.outcomes ?? [],
      contentHtml: safeHtml,
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

function mapStatic(study: (typeof staticStudies)[number]): PublicCaseStudy {
  return {
    slug: study.slug,
    title: study.title,
    kicker: study.kicker,
    summary: study.summary,
    year: study.year,
    role: study.role,
    clientType: study.clientType,
    stack: study.stack,
    liveUrl: study.liveUrl,
    githubUrl: study.githubUrl,
    imageUrl: study.imageUrl,
    imageAlt: study.imageAlt,
    featured: study.featured,
    problem: study.problem,
    approach: study.approach,
    outcomes: study.outcomes,
    body: study.body,
    contentHtml: paragraphsToHtml(study.body),
  };
}

async function fetchPublishedCaseStudies(): Promise<PublicCaseStudy[]> {
  if (!isSupabaseConfigured()) {
    return staticStudies.map(mapStatic);
  }

  try {
    const supabase = createPublicClient();
    if (!supabase) {
      return staticStudies.map(mapStatic);
    }

    const { data, error } = await supabase
      .from("case_studies")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false });

    if (error || !data?.length) {
      return staticStudies.map(mapStatic);
    }

    const mapped = (data as CaseStudyRow[])
      .map(mapRow)
      .filter((study): study is PublicCaseStudy => study !== null);

    return mapped.length ? mapped : staticStudies.map(mapStatic);
  } catch {
    return staticStudies.map(mapStatic);
  }
}

const getCachedPublishedCaseStudies = unstable_cache(
  fetchPublishedCaseStudies,
  ["published-case-studies"],
  { revalidate: 60, tags: ["case-studies"] }
);

export async function getPublishedCaseStudies(): Promise<PublicCaseStudy[]> {
  return getCachedPublishedCaseStudies();
}

export async function getPublishedCaseStudy(slug: string) {
  const items = await getPublishedCaseStudies();
  return items.find((item) => item.slug === slug) ?? null;
}

export async function getPublishedCaseStudySlugs() {
  const items = await getPublishedCaseStudies();
  return items.map((item) => item.slug);
}

export async function getAllCaseStudiesAdmin() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("case_studies")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as CaseStudyRow[];
}
