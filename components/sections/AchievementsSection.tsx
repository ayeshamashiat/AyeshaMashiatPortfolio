"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PODIUM } from "@/lib/content";

export function AchievementsSection() {
  const [cert, setCert] = useState<string | null>(null);

  return (
    <section id="status" className="border-y-2 border-foreground/15 bg-card-bg/20">
      <div className="mx-auto max-w-5xl px-6 py-28 md:px-12">
        <SectionHeading index="05" title="Hackathons" />

        <div className="grid gap-6 sm:grid-cols-2">
          {PODIUM.map((p, i) => (
            <AnimatedSection key={p.event} delay={i * 0.06}>
              <Ticket {...p} onCert={setCert} />
            </AnimatedSection>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {cert && (
          <motion.div
            data-no-doodle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCert(null)}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4"
          >
            <button className="absolute right-5 top-5 rounded-full border-2 border-white p-2 text-white" aria-label="Close certificate">
              <X className="h-5 w-5" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cert} alt="Solvio Top 100 certificate" className="max-h-full max-w-full rounded-md" onClick={(e) => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Ticket({ place, event, year, note, cert, onCert }: (typeof PODIUM)[number] & { onCert: (src: string) => void }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="[perspective:900px]">
      <motion.div
        animate={{ rotateX: flipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
        className="relative h-40 [transform-style:preserve-3d]"
      >
        <button
          onClick={() => setFlipped((f) => !f)}
          aria-label={`${event}: flip ticket`}
          className="doodle-card absolute inset-0 flex flex-col justify-between p-5 text-left [backface-visibility:hidden]"
        >
          <span className="w-fit -rotate-2 border-2 border-foreground px-2 py-0.5 font-mono text-xs font-bold" style={{ borderRadius: "6px 3px 8px 3px" }}>
            {place}
          </span>
          <span className="font-display text-xl font-bold leading-tight">{event}</span>
          {year && <span className="font-mono text-xs text-muted-foreground">{year}</span>}
        </button>

        <div
          className="doodle-card absolute inset-0 flex flex-col items-start justify-center gap-2 bg-foreground p-5 text-background [backface-visibility:hidden] [transform:rotateX(180deg)]"
          style={{ background: "var(--foreground)", color: "var(--background)" }}
        >
          <p className="font-display text-lg font-bold">{note}</p>
          {cert && (
            <button onClick={() => onCert(cert)} className="font-display underline decoration-wavy underline-offset-4">
              see certificate
            </button>
          )}
          <button onClick={() => setFlipped(false)} className="mt-1 font-mono text-xs opacity-70">flip back</button>
        </div>
      </motion.div>
    </div>
  );
}
