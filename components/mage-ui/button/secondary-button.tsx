"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

export const SecondaryButton = React.forwardRef<
    HTMLButtonElement,
    SecondaryButtonProps
>(({ children, className, ...props }, ref) => {
    return (
        <button
            ref={ref}
            className={cn(
                "inline-flex items-center justify-center rounded-lg px-6 py-2 text-sm font-medium transition-colors",
                "cursor-pointer",
                // Shadcn secondary button styling
                "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                "border border-border",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "disabled:pointer-events-none disabled:opacity-50",
                className,
            )}
            {...props}
        >
            {children}
        </button>
    );
});

SecondaryButton.displayName = "SecondaryButton";
