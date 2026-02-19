"use client";

import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TechShowcase } from "@/components/ui/tech-showcase";
import { Code, Database, Globe, Plug, Briefcase, Calendar, GraduationCap, Award, ShoppingBag } from "lucide-react";

const skills = [
    { name: "Frontend Development", icon: Code, description: "React, Next.js, TypeScript, Tailwind CSS, Shadcn UI" },
    { name: "Backend Development", icon: Database, description: "Node.js, Express, MongoDB, REST APIs" },
    { name: "Integrations & APIs", icon: Plug, description: "GoHighLevel (GHL), OAuth 2.0, Email APIs" },
    { name: "Custom Shopify Stores", icon: ShoppingBag, description: "Custom Shopify store development & themes" },
    { name: "Platforms", icon: Globe, description: "Supabase, Next.js SSR, Responsive Web Apps" },
];

const achievements = [
    "Scalable Web Applications",
    "GHL API & OAuth 2.0 Integration",
    "Dynamic Dashboards & UI",
    "Referral & Licensing Systems",
    "ATS-Optimized & SEO",
    "RESTful APIs & Error Handling"
];

const experience = [
    {
        role: "MERN Stack Developer",
        company: "DevExcel IT Solutions",
        period: "03/2025 – Current",
        highlights: [
            "Scalable apps with Next.js & TypeScript, secure REST APIs with middleware & validation",
            "GoHighLevel (GHL) APIs via OAuth 2.0 — contact management, tagging, automation",
            "Dynamic dashboards with Tailwind CSS & Shadcn UI",
            "Referral-based licensing systems in GHL for consultant-level access",
        ],
    },
];

export function AboutSection() {
    return (
        <>
            <section id="about" className="py-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Left Column - About Content */}
                        <motion.div
                            className="space-y-8"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            {/* Section Title */}
                            <div>
                                <motion.h2
                                    className="text-4xl md:text-5xl font-bold text-foreground mb-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.8 }}
                                    viewport={{ once: true }}
                                >
                                    About Me
                                </motion.h2>
                                <motion.div
                                    className="w-20 h-1 bg-gradient-to-r from-primary to-primary/60 rounded-full"
                                    initial={{ opacity: 0, scaleX: 0 }}
                                    whileInView={{ opacity: 1, scaleX: 1 }}
                                    transition={{ delay: 0.4, duration: 0.8 }}
                                    viewport={{ once: true }}
                                />
                            </div>

                            {/* About Text */}
                            <motion.div
                                className="space-y-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                                viewport={{ once: true }}
                            >
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    Full-stack developer skilled in React.js, Node.js, Express.js, and MongoDB, building
                                    scalable web applications. Experienced with Next.js, Supabase, and Tailwind CSS for
                                    responsive, high-performance UIs. I leverage UI libraries and integrations like
                                    GoHighLevel and custom Shopify development to automate workflows and deliver solutions. I use AI-assisted tools like Cursor to build scalable, maintainable applications.
                                </p>

                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    Currently at DevExcel IT Solutions, I build secure RESTful APIs, integrate GHL via OAuth 2.0
                                    for contact management and automation, and design dynamic dashboards with Shadcn UI—
                                    plus referral-based licensing systems for consultant-level access.
                                </p>
                            </motion.div>

                            {/* Work Experience */}
                            <motion.div
                                className="space-y-4"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 0.8 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                                    <Briefcase className="w-5 h-5 text-primary" />
                                    Experience
                                </h3>
                                {experience.map((job, i) => (
                                    <div
                                        key={i}
                                        className="p-4 rounded-xl bg-background/50 border border-border/50 space-y-2"
                                    >
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="font-semibold text-foreground">{job.role}</span>
                                            <span className="text-muted-foreground">·</span>
                                            <span className="text-foreground/80">{job.company}</span>
                                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {job.period}
                                            </span>
                                        </div>
                                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                            {job.highlights.map((h, j) => (
                                                <li key={j}>{h}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </motion.div>

                            {/* Education & Certifications */}
                            <motion.div
                                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.8 }}
                                viewport={{ once: true }}
                            >
                                <div className="p-4 rounded-xl bg-background/50 border border-border/50">
                                    <h4 className="font-semibold text-foreground flex items-center gap-2 mb-2">
                                        <GraduationCap className="w-4 h-4 text-primary" />
                                        Education
                                    </h4>
                                    <p className="text-sm font-medium text-foreground">BSc Computer Science</p>
                                    <p className="text-sm text-muted-foreground">NCBA&E – Lahore (2020–2024)</p>
                                </div>
                                <div className="p-4 rounded-xl bg-background/50 border border-border/50">
                                    <h4 className="font-semibold text-foreground flex items-center gap-2 mb-2">
                                        <Award className="w-4 h-4 text-primary" />
                                        Certifications
                                    </h4>
                                    <ul className="text-sm text-muted-foreground space-y-1">
                                        <li>Problem Solving (HackerRank)</li>
                                        <li>HTML (Lumos Learning)</li>
                                        <li>CSS (Great Learning)</li>
                                    </ul>
                                </div>
                            </motion.div>

                            {/* Skills Grid */}
                            <motion.div
                                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.8 }}
                                viewport={{ once: true }}
                            >
                                {skills.map((skill, index) => (
                                    <motion.div
                                        key={skill.name}
                                        className="flex items-start gap-3 p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-accent/50 transition-colors"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                                        viewport={{ once: true }}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className="p-2 rounded-lg bg-primary/10">
                                            <skill.icon className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-foreground">{skill.name}</h4>
                                            <p className="text-sm text-muted-foreground">{skill.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Achievements */}
                            <motion.div
                                className="pt-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2, duration: 0.8 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-xl font-semibold text-foreground mb-4">Key Achievements</h3>
                                <div className="flex flex-wrap gap-2">
                                    {achievements.map((achievement, index) => (
                                        <motion.div
                                            key={achievement}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 1.4 + index * 0.05, duration: 0.3 }}
                                            viewport={{ once: true }}
                                        >
                                            <Badge variant="secondary" className="text-sm">
                                                {achievement}
                                            </Badge>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right Column - Tech Showcase */}
                        <motion.div
                            className="flex justify-center lg:justify-end"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <TechShowcase />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Separator */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </>
    );
}
