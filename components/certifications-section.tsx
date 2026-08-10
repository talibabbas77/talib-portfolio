"use client";

import { useEffect, useRef } from "react";
import { Award, GraduationCap } from "lucide-react";
import { certifications, education } from "@/lib/site-content";
import { revealSection } from "@/lib/gsap";

export function CertificationsSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    revealSection(ref.current);
  }, []);

  return (
    <section
      ref={ref}
      id="credentials"
      className="relative py-20 md:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl space-y-3">
          <p
            data-reveal
            className="text-sm font-medium uppercase tracking-[0.2em] text-accent-brand"
          >
            Credentials
          </p>
          <h2
            data-reveal
            className="text-3xl font-semibold tracking-tight md:text-5xl"
          >
            Education and certifications
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div
            data-reveal
            className="border border-border/60 bg-background/60 p-6 backdrop-blur-sm sm:p-8"
          >
            <div className="mb-5 flex items-center gap-3">
              <GraduationCap className="h-5 w-5 text-accent-brand" />
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Education
              </p>
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              {education.degree}
            </h3>
            <p className="mt-2 text-muted-foreground">{education.school}</p>
            <p className="mt-4 text-sm text-muted-foreground">
              {education.period}
            </p>
            <p className="text-sm text-muted-foreground">{education.location}</p>
          </div>

          <div
            data-reveal
            className="border border-border/60 bg-background/60 p-6 backdrop-blur-sm sm:p-8"
          >
            <div className="mb-5 flex items-center gap-3">
              <Award className="h-5 w-5 text-accent-brand" />
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Certifications
              </p>
            </div>
            <ul className="space-y-5">
              {certifications.map((cert) => (
                <li
                  key={cert.title}
                  className="border-b border-border/50 pb-5 last:border-0 last:pb-0"
                >
                  <p className="font-semibold text-foreground">{cert.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {cert.issuer} · {cert.year}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
