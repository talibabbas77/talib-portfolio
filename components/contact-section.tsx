"use client";

import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Mail,
    Phone,
    MapPin,
    Send,
    Github,
    Linkedin,
    Twitter,
    Calendar,
    Clock,
    CheckCircle
} from "lucide-react";
import { useState } from "react";

interface ContactInfo {
    icon: React.ComponentType<any>;
    title: string;
    value: string;
    description: string;
}

const contactInfo: ContactInfo[] = [
    {
        icon: Mail,
        title: "Email",
        value: "talibali303@gmail.com",
        description: "Send me an email anytime"
    },
    {
        icon: Phone,
        title: "Phone",
        value: "+92 318 4189654",
        description: "Available for calls"
    },
    {
        icon: MapPin,
        title: "Location",
        value: "Lahore, Pakistan",
        description: "Open to remote work"
    }
];

const socialLinks = [
    { name: "GitHub", icon: Github, href: "#", color: "hover:text-gray-900 dark:hover:text-gray-100" },
    { name: "LinkedIn", icon: Linkedin, href: "#", color: "hover:text-blue-600" },
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-blue-400" }
];

export function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact-simple', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setIsSubmitted(true);
                // Reset form after 5 seconds
                setTimeout(() => {
                    setIsSubmitted(false);
                    setFormData({ name: "", email: "", subject: "", message: "" });
                }, 5000);
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData.error);
                alert(`Failed to send message: ${errorData.error}${errorData.details ? ` - ${errorData.details}` : ''}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to send message. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <section id="contact" className="py-24">
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
                        Get In Touch
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
                        Ready to start your next project? Let's discuss how I can help bring your ideas to life.
                    </motion.p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <motion.div
                        className="space-y-8"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div>
                            <h3 className="text-2xl font-bold text-foreground mb-6">Contact Information</h3>
                            <div className="space-y-6">
                                {contactInfo.map((info, index) => (
                                    <motion.div
                                        key={info.title}
                                        className="flex items-start gap-4 p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-border transition-all duration-300"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="p-2 rounded-lg bg-primary/10">
                                            <info.icon className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-foreground">{info.title}</h4>
                                            <p className="text-foreground/80 font-medium">{info.value}</p>
                                            <p className="text-sm text-muted-foreground">{info.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Social Links */}
                        <div>
                            <h4 className="text-lg font-semibold text-foreground mb-4">Follow Me</h4>
                            <div className="flex gap-4">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.href}
                                        className={`p-3 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm hover:bg-accent transition-colors duration-300 ${social.color}`}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1, duration: 0.3 }}
                                        viewport={{ once: true }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <social.icon className="w-5 h-5" />
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Availability */}
                        <div className="p-6 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                            <div className="flex items-center gap-3 mb-2">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span className="font-semibold text-foreground">Available for Projects</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Currently accepting new projects and collaborations. Response time: within 24 hours.
                            </p>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <Card className="bg-background/50 backdrop-blur-sm border-border/50">
                            <CardContent className="p-8">
                                <h3 className="text-2xl font-bold text-foreground mb-6">Send a Message</h3>

                                {isSubmitted ? (
                                    <motion.div
                                        className="text-center py-8"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                        <h4 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h4>
                                        <p className="text-muted-foreground">
                                            Thank you for reaching out. I'll get back to you soon.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none transition-colors duration-300"
                                                    placeholder="Your name"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none transition-colors duration-300"
                                                    placeholder="your@email.com"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                                                Subject
                                            </label>
                                            <input
                                                type="text"
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none transition-colors duration-300"
                                                placeholder="What's this about?"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                                                Message
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows={6}
                                                className="w-full px-4 py-3 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none transition-colors duration-300 resize-none"
                                                placeholder="Tell me about your project..."
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="w-full"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-4 h-4 mr-2" />
                                                    Send Message
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
