"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Crossword } from "@/components/ui/Crossword";
import { useLang } from "@/lib/i18n";

/** The puzzle page: a mini crossword mixing tech and me. */
export function PuzzlesSection() {
  const { t } = useLang();
  return (
    <section id="puzzles" className="border-y border-foreground bg-card-bg/60">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-12 lg:px-24">
        <SectionHeading index="06" title="Puzzles" bn="ধাঁধা" />
        <AnimatedSection>
          <h3 className="font-display text-2xl font-black md:text-3xl">{t("The mini crossword", "ছোট্ট ক্রসওয়ার্ড")}</h3>
          <div className="mt-5">
            <Crossword />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
