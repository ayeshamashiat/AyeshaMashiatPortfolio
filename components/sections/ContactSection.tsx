"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Mail, ArrowRight } from "lucide-react";
import { DoodleBell, DoodleStar, DoodleSpeechBubble, DoodleArrow } from "@/components/ui/DoodleIcons";
import { motion } from "framer-motion";
import { DoodleTicTacToe } from "@/components/ui/DoodleTicTacToe";

export function ContactSection() {
  return (
    <section id="contact" className="py-32 px-6 md:px-12 lg:px-24 border-t-2 border-foreground/30 relative overflow-hidden bg-background">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Floating doodles */}
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: 0, ease: "easeInOut" }}
        className="absolute top-20 left-16 opacity-30 pointer-events-none"
      >
        <DoodleBell size={32} />
      </motion.div>

      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: 0, ease: "linear" }}
        className="absolute bottom-24 right-1/4 opacity-40 pointer-events-none"
      >
        <DoodleStar size={24} />
      </motion.div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <AnimatedSection className="relative">
          {/* Float Speech Bubble above header */}
          <motion.div
            animate={{ y: [0, -4, 0], rotate: [6, 10, 6] }}
            transition={{ duration: 3, repeat: 0, ease: "easeInOut" }}
            className="absolute -top-16 right-16 md:right-32 z-20 pointer-events-none"
          >
            <DoodleSpeechBubble text="Ping me!" size={58} />
          </motion.div>

          <span className="text-xs uppercase tracking-[0.25em] text-foreground/70 mb-4 font-bold block font-display">06 / Get in Touch</span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-foreground font-display">Let's build something together</h2>
          <p className="text-base md:text-lg text-muted-foreground mb-12 max-w-xl mx-auto font-light leading-relaxed">
            I am always open to new project opportunities, collaborations, or discussing scalability, APIs, and systems design. Feel free to drop a message.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="relative flex flex-col items-center">
          {/* Hand pointing to send button */}
          <div className="absolute -left-12 top-1/2 -translate-y-1/2 hidden md:block opacity-40">
            <DoodleArrow size={30} direction="right" />
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 w-full sm:w-auto">
            <a 
              href="mailto:hello@example.com" 
              className="doodle-button w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-foreground font-bold group font-display text-base cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Send Message</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <div className="flex gap-4">
              <a 
                href="https://github.com/ayeshamashiat" 
                target="_blank"
                rel="noreferrer"
                className="doodle-button p-4 text-foreground cursor-pointer"
                aria-label="GitHub Profile"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank"
                rel="noreferrer"
                className="doodle-button p-4 text-foreground cursor-pointer"
                aria-label="LinkedIn Profile"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
      
      <AnimatedSection className="mt-28 flex flex-col items-center gap-4 relative z-10">
        <h3 className="text-2xl font-bold font-display">Bored? Beat me at tic-tac-toe</h3>
        <DoodleTicTacToe />
      </AnimatedSection>

      <div className="mt-28 text-center text-xs tracking-wider text-muted-foreground font-light font-display">
        <p>© {new Date().getFullYear()} Ayesha Mashiat. All rights reserved.</p>
        <p className="mt-2 text-foreground/40 font-bold underline decoration-wavy underline-offset-4">Designed & Engineered with hand-drawn precision.</p>
      </div>
    </section>
  );
}
