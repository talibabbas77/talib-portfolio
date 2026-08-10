"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { projects } from "@/lib/site-content";
import { revealSection } from "@/lib/gsap";
import { TiltCard } from "@/components/tilt-card";

export function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    revealSection(ref.current);
  }, []);

  return (
    <section
      ref={ref}
      id="projects"
      className="relative flex min-h-dvh items-center overflow-hidden py-24"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 md:mb-8">
          <div className="max-w-2xl space-y-2">
            <p
              data-reveal
              className="text-sm font-medium uppercase tracking-[0.2em] text-accent-brand"
            >
              Work
            </p>
            <h2
              data-reveal
              className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl"
            >
              Selected products I shipped
            </h2>
          </div>
          <p data-reveal className="text-sm text-muted-foreground">
            Hover a card · open live site
          </p>
        </div>

        <ul className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">
          {projects.map((project) => (
            <li data-reveal key={project.id}>
              <TiltCard className="h-full">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid h-full grid-rows-[auto_1fr] overflow-hidden border border-border/60 bg-background/50 transition-colors hover:border-accent-brand/45 hover:bg-background"
                >
                  <div className="relative aspect-[16/9] max-h-36 overflow-hidden bg-muted sm:max-h-40 lg:max-h-44">
                    <Image
                      src={project.imageUrl}
                      alt={project.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 bg-white px-2.5 py-1 text-xs font-medium text-black opacity-0 translate-y-2 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      Live
                      <ExternalLink className="h-3.5 w-3.5" />
                    </span>
                  </div>
                  <div className="flex flex-col p-4 md:p-5">
                    <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{project.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-accent-brand">{project.status}</span>
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-accent-brand md:text-xl">
                      {project.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                    <p className="mt-auto pt-3 text-xs text-muted-foreground">
                      {project.technologies.slice(0, 4).join(" · ")}
                    </p>
                  </div>
                </a>
              </TiltCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
