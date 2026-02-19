"use client";

import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Code,
    Database,
    Server,
    Palette,
    Plug,
    ShoppingBag,
    Sparkles
} from "lucide-react";

interface SkillCategory {
    title: string;
    icon: React.ComponentType<any>;
    skills: string[];
    color: string;
    description: string;
}

const skillCategories: SkillCategory[] = [
    {
        title: "Frontend Development",
        icon: Code,
        color: "from-blue-500 to-blue-600",
        description: "Modern user interface development",
        skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3", "JavaScript", "Shadcn UI"]
    },
    {
        title: "Backend Development",
        icon: Server,
        color: "from-green-500 to-green-600",
        description: "Server-side application development",
        skills: ["Node.js", "Express", "REST APIs", "Middleware", "Validation", "Error Handling", "Authentication"]
    },
    {
        title: "Database & Backend",
        icon: Database,
        color: "from-purple-500 to-purple-600",
        description: "Data storage and backend services",
        skills: ["MongoDB", "Supabase", "SQL", "Database Design", "API Design"]
    },
    {
        title: "Custom Shopify Store Development",
        icon: ShoppingBag,
        color: "from-green-600 to-green-800",
        description: "Custom Shopify stores and themes",
        skills: ["Custom themes", "Liquid", "Store setup & config", "Shopify Admin", "Product & checkout customization"]
    },
    {
        title: "Integrations & APIs",
        icon: Plug,
        color: "from-orange-500 to-orange-600",
        description: "Third-party APIs and platforms",
        skills: ["GoHighLevel (GHL)", "OAuth 2.0", "Email APIs", "Google Maps", "IPAPI"]
    },
    {
        title: "UI/UX & Design",
        icon: Palette,
        color: "from-indigo-500 to-indigo-600",
        description: "User experience and interface design",
        skills: ["Responsive Design", "Tailwind CSS", "Component Libraries", "Accessibility"]
    },
    {
        title: "Tools & Workflows",
        icon: Sparkles,
        color: "from-pink-500 to-pink-600",
        description: "AI-assisted and scalable development",
        skills: ["Cursor & AI-assisted dev", "Building scalable apps", "Gemini", "UI Libraries", "SEO", "Performance Optimization"]
    }
];

export function SkillsSection() {
    return (
        <section id="skills" className="py-24">
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
                        Skills & Expertise
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
                        Full-stack development, custom Shopify stores, API integrations (GHL), and AI-assisted scalable builds.
                    </motion.p>
                </motion.div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <Card className="group h-full bg-background/50 backdrop-blur-sm border-border/50 hover:border-border transition-all duration-500 hover:shadow-xl">
                                <CardContent className="p-8">
                                    {/* Category Header */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color} shadow-lg`}>
                                            <category.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                                                {category.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {category.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Skills List */}
                                    <div className="space-y-3">
                                        {category.skills.map((skill, skillIndex) => (
                                            <motion.div
                                                key={skill}
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{
                                                    delay: (index * 0.1) + (skillIndex * 0.05),
                                                    duration: 0.5
                                                }}
                                                viewport={{ once: true }}
                                                className="flex items-center gap-3"
                                            >
                                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color}`} />
                                                <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                                                    {skill}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Info */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-background/50 backdrop-blur-sm border border-border/50">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-sm font-medium text-foreground">
                            Continuously learning and adapting to new technologies
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
