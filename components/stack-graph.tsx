"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SoftReveal } from "@/components/motion/kino-root";
import {
  prefersReducedMotion,
  registerGsap,
  ScrollTrigger,
} from "@/lib/gsap";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    id: "brief",
    label: "Brief",
    title: "Clarify the product and outcome",
    body: "Before any code lands, we lock the feature, the users, and what done looks like. That keeps later UI and API work pointed at a real release, not a moving target.",
    points: [
      "Define the user flow and the one outcome this slice has to hit.",
      "List must-haves vs. nice-to-haves so scope stays honest.",
      "Agree on timeline, stack constraints, and who signs off.",
    ],
    tools: ["Scope doc", "User flow", "Acceptance criteria"],
  },
  {
    id: "ui",
    label: "UI",
    title: "Ship the interface people touch",
    body: "Next.js or React surfaces with Tailwind and component libraries where they help. Layouts stay readable on mobile, forms handle loading and errors, and chrome stays out of the way.",
    points: [
      "Page structure, navigation, and responsive breakpoints.",
      "Forms, tables, and empty states that match real data.",
      "Accessible focus states and predictable interaction patterns.",
    ],
    tools: ["Next.js", "React", "Tailwind", "Shadcn/UI"],
  },
  {
    id: "api",
    label: "API",
    title: "Wire the backend path",
    body: "Node and Express routes carry auth, validation, and predictable errors back to the UI. Endpoints stay small, typed where it matters, and easy to extend when the product grows.",
    points: [
      "REST routes with input validation and consistent error shapes.",
      "Session or token auth wired to the roles the product needs.",
      "Webhooks and third-party callbacks handled without silent failures.",
    ],
    tools: ["Node.js", "Express", "TypeScript", "JWT / OAuth"],
  },
  {
    id: "data",
    label: "Data",
    title: "Store what has to survive",
    body: "MongoDB, Postgres, Redis, or Supabase depending on the product shape. Schemas match how the app reads and writes, with indexes and caching only where they earn their keep.",
    points: [
      "Model entities, relations, and migrations before UI depends on them.",
      "Query paths tuned for the screens users actually open.",
      "Redis or edge cache when repeat reads would slow the app down.",
    ],
    tools: ["MongoDB", "Postgres", "Redis", "Supabase"],
  },
  {
    id: "edges",
    label: "Edges",
    title: "Connect Shopify, CRM, or AI when needed",
    body: "Liquid themes, GoHighLevel OAuth, and OpenAI or Gemini hooks go in only where the product needs them. Integrations get logging, retries, and token budgets so they do not become production surprises.",
    points: [
      "Shopify sections, cart logic, and theme templates for storefront work.",
      "GoHighLevel pipelines, tagging, and contact sync via OAuth 2.0.",
      "AI features with prompt boundaries and usage kept in check.",
    ],
    tools: ["Shopify Liquid", "GoHighLevel", "OpenAI", "Gemini"],
  },
  {
    id: "ship",
    label: "Ship",
    title: "Deploy and stay for production",
    body: "Vercel or the host you already use, with staging and production kept separate. After release I stay for the bugs that only show up under real traffic, analytics, and client edge cases.",
    points: [
      "Preview builds, env vars, and clean promotion to production.",
      "Smoke checks on auth, payments, and integration callbacks.",
      "Fixes for race conditions, mobile quirks, and CRM sync gaps.",
    ],
    tools: ["Vercel", "CI/CD", "Staging", "Monitoring"],
  },
] as const;

const LAST = STEPS.length - 1;

function stepFromProgress(progress: number) {
  return Math.min(LAST, Math.max(0, Math.round(progress * LAST)));
}

