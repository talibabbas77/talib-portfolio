"use client";

import { motion } from "motion/react";
import { Code, Database, Globe, Plug, Briefcase, Calendar, GraduationCap, Award, ShoppingBag } from "lucide-react";
import { TechShowcase } from "@/components/ui/tech-showcase";
import { cn } from "@/lib/utils";

const skills = [
    { name: "Frontend", icon: Code, description: "React, Next.js, TypeScript, Tailwind, Shadcn UI" },
    { name: "Backend", icon: Database, description: "Node.js, Express, MongoDB, REST APIs" },
    { name: "Integrations", icon: Plug, description: "GHL, OAuth 2.0, Email APIs" },
    { name: "Shopify", icon: ShoppingBag, description: "Custom stores & themes" },
    { name: "Platforms", icon: Globe, description: "Supabase, Next.js SSR" },
];

const achievements = [
    "Scalable Web Apps",
    "GHL & OAuth 2.0",
    "Dynamic Dashboards",
    "Referral & Licensing",
    "ATS & SEO",
    "REST APIs",
];

const experience = {
    role: "MERN Stack Developer",
    company: "DevExcel IT Solutions",
    period: "03/2025 – Current",
    highlights: [
        "Next.js & TypeScript, secure REST APIs, middleware & validation",
        "GHL APIs via OAuth 2.0 — contacts, tagging, automation",
        "Dashboards with Tailwind & Shadcn UI",
        "Referral-based licensing in GHL",
    ],
};

export function AboutSection() {
    return (
        <>
            <section id="about" className="py-16 lg:py-20">
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-8 lg:mb-10"
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                            About Me
                        </h2>
                        <div className="w-12 h-0.5 bg-primary rounded-full mx-auto mt-2" />
                    </motion.div>

                    {/* Row 1: Intro + Experience — same height, landscape */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 mb-3 lg:mb-4">
                        <motion.div
                            className="rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm p-4 lg:p-5"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.05 }}
                            viewport={{ once: true }}
                        >
                            <p className="text-muted-foreground leading-relaxed text-sm lg:text-[15px]">
                                Full-stack developer skilled in React, Node.js, Express, and MongoDB, building scalable
                                web applications. I use Next.js, Supabase, and Tailwind for high-performance UIs, plus
                                GoHighLevel and custom Shopify development. I rely on AI-assisted tools like Cursor to
                                ship maintainable, scalable solutions.
                            </p>
                        </motion.div>
                        <motion.div
                            className="rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm p-4 lg:p-5 flex flex-col"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.08 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <div className="p-1.5 rounded-lg bg-primary/10">
                                    <Briefcase className="w-3.5 h-3.5 text-primary" />
                                </div>
                                <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
                                    Experience
                                </span>
                            </div>
                            <p className="font-semibold text-foreground text-sm">{experience.role}</p>
                            <p className="text-xs text-muted-foreground">{experience.company}</p>
                            <p className="text-xs text-muted-foreground/80 flex items-center gap-1 mt-0.5 mb-3">
                                <Calendar className="w-3 h-3" />
                                {experience.period}
                            </p>
                            <ul className="space-y-1 text-xs text-muted-foreground list-disc list-inside marker:text-primary/60 flex-1">
                                {experience.highlights.map((h, i) => (
                                    <li key={i}>{h}</li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    {/* Row 2: Education, Certifications, Focus, Highlights — one compact row, content height */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-3 lg:mb-4 items-start">
                        <motion.div
                            className="rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm p-4"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <GraduationCap className="w-3.5 h-3.5 text-primary" />
                                <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
                                    Education
                                </span>
                            </div>
                            <p className="font-medium text-foreground text-xs">BSc Computer Science</p>
                            <p className="text-xs text-muted-foreground">NCBA&E – Lahore · 2020–2024</p>
                        </motion.div>
                        <motion.div
                            className="rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm p-4"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.12 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <Award className="w-3.5 h-3.5 text-primary" />
                                <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
                                    Certifications
                                </span>
                            </div>
                            <ul className="text-xs text-muted-foreground space-y-0.5">
                                <li>Problem Solving (HackerRank)</li>
                                <li>HTML (Lumos)</li>
                                <li>CSS (Great Learning)</li>
                            </ul>
                        </motion.div>
                        <motion.div
                            className="rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm p-4 sm:col-span-2 lg:col-span-1"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.14 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-xs font-semibold text-foreground uppercase tracking-wider block mb-2">
                                Focus areas
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((s) => (
                                    <div
                                        key={s.name}
                                        className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-background/60 border border-border/40"
                                    >
                                        <s.icon className="w-3.5 h-3.5 text-primary shrink-0" />
                                        <span className="text-xs font-medium text-foreground">{s.name}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div
                            className="rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm p-4 sm:col-span-2 lg:col-span-1"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.16 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-xs font-semibold text-foreground uppercase tracking-wider block mb-2">
                                Highlights
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                                {achievements.map((a) => (
                                    <span
                                        key={a}
                                        className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium bg-muted/80 text-muted-foreground border border-border/50"
                                    >
                                        {a}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Row 3: Tech stack — full width, dense grid */}
                    <motion.div
                        className="rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm p-4 lg:p-5 overflow-hidden"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-xs font-semibold text-foreground uppercase tracking-wider block mb-3">
                            Tech stack
                        </span>
                        <TechShowcase />
                    </motion.div>
                </div>
            </section>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </>
    );
}
