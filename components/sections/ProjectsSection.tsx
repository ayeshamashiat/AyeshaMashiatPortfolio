"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BouncerDemo } from "@/components/ui/BouncerDemo";
import { OLDER_WORK, PROJECTS } from "@/lib/content";
import { bnNum, useLang } from "@/lib/i18n";

/** Top stories: pick a page tab and the full story swaps in. */
export function ProjectsSection() {
  const [active, setActive] = useState(0);
  const { lang, t } = useLang();
  const p = PROJECTS[active];

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-16 md:px-12 lg:px-24">
      <SectionHeading index="02" title="Projects" bn="প্রজেক্ট" />

      <AnimatedSection>
        <div role="tablist" aria-label="Projects" className="no-scrollbar mb-8 flex gap-0 overflow-x-auto border-b border-foreground">
          {PROJECTS.map((proj, i) => (
            <button
              key={proj.id}
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className={`-mb-px shrink-0 border border-b-0 px-4 py-2 text-left font-display font-bold transition-colors ${active === i ? "border-foreground bg-card-bg" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              <span className="kicker mr-2">{t("Page", "পাতা")} {lang === "bn" ? bnNum(i + 1) : i + 1}</span>
              {proj.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.article key={p.id} role="tabpanel" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h3 className="text-4xl font-black tracking-tight md:text-6xl">{p.title}</h3>
              <div className="mt-5 gap-10 border-t border-foreground pt-5 md:columns-2 col-rule">
                <h4 className="kicker">{t("The problem", "সমস্যা")}</h4>
                <p className="dropcap mt-1">{p.itch}</p>
                <h4 className="kicker mt-5">{t("The solution", "সমাধান")}</h4>
                <p className="mt-1">{p.trick}</p>
              </div>
              {p.id === "01" && <BouncerDemo />}
            </div>

            <aside className="space-y-6 lg:border-l lg:border-foreground lg:pl-8">
              <figure className="border-y-[3px] border-double border-foreground py-4">
                <p className="font-display text-6xl font-black leading-none text-[var(--red)]">{p.receipt.value}</p>
                <figcaption className="mt-2 italic">{p.receipt.label}</figcaption>
              </figure>
              <ul className="flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <li key={s} className="border border-foreground px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider">{s}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <a href={p.repo} target="_blank" rel="noreferrer" className="btn gap-1 px-4 py-2 text-sm uppercase tracking-wider">
                  {t("Code", "কোড")} <ArrowUpRight className="h-4 w-4" />
                </a>
                {p.live && (
                  <a href={p.live} target="_blank" rel="noreferrer" className="btn btn-solid gap-1 px-4 py-2 text-sm uppercase tracking-wider">
                    {t("Live", "লাইভ")} <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            </aside>
          </motion.article>
        </AnimatePresence>
      </AnimatedSection>

      <AnimatedSection className="mt-14">
        <h3 className="kicker mb-2 border-t-[3px] border-double border-foreground pt-3">{t("From the archive", "আর্কাইভ থেকে")}</h3>
        <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {OLDER_WORK.map((w) => (
            <li key={w.name}>
              <a href={w.href} target="_blank" rel="noreferrer" className="flex items-baseline justify-between gap-3 border-b border-foreground/40 py-2.5 hover:text-[var(--red)]">
                <span className="font-display font-bold">{w.name}</span>
                <span className="truncate text-sm italic text-muted-foreground">{w.note}</span>
              </a>
            </li>
          ))}
        </ul>
      </AnimatedSection>
    </section>
  );
}
