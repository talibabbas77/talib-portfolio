"use client";

import { motion } from "motion/react";
import { Marquee, MarqueeItem } from "@/components/ui/marquee";

const websites = [
    "NamastheUSA",
    "AbayaDesigns",
    "HijabKiDunya",
    "QuizBee",
    "AsaanShadi",
    "AlFatahZariHouse",
    "Mentora"
];

export function MarqueeSection() {
    return (
        <section className="relative py-16 overflow-hidden">
            {/* Background blur effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-background blur-sm" />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section Title */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                        Websites I've Created
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        A showcase of professional web applications and platforms I've developed
                    </p>
                </motion.div>

                {/* Marquee Container */}
                <div className="relative">
                    <Marquee
                        direction="left"
                        speed={40}
                    >
                        {websites.map((website, index) => (
                            <MarqueeItem key={index}>
                                {website}
                            </MarqueeItem>
                        ))}
                    </Marquee>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute top-1/2 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
                </div>
            </div>
        </section>
    );
}
