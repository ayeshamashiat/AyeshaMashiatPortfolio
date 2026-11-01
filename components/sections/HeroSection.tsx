"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { DoodleSpeechBubble, DoodleStar } from "@/components/ui/DoodleIcons";
import { Workbench } from "@/components/ui/Workbench";

const GREETINGS = ["hi!", "hello!", "salaam!", "hola!", "ciao!", "hey :)"];

export function HeroSection() {
  const [greeting, setGreeting] = useState(0);

  return (
    <section className="relative flex min-h-screen flex-col justify-center px-6 pb-16 pt-32 md:px-12 lg:px-24">
      <motion.div
        drag
        dragSnapToOrigin
        whileHover={{ scale: 1.25 }}
        className="absolute right-[12%] top-36 hidden cursor-grab opacity-60 md:block"
      >
        <DoodleStar size={26} />
      </motion.div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-12">
        <div className="space-y-7 lg:col-span-6">
          <AnimatedSection delay={0.1}>
            <button
              onClick={() => setGreeting((g) => (g + 1) % GREETINGS.length)}
              aria-label="Change greeting"
              title="click me"
              className="-ml-1 transition-transform hover:scale-105 active:scale-90"
            >
              <DoodleSpeechBubble text={GREETINGS[greeting]} size={56} />
            </button>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
              Backend by trade.
              <br />
              <span className="underline decoration-wavy decoration-[3px] underline-offset-[10px]">Curious</span> by default.
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <p className="max-w-lg text-lg leading-relaxed text-muted-foreground md:text-xl">
              I&apos;m Ayesha. I design the APIs, schemas and auth that quietly hold products up, and I keep pulling on the thread of
              how AI really works. Sometimes the two meet and I ship something odd.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#projects" className="doodle-button gap-2 px-6 py-3 font-display font-bold">
                Open the case files <ArrowDown className="h-4 w-4" />
              </a>
              <a href="#contact" className="font-display font-bold underline decoration-wavy underline-offset-4 hover:decoration-2">
                or just say hi
              </a>
            </div>
            <p className="mt-6 font-mono text-xs text-muted-foreground">
              Dhaka · SWE @ IUT · internship @ Reddot Digital
            </p>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.35} className="lg:col-span-6">
          <Workbench />
        </AnimatedSection>
      </div>
    </section>
  );
}
