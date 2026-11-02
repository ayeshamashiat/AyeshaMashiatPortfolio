"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { DoodleSpeechBubble, DoodleStar } from "@/components/ui/DoodleIcons";
import { Workbench } from "@/components/ui/Workbench";
import { CvButton } from "@/components/ui/CvButton";

const GREETINGS = ["hi!", "hello!", "salaam!", "hola!", "ciao!", "hey :)"];

export function HeroSection({ hasCv = false }: { hasCv?: boolean }) {
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
              Hi, I&apos;m <span className="underline decoration-wavy decoration-[3px] underline-offset-[10px]">Ayesha Mashiat</span>
            </h1>
            <p className="mt-4 font-display text-xl font-bold md:text-2xl">Backend developer &amp; Software Engineering student</p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <p className="font-readable max-w-lg text-lg leading-relaxed text-muted-foreground md:text-xl">
              I&apos;m a third-year at IUT in Dhaka who loves the invisible parts of software: APIs, databases and auth that quietly hold
              everything up. I also tinker with AI on the side, run on far too much cha, and keep about seventeen tabs open at all times.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#projects" className="doodle-button gap-2 px-6 py-3 font-display font-bold">
                View my projects <ArrowDown className="h-4 w-4" />
              </a>
              {hasCv && <CvButton />}
              <a href="#contact" className="font-display font-bold underline decoration-wavy underline-offset-4 hover:decoration-2">
                or get in touch
              </a>
            </div>
                    </AnimatedSection>
        </div>

        <AnimatedSection delay={0.35} className="lg:col-span-6">
          <Workbench />
        </AnimatedSection>
      </div>
    </section>
  );
}