export function StackGraph({ className }: { className?: string }) {
  const pinRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [scrollDriven, setScrollDriven] = useState(false);

  const step = STEPS[active];
  const prev = active > 0 ? STEPS[active - 1] : null;
  const next = active < LAST ? STEPS[active + 1] : null;

  useEffect(() => {
    if (prefersReducedMotion()) {
      setScrollDriven(false);
      return;
    }

    registerGsap();
    const pin = pinRef.current;
    if (!pin) return;

    setScrollDriven(true);

    const syncActive = (progress: number) => {
      const nextIndex = stepFromProgress(progress);
      if (nextIndex === activeRef.current) return;
      activeRef.current = nextIndex;
      setActive(nextIndex);
    };

    const st = ScrollTrigger.create({
      trigger: pin,
      start: "top 7.5rem",
      end: () => `+=${LAST * Math.max(window.innerHeight * 0.42, 280)}`,
      pin: true,
      scrub: 0.4,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => syncActive(self.progress),
      snap: {
        snapTo: (value) => Math.round(value * LAST) / LAST,
        duration: { min: 0.08, max: 0.22 },
        ease: "power1.inOut",
      },
    });

    triggerRef.current = st;
    syncActive(st.progress);

    return () => {
      st.kill();
      triggerRef.current = null;
    };
  }, []);

  const goToStep = (index: number) => {
    const clamped = Math.min(LAST, Math.max(0, index));
    const st = triggerRef.current;

    if (!st || prefersReducedMotion()) {
      activeRef.current = clamped;
      setActive(clamped);
      return;
    }

    const progress = LAST === 0 ? 0 : clamped / LAST;
    const y = st.start + (st.end - st.start) * progress;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section id="stack" className={cn("relative", className)}>
      <div ref={pinRef} className="pb-10 pt-28 md:pb-12 md:pt-32">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SoftReveal>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-brand">
              How work connects
            </p>
            <h2 className="mt-2 max-w-2xl text-2xl font-semibold tracking-tight md:text-3xl">
              UI, APIs, data, and integrations in one path
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              {scrollDriven
                ? "Scroll through the delivery path. Click a step anytime to jump."
                : "Pick a step to see what happens at that stage."}
            </p>
          </SoftReveal>

          <SoftReveal delay={40}>
            <div className="mt-6 space-y-4 lg:space-y-0 lg:grid lg:items-start lg:gap-10 lg:grid-cols-[11rem_1fr] xl:grid-cols-[13rem_1fr]">
              <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-thin lg:hidden">
                {STEPS.map((item, index) => {
                  const isActive = index === active;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => goToStep(index)}
                      aria-current={isActive ? "step" : undefined}
                      className={cn(
                        "shrink-0 rounded-full border px-3 py-1.5 text-left transition-colors",
                        isActive
                          ? "border-accent-brand bg-accent-brand/10 text-foreground"
                          : "border-border/60 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-brand">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <ol className="relative hidden h-80 border-l border-border/60 lg:block lg:h-96">
                {STEPS.map((item, index) => {
                  const isActive = index === active;
                  const isDone = index < active;
                  return (
                    <li key={item.id} className="relative">
                      <button
                        type="button"
                        onClick={() => goToStep(index)}
                        aria-current={isActive ? "step" : undefined}
                        className={cn(
                          "flex w-full items-start gap-3 py-2 pl-5 text-left transition-colors",
                          isActive
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <span
                          className={cn(
                            "absolute left-0 top-3.5 flex h-2 w-2 -translate-x-1/2 rounded-full border-2 transition-colors",
                            isActive || isDone
                              ? "border-accent-brand bg-accent-brand"
                              : "border-border bg-background"
                          )}
                          aria-hidden
                        />
                        <span className="min-w-0">
                          <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-brand">
                            {String(index + 1).padStart(2, "0")} · {item.label}
                          </span>
                          <span
                            className={cn(
                              "mt-0.5 block text-[13px] font-medium leading-snug",
                              isActive
                                ? "text-foreground"
                                : "text-muted-foreground"
                            )}
                          >
                            {item.title}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>

              <div className="flex min-h-[18rem] flex-col overflow-hidden rounded-md border border-border/40 bg-background/20 p-4 sm:min-h-[20rem] sm:p-6 lg:min-h-[24rem] lg:h-96">
                <div className="shrink-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-brand">
                    Step {active + 1} of {STEPS.length}
                  </p>
                  <h3 className="mt-2 line-clamp-2 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                    {step.title}
                  </h3>
                </div>

                <div className="mt-3 min-h-0 flex-1 overflow-y-auto pr-1 scrollbar-thin">
                  <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>

                  <ul className="mt-4 space-y-2 border-t border-border/40 pt-4">
                    {step.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-2.5 text-[13px] leading-relaxed text-foreground/90"
                      >
                        <span
                          className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-brand"
                          aria-hidden
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-1.5 pb-1">
                    {step.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-sm border border-border/50 bg-background/40 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-3 flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-border/50 pt-4 sm:flex-nowrap sm:gap-4">
                  {prev ? (
                    <button
                      type="button"
                      onClick={() => goToStep(active - 1)}
                      className="group inline-flex min-w-0 max-w-[45%] items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:max-w-none"
                    >
                      <ChevronLeft
                        className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-x-0.5"
                        strokeWidth={1.75}
                      />
                      <span className="min-w-0 truncate">
                        <span className="hidden text-[10px] uppercase tracking-[0.14em] opacity-70 sm:block">
                          Back
                        </span>
                        <span className="font-medium text-foreground/90">
                          {prev.label}
                        </span>
                      </span>
                    </button>
                  ) : (
                    <span className="shrink-0" />
                  )}

                  <div className="flex shrink-0 items-center gap-1.5" aria-hidden>
                    {STEPS.map((item, index) => (
                      <span
                        key={item.id}
                        className={cn(
                          "h-1 rounded-full transition-all",
                          index === active
                            ? "w-5 bg-accent-brand"
                            : "w-1.5 bg-border"
                        )}
                      />
                    ))}
                  </div>

                  {next ? (
                    <button
                      type="button"
                      onClick={() => goToStep(active + 1)}
                      className="group inline-flex min-w-0 max-w-[45%] items-center justify-end gap-1.5 text-right text-sm text-muted-foreground transition-colors hover:text-foreground sm:max-w-none"
                    >
                      <span className="min-w-0 truncate">
                        <span className="hidden text-[10px] uppercase tracking-[0.14em] opacity-70 sm:block">
                          Next
                        </span>
                        <span className="font-medium text-foreground/90">
                          {next.label}
                        </span>
                      </span>
                      <ChevronRight
                        className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                        strokeWidth={1.75}
                      />
                    </button>
                  ) : (
                    <span className="shrink-0" />
                  )}
                </div>
              </div>
            </div>
          </SoftReveal>
        </div>
      </div>
    </section>
  );
}
