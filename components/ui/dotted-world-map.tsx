"use client";

import DottedMap from "dotted-map";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { SoftReveal } from "@/components/motion/kino-root";
import { cn } from "@/lib/utils";

const PINS = [
  { lat: 31.5204, lng: 74.3587, label: "Lahore", home: true },
  { lat: 24.8607, lng: 67.0011, label: "Karachi" },
  { lat: 25.2048, lng: 55.2708, label: "Dubai" },
  { lat: 24.7136, lng: 46.6753, label: "Riyadh" },
  { lat: 51.5074, lng: -0.1278, label: "London" },
  { lat: 52.52, lng: 13.405, label: "Berlin" },
  { lat: 48.8566, lng: 2.3522, label: "Paris" },
  { lat: 52.3676, lng: 4.9041, label: "Amsterdam" },
  { lat: 40.7128, lng: -74.006, label: "New York" },
  { lat: 37.7749, lng: -122.4194, label: "San Francisco" },
  { lat: 43.6532, lng: -79.3832, label: "Toronto" },
  { lat: 41.8781, lng: -87.6298, label: "Chicago" },
  { lat: -23.5505, lng: -46.6333, label: "Sao Paulo" },
  { lat: 1.3521, lng: 103.8198, label: "Singapore" },
  { lat: 35.6762, lng: 139.6503, label: "Tokyo" },
  { lat: -33.8688, lng: 151.2093, label: "Sydney" },
  { lat: 19.076, lng: 72.8777, label: "Mumbai" },
  { lat: 6.5244, lng: 3.3792, label: "Lagos" },
] as const;

type DottedWorldMapProps = {
  className?: string;
  height?: number;
};

export function DottedWorldMap({ className, height = 220 }: DottedWorldMapProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme !== "light";

  const svgMap = useMemo(() => {
    if (!mounted) return "";
    const map = new DottedMap({ height, grid: "diagonal" });
    for (const pin of PINS) {
      map.addPin({
        lat: pin.lat,
        lng: pin.lng,
        svgOptions: {
          color: "home" in pin && pin.home ? "#3dba8f" : "#0f6e56",
          radius: "home" in pin && pin.home ? 0.5 : 0.3,
        },
      });
    }

    return map.getSVG({
      radius: 0.26,
      color: isDark ? "#3a4640" : "#9aafa3",
      shape: "circle",
      backgroundColor: "transparent",
    });
  }, [height, isDark, mounted]);

  if (!mounted) {
    return (
      <div
        className={cn("w-full bg-transparent", className)}
        style={{ minHeight: height }}
        aria-hidden
      />
    );
  }

  return (
    <div
      className={cn("bg-transparent", className)}
      role="img"
      aria-label="World map with collaboration regions marked"
      dangerouslySetInnerHTML={{ __html: svgMap }}
    />
  );
}

/** Mid-page coverage map - no CTA strip, no footer adjacency. */
export function DottedMapBand({ className }: { className?: string }) {
  return (
    <section
      id="map"
      className={cn("relative w-full bg-transparent py-14 md:py-16", className)}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SoftReveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-brand">
            Coverage
          </p>
          <h2 className="mt-3 max-w-2xl text-[clamp(1.75rem,5vw,2.25rem)] font-semibold tracking-tight">
            Built to collaborate across the map
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            A flat view of the same remote footprint. Simple pins, full width.
          </p>
        </SoftReveal>
      </div>

      <div className="mt-8 w-full bg-transparent">
        <DottedWorldMap
          height={280}
          className="w-full [&_svg]:block [&_svg]:h-auto [&_svg]:w-full"
        />
      </div>
    </section>
  );
}
