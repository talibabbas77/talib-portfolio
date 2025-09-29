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
    { name: "AWS", icon: "/icon-cloud/aws-svgrepo-com.svg", color: "from-orange-400 to-orange-600", description: "Cloud Platform" },
    { name: "Firebase", icon: "/icon-cloud/firebase-svgrepo-com.svg", color: "from-yellow-400 to-orange-500", description: "Backend Services" },
    { name: "Tailwind", icon: "/icon-cloud/tailwind-svgrepo-com.svg", color: "from-cyan-400 to-cyan-600", description: "CSS Framework" },
    { name: "Express", icon: "/icon-cloud/express-svgrepo-com.svg", color: "from-gray-500 to-gray-700", description: "Web Framework" },
    { name: "Angular", icon: "/icon-cloud/angular-icon-svgrepo-com.svg", color: "from-red-500 to-red-700", description: "Frontend Framework" },
    { name: "Django", icon: "/icon-cloud/django-svgrepo-com.svg", color: "from-green-700 to-green-900", description: "Python Framework" },
    { name: "SQL", icon: "/icon-cloud/sql-svgrepo-com.svg", color: "from-blue-600 to-blue-800", description: "Database Language" },
    { name: "NPM", icon: "/icon-cloud/npm-svgrepo-com.svg", color: "from-red-600 to-red-800", description: "Package Manager" },
    { name: "Android", icon: "/icon-cloud/android-icon-svgrepo-com.svg", color: "from-green-400 to-green-600", description: "Mobile Platform" },
    { name: "Apple", icon: "/icon-cloud/apple-svgrepo-com.svg", color: "from-gray-600 to-gray-800", description: "iOS Platform" },
];

export function TechShowcase() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="relative w-full max-w-2xl mx-auto">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />

            {/* Tech Stack Grid */}
            <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-6">
                {techStack.map((tech, index) => (
                    <motion.div
                        key={tech.name}
                        className="relative group cursor-pointer"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        onHoverStart={() => setHoveredIndex(index)}
                        onHoverEnd={() => setHoveredIndex(null)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {/* Card */}
                        <div className="relative p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-border transition-all duration-300 group-hover:shadow-lg">
                            {/* Gradient Background */}
                            <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                            {/* Icon */}
                            <div className="relative z-10 flex flex-col items-center space-y-3">
                                <div className="p-3 rounded-xl bg-background/80 backdrop-blur-sm group-hover:bg-background/90 transition-colors duration-300">
                                    <img
                                        src={tech.icon}
                                        alt={tech.name}
                                        className="w-8 h-8 group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>

                                {/* Text */}
                                <div className="text-center">
                                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                                        {tech.name}
                                    </h3>
                                    <p className="text-xs text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                                        {tech.description}
                                    </p>
                                </div>
                            </div>

                            {/* Hover Effect */}
                            {hoveredIndex === index && (
                                <motion.div
                                    className="absolute inset-0 rounded-xl border-2 border-primary/20"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                />
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Floating Elements */}
            <div className="absolute top-4 left-4 w-2 h-2 bg-primary/30 rounded-full animate-pulse" />
            <div className="absolute top-8 right-8 w-1 h-1 bg-primary/40 rounded-full animate-pulse delay-1000" />
            <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-primary/20 rounded-full animate-pulse delay-2000" />
            <div className="absolute bottom-4 right-4 w-2 h-2 bg-primary/25 rounded-full animate-pulse delay-500" />
        </div>
    );
}
