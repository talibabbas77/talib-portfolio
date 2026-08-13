"use client";

import { useEffect, useRef } from "react";
import { aboutCopy, experience } from "@/lib/site-content";
import { revealSection } from "@/lib/gsap";

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    return revealSection(ref.current);
  }, []);

  return (
    <section
      ref={ref}
      id="about"
      className="relative flex min-h-0 items-center py-16 sm:min-h-dvh sm:py-24"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="space-y-6">
            <p
              data-reveal
              className="text-sm font-medium uppercase tracking-[0.2em] text-accent-brand"
            >
              {aboutCopy.title}
            </p>
            <h2
              data-reveal
              className="max-w-xl text-3xl font-semibold tracking-tight md:text-5xl"
            >
              {aboutCopy.lead}
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              {aboutCopy.paragraphs.map((p) => (
                <p data-reveal key={p.slice(0, 24)}>
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {aboutCopy.highlights.map((item) => (
                <div
                  data-reveal
                  key={item.label}
                  className="group border border-border/60 bg-background/50 p-4 transition-colors hover:border-accent-brand/50 hover:bg-background"
                >
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="mt-1 text-xl font-semibold transition-colors group-hover:text-accent-brand">
                    {item.value}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>

            <div data-reveal className="space-y-1">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Experience
              </p>
              {experience.map((job) => (
                <div
                  key={job.company}
                  className="group flex flex-col gap-1 border-b border-border/60 py-3 transition-colors last:border-0 hover:border-accent-brand/40"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-semibold group-hover:text-accent-brand">
                      {job.role}
                    </p>
                    <p className="text-sm text-muted-foreground">{job.period}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {job.company} · {job.location}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
