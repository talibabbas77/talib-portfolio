"use client";

import createGlobe from "cobe";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { prefersReducedMotion } from "@/lib/gsap";
import { SoftReveal } from "@/components/motion/kino-root";
import { cn } from "@/lib/utils";

export type GlobeMarker = {
  id: string;
  label: string;
  niche: string;
  location: [number, number];
  size?: number;
};

/** Major markets + niches. First entry is home (Lahore). */
export const DEFAULT_MARKERS: GlobeMarker[] = [
  { id: "lahore", label: "Lahore", niche: "Home base", location: [31.5204, 74.3587], size: 0.08 },
  { id: "karachi", label: "Karachi", niche: "Regional clients", location: [24.8607, 67.0011], size: 0.04 },
  { id: "dubai", label: "Dubai", niche: "E-commerce & Shopify", location: [25.2048, 55.2708], size: 0.05 },
  { id: "riyadh", label: "Riyadh", niche: "Product builds", location: [24.7136, 46.6753], size: 0.04 },
  { id: "london", label: "London", niche: "Web apps & APIs", location: [51.5074, -0.1278], size: 0.05 },
  { id: "berlin", label: "Berlin", niche: "Startups & MVPs", location: [52.52, 13.405], size: 0.04 },
  { id: "amsterdam", label: "Amsterdam", niche: "SaaS teams", location: [52.3676, 4.9041], size: 0.04 },
  { id: "paris", label: "Paris", niche: "Product UI", location: [48.8566, 2.3522], size: 0.04 },
  { id: "nyc", label: "New York", niche: "SaaS & product", location: [40.7128, -74.006], size: 0.05 },
  { id: "sf", label: "San Francisco", niche: "Product engineering", location: [37.7749, -122.4194], size: 0.05 },
  { id: "toronto", label: "Toronto", niche: "CRM & automation", location: [43.6532, -79.3832], size: 0.045 },
  { id: "chicago", label: "Chicago", niche: "Internal tools", location: [41.8781, -87.6298], size: 0.04 },
  { id: "sao-paulo", label: "São Paulo", niche: "Marketplace work", location: [-23.5505, -46.6333], size: 0.04 },
  { id: "singapore", label: "Singapore", niche: "AI integrations", location: [1.3521, 103.8198], size: 0.045 },
  { id: "tokyo", label: "Tokyo", niche: "Web platforms", location: [35.6762, 139.6503], size: 0.04 },
  { id: "sydney", label: "Sydney", niche: "Remote product work", location: [-33.8688, 151.2093], size: 0.04 },
  { id: "mumbai", label: "Mumbai", niche: "Client delivery", location: [19.076, 72.8777], size: 0.04 },
  { id: "lagos", label: "Lagos", niche: "Growth products", location: [6.5244, 3.3792], size: 0.04 },
];

type CobeGlobeProps = {
  className?: string;
  size?: number;
  markers?: GlobeMarker[];
};

export function CobeGlobe({
  className,
  size = 420,
  markers = DEFAULT_MARKERS,
}: CobeGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [themeReady, setThemeReady] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setThemeReady(true);
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "120px", threshold: 0.1 }
    );
    io.observe(host);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!themeReady || !visible) return;
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;

    let width = Math.min(size, host.clientWidth || size);
    const isDark = resolvedTheme !== "light";
    const reduce = prefersReducedMotion();
    let phi = 2.2;
    let raf = 0;

    const home = markers[0]?.location ?? ([31.5204, 74.3587] as [number, number]);
    const arcs = markers
      .filter((m) => m.id !== "lahore")
      .slice(0, 8)
      .map((m) => ({ from: home, to: m.location }));

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 1.5),
      width: width * 2,
      height: width * 2,
      phi,
      theta: 0.2,
      dark: isDark ? 1 : 0,
      diffuse: 1.1,
      mapSamples: 8000,
      mapBrightness: isDark ? 5 : 6,
      baseColor: isDark ? [0.15, 0.2, 0.18] : [0.88, 0.92, 0.9],
      markerColor: isDark ? [0.24, 0.73, 0.56] : [0.06, 0.43, 0.34],
      glowColor: isDark ? [0.08, 0.1, 0.09] : [0.92, 0.95, 0.93],
      opacity: 1,
      markers: markers.map((m) => ({
        location: m.location,
        size: m.size ?? 0.04,
      })),
      arcs,
      arcColor: isDark ? [0.24, 0.73, 0.56] : [0.06, 0.43, 0.34],
      arcWidth: 0.35,
      arcHeight: 0.25,
    });

    const tick = () => {
      if (!reduce) phi += 0.0018;
      globe.update({ phi, width: width * 2, height: width * 2 });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const ro = new ResizeObserver(() => {
      width = Math.min(size, host.clientWidth || size);
    });
    ro.observe(host);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      globe.destroy();
    };
  }, [markers, resolvedTheme, size, themeReady, visible]);

  return (
    <div ref={hostRef} className={cn("relative w-full bg-transparent", className)}>
      {!visible ? (
        <div
          className="mx-auto aspect-square w-full max-w-[460px] rounded-full bg-transparent"
          aria-hidden
        />
      ) : (
        <canvas
          ref={canvasRef}
          className="mx-auto block bg-transparent"
          style={{
            width: "100%",
            maxWidth: size,
            aspectRatio: "1",
            background: "transparent",
          }}
          aria-hidden
        />
      )}
    </div>
  );
}

const LEGEND = [
  { label: "Lahore", niche: "Home base" },
  { label: "US & Canada", niche: "SaaS, product, CRM" },
  { label: "UK & EU", niche: "Web apps, startups" },
  { label: "Gulf", niche: "Shopify & commerce" },
  { label: "APAC", niche: "AI & platforms" },
  { label: "LatAm & Africa", niche: "Remote product teams" },
] as const;

export function GlobeReachSection({ className }: { className?: string }) {
  return (
    <section id="reach" className={cn("relative py-16 md:py-20", className)}>
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:px-8">
        <SoftReveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-brand">
            Remote reach
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Based in Lahore. Work across major markets and niches.
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground">
            Markers cover large hubs where I support remote delivery: SaaS,
            Shopify, CRM automation, and AI features.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4">
            {LEGEND.map((m) => (
              <li key={m.label} className="border-l border-accent-brand/50 pl-3">
                <p className="text-sm font-semibold text-foreground">{m.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{m.niche}</p>
              </li>
            ))}
          </ul>
        </SoftReveal>

        <SoftReveal delay={40}>
          <div className="flex justify-center bg-transparent p-2 sm:p-4">
            <CobeGlobe size={440} />
          </div>
        </SoftReveal>
      </div>
    </section>
  );
}
