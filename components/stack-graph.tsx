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
    body: "We align on the feature, users, and what done looks like before any code lands.",
  },
  {
    id: "ui",
    label: "UI",
    title: "Ship the interface people touch",
    body: "Next.js or React surfaces with Tailwind. Clear layouts, no fluff chrome.",
  },
  {
    id: "api",
    label: "API",
    title: "Wire the backend path",
    body: "Node and Express routes with auth, validation, and predictable errors.",
  },
  {
    id: "data",
    label: "Data",
    title: "Store what has to survive",
    body: "MongoDB, Postgres, Redis, or Supabase depending on the product shape.",
  },
  {
    id: "edges",
    label: "Edges",
    title: "Connect Shopify, CRM, or AI when needed",
    body: "Liquid themes, GoHighLevel OAuth, OpenAI or Gemini. Only where they earn their keep.",
  },
  {
    id: "ship",
    label: "Ship",
    title: "Deploy and stay for production",
    body: "Vercel or the host you already use. Then fix what only shows up after release.",
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
      start: "top top",
      end: () => `+=${LAST * Math.max(window.innerHeight * 0.55, 320)}`,
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
      <div
        ref={pinRef}
        className="flex min-h-dvh flex-col justify-center py-16 md:py-20"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SoftReveal>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-brand">
              How work connects
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
              UI, APIs, data, and integrations in one path
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              {scrollDriven
                ? "Scroll through the delivery path. Click a step anytime to jump."
                : "Pick a step to see what happens at that stage."}
            </p>
          </SoftReveal>

          <SoftReveal delay={40}>
            <div className="mt-10 grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-14">
              <ol className="relative border-l border-border/60">
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
                          "flex w-full items-start gap-3 py-3 pl-6 text-left transition-colors",
                          isActive
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <span
                          className={cn(
                            "absolute left-0 top-4 flex h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 transition-colors",
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
                              "mt-1 block text-sm font-medium leading-snug",
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

              <div className="flex min-h-[280px] flex-col">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-brand">
                  Step {active + 1} of {STEPS.length}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-xl flex-1 text-base leading-relaxed text-muted-foreground">
                  {step.body}
                </p>

                <div className="mt-10 flex items-center justify-between gap-4 border-t border-border/50 pt-5">
                  {prev ? (
                    <button
                      type="button"
                      onClick={() => goToStep(active - 1)}
                      className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <ChevronLeft
                        className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
                        strokeWidth={1.75}
                      />
                      <span>
                        <span className="block text-[10px] uppercase tracking-[0.14em] opacity-70">
                          Back
                        </span>
                        <span className="font-medium text-foreground/90">
                          {prev.label}
                        </span>
                      </span>
                    </button>
                  ) : (
                    <span />
                  )}

                  <div className="flex items-center gap-1.5" aria-hidden>
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
                      className="group inline-flex items-center gap-1.5 text-right text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <span>
                        <span className="block text-[10px] uppercase tracking-[0.14em] opacity-70">
                          Next
                        </span>
                        <span className="font-medium text-foreground/90">
                          {next.label}
                        </span>
                      </span>
                      <ChevronRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        strokeWidth={1.75}
                      />
                    </button>
                  ) : (
                    <span />
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
