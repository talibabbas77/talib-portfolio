"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDown, Code, Palette, Zap, Github, Linkedin, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import ShinyText from "@/components/ShinyText";

const skills = [
    { name: "Frontend", icon: Code, color: "text-blue-500" },
    { name: "Design", icon: Palette, color: "text-purple-500" },
    { name: "Backend", icon: Zap, color: "text-green-500" },
];

const socialLinks = [
    { name: "GitHub", icon: Github, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "Email", icon: Mail, href: "#" },
];

const developerRoles = [
    "Full Stack Developer",
    "MERN Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "React Developer",
    "Node.js Developer"
];

// Animated Typography Component
function AnimatedTypography({ texts, className }: { texts: string[]; className?: string }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % texts.length);
                setIsVisible(true);
            }, 300);
        }, 3000);

        return () => clearInterval(interval);
    }, [texts.length]);

    return (
        <span className={`${className} inline-block min-w-0`}>
            <motion.span
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
                transition={{ duration: 0.3 }}
                className="inline-block whitespace-nowrap"
            >
                {texts[currentIndex]}
            </motion.span>
        </span>
    );
}

export function HeroSection() {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Column - Content */}
                    <motion.div
                        className="mt-4 md:mt-0 space-y-4 text-center lg:text-left"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Status Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
                                <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                                Available for new projects
                            </Badge>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.div
                            className="space-y-3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                                <span className="block text-sm md:text-lg lg:text-xl text-muted-foreground mb-2">Hi, I'm</span>
                                <span className="block">
                                    <ShinyText
                                        text="Talib Abbas"
                                        disabled={false}
                                        speed={8}
                                        className="text-4xl md:text-5xl lg:text-6xl font-bold"
                                    />
                                </span>
                                <span className="block bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent whitespace-nowrap">
                                    <AnimatedTypography
                                        texts={developerRoles}
                                        className="inline-block"
                                    />
                                </span>
                            </h1>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            Passionate about building scalable web applications and creating seamless user experiences.
                            I specialize in modern JavaScript frameworks and have extensive experience in full-stack development,
                            from crafting pixel-perfect frontends to architecting robust backend systems.
                        </motion.p>

                        {/* Action Buttons */}
                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 pt-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                        >
                            <Button size="lg" className="text-base px-8 py-6">
                                View My Work
                            </Button>
                            <Button variant="outline" size="lg" className="text-base px-8 py-6">
                                Get In Touch
                            </Button>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            className="flex gap-4 pt-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.8 }}
                        >
                            {socialLinks.map((link, index) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    className="p-3 rounded-lg border border-border/50 bg-background/50 hover:bg-accent transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                                >
                                    <link.icon className="w-5 h-5 text-muted-foreground" />
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Skills Card */}
                    <motion.div
                        className="flex justify-center lg:justify-end"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        <Card className="w-full max-w-md bg-background/50 backdrop-blur-sm border-border/50">
                            <CardContent className="p-8">
                                <div className="space-y-6">
                                    <div className="text-center">
                                        <h3 className="text-2xl font-bold mb-2">Skills & Expertise</h3>
                                        <p className="text-muted-foreground">
                                            Full-stack development with modern technologies
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        {skills.map((skill, index) => (
                                            <motion.div
                                                key={skill.name}
                                                className="flex items-center gap-3 p-4 rounded-lg bg-accent/50 hover:bg-accent transition-colors"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                                                whileHover={{ scale: 1.02 }}
                                            >
                                                <div className={`p-2 rounded-lg bg-background ${skill.color}`}>
                                                    <skill.icon className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold">{skill.name}</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        {skill.name === "Frontend" && "React, Next.js, TypeScript"}
                                                        {skill.name === "Design" && "UI/UX, Figma, Design Systems"}
                                                        {skill.name === "Backend" && "Node.js, Python, Databases"}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="pt-4 border-t border-border/50">
                                        <h4 className="font-semibold mb-3 text-center">Tech Stack</h4>
                                        <div className="flex flex-wrap gap-2 justify-center">
                                            {["React", "Next.js", "TypeScript", "Node.js", "Python", "AWS"].map((tech, index) => (
                                                <motion.div
                                                    key={tech}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 1.2 + index * 0.05, duration: 0.3 }}
                                                >
                                                    <Badge variant="secondary" className="text-xs">
                                                        {tech}
                                                    </Badge>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
            >
                <motion.div
                    className="flex flex-col items-center gap-2 text-muted-foreground"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <span className="text-sm font-medium">Scroll to explore</span>
                    <ArrowDown className="w-5 h-5" />
                </motion.div>
            </motion.div>
        </section>
    );
}
