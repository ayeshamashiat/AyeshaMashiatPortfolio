"use client";

import { ArrowDown } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Workbench } from "@/components/ui/Workbench";
import { CvButton } from "@/components/ui/CvButton";
import { useLang } from "@/lib/i18n";

/** The front page: lead story on the left, a sidebar of clippings on the right. */
export function HeroSection({ hasCv = false }: { hasCv?: boolean }) {
  const { t } = useLang();

  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-12 md:px-12 lg:grid-cols-12 lg:px-24">
      <div className="lg:col-span-7">
        <AnimatedSection>
          <p className="kicker">{t("Front page", "প্রথম পাতা")}</p>
          <h1 className="mt-2 text-5xl font-black leading-[1.02] tracking-tight md:text-7xl">
            {t("Backend developer & Software Engineering student", "ব্যাকএন্ড ডেভেলপার ও সফটওয়্যার ইঞ্জিনিয়ারিং শিক্ষার্থী")}
          </h1>
          <p className="mt-5 border-y border-foreground py-2 font-mono text-xs uppercase tracking-widest">
            {t("By Ayesha Mashiat · Dhaka", "আয়েশা মাশিয়াত · ঢাকা")}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <p className="dropcap mt-6 text-lg leading-relaxed md:columns-2 md:gap-8 md:text-xl col-rule">
            {t(
              "A third-year SWE student at IUT, based in Dhaka, I love the invisible parts of software: APIs, databases and auth that quietly hold everything up. I also tinker with AI on the side, run on far too much cha, and keep about seventeen tabs open at all times.",
              "আমি আইইউটি-র সফটওয়্যার ইঞ্জিনিয়ারিংয়ের তৃতীয় বর্ষের শিক্ষার্থী, থাকি ঢাকায়। সফটওয়্যারের অদৃশ্য অংশগুলো আমার প্রিয়: এপিআই, ডাটাবেস আর অথেনটিকেশন, যারা নিঃশব্দে সবকিছু ধরে রাখে। পাশাপাশি এআই নিয়ে নাড়াচাড়া করি, প্রচুর চা খাই, আর সবসময় প্রায় সতেরোটা ট্যাব খুলে রাখি।",
            )}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn gap-2 px-6 py-3 uppercase tracking-wider">
              {t("View my projects", "আমার প্রজেক্ট দেখুন")} <ArrowDown className="h-4 w-4" />
            </a>
            {hasCv && <CvButton />}
            <a href="#contact" className="font-display font-bold underline decoration-2 underline-offset-4 hover:text-[var(--red)]">
              {t("or get in touch", "অথবা যোগাযোগ করুন")}
            </a>
          </div>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={0.15} className="lg:col-span-5">
        <Workbench />
      </AnimatedSection>
    </section>
  );
}
