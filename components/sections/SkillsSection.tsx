"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Check, Search } from "lucide-react";
import { TOOLBOX } from "@/lib/content";
import { useLang } from "@/lib/i18n";

export function SkillsSection() {
  const { t } = useLang();
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
    <section id="toolbox" className="mx-auto max-w-6xl px-6 py-16 md:px-12 lg:px-24">
      <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading index="04" title="Skills" bn="দক্ষতা" />
        <AnimatedSection className="mb-10 w-full max-w-[260px]">
          <label className="flex items-center gap-2 border border-foreground bg-card-bg px-3 py-2">
            <Search className="h-4 w-4 shrink-0" aria-hidden />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("Search skills", "দক্ষতা খুঁজুন")}
              aria-label={t("Search skills", "দক্ষতা খুঁজুন")}
              className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
            />
          </label>
        </AnimatedSection>
      </div>

      <div className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLBOX.map((group, gi) => (
          <AnimatedSection key={group.name} delay={gi * 0.05}>
            <h3 className="kicker mb-3 border-b border-foreground pb-2">{group.name}</h3>
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
                    whileTap={{ scale: 0.94 }}
                    className={`relative border px-3 py-1 font-display text-sm font-bold transition-colors ${
                      picked
                        ? "border-foreground bg-[var(--yellow)] text-[#1a1a1a]"
                        : "border-foreground/40 text-muted-foreground hover:border-foreground hover:text-foreground"
                    }`}
                  >
                    {item}
                    {picked && <Check className="ml-1.5 inline h-3.5 w-3.5" aria-hidden />}
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
