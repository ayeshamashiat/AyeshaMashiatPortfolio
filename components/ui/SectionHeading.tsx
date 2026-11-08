"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { bnNum, useLang } from "@/lib/i18n";

/** Section opener: heavy rule, a small red kicker with the section number, then the headline. */
export function SectionHeading({ index, title, bn }: { index: string; title: string; bn: string }) {
  const { lang, t } = useLang();
  return (
    <AnimatedSection className="mb-10">
      <div className="rule-thick pt-2">
        <p className="kicker">
          {t("Section", "বিভাগ")} {lang === "bn" ? bnNum(index) : index}
        </p>
        <h2 className="mt-1 text-4xl font-black tracking-tight md:text-6xl">{t(title, bn)}</h2>
        <div className="mt-3 border-b border-foreground" />
      </div>
    </AnimatedSection>
  );
}
