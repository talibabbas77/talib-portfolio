"use client";

import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowRight } from "lucide-react";

interface Project {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    technologies: string[];
    category: string;
    status: "Live" | "Development" | "Completed";
    liveUrl?: string;
    githubUrl?: string;
    imageUrl?: string;
}

const projects: Project[] = [
    {
        id: "zaivor",
        title: "Zaivor",
        description: "Custom Shopify store — design, theme, and checkout experience",
        longDescription: "Custom Shopify store development from setup to theme customization. Built with Shopify's ecosystem for a polished e-commerce experience, product presentation, and checkout flow.",
        technologies: ["Shopify", "Liquid", "Custom themes", "E-commerce"],
        category: "E-commerce",
        status: "Live",
        liveUrl: "https://zaivor.com",
        githubUrl: undefined
    },
    {
        id: "namastheusa",
        title: "NamastheUSA",
        description: "Community classified marketplace for services, rentals, and events",
        longDescription: "Full-stack platform with Next.js (TS) and Tailwind CSS for posting and browsing listings. Integrated IPAPI, Google Maps, and Email API for geolocation, location-based listings, and notifications. Optimized performance, SEO, and scalable component architecture.",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "IPAPI", "Google Maps", "Email API"],
        category: "Community Marketplace",
        status: "Live",
        liveUrl: "https://namastheusa.com",
        githubUrl: "https://github.com/talibabbas77"
    },
    {
        id: "ai-resume-builder",
        title: "AI Resume Builder",
        description: "ATS-optimized resumes powered by AI",
        longDescription: "AI-powered platform using Gemini to generate professional, ATS-friendly resumes with optimized content, skills, and formatting for improved recruiter visibility.",
        technologies: ["React", "Next.js", "Gemini AI", "TypeScript", "Tailwind CSS"],
        category: "Academic Project",
        status: "Live",
        liveUrl: undefined,
        githubUrl: "https://github.com/talibabbas77/AI-Resume-Builder"
    }
];

const getStatusColor = (status: string) => {
    switch (status) {
        case "Live": return "bg-green-500";
        case "Development": return "bg-yellow-500";
        case "Completed": return "bg-blue-500";
        default: return "bg-gray-500";
    }
};

export function ProjectsSection() {
    return (
        <>
            <section id="projects" className="py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    {/* Section Header */}
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <motion.h2
                            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            Featured Projects
                        </motion.h2>
                        <motion.div
                            className="w-20 h-1 bg-gradient-to-r from-primary to-primary/60 rounded-full mx-auto mb-6"
                            initial={{ opacity: 0, scaleX: 0 }}
                            whileInView={{ opacity: 1, scaleX: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            viewport={{ once: true }}
                        />
                        <motion.p
                            className="text-lg text-muted-foreground max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            Academic and professional projects—full-stack platforms, AI tools, and scalable web applications.
                        </motion.p>
                    </motion.div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2, duration: 0.8 }}
                                viewport={{ once: true }}
                            >
                                <Card className="group h-full bg-background/50 backdrop-blur-sm border-border/50 hover:border-border transition-all duration-500 hover:shadow-xl">
                                    <CardContent className="p-8">
                                        {/* Project Header */}
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                                                        {project.title}
                                                    </h3>
                                                    <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)} animate-pulse`} />
                                                </div>
                                                <Badge variant="outline" className="text-sm">
                                                    {project.category}
                                                </Badge>
                                            </div>
                                        </div>

                                        {/* Project Description */}
                                        <div className="mb-6">
                                            <p className="text-muted-foreground leading-relaxed mb-3">
                                                {project.description}
                                            </p>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {project.longDescription}
                                            </p>
                                        </div>

                                        {/* Technologies */}
                                        <div className="mb-6">
                                            <h4 className="text-sm font-semibold text-foreground mb-3">Technologies Used</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.map((tech, techIndex) => (
                                                    <motion.div
                                                        key={tech}
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        whileInView={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: (index * 0.2) + (techIndex * 0.05), duration: 0.3 }}
                                                        viewport={{ once: true }}
                                                    >
                                                        <Badge variant="secondary" className="text-xs">
                                                            {tech}
                                                        </Badge>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-3 flex-wrap">
                                            {project.liveUrl && (
                                                <Button
                                                    variant="default"
                                                    size="sm"
                                                    className="flex items-center gap-2 group-hover:bg-primary/90 transition-colors duration-300"
                                                    asChild
                                                >
                                                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                                        <ExternalLink className="w-4 h-4" />
                                                        Live Demo
                                                    </a>
                                                </Button>
                                            )}
                                            {project.githubUrl && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="flex items-center gap-2 group-hover:border-primary group-hover:text-primary transition-colors duration-300"
                                                    asChild
                                                >
                                                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                                        <Github className="w-4 h-4" />
                                                        Code
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Call to Action */}
                    <motion.div
                        className="text-center mt-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-muted-foreground mb-6">
                            Interested in working together or have a project in mind?
                        </p>
                        <Button size="lg" className="px-8 py-6" asChild>
                            <a href="#contact">
                                Start a Project
                                <ArrowRight className="w-5 h-5 ml-2 inline" />
                            </a>
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Separator */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </>
    );
}
