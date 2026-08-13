"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const WorldCoverageMap = dynamic(
  () =>
    import("@/components/ui/world-coverage-map").then(
      (mod) => mod.WorldCoverageMap
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full animate-pulse bg-foreground/4"
        style={{ height: "clamp(280px, 44vw, 520px)" }}
        aria-hidden
      />
    ),
  }
);

/** Flat world coverage map on About - lazy loaded, SVG via react-simple-maps. */
export function DottedMapBand({ className }: { className?: string }) {
  return (
    <section
      id="map"
      className={cn("relative w-full bg-transparent py-14 md:py-16", className)}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-brand">
          Global coverage
        </p>
        <h2 className="mt-3 max-w-2xl text-[clamp(1.75rem,5vw,2.25rem)] font-semibold tracking-tight text-foreground">
          Remote delivery across major markets
        </h2>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Lahore home base, clients and teams across the Americas, Europe, Gulf,
          Africa, and Asia-Pacific.
        </p>
      </div>

      <div className="mt-10 w-full">
        <WorldCoverageMap />
      </div>
    </section>
  );
}
