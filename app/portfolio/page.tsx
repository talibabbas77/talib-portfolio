import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { SoftReveal } from "@/components/motion/kino-root";
import { BentoShowcase } from "@/components/bento-showcase";
import {
  ctaLabels,
  projects,
  siteConfig,
} from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected live products by Talib Abbas across SaaS, e-commerce, AI tools, and marketplaces.",
  openGraph: {
    title: `Portfolio | ${siteConfig.name}`,
    description:
      "A compact grid of shipped products with live links and case study paths.",
    url: `${siteConfig.siteUrl}/portfolio`,
  },
};

export default function PortfolioPage() {
  return (
    <div className="relative z-10 pt-28 pb-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SoftReveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-brand">
            Portfolio
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Products you can open today
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            A short list of live builds. For process and trade-offs, open the
            matching case study.
          </p>
        </SoftReveal>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:gap-5">
          {projects.map((project, i) => {
            const caseHref = project.caseStudySlug
              ? `/case-studies/${project.caseStudySlug}`
              : "/case-studies";
            return (
              <li key={project.id}>
                <SoftReveal delay={i * 40}>
                  <article className="overflow-hidden rounded-md border border-border/60 bg-background/60 backdrop-blur-sm transition-colors hover:border-accent-brand/40">
                    <Link
                      href={caseHref}
                      className="relative block aspect-[16/9] max-h-44 overflow-hidden bg-muted"
                    >
                      <Image
                        src={project.imageUrl}
                        alt={project.imageAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </Link>
                    <div className="p-5">
                      <p className="text-xs text-muted-foreground">
                        {project.category} ·{" "}
                        <span className="text-accent-brand">{project.status}</span>
                      </p>
                      <h2 className="mt-2 text-xl font-semibold">
                        <Link
                          href={caseHref}
                          className="hover:text-accent-brand"
                        >
                          {project.title}
                        </Link>
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-4 text-sm">
                        <Link
                          href={caseHref}
                          className="font-medium text-accent-brand underline-offset-4 hover:underline"
                        >
                          {ctaLabels.readCaseStudy}
                        </Link>
                        {project.liveUrl ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
                          >
                            Live
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </article>
                </SoftReveal>
              </li>
            );
          })}
        </ul>
      </div>
      <BentoShowcase />
    </div>
  );
}
