"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React, { useState } from "react";

const animationProps = {
    initial: { "--x": "100%", scale: 0.8 },
    animate: { "--x": "-100%", scale: 1 },
    whileTap: { scale: 0.95 },
    transition: {
        repeat: Infinity,
        repeatType: "loop" as const,
        repeatDelay: 1,
        type: "spring" as const,
        stiffness: 20,
        damping: 15,
        mass: 2,
        scale: {
            type: "spring" as const,
            stiffness: 200,
            damping: 5,
            mass: 0.5,
        },
    },
};

interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

export const ShinyButton = React.forwardRef<
    HTMLButtonElement,
    ShinyButtonProps
>(({ children, className, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className={cn(
                "relative rounded-lg px-6 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow cursor-pointer inline-block overflow-hidden",
                // Light theme styling
                "bg-background border border-border",
                // Dark theme styling
                "dark:bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/10%)_0%,transparent_60%)] dark:border-border dark:hover:shadow-[0_0_20px_hsl(var(--primary)/10%)]",
                className,
            )}
            {...animationProps}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Snake-like border animation */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Top border segment */}
                <motion.div
                    className="absolute top-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"
                    style={{
                        width: "40%",
                        opacity: isHovered ? 2 : 0.6,
                    }}
                    initial={{ x: "-100%" }}
                    animate={{ x: "400%" }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "linear",
                    }}
                />

                {/* Right border segment */}
                <motion.div
                    className="absolute top-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-primary to-transparent"
                    style={{
                        height: "40%",
                        opacity: isHovered ? 2 : 0.6,
                    }}
                    initial={{ y: "-100%" }}
                    animate={{ y: "400%" }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "linear",
                        delay: 0.5,
                    }}
                />

                {/* Bottom border segment */}
                <motion.div
                    className="absolute bottom-0 right-0 h-[1px] bg-gradient-to-l from-transparent via-primary to-transparent"
                    style={{
                        width: "40%",
                        opacity: isHovered ? 2 : 0.6,
                    }}
                    initial={{ x: "100%" }}
                    animate={{ x: "-400%" }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "linear",
                        delay: 1,
                    }}
                />

                {/* Left border segment */}
                <motion.div
                    className="absolute bottom-0 left-0 w-[1px] bg-gradient-to-t from-transparent via-primary to-transparent"
                    style={{
                        height: "40%",
                        opacity: isHovered ? 2 : 0.6,
                    }}
                    initial={{ y: "100%" }}
                    animate={{ y: "-400%" }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "linear",
                        delay: 1.5,
                    }}
                />

                {/* Additional corner highlights */}
                <motion.div
                    className="absolute inset-0 rounded-lg border border-transparent"
                    style={{
                        background: `linear-gradient(90deg, 
                            transparent 0%, 
                            transparent 40%, 
                            hsl(var(--primary) / 0.3) 50%, 
                            transparent 60%, 
                            transparent 100%)`,
                        maskImage: "linear-gradient(black, black)",
                        maskComposite: "exclude",
                        WebkitMaskComposite: "xor",
                        mask: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
                        padding: "1px",
                        opacity: isHovered ? 0.8 : 0.4,
                    }}
                    animate={{
                        background: `linear-gradient(${isHovered ? 180 : 90}deg, 
                            transparent 0%, 
                            transparent 40%, 
                            hsl(var(--primary) / ${isHovered ? 0.6 : 0.3}) 50%, 
                            transparent 60%, 
                            transparent 100%)`,
                    }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            <button
                ref={ref}
                className="relative w-full h-full bg-transparent border-none cursor-pointer z-10"
                {...props}
            >
                <span
                    className="relative block size-full text-sm uppercase tracking-wide text-[rgb(0,0,0,65%)] dark:font-light dark:text-[rgb(255,255,255,90%)]"
                    style={{
                        maskImage:
                            "linear-gradient(-75deg,hsl(var(--primary)) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),hsl(var(--primary)) calc(var(--x) + 100%))",
                    }}
                >
                    {children}
                </span>
                <span
                    style={{
                        mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
                        maskComposite: "exclude",
                    }}
                    className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,hsl(var(--primary)/10%)_calc(var(--x)+20%),hsl(var(--primary)/50%)_calc(var(--x)+25%),hsl(var(--primary)/10%)_calc(var(--x)+100%))] p-px"
                ></span>
            </button>
        </motion.div>
    );
});

ShinyButton.displayName = "ShinyButton";


export function ShinyButtonDemo() {
    return <ShinyButton>Shiny Button</ShinyButton>;
}


