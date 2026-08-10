"use client";

import { useEffect, useRef } from "react";
import { services } from "@/lib/site-content";
import { revealSection } from "@/lib/gsap";

export function ServicesSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    revealSection(ref.current);
  }, []);

  return (
    <section ref={ref} id="services" className="relative py-20 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl space-y-3">
          <p
            data-reveal
            className="text-sm font-medium uppercase tracking-[0.2em] text-accent-brand"
          >
            Services
          </p>
          <h2
            data-reveal
            className="text-3xl font-semibold tracking-tight md:text-5xl"
          >
            What I take on for clients
          </h2>
          <p data-reveal className="text-lg text-muted-foreground">
            Clear scopes from the work I already ship - not a menu of buzzwords.
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:gap-5">
          {services.map((service) => (
            <li
              data-reveal
              key={service.title}
              className="border border-border/60 bg-background/60 p-5 backdrop-blur-sm transition-colors hover:border-accent-brand/40 sm:p-6"
            >
              <h3 className="text-lg font-semibold text-foreground">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {service.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
