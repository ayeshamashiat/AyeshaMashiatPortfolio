"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JOURNEY, type JourneyKind } from "@/lib/content";
import { useLang } from "@/lib/i18n";

const FILTERS: { id: "all" | JourneyKind; en: string; bn: string }[] = [
  { id: "all", en: "All", bn: "সব" },
  { id: "study", en: "Study", bn: "পড়াশোনা" },
  { id: "hackathon", en: "Hackathons", bn: "হ্যাকাথন" },
  { id: "work", en: "Work", bn: "কাজ" },
];

/** A dated chronology: study, hackathons and work, oldest first. */
export function JourneySection() {
  const [filter, setFilter] = useState<"all" | JourneyKind>("all");
  const [cert, setCert] = useState<string | null>(null);
  const { t } = useLang();
  const stops = JOURNEY.filter((s) => filter === "all" || s.kind === filter);

  return (
    <section id="journey" className="border-y border-foreground bg-card-bg/60">
      <div className="mx-auto max-w-4xl px-6 py-16 md:px-12">
        <SectionHeading index="03" title="Journey" bn="যাত্রাপথ" />

        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={`border border-foreground px-3.5 py-1 font-display text-sm font-bold uppercase tracking-wider transition-colors ${filter === f.id ? "bg-foreground text-background" : "hover:bg-foreground/10"}`}
            >
              {t(f.en, f.bn)}
            </button>
          ))}
        </div>

        <ol>
          <AnimatePresence initial={false}>
            {stops.map((s) => (
              <motion.li key={s.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, height: 0 }} className="grid gap-x-8 border-t border-foreground py-5 sm:grid-cols-[11rem_1fr]">
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider">{s.when}</p>
                  <p className="kicker mt-1">{s.kind}</p>
                </div>
                <div>
                  <h3 className="text-2xl font-black leading-tight md:text-3xl">
                    {s.title}
                    {s.current && (
                      <span className="ml-3 inline-block -rotate-3 border-2 border-[var(--red)] px-2 py-0.5 align-middle font-mono text-[11px] font-bold uppercase tracking-widest text-[var(--red)]">
                        {t("you are here", "আপনি এখানে")}
                      </span>
                    )}
                  </h3>
                  <p className="mt-1.5 max-w-xl text-muted-foreground">{s.detail}</p>
                  {s.cert && (
                    <button onClick={() => setCert(s.cert!)} className="mt-2 font-display font-bold underline decoration-2 underline-offset-4 hover:text-[var(--red)]">
                      {t("See the certificate", "সনদ দেখুন")}
                    </button>
                  )}
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ol>
        <div className="border-t border-foreground" />
      </div>

      <AnimatePresence>
        {cert && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCert(null)} className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4">
            <button className="absolute right-5 top-5 border-2 border-white p-2 text-white" aria-label="Close certificate">
              <X className="h-5 w-5" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cert} alt="Solvio Top 100 certificate" className="max-h-full max-w-full" onClick={(e) => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
