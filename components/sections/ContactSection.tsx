"use client";

import { useState } from "react";
import { ArrowUpRight, Dices } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DoodleTicTacToe } from "@/components/ui/DoodleTicTacToe";
import { LINKS, STARTERS } from "@/lib/content";

const SOCIALS = [
  { name: "LinkedIn", href: LINKS.linkedin, primary: true },
  { name: "GitHub", href: LINKS.github },
  { name: "DEV", href: LINKS.devto },
  { name: "Instagram", href: LINKS.instagram },
  { name: "Facebook", href: LINKS.facebook },
];

export function ContactSection() {
  const [i, setI] = useState(0);
  const [copied, setCopied] = useState(false);

  const shuffle = () => {
    setCopied(false);
    setI((cur) => (cur + 1 + Math.floor(Math.random() * (STARTERS.length - 1))) % STARTERS.length);
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(STARTERS[i]);
      setCopied(true);
    } catch {
      /* clipboard unavailable: the text is still on screen */
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 pb-16 pt-28 md:px-12 lg:px-24">
      <SectionHeading index="08" title="Say hi" kicker="No contact form, no ceremony. Pick a conversation starter, steal it, and send it my way." />

      <div className="grid items-start gap-14 lg:grid-cols-2">
        <AnimatedSection>
          <div data-no-doodle className="doodle-card p-6">
            <p className="font-mono text-xs text-muted-foreground">conversation starter</p>
            <p key={i} className="mt-3 min-h-[5rem] font-display text-xl font-bold leading-snug">&ldquo;{STARTERS[i]}&rdquo;</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button onClick={shuffle} className="doodle-button gap-2 px-4 py-2 font-display font-bold">
                <Dices className="h-4 w-4" /> shuffle
              </button>
              <button onClick={copy} className="doodle-button px-4 py-2 font-display font-bold">
                {copied ? "copied ✓" : "copy it"}
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className={`doodle-button gap-1.5 px-5 py-2.5 font-display font-bold ${s.primary ? "bg-foreground text-background" : ""}`}
              >
                {s.name} <ArrowUpRight className="h-4 w-4" />
              </a>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15} className="flex flex-col items-center gap-3">
          <h3 className="font-display text-xl font-bold">Or settle it over a game</h3>
          <DoodleTicTacToe />
        </AnimatedSection>
      </div>

      <footer className="mt-28 text-center text-xs text-muted-foreground">
        <p>Drawn by hand, rendered by Next.js. © {new Date().getFullYear()} Ayesha Mashiat</p>
      </footer>
    </section>
  );
}
