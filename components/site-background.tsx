'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { prefersReducedMotion } from '@/lib/gsap';

const MoltenMetal = dynamic(() => import('@/components/ui/molten-metal'), {
  ssr: false,
  loading: () => null,
});

export function SiteBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    setReduceMotion(prefersReducedMotion());
  }, []);

  const isDark = resolvedTheme === 'dark';

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Theme-aware base: matches html.dark from next-themes script (no light flash) */}
      <div className="absolute inset-0 bg-[#e6efe8] dark:bg-[#050807]" />

      {mounted ? (
        <div
          className="absolute inset-0"
          style={{ opacity: isDark ? 1 : 0.92 }}
        >
          <MoltenMetal
            color1={isDark ? '#063528' : '#7ec9a8'}
            color2={isDark ? '#3dba8f' : '#0f6e56'}
            color3={isDark ? '#e8fff4' : '#f7fffb'}
            speed={reduceMotion ? 0.04 : isDark ? 0.3 : 0.26}
            scale={isDark ? 4 : 3.5}
            detail={3}
            glow={isDark ? 1.55 : 1.4}
            coreSize={isDark ? 0.1 : 0.12}
            swirl={1}
            fold={-0.2}
            blackPoint={isDark ? 0.05 : 0.06}
            brightness={isDark ? 1.25 : 1.2}
            colorMode={isDark ? 'molten' : 'frost'}
            grain
            grainIntensity={isDark ? 0.045 : 0.035}
            mouseInteraction={!reduceMotion}
            mouseStrength={isDark ? 0.28 : 0.22}
            opacity={1}
          />
        </div>
      ) : null}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_60%_at_75%_25%,rgba(15,110,86,0.14),transparent_58%),radial-gradient(ellipse_65%_45%_at_20%_75%,rgba(15,110,86,0.1),transparent_52%),linear-gradient(180deg,rgba(230,239,232,0.35)_0%,rgba(230,239,232,0.15)_45%,rgba(230,239,232,0.55)_100%)] dark:bg-[radial-gradient(ellipse_70%_55%_at_50%_30%,rgba(5,8,7,0.22),rgba(5,8,7,0.52)_70%,rgba(5,8,7,0.7)),linear-gradient(180deg,rgba(5,8,7,0.3)_0%,transparent_40%,rgba(5,8,7,0.48)_100%)]" />
    </div>
  );
}

export default SiteBackground;
