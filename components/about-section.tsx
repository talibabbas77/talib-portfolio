"use client";

import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TechShowcase } from "@/components/ui/tech-showcase";
import { Code, Database, Globe, Smartphone, Cloud, Shield, Cpu, GitBranch, File, Search, Settings } from "lucide-react";


const skills = [
    { name: "Frontend Development", icon: Code, description: "React, Next.js, TypeScript, Tailwind CSS" },
    { name: "Backend Development", icon: Database, description: "Node.js, Express, MongoDB, PostgreSQL" },
    { name: "Cloud & DevOps", icon: Cloud, description: "AWS, Firebase, Docker, CI/CD" },
    { name: "Mobile Development", icon: Smartphone, description: "React Native, Progressive Web Apps" },
];

const achievements = [
    "7+ Professional Websites Created",
    "Full-Stack Development Expertise",
    "Modern JavaScript Frameworks",
    "Cloud Infrastructure Management",
    "Responsive Design Specialist",
    "Performance Optimization Expert"
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
                                    I'm a passionate full-stack developer with over 3 years of experience in creating
                                    exceptional digital experiences. My journey began with a curiosity for how things
                                    work on the web, and it has evolved into a deep expertise in modern web technologies.
                                </p>

                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    I specialize in building scalable web applications using React, Next.js, and Node.js.
                                    My approach combines technical excellence with user-centered design, ensuring that
                                    every project not only functions flawlessly but also provides an intuitive user experience.
                                </p>

                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    From e-commerce platforms like AbayaDesigns and HijabKiDunya to educational tools
                                    like QuizBee, I've helped businesses transform their digital presence and achieve
                                    their goals through innovative web solutions.
                                </p>
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
