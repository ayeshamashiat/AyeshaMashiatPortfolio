"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Crossword } from "@/components/ui/Crossword";
import { TicTacToe } from "@/components/ui/TicTacToe";
import { useLang } from "@/lib/i18n";

/** The puzzle page: a crossword about me, plus tic-tac-toe for a quick break. */
export function PuzzlesSection() {
  const { t } = useLang();
  return (
    <section id="puzzles" className="border-y border-foreground bg-card-bg/60">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-12 lg:px-24">
        <SectionHeading index="06" title="Puzzles" bn="ধাঁধা" />
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_220px]">
          <AnimatedSection>
            <h3 className="font-display text-2xl font-black md:text-3xl">{t("The mini crossword", "ছোট্ট ক্রসওয়ার্ড")}</h3>
            <div className="mt-5">
              <Crossword />
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1} className="lg:border-l lg:border-foreground lg:pl-8">
            <h3 className="kicker mb-3">{t("Tic-tac-toe", "টিক-ট্যাক-টো")}</h3>
            <TicTacToe />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
