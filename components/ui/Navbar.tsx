"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useTheme } from "next-themes";
import { DoodleLightBulb } from "@/components/ui/DoodleIcons";

const NAV_ITEMS = [
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#toolbox" },
  { name: "Writing", href: "#writing" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-4" : "py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative flex items-center justify-between px-6 py-2.5 doodle-card shadow-sm transition-all">
          <a href="#" className="relative z-10 text-xl font-bold tracking-wide text-foreground hover:opacity-80 transition-opacity font-display">
            Ayesha <span className="underline decoration-wavy">Mashiat</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-base font-bold text-muted-foreground hover:text-foreground uppercase tracking-wider transition-all duration-200 font-display hover:underline hover:decoration-wavy hover:underline-offset-4 hover:decoration-2"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="relative z-10 p-2 text-muted-foreground hover:text-foreground transition-all rounded-xl border-2 border-foreground/30 hover:border-foreground bg-background cursor-pointer"
                aria-label="Toggle theme"
              >
                <DoodleLightBulb size={15} className={theme === "light" ? "fill-foreground text-foreground" : "text-muted-foreground"} />
              </button>
            )}
            <a
              href="#contact"
              className="doodle-button inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-foreground hover:scale-102 active:scale-98 transition-all duration-200 font-display"
            >
              <span>Contact</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu & Theme Button */}
          <div className="md:hidden flex items-center gap-3 relative z-10">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-1.5 text-muted-foreground hover:text-foreground transition-all rounded-xl border-2 border-foreground/30 bg-background cursor-pointer"
                aria-label="Toggle theme"
              >
                <DoodleLightBulb size={14} className={theme === "light" ? "fill-foreground text-foreground" : "text-muted-foreground"} />
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 mx-4 mt-2 p-6 doodle-card shadow-lg md:hidden"
          >
            <nav className="flex flex-col gap-6">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-bold text-muted-foreground hover:text-foreground uppercase tracking-wider transition-colors font-display"
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 border-t border-foreground/10">
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-2 text-lg font-bold uppercase tracking-wider text-foreground hover:underline transition-colors font-display"
                >
                  <span>Contact</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
