"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
    className?: string;
    children: React.ReactNode;
    direction?: "left" | "right";
    speed?: number;
    pauseOnHover?: boolean;
}

export function Marquee({
    className,
    children,
    direction = "left",
    speed = 50,
    pauseOnHover = true,
}: MarqueeProps) {
    return (
        <div
            className={cn(
                "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
                className
            )}
            style={{
                ["--speed" as any]: `${speed}s`,
                ["--direction" as any]: direction === "left" ? "reverse" : "normal",
            }}
        >
            {Array.from({ length: 2 }, (_, i) => (
                <motion.div
                    key={i}
                    className="flex shrink-0 justify-around [gap:var(--gap)]"
                    animate={{
                        x: direction === "left" ? "-100%" : "100%",
                    }}
                    transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        animationPlayState: pauseOnHover ? "running" : "paused",
                    }}
                >
                    {children}
                </motion.div>
            ))}
        </div>
    );
}

interface MarqueeItemProps {
    className?: string;
    children: React.ReactNode;
}

export function MarqueeItem({ className, children }: MarqueeItemProps) {
    return (
        <div
            className={cn(
                "flex items-center justify-center rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
                className
            )}
        >
            {children}
        </div>
    );
}
