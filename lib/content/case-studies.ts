import { seedCaseStudies } from "@/lib/seed/case-studies";
import { htmlToPlainParagraphs } from "@/lib/content/html-utils";

export type CaseStudy = {
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
};

export const caseStudies: CaseStudy[] = seedCaseStudies.map((study) => ({
  slug: study.slug,
  title: study.title,
  kicker: study.kicker,
  summary: study.summary,
  year: study.year,
  role: study.role,
  clientType: study.client_type,
  stack: study.stack,
  liveUrl: study.live_url ?? undefined,
  githubUrl: study.github_url ?? undefined,
  imageUrl: study.image_url,
  imageAlt: study.image_alt,
  featured: study.featured,
  problem: study.problem,
  approach: study.approach,
  outcomes: study.outcomes,
  body: htmlToPlainParagraphs(study.content_html),
}));

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export function getCaseStudySlugs() {
  return caseStudies.map((c) => c.slug);
}
