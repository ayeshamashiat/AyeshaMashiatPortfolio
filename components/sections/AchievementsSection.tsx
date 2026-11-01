"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DoodleMegaphone, DoodleTape, DoodleStar } from "@/components/ui/DoodleIcons";

const ACHIEVEMENTS = [
  {
    id: "solvio",
    title: "SOLVIO Top 100",
    issuer: "SOLVIO Competition",
    date: "2025",
    team: "Team #336",
    category: "Hackathon",
    description:
      "Ranked in the Top 100 teams out of all participants in the SOLVIO competition — a prestigious national-level engineering and complex systems problem-solving challenge.",
    certificate: "/resources/Achievement/SOLVIO_Top100_Certificate_Team_336.png",
    badge: "Top 100",
  },
];

export function AchievementsSection() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="achievements" className="py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Background stars */}
      <motion.div
        animate={{ y: [0, 8, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 5, repeat: 0, ease: "easeInOut" }}
        className="absolute top-16 right-1/4 opacity-25 pointer-events-none"
      >
        <DoodleStar size={24} />
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="flex items-center gap-4 mb-16">
          <div>
            <h2 className="text-xs uppercase tracking-[0.25em] text-foreground/70 mb-4 font-bold font-display">05 / Milestones</h2>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground font-display flex items-center gap-3">
              <span>Achievements</span>
            </h3>
            <p className="text-muted-foreground font-light text-sm md:text-base mt-3 max-w-xl leading-relaxed">
              Recognition earned through competitions, teamwork, hackathons, and independent challenges.
            </p>
          </div>
          <DoodleMegaphone className="text-foreground/70 ml-auto hidden sm:block" size={40} />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {ACHIEVEMENTS.map((item, index) => (
            <AnimatedSection key={item.id} delay={index * 0.1}>
              <div
                className="doodle-card group relative overflow-hidden flex flex-col h-full pb-6 pt-2 bg-card-bg"
              >
                {/* Polaroid Tape decoration */}
                <DoodleTape text="AWARDED" className="-top-1.5 left-1/2 -translate-x-1/2 z-10" />

                {/* Certificate thumbnail */}
                <div
                  className="relative aspect-[4/3] overflow-hidden border-b-2 border-foreground/35 cursor-zoom-in bg-background m-4 rounded-sm border-2 border-foreground/15 shadow-sm"
                  onClick={() => setLightbox(item.certificate)}
                >
                  <img
                    src={item.certificate}
                    alt={`${item.title} certificate`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
                  
                  {/* Zoom hint */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="px-3.5 py-2 rounded-xl border-2 border-foreground bg-background text-xs font-bold tracking-wider text-foreground uppercase shadow-[2px_2px_0_0_currentColor]">
                      View Certificate
                    </span>
                  </div>
                  
                  {/* Badge overlay */}
                  <div
                    className="absolute top-3 left-3 px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-widest border-2 border-foreground bg-background text-foreground shadow-[1.5px_1.5px_0_0_currentColor]"
                  >
                    {item.badge}
                  </div>
                </div>

                {/* Card body */}
                <div className="px-6 flex flex-col gap-4 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-lg font-bold text-foreground leading-snug">{item.title}</h4>
                      <span className="text-xs text-foreground/80 font-bold font-display underline decoration-wavy underline-offset-4">{item.issuer}</span>
                    </div>
                    <span
                      className="shrink-0 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded border-2 border-foreground bg-background text-foreground shadow-[1.5px_1.5px_0_0_currentColor] font-display"
                    >
                      {item.category}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground font-light leading-relaxed flex-1">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t-2 border-dashed border-foreground/15 text-xs text-foreground/60 font-bold font-display">
                    <span>{item.team}</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-sm cursor-zoom-out"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-4 -right-4 z-10 p-2.5 rounded-xl border-2 border-foreground text-foreground bg-background hover:bg-muted transition-colors shadow-[2px_2px_0_0_currentColor] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <img
                src={lightbox}
                alt="Certificate"
                className="w-full rounded border-2 border-foreground shadow-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}