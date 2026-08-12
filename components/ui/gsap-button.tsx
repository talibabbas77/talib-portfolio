'use client';

import {
  forwardRef,
  useEffect,
  useRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from '@/lib/utils';
import { gsap, prefersReducedMotion, registerGsap } from '@/lib/gsap';

type GsapButtonVariant = 'primary' | 'secondary' | 'ghost' | 'brand';
type GsapButtonSize = 'sm' | 'md' | 'lg';

export type GsapButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: GsapButtonVariant;
  size?: GsapButtonSize;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
};

const sizeClasses: Record<GsapButtonSize, string> = {
  sm: 'h-9 min-w-0 px-4 text-xs sm:min-w-[7.5rem]',
  md: 'h-11 min-w-0 px-5 text-sm sm:min-w-[9rem]',
  lg: 'h-12 min-w-0 px-5 text-sm sm:min-w-[10rem] sm:px-6',
};

const variantClasses: Record<GsapButtonVariant, string> = {
  primary:
    'border border-foreground bg-foreground text-background hover:border-foreground dark:border-foreground/90',
  brand:
    'border border-[var(--accent-brand)] bg-[var(--accent-brand)] text-white dark:text-[#06110c]',
  secondary:
    'border border-border bg-background/60 text-foreground shadow-sm backdrop-blur-sm hover:bg-background/90 dark:border-foreground/20 dark:bg-transparent dark:shadow-none',
  ghost: 'border border-transparent bg-transparent text-foreground',
};

export const GsapButton = forwardRef<HTMLButtonElement, GsapButtonProps>(
  function GsapButton(
    {
      className,
      variant = 'primary',
      size = 'md',
      icon,
      iconPosition = 'right',
      fullWidth,
      children,
      disabled,
      type = 'button',
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    forwardedRef
  ) {
    const localRef = useRef<HTMLButtonElement>(null);
    const fillRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      registerGsap();
    }, []);

    const setRefs = (node: HTMLButtonElement | null) => {
      localRef.current = node;
      if (typeof forwardedRef === 'function') forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    };

    const animateIn = () => {
      if (disabled || prefersReducedMotion() || !fillRef.current) return;
      gsap.fromTo(
        fillRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 0.4,
          ease: 'power3.out',
          overwrite: 'auto',
        }
      );
    };

    const animateOut = () => {
      if (prefersReducedMotion() || !fillRef.current) return;
      gsap.to(fillRef.current, {
        scaleX: 0,
        transformOrigin: 'right center',
        duration: 0.3,
        ease: 'power3.inOut',
        overwrite: 'auto',
      });
    };

    const fillTone =
      variant === 'primary' || variant === 'brand'
        ? 'bg-white/15'
        : 'bg-foreground/8';

    return (
      <button
        ref={setRefs}
        type={type}
        disabled={disabled}
        className={cn(
          'relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-md font-medium leading-none',
          'outline-none transition-[border-color,background-color] duration-300',
          'focus-visible:ring-2 focus-visible:ring-accent-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45',
          sizeClasses[size],
          variantClasses[variant],
          fullWidth && 'w-full min-w-0',
          className
        )}
        onMouseEnter={(e) => {
          animateIn();
          onMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          animateOut();
          onMouseLeave?.(e);
        }}
        {...props}
      >
        <span
          ref={fillRef}
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-0 origin-left scale-x-0',
            fillTone
          )}
        />

        <span className="relative z-10 inline-flex items-center justify-center gap-2">
          {icon && iconPosition === 'left' ? (
            <span className="inline-flex size-4 shrink-0 items-center justify-center [&>svg]:size-4">
              {icon}
            </span>
          ) : null}
          <span className="inline-flex items-center">{children}</span>
          {icon && iconPosition === 'right' ? (
            <span className="inline-flex size-4 shrink-0 items-center justify-center [&>svg]:size-4">
              {icon}
            </span>
          ) : null}
        </span>
      </button>
    );
  }
);

export default GsapButton;
