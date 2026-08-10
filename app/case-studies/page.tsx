import type { Metadata } from "next";
import { EditorialIndex } from "@/components/editorial/editorial-index";
import { caseStudies, siteConfig } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Case studies",
  description:
    "Case studies from Talib Abbas covering SaaS, Shopify, marketplaces, and backend systems built for real clients.",
  openGraph: {
    title: `Case studies | ${siteConfig.name}`,
    description:
      "Plain write-ups of Next.js, MERN, Shopify, CRM, and AI work from production projects.",
    url: `${siteConfig.siteUrl}/case-studies`,
  },
};

export default function CaseStudiesPage() {
  const items = caseStudies.map((study) => ({
    href: `/case-studies/${study.slug}`,
    kicker: study.kicker,
    title: study.title,
    summary: study.summary,
    meta: `${study.year} · ${study.role}`,
    featured: study.featured,
  }));

  return (
    <EditorialIndex
      kicker="Case studies"
      title="Case studies"
      description="Selected products and systems I helped ship, written so you can judge fit for your own roadmap."
      items={items}
    />
  );
}
