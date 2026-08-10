"use client";

import { aboutCopy } from "@/lib/site-content";

export function TechMarquee() {
  const items = [...aboutCopy.techStrip, ...aboutCopy.techStrip];

  return (
    <div className="relative overflow-hidden border-y border-border/50 py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
      <div className="tech-marquee flex w-max gap-10 whitespace-nowrap">
        {items.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-accent-brand"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
