"use client";

import { useEffect, useRef } from "react";
import {
  SiDocker,
  SiExpress,
  SiGooglegemini,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiShopify,
  SiStripe,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { Bot, Cloud, Database, Server } from "lucide-react";
import { revealSection } from "@/lib/gsap";

const TILES = [
  { id: "next", label: "Next.js", icon: <SiNextdotjs /> },
  { id: "react", label: "React", icon: <SiReact /> },
  { id: "ts", label: "TypeScript", icon: <SiTypescript /> },
  { id: "js", label: "JavaScript", icon: <SiJavascript /> },
  { id: "node", label: "Node.js", icon: <SiNodedotjs /> },
  { id: "express", label: "Express", icon: <SiExpress /> },
  { id: "mongo", label: "MongoDB", icon: <SiMongodb /> },
  { id: "postgres", label: "Postgres", icon: <SiPostgresql /> },
  { id: "redis", label: "Redis", icon: <SiRedis /> },
  { id: "supabase", label: "Supabase", icon: <SiSupabase /> },
  { id: "docker", label: "Docker", icon: <SiDocker /> },
  { id: "aws", label: "AWS", icon: <FaAws /> },
  { id: "azure", label: "Azure", icon: <Cloud /> },
  { id: "vercel", label: "Vercel", icon: <SiVercel /> },
  { id: "tailwind", label: "Tailwind", icon: <SiTailwindcss /> },
  { id: "stripe", label: "Stripe", icon: <SiStripe /> },
  { id: "shopify", label: "Shopify", icon: <SiShopify /> },
  { id: "openai", label: "OpenAI", icon: <Bot /> },
  { id: "gemini", label: "Gemini", icon: <SiGooglegemini /> },
  { id: "api", label: "REST APIs", icon: <Server /> },
  { id: "data", label: "Data models", icon: <Database /> },
] as const;

export function SkillsSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    revealSection(ref.current);
  }, []);

  return (
    <section
      ref={ref}
      id="skills"
      className="relative py-20 md:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl space-y-3">
          <p
            data-reveal
            className="text-sm font-medium uppercase tracking-[0.2em] text-accent-brand"
          >
            Skills
          </p>
          <h2
            data-reveal
            className="text-3xl font-semibold tracking-tight md:text-5xl"
          >
            Tools for products that need to scale
          </h2>
          <p data-reveal className="text-lg text-muted-foreground">
            Frontend, APIs, data, cloud, and AI - the stack I use on client work.
          </p>
        </div>

        <div
          data-reveal
          className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 lg:gap-3"
        >
          {TILES.map((tile) => (
            <div
              key={tile.id}
              className="group flex aspect-square flex-col items-center justify-center gap-1.5 rounded-md border border-border/60 bg-background/70 p-2 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-brand/40 hover:bg-background hover:shadow-[0_16px_40px_-28px_rgba(15,110,86,0.35)] sm:gap-2.5 sm:p-3 dark:bg-background/45 dark:shadow-none"
            >
              <div className="text-muted-foreground transition-colors group-hover:text-accent-brand [&>svg]:h-5 [&>svg]:w-5 sm:[&>svg]:h-7 sm:[&>svg]:w-7">
                {tile.icon}
              </div>
              <span className="line-clamp-2 px-0.5 text-center text-[9px] font-medium uppercase leading-tight tracking-wider text-muted-foreground transition-colors group-hover:text-foreground sm:px-1 sm:text-[11px]">
                {tile.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
