import Link from "next/link";
import { SoftReveal } from "@/components/motion/soft-reveal";
import { cn } from "@/lib/utils";

const CELLS = [
  {
    title: "Case studies",
    body: "How products moved from brief to deploy, with stack and outcomes written plainly.",
    href: "/case-studies",
    className: "sm:col-span-2 sm:row-span-2",
  },
  {
    title: "Portfolio",
    body: "A compact grid of live products and links.",
    href: "/portfolio",
    className: "",
  },
  {
    title: "Blog",
    body: "Short notes from client work on CRM, Shopify, and AI costs.",
    href: "/blog",
    className: "",
  },
  {
    title: "About",
    body: "Roles, education, and how I prefer to work with teams.",
    href: "/about",
    className: "sm:col-span-2",
  },
] as const;

export function BentoShowcase({ className }: { className?: string }) {
  return (
    <section className={cn("relative py-16 md:py-20", className)}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SoftReveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-brand">
            Explore
          </p>
          <h2 className="mt-3 max-w-xl text-[clamp(1.75rem,5vw,2.25rem)] font-semibold tracking-tight">
            Find the detail that matters for your hire
          </h2>
        </SoftReveal>

        <div className="mt-8 grid auto-rows-[minmax(140px,auto)] gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {CELLS.map((cell, i) => (
            <SoftReveal key={cell.href} delay={i * 24}>
              <Link
                href={cell.href}
                className={cn(
                  "flex h-full flex-col justify-between rounded-md border border-border/60 bg-background/65 p-5 backdrop-blur-sm transition-colors hover:border-accent-brand/45 hover:bg-background",
                  cell.className
                )}
              >
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {cell.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {cell.body}
                  </p>
                </div>
                <span className="mt-6 text-xs font-medium uppercase tracking-[0.14em] text-accent-brand">
                  Open
                </span>
              </Link>
            </SoftReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
