"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    Mail,
    Phone,
    MapPin,
    Github,
    Linkedin,
    Twitter,
    Instagram,
    ArrowUp,
    Heart,
    Code,
    Palette,
    Zap,
    Globe,
    Calendar,
    Clock,
    CheckCircle,
    ExternalLink
} from "lucide-react";
import { useState, useEffect } from "react";

const socialLinks = [
    { name: "GitHub", icon: Github, href: "#", color: "hover:text-gray-900 dark:hover:text-gray-100", bgColor: "hover:bg-gray-100 dark:hover:bg-gray-800" },
    { name: "LinkedIn", icon: Linkedin, href: "#", color: "hover:text-blue-600", bgColor: "hover:bg-blue-50 dark:hover:bg-blue-900/20" },
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-blue-400", bgColor: "hover:bg-blue-50 dark:hover:bg-blue-900/20" },
    { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-pink-500", bgColor: "hover:bg-pink-50 dark:hover:bg-pink-900/20" }
];

const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" }
];

const services = [
    { name: "Web Development", icon: Code },
    { name: "UI/UX Design", icon: Palette },
    { name: "Mobile Apps", icon: Zap },
    { name: "Consulting", icon: Globe }
];

const contactInfo = [
    { icon: Mail, label: "Email", value: "talib@example.com", href: "mailto:talib@example.com" },
    { icon: Phone, label: "Phone", value: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { icon: MapPin, label: "Location", value: "United States", href: "#" }
];

export function Footer() {
    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleScroll = () => {
        const scrollTop = window.pageYOffset;
        setIsVisible(scrollTop > 300);
    };

    // Add scroll listener
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <footer className="relative border-t border-border/50 bg-background/50 backdrop-blur-sm">
            {/* Scroll to Top Button */}
            <motion.button
                onClick={scrollToTop}
                className={`fixed bottom-8 right-8 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.3 }}
            >
                <ArrowUp className="w-5 h-5" />
            </motion.button>

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                        {/* Brand Section */}
                        <motion.div
                            className="lg:col-span-1"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-foreground mb-2">Talib Abbas</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Full-stack developer passionate about creating exceptional digital experiences
                                        and innovative web solutions.
                                    </p>
                                </div>

                                {/* Status Badge */}
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-sm font-medium text-foreground">
                                        Available for new projects
                                    </span>
                                </div>

                                {/* Social Links */}
                                <div className="space-y-3">
                                    <h4 className="text-sm font-semibold text-foreground">Follow Me</h4>
                                    <div className="flex gap-3">
                                        {socialLinks.map((social, index) => (
                                            <motion.a
                                                key={social.name}
                                                href={social.href}
                                                className={`p-3 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-300 ${social.bgColor} ${social.color}`}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: index * 0.1, duration: 0.3 }}
                                                viewport={{ once: true }}
                                                whileHover={{ scale: 1.05, y: -2 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <social.icon className="w-5 h-5" />
                                            </motion.a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Quick Links */}
                        <motion.div
                            className="lg:col-span-1"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <div className="space-y-6">
                                <h4 className="text-lg font-semibold text-foreground">Quick Links</h4>
                                <nav className="space-y-3">
                                    {quickLinks.map((link, index) => (
                                        <motion.a
                                            key={link.name}
                                            href={link.href}
                                            className="block text-muted-foreground hover:text-foreground transition-colors duration-300 group"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                                            viewport={{ once: true }}
                                            whileHover={{ x: 5 }}
                                        >
                                            <span className="relative">
                                                {link.name}
                                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                                            </span>
                                        </motion.a>
                                    ))}
                                </nav>
                            </div>
                        </motion.div>

                        {/* Services */}
                        <motion.div
                            className="lg:col-span-1"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <div className="space-y-6">
                                <h4 className="text-lg font-semibold text-foreground">Services</h4>
                                <div className="space-y-3">
                                    {services.map((service, index) => (
                                        <motion.div
                                            key={service.name}
                                            className="flex items-center gap-3 p-3 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50 hover:border-border transition-all duration-300 group"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                                            viewport={{ once: true }}
                                            whileHover={{ scale: 1.02, x: 5 }}
                                        >
                                            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                                                <service.icon className="w-4 h-4 text-primary" />
                                            </div>
                                            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                                                {service.name}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            className="lg:col-span-1"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <div className="space-y-6">
                                <h4 className="text-lg font-semibold text-foreground">Get In Touch</h4>
                                <div className="space-y-4">
                                    {contactInfo.map((info, index) => (
                                        <motion.a
                                            key={info.label}
                                            href={info.href}
                                            className="flex items-start gap-3 p-3 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50 hover:border-border transition-all duration-300 group"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                                            viewport={{ once: true }}
                                            whileHover={{ scale: 1.02, x: 5 }}
                                        >
                                            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                                                <info.icon className="w-4 h-4 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                                                    {info.label}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {info.value}
                                                </p>
                                            </div>
                                        </motion.a>
                                    ))}
                                </div>

                                {/* Availability Status */}
                                <motion.div
                                    className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1, duration: 0.5 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        <span className="text-sm font-semibold text-foreground">Available</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Response time: within 24 hours
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    className="py-8 border-t border-border/50"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>© {new Date().getFullYear()} Talib Abbas. Made with</span>
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                <Heart className="w-4 h-4 text-red-500 fill-current" />
                            </motion.div>
                        </div>

                        <div className="flex items-center gap-6 text-sm">
                            <motion.a
                                href="#privacy"
                                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                                whileHover={{ y: -2 }}
                            >
                                Privacy Policy
                            </motion.a>
                            <motion.a
                                href="#terms"
                                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                                whileHover={{ y: -2 }}
                            >
                                Terms of Service
                            </motion.a>
                            <motion.a
                                href="#sitemap"
                                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                                whileHover={{ y: -2 }}
                            >
                                Sitemap
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
