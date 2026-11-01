"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { DoodleHourglass, DoodleTape, DoodleStar } from "@/components/ui/DoodleIcons";
import { motion } from "framer-motion";

const TIMELINE = [
  {
    type: "education",
    role: "B.Sc. Software Engineering",
    company: "Islamic University of Technology (IUT)",
    date: "2023 - Present",
    badge: "3rd Year",
    description:
      "Specializing in software design, backend architectures, databases, and distributed systems. Applying academic patterns to construct production-ready web and AI applications.",
    highlights: [
      "Database Design & Query Tuning",
      "REST API Architecture & Integration",
      "Distributed Cloud Systems & AWS",
      "Data Structures & Algorithms",
      "Architectural Design Patterns",
      "Systems Scalability & Security",
    ],
  }
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Floating Star */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4.5, repeat: 0, ease: "easeInOut" }}
        className="absolute top-24 left-1/4 opacity-25 pointer-events-none"
      >
        <DoodleStar size={24} />
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="flex items-center gap-4 mb-16">
          <div>
            <h2 className="text-xs uppercase tracking-[0.25em] text-foreground/70 mb-4 font-bold font-display">04 / Timeline</h2>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground font-display flex items-center gap-3">
              <span>Education & Journey</span>
            </h3>
          </div>
          <DoodleHourglass className="opacity-70 ml-auto" size={36} />
        </AnimatedSection>

        <div className="relative border-l-[3px] border-foreground/30 pl-8 md:pl-16 ml-4 md:ml-6 space-y-16">
          {TIMELINE.map((item, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <div className="relative">
                {/* Wobbly Hourglass Timeline Node */}
                <div className="absolute -left-[49px] md:-left-[82px] top-1.5 z-10 flex items-center justify-center bg-background border-2 border-foreground rounded-full p-1.5 w-9 h-9 md:w-12 md:h-12 shadow-[2px_2px_0_0_currentColor]">
                  <DoodleHourglass size={18} className="text-foreground" />
                </div>

                {/* Timeline Card */}
                <div className="doodle-card p-6 md:p-8 relative group">

                  {/* Tape header decoration */}
                  <DoodleTape text="CERTIFIED" className="-top-3 left-10 md:left-14" />

                  {/* Date + badge row */}
                  <div className="flex flex-wrap items-center gap-4 mb-4 mt-2">
                    <span className="text-sm font-bold tracking-wider text-foreground/80 uppercase font-display">
                      {item.date}
                    </span>
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded border-2 border-foreground bg-background text-foreground shadow-[1.5px_1.5px_0_0_currentColor]"
                    >
                      {item.badge}
                    </span>
                  </div>

                  <h4 className="text-2xl font-black text-foreground mb-1 leading-snug">{item.role}</h4>
                  <span className="text-foreground/80 font-bold block mb-5 font-display underline decoration-wavy decoration-1 underline-offset-4">{item.company}</span>
                  
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6 font-light">
                    {item.description}
                  </p>

                  {/* Highlights grid */}
                  <div className="border-t-2 border-dashed border-foreground/15 pt-5">
                    <span className="text-xs uppercase tracking-[0.20em] text-muted-foreground block mb-3 font-bold font-display">Core Learnings:</span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {item.highlights.map((point, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2.5 text-sm font-bold text-foreground/90 font-display"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-foreground shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}