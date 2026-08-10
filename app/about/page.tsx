import type { Metadata } from "next";
import Link from "next/link";
import { AboutSection } from "@/components/about-section";
import { ExperienceSection } from "@/components/experience-section";
import { CertificationsSection } from "@/components/certifications-section";
import { SoftReveal } from "@/components/motion/kino-root";
import { DottedMapBand } from "@/components/ui/dotted-world-map";
import { aboutCopy, ctaLabels, siteConfig } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "About",
  description: aboutCopy.lead,
  openGraph: {
    title: `About | ${siteConfig.name}`,
    description: siteConfig.summary,
    url: `${siteConfig.siteUrl}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="relative z-10 pt-24">
      <section className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <SoftReveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-brand">
            About
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            {siteConfig.name}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            {aboutCopy.lead}
          </p>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Based in {siteConfig.location}. Remote-friendly with teams that need
            a full-stack pair for features that have to stay online.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/case-studies"
              className="inline-flex h-11 items-center rounded-md bg-[var(--accent-brand)] px-5 text-sm font-medium text-white dark:text-[#06110c]"
            >
              {ctaLabels.viewAllWork}
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center rounded-md border border-border bg-background/70 px-5 text-sm font-medium"
            >
              {ctaLabels.hireMe}
            </Link>
          </div>
        </SoftReveal>
      </section>

      <AboutSection />
      <DottedMapBand />
      <ExperienceSection />
      <CertificationsSection />
    </div>
  );
}
