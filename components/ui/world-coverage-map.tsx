"use client";

import { geoInterpolate } from "d3-geo";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  useMapContext,
} from "react-simple-maps";
import { useTheme } from "next-themes";
import {
  GLOBAL_MARKERS,
  HOME_MARKER,
  type GlobalMarker,
} from "@/lib/content/global-markers";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const GEO_URL = "/geo/world-110m.json";
const ARC_STEPS = 24;
const MAP_ASPECT = 0.44;

type ArcProps = {
  from: [number, number];
  to: [number, number];
  stroke: string;
  strokeWidth?: number;
};

function HubArc({ from, to, stroke, strokeWidth = 0.85 }: ArcProps) {
  const { projection } = useMapContext();

  const d = useMemo(() => {
    if (!projection) return "";
    const interpolate = geoInterpolate(from, to);
    const points: [number, number][] = [];

    for (let i = 0; i <= ARC_STEPS; i += 1) {
      const projected = projection(interpolate(i / ARC_STEPS));
      if (projected) points.push(projected);
    }

    if (points.length < 2) return "";
    return `M${points.map(([x, y]) => `${x},${y}`).join("L")}`;
  }, [from, projection, to]);

  if (!d) return null;

  return (
    <path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      opacity={0.9}
    />
  );
}

type MapMarkerProps = {
  marker: GlobalMarker;
  palette: {
    marker: string;
    home: string;
    ring: string;
  };
  isDark: boolean;
};

function MapMarker({ marker, palette, isDark }: MapMarkerProps) {
  const hit = marker.home ? 22 : 16;

  return (
    <Marker coordinates={marker.coordinates}>
      {marker.home ? (
        <circle
          r={11}
          fill="none"
          stroke={palette.ring}
          strokeWidth={1}
          opacity={0.55}
          pointerEvents="none"
        />
      ) : null}
      <circle
        r={marker.home ? 5.5 : 3.4}
        fill={marker.home ? palette.home : palette.marker}
        stroke={isDark ? "#050807" : "#e6efe8"}
        strokeWidth={marker.home ? 1.75 : 1.1}
        opacity={marker.home ? 1 : 0.94}
        pointerEvents="none"
      />
      <foreignObject
        x={-hit / 2}
        y={-hit / 2}
        width={hit}
        height={hit}
        className="overflow-visible"
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              aria-label={`${marker.label}, ${marker.niche}`}
              className="block h-full w-full cursor-pointer rounded-full border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-accent-brand/70"
            />
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={8}>
            <p className="font-medium leading-none">{marker.label}</p>
            <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
              {marker.niche}
            </p>
          </TooltipContent>
        </Tooltip>
      </foreignObject>
    </Marker>
  );
}

type WorldCoverageMapProps = {
  className?: string;
  markers?: GlobalMarker[];
};

export function WorldCoverageMap({
  className,
  markers = GLOBAL_MARKERS,
}: WorldCoverageMapProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mapSize, setMapSize] = useState({ width: 1200, height: 528 });
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const node = hostRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px 0px", threshold: 0.05 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = hostRef.current;
    if (!node || !visible) return;

    const updateSize = () => {
      const width = Math.max(node.clientWidth, 320);
      setMapSize({
        width,
        height: Math.round(width * MAP_ASPECT),
      });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  const isDark = mounted ? resolvedTheme !== "light" : true;

  const palette = useMemo(
    () => ({
      ocean: isDark ? "#070b09" : "#e8f0eb",
      land: isDark ? "#162019" : "#c5d6cb",
      landHover: isDark ? "#1f2d26" : "#b4c9bc",
      marker: isDark ? "#45c99a" : "#0f6e56",
      home: "#3dba8f",
      line: isDark ? "rgba(61, 186, 143, 0.28)" : "rgba(15, 110, 86, 0.24)",
      ring: isDark ? "rgba(61, 186, 143, 0.35)" : "rgba(15, 110, 86, 0.3)",
    }),
    [isDark]
  );

  const hubLines = useMemo(
    () =>
      markers
        .filter((m) => !m.home)
        .map((m) => ({
          id: m.id,
          from: HOME_MARKER.coordinates,
          to: m.coordinates,
        })),
    [markers]
  );

  const projectionScale = mapSize.width * 0.185;

  if (!visible) {
    return (
      <div
        ref={hostRef}
        className={cn("w-full animate-pulse bg-foreground/4", className)}
        style={{ height: mapSize.height }}
        aria-hidden
      />
    );
  }

  return (
    <TooltipProvider delayDuration={0} skipDelayDuration={0}>
      <div
        ref={hostRef}
        className={cn("relative w-full overflow-hidden", className)}
        style={{
          height: mapSize.height,
          background: `radial-gradient(130% 95% at 50% 55%, ${palette.ocean} 0%, transparent 75%)`,
        }}
        role="img"
        aria-label="World map showing global collaboration regions"
      >
        <ComposableMap
          projection="geoEqualEarth"
          projectionConfig={{ scale: projectionScale, center: [12, 2] }}
          width={mapSize.width}
          height={mapSize.height}
          className="h-full w-full"
          style={{ width: "100%", height: "100%" }}
        >
          <Geographies geography={GEO_URL} style={{ pointerEvents: "none" }}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={palette.land}
                  stroke="none"
                  style={{
                    default: { outline: "none" },
                    hover: { fill: palette.landHover, outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {hubLines.map((line) => (
            <HubArc
              key={line.id}
              from={line.from}
              to={line.to}
              stroke={palette.line}
            />
          ))}

          {markers.map((marker) => (
            <MapMarker
              key={marker.id}
              marker={marker}
              palette={palette}
              isDark={isDark}
            />
          ))}
        </ComposableMap>
      </div>
    </TooltipProvider>
  );
}
