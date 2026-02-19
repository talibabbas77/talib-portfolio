"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface TechItem {
    name: string;
    icon: string;
    color: string;
    description: string;
}

const techStack: TechItem[] = [
    { name: "React", icon: "/icon-cloud/react-svgrepo-com.svg", color: "from-blue-400 to-blue-600", description: "Frontend Library" },
    { name: "Next.js", icon: "/icon-cloud/nextjs-svgrepo-com.svg", color: "from-gray-700 to-gray-900", description: "Full-Stack Framework" },
    { name: "Node.js", icon: "/icon-cloud/nodejs-icon-svgrepo-com.svg", color: "from-green-500 to-green-700", description: "Backend Runtime" },
    { name: "MongoDB", icon: "/icon-cloud/mongo-svgrepo-com.svg", color: "from-green-600 to-green-800", description: "Database" },
    { name: "Tailwind", icon: "/icon-cloud/tailwind-svgrepo-com.svg", color: "from-cyan-400 to-cyan-600", description: "CSS Framework" },
    { name: "Express", icon: "/icon-cloud/express-svgrepo-com.svg", color: "from-gray-500 to-gray-700", description: "Web Framework" },
    { name: "SQL", icon: "/icon-cloud/sql-svgrepo-com.svg", color: "from-blue-600 to-blue-800", description: "Database" },
    { name: "NPM", icon: "/icon-cloud/npm-svgrepo-com.svg", color: "from-red-600 to-red-800", description: "Package Manager" },
];

export function TechShowcase() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="relative w-full">
            <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

            {/* Landscape grid: 2 cols on mobile, 4 on md+ so 8 items = 2 full rows, no empty space */}
            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
                {techStack.map((tech, index) => (
                    <motion.div
                        key={tech.name}
                        className="relative group cursor-pointer"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.04, duration: 0.35 }}
                        onHoverStart={() => setHoveredIndex(index)}
                        onHoverEnd={() => setHoveredIndex(null)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="relative p-3 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50 hover:border-border transition-all duration-200 group-hover:shadow-md flex flex-row items-center gap-3">
                            <div className="p-2 rounded-lg bg-muted/50 shrink-0">
                                <img
                                    src={tech.icon}
                                    alt={tech.name}
                                    className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
                                />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="font-semibold text-foreground text-xs sm:text-sm truncate">
                                    {tech.name}
                                </p>
                                <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                                    {tech.description}
                                </p>
                            </div>
                            {hoveredIndex === index && (
                                <motion.div
                                    className="absolute inset-0 rounded-lg border border-primary/30"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.15 }}
                                />
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
