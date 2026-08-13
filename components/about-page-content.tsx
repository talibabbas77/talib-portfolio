"use client";

import { ExperienceSection } from "@/components/experience-section";
import { CertificationsSection } from "@/components/certifications-section";
import { SoftReveal } from "@/components/motion/soft-reveal";
import { DottedMapBand } from "@/components/ui/dotted-map-band";
import { GsapButton } from "@/components/ui/gsap-button";
import { aboutCopy, ctaLabels, siteConfig } from "@/lib/site-content";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

/** About is content-heavy - keep motion to three beats, not one observer per paragraph. */
export function AboutPageContent() {
  const router = useRouter();

  return (
    <>
      <section className="page-gutter pb-8">
        <SoftReveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-brand">
            About
          </p>
          <h1 className="mt-3 text-[clamp(2rem,6vw,3rem)] font-semibold tracking-tight text-foreground">
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
            <GsapButton
              variant="primary"
              size="lg"
              onClick={() => router.push("/case-studies")}
              icon={<ArrowRight strokeWidth={1.75} />}
            >
              {ctaLabels.viewAllWork}
            </GsapButton>
            <GsapButton
              variant="secondary"
              size="lg"
              onClick={() => router.push("/contact")}
            >
              {ctaLabels.hireMe}
            </GsapButton>
          </div>
        </SoftReveal>
      </section>

      <section className="page-gutter py-12 sm:py-16">
        <SoftReveal>
          <div className="max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            {aboutCopy.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {aboutCopy.highlights.map((item) => (
              <div
                key={item.label}
                className="border border-border/60 bg-background/50 p-4"
              >
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-1 text-xl font-semibold text-foreground">
                  {item.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </div>
        </SoftReveal>
      </section>

      <DottedMapBand />
      <ExperienceSection />
      <CertificationsSection />
    </>
  );
}
