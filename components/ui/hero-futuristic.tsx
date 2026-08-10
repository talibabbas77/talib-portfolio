'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Code2, MapPin } from 'lucide-react';
import { SiGithub, SiUpwork } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa6';
import {
  aboutCopy,
  ctaLabels,
  experience,
  heroCopy,
  projects,
  siteConfig,
  socialLinks,
} from '@/lib/site-content';
import { GsapButton } from '@/components/ui/gsap-button';
import { cn } from '@/lib/utils';

function scrollToId(id: string) {
  if (id === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

const SOCIAL_ICONS = {
  GitHub: SiGithub,
  LinkedIn: FaLinkedin,
  Upwork: SiUpwork,
} as const;

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center justify-center">
    <span className="text-lg font-semibold text-foreground sm:text-xl">
      {value}
    </span>
    <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground sm:text-xs">
      {label}
    </span>
  </div>
);

export function HeroFuturistic() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 40);
    return () => window.clearTimeout(id);
  }, []);

  const tech = aboutCopy.techStrip;
  const years = aboutCopy.highlights[0]?.value ?? '2+ years';

  return (
    <div className="relative flex h-full w-full flex-col text-foreground">
      <style>{`
        @keyframes hero-fade-slide {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-trust-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .hero-trust-in {
          animation: hero-fade-slide 0.75s ease-out forwards;
          opacity: 0;
        }
        .hero-trust-marquee {
          animation: hero-trust-marquee 36s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-trust-in { animation: none; opacity: 1; }
          .hero-trust-marquee { animation: none; }
        }
      `}</style>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 content-center gap-8 px-4 pb-14 pt-24 sm:px-6 sm:pt-28 lg:grid-cols-12 lg:items-stretch lg:gap-10 lg:px-8">
        <div
          className={cn(
            'hero-trust-in flex h-full flex-col justify-between gap-8 lg:col-span-7',
            ready && 'opacity-100'
          )}
          style={{ animationDelay: ready ? '0.1s' : undefined }}
        >
          <div className="space-y-6">
            <div className="inline-flex max-w-full items-center gap-2 rounded-md border border-border/70 bg-background/70 px-3 py-1.5 backdrop-blur-md dark:border-foreground/10 dark:bg-background/40">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-brand opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-brand" />
              </span>
              <span className="truncate text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:text-xs">
                {siteConfig.availability}
              </span>
            </div>

            <div className="space-y-3 overflow-visible">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-accent-brand">
                {siteConfig.role}
              </p>
              <h1 className="max-w-full font-sans text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4.25rem] xl:leading-[1.1]">
                <span className="inline-block bg-gradient-to-br from-foreground via-foreground to-[var(--accent-brand)] bg-clip-text pr-[0.12em] pb-[0.08em] font-sans text-transparent">
                  {siteConfig.name}
                </span>
              </h1>
            </div>

            <div className="max-w-xl space-y-3">
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                {heroCopy.headline} {heroCopy.support}
              </p>
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                {heroCopy.detail}
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <GsapButton
                variant="primary"
                size="lg"
                onClick={() => router.push('/case-studies')}
                icon={<ArrowRight strokeWidth={1.75} />}
              >
                {ctaLabels.viewWork}
              </GsapButton>
              <GsapButton
                variant="secondary"
                size="lg"
                onClick={() => router.push('/contact')}
              >
                {ctaLabels.hireMe}
              </GsapButton>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-accent-brand" />
                {siteConfig.location}
              </span>
              <span className="hidden h-3 w-px bg-foreground/15 sm:block" />
              <div className="flex items-center gap-1">
                {socialLinks.map((link) => {
                  const Icon =
                    SOCIAL_ICONS[link.name as keyof typeof SOCIAL_ICONS];
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.name}
                      className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
                    >
                      {Icon ? (
                        <Icon className="h-4 w-4" aria-hidden />
                      ) : (
                        link.name
                      )}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div
          className="hero-trust-in flex h-full lg:col-span-5"
          style={{ animationDelay: ready ? '0.2s' : undefined }}
        >
          <div className="relative flex h-full w-full flex-col overflow-hidden rounded-md border border-border/70 bg-background/75 shadow-sm backdrop-blur-xl dark:border-foreground/10 dark:bg-background/40 dark:shadow-none">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent-brand/15 blur-3xl" />

            <div className="relative z-10 flex flex-1 flex-col justify-between gap-6 p-6 sm:p-7">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-brand/15 ring-1 ring-accent-brand/25">
                    <Code2 className="h-5 w-5 text-accent-brand" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                      {years}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Shipping client products
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Focus</span>
                    <span className="font-medium text-foreground">
                      {aboutCopy.highlights[1]?.value}
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
                    <div className="h-full w-[86%] rounded-full bg-gradient-to-r from-[var(--accent-brand)] to-foreground/40" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {aboutCopy.highlights[1]?.detail}
                  </p>
                </div>

                <div className="flex items-stretch justify-between gap-2 border-y border-foreground/10 py-4 text-center">
                  <StatItem value={`${projects.length}`} label="Products" />
                  <div className="w-px self-stretch bg-foreground/10" />
                  <StatItem
                    value={experience.length.toString()}
                    label="Roles"
                  />
                  <div className="w-px self-stretch bg-foreground/10" />
                  <StatItem value="Lahore" label="Based" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <div className="inline-flex items-center gap-1.5 rounded-md border border-border/70 bg-background/70 px-3 py-1 text-[10px] font-medium tracking-wide text-muted-foreground dark:border-foreground/10 dark:bg-background/50">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-brand opacity-70" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-brand" />
                    </span>
                    Available
                  </div>
                  <p className="whitespace-nowrap text-xs leading-none text-muted-foreground sm:text-right">
                    Clear specs, honest timelines, no overselling the stack.
                  </p>
                </div>

                <div className="overflow-hidden border-t border-foreground/10 pt-4">
                  <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    Stack I ship with
                  </p>
                  <div
                    className="relative flex overflow-hidden"
                    style={{
                      maskImage:
                        'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                      WebkitMaskImage:
                        'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                    }}
                  >
                    <div className="hero-trust-marquee flex gap-8 whitespace-nowrap">
                      {[...tech, ...tech].map((name, i) => (
                        <span
                          key={`${name}-${i}`}
                          className="text-sm font-semibold tracking-tight text-foreground/70"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="hero-scroll-indicator"
        onClick={() => scrollToId('about')}
        aria-label="Scroll to about"
      >
        <span className="hero-scroll-mouse" aria-hidden="true">
          <span className="hero-scroll-wheel" />
        </span>
        <span className="hero-scroll-label">Scroll</span>
      </button>
    </div>
  );
}

export default HeroFuturistic;
