"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "motion/react"

const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
]

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [hoveredItem, setHoveredItem] = useState<string | null>(null)
    const [activeSection, setActiveSection] = useState<string>("home")
    const [scrollProgress, setScrollProgress] = useState(0)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            const offsetTop = sectionId === 'home' ? 0 : element.offsetTop - 80
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            })
        }
        setIsMenuOpen(false)
    }

    const isActive = (href: string) => {
        const sectionId = href.replace('#', '')
        return activeSection === sectionId
    }

    // Update active section and scroll progress based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'about', 'projects', 'skills', 'contact']
            const scrollPosition = window.scrollY + 150

            // Calculate scroll progress
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight
            const progress = (window.scrollY / documentHeight) * 100
            setScrollProgress(Math.min(progress, 100))

            // Check if we're at the top (home section)
            if (scrollPosition < 200) {
                setActiveSection('home')
                return
            }

            // Check other sections
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i]
                const element = document.getElementById(section)
                if (element) {
                    const { offsetTop } = element
                    if (scrollPosition >= offsetTop - 100) {
                        setActiveSection(section)
                        break
                    }
                }
            }
        }

        // Initial call to set active section
        handleScroll()

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
            {/* Scroll Progress Indicator */}
            <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-primary"
                style={{ width: `${scrollProgress}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${scrollProgress}%` }}
                transition={{ duration: 0.1 }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <button
                        onClick={() => scrollToSection('home')}
                        className="text-xl font-bold text-foreground hover:text-primary transition-colors duration-200"
                    >
                        Talib
                    </button>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item, index) => {
                            const active = isActive(item.href)
                            const hovered = hoveredItem === item.name

                            return (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                >
                                    <button
                                        onClick={() => scrollToSection(item.href.replace('#', ''))}
                                        className={cn(
                                            "relative px-3 py-2 font-medium transition-all duration-300 group",
                                            active
                                                ? "text-primary"
                                                : "text-foreground hover:text-primary"
                                        )}
                                        onMouseEnter={() => setHoveredItem(item.name)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                    >
                                        <span className="relative z-10 transition-all duration-300">
                                            {item.name}
                                        </span>

                                        {/* Single underline effect */}
                                        <motion.div
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{
                                                width: active ? "100%" : hovered ? "100%" : "0%",
                                                opacity: active ? 1 : hovered ? 0.7 : 0
                                            }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        />
                                    </button>
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* Theme Toggle & Mobile Menu Button */}
                    <div className="flex items-center space-x-4">
                        <AnimatedThemeToggler className="p-2 rounded-md hover:bg-accent transition-colors duration-200 text-foreground hover:text-primary" />

                        {/* Mobile menu button */}
                        <motion.button
                            onClick={toggleMenu}
                            className="md:hidden p-2 rounded-md hover:bg-accent transition-colors duration-200 text-foreground hover:text-primary relative"
                            aria-label="Toggle menu"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={isMenuOpen ? "close" : "menu"}
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                                </motion.div>
                            </AnimatePresence>

                            {/* Button glow effect */}
                            <motion.div
                                className="absolute inset-0 bg-primary/10 rounded-md blur-sm"
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                            />
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="md:hidden overflow-hidden"
                            initial={{ maxHeight: 0, opacity: 0 }}
                            animate={{ maxHeight: 400, opacity: 1 }}
                            exit={{ maxHeight: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <motion.div
                                className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-md rounded-lg mt-2 border border-border"
                                initial={{ y: -10 }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {navItems.map((item, index) => {
                                    const active = isActive(item.href)

                                    return (
                                        <motion.div
                                            key={item.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ delay: index * 0.1, duration: 0.3 }}
                                        >
                                            <button
                                                onClick={() => scrollToSection(item.href.replace('#', ''))}
                                                className={cn(
                                                    "relative block px-3 py-2 rounded-md transition-all duration-300 font-medium group w-full text-left",
                                                    active
                                                        ? "text-primary bg-primary/10"
                                                        : "text-foreground hover:text-primary hover:bg-accent"
                                                )}
                                            >
                                                <span className="relative z-10 transition-all duration-300">
                                                    {item.name}
                                                </span>

                                                {/* Simple active indicator */}
                                                <motion.div
                                                    className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-md"
                                                    initial={{ scaleY: 0 }}
                                                    animate={{ scaleY: active ? 1 : 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                />
                                            </button>
                                        </motion.div>
                                    )
                                })}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    )
}
