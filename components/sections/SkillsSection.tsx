"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DoodleSearch } from "@/components/ui/DoodleIcons";
import { TOOLBOX } from "@/lib/content";

export function SkillsSection() {
  const [query, setQuery] = useState("");
  const [circled, setCircled] = useState<Set<string>>(new Set());
  const q = query.trim().toLowerCase();
  const toggle = (item: string) =>
    setCircled((prev) => {
      const next = new Set(prev);
      if (!next.delete(item)) next.add(item);
      return next;
    });

  return (
    <section id="toolbox" className="mx-auto max-w-6xl px-6 py-28 md:px-12 lg:px-24">
      <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading index="04" title="Toolbox" />
        <AnimatedSection className="mb-14 w-full max-w-[260px] md:mb-14">
          <DoodleSearch value={query} onChange={setQuery} placeholder="Search tools..." />
        </AnimatedSection>
      </div>

      <p className="-mt-8 mb-10 font-display text-sm text-muted-foreground">
        {circled.size === 0
          ? "psst: tap anything to circle it ✎"
          : circled.size < 5
            ? `${circled.size} circled, keep going…`
            : <>{circled.size} circled: great taste. <a href="#contact" className="text-foreground underline decoration-wavy">let&apos;s talk</a></>}
      </p>

      <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLBOX.map((group, gi) => (
          <AnimatedSection key={group.name} delay={gi * 0.05}>
            <h3 className="mb-4 border-b-2 border-dashed border-foreground/20 pb-2 font-display text-lg font-bold">{group.name}</h3>
            <div className="flex flex-wrap gap-2.5">
              {group.items.map((item) => {
                const match = !q || item.toLowerCase().includes(q);
                const picked = circled.has(item);
                return (
                  <motion.button
                    key={item}
                    type="button"
                    onClick={() => toggle(item)}
                    aria-pressed={picked}
                    animate={{ opacity: match ? 1 : 0.2, scale: match && q ? 1.06 : 1 }}
                    whileTap={{ scale: 0.88, rotate: -4 }}
                    className={`relative rounded-full border-[1.8px] px-3 py-1.5 font-display text-xs font-bold transition-colors ${
                      picked
                        ? "border-foreground bg-foreground text-background"
                        : "border-foreground/30 text-muted-foreground hover:border-foreground hover:text-foreground"
                    }`}
                  >
                    {item}
                    {picked && (
                      <svg className="pointer-events-none absolute -inset-1.5 h-[calc(100%+12px)] w-[calc(100%+12px)] text-red-500" viewBox="0 0 100 40" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                        <path pathLength={1} className="scribble-path" d="M50 3 C85 1, 99 10, 97 22 C95 34, 60 39, 35 37 C8 35, 1 24, 5 14 C9 5, 38 2, 62 4" />
                      </svg>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
