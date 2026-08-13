"use client";

import { SoftReveal } from "@/components/motion/soft-reveal";
import { experience } from "@/lib/site-content";

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-16 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SoftReveal>
          <div className="mb-10 max-w-2xl space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-brand">
              Experience
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
              Roles where I owned the feature end to end
            </h2>
          </div>

          <ol className="space-y-10">
            {experience.map((role) => (
              <li
                key={`${role.company}-${role.period}`}
                className="grid gap-4 border-t border-border/60 pt-6 sm:gap-6 sm:pt-8 lg:grid-cols-[minmax(0,17.5rem)_1fr] lg:gap-12"
              >
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-foreground">
                    {role.role}
                  </p>
                  <p className="text-accent-brand">{role.company}</p>
                  <p className="text-sm text-muted-foreground">{role.period}</p>
                  <p className="text-sm text-muted-foreground">{role.location}</p>
                </div>
                <ul className="space-y-3 text-base leading-relaxed text-muted-foreground">
                  {role.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-brand"
                        aria-hidden
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </SoftReveal>
      </div>
    </section>
  );
}
