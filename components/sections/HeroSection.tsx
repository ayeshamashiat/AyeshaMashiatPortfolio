"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ArrowRight } from "lucide-react";
import {
  DoodleStar,
  DoodleCloud,
  DoodleSpeechBubble,
  DoodleMonitor,
  DoodleArrow,
} from "@/components/ui/DoodleIcons";
import { InteractiveTerminal } from "@/components/ui/InteractiveTerminal";

const GREETINGS = ["hi!", "hello!", "salaam!", "hola!", "ciao!", "yo!", "hey :)"];

export function HeroSection() {
  const [greeting, setGreeting] = useState(0);
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden pt-24 pb-12">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-45 pointer-events-none" />

      {/* Floating Doodles Background */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: 0, ease: "easeInOut" }}
        className="absolute top-28 right-24 md:right-40 opacity-70 pointer-events-none"
      >
        <DoodleCloud size={60} arrow="down" />
      </motion.div>

      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 18, repeat: 0, ease: "linear" }}
        className="absolute top-48 left-12 md:left-24 opacity-60"
      >
        <motion.div drag dragSnapToOrigin whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.8 }} className="pointer-events-auto cursor-grab active:cursor-grabbing"><DoodleStar size={24} /></motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: 0, ease: "easeInOut" }}
        className="absolute bottom-32 right-1/3 opacity-55"
      >
        <motion.div drag dragSnapToOrigin whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.8 }} className="pointer-events-auto cursor-grab active:cursor-grabbing"><DoodleStar size={30} /></motion.div>
      </motion.div>

      {/* Decorative Hand-drawn symbols */}
      <div className="absolute top-36 left-1/3 text-2xl font-heading opacity-15 rotate-[12deg] pointer-events-none select-none">
        @
      </div>
      <div className="absolute bottom-40 right-16 text-3xl font-heading opacity-15 rotate-[-15deg] pointer-events-none select-none">
        #
      </div>
      <div className="absolute bottom-72 left-8 text-2xl font-heading opacity-10 rotate-[25deg] pointer-events-none select-none">
        {`{ ... }`}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Intro Column */}
        <div className="lg:col-span-7 space-y-8 text-left mt-8 lg:mt-0">
          <AnimatedSection delay={0.1}>
            <div className="text-xs md:text-sm font-bold text-primary uppercase tracking-[0.2em] flex items-center gap-3 font-display">
              <span className="w-6 h-[2.5px] bg-primary"></span>
              Ayesha Mashiat
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="relative">
            {/* Float 'hi!' Speech Bubble near name */}
            <motion.div
              animate={{ y: [0, -6, 0], rotate: [-8, -4, -8] }}
              transition={{ duration: 3.5, repeat: 0, ease: "easeInOut" }}
              className="absolute -top-12 left-52 md:left-72 z-20"
            >
              <button
                type="button"
                onClick={() => setGreeting((g) => (g + 1) % GREETINGS.length)}
                aria-label="Change greeting"
                title="click me!"
                className="block hover:scale-110 active:scale-90 transition-transform"
              >
                <DoodleSpeechBubble text={GREETINGS[greeting]} size={50} />
              </button>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4 leading-[1.05] text-foreground">
              Ayesha <span className="underline decoration-wavy decoration-3">Mashiat</span>
            </h1>
            <p className="text-xl md:text-2xl font-bold text-foreground leading-relaxed font-display mt-4">
              Backend Developer & Software Engineering Student
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed font-light">
              Third-year Software Engineering student at IUT. By day, I study databases and system architecture; by night, I build robust, scalable REST APIs, secure authentication systems, and LLM/RAG AI tools that survive production pressure. Driven by warm tea and a curiosity for how complex systems stay online.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.6}>
            <div className="flex flex-wrap gap-4 items-center">
              <a
                href="#projects"
                className="doodle-button inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-foreground font-bold hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 font-display text-base cursor-pointer"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="doodle-button inline-flex items-center justify-center px-6 py-3.5 text-foreground font-bold hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 font-display text-base cursor-pointer"
              >
                <span>Get in Touch</span>
              </a>
            </div>
          </AnimatedSection>
        </div>

        {/* Right Terminal Column */}
        <div className="lg:col-span-5 flex justify-center w-full relative z-10">
          <AnimatedSection delay={0.5} className="w-full max-w-[420px] lg:max-w-none">
            {/* Pointing hand doodle pointing to projects */}
            <motion.div 
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 2.5, repeat: 0 }}
              className="absolute -left-12 bottom-12 hidden xl:block text-foreground opacity-60"
            >
              <DoodleArrow size={36} direction="right" />
            </motion.div>

            <DoodleMonitor className="w-full">
              <InteractiveTerminal />
            </DoodleMonitor>
          </AnimatedSection>
        </div>
      </div>

      {/* Bottom Scroll Guide */}
      <AnimatedSection delay={1.0} className="absolute bottom-8 left-6 md:left-12 lg:left-24">
        <a href="#about" className="flex items-center gap-2.5 text-xs uppercase tracking-[0.20em] text-muted-foreground hover:text-foreground transition-colors font-display font-bold">
          <DoodleArrow size={16} direction="down" className="animate-bounce" />
          <span>Scroll to explore</span>
        </a>
      </AnimatedSection>
    </section>
  );
}
