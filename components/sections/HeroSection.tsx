"use client";

import { ArrowDown } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Workbench } from "@/components/ui/Workbench";
import type { Weather } from "@/lib/weather";
import { useLang } from "@/lib/i18n";

/** The front page: lead story on the left, a sidebar of clippings on the right. */
export function HeroSection({ weather = null }: { weather?: Weather | null }) {
  const { t } = useLang();
  const intro = t(
    "I’m Ayesha, a senior year Software Engineering student at IUT in Dhaka. I build backend software and I’m currently interning at RedDot Digital as a SWE intern. I like hackathons (some would say I am addicted to them). Outside of code I read a lot, drink far too much cha and currently hyperfixating on history rabbitholes.",
    "আমি আয়েশা, ঢাকায় আইইউটি-তে সফটওয়্যার ইঞ্জিনিয়ারিংয়ের শেষ বর্ষে পড়ছি। ব্যাকএন্ড সফটওয়্যার বানাই, এখন রেডডট ডিজিটালে এসডব্লিউই ইন্টার্ন হিসেবে কাজ করছি। হ্যাকাথন আমার খুব প্রিয় (কেউ কেউ বলবে নেশা)। কোডের বাইরে প্রচুর বই পড়ি, প্রচুর চা খাই, আর আজকাল ইতিহাসের র‍্যাবিট হোলে মজে আছি।",
  );

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
          <p className="mt-6 text-lg leading-relaxed md:columns-2 md:gap-8 md:text-xl col-rule">
            <span className="float-left pr-[0.1em] pt-[0.06em] font-display text-[4.4em] font-black leading-[0.82]">{intro.charAt(0)}</span>
            {intro.slice(1)}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn gap-2 px-6 py-3 uppercase tracking-wider">
              {t("View my projects", "আমার প্রজেক্ট দেখুন")} <ArrowDown className="h-4 w-4" />
            </a>
            <a href="#contact" className="font-display font-bold underline decoration-2 underline-offset-4 hover:text-[var(--red)]">
              {t("or get in touch", "অথবা যোগাযোগ করুন")}
            </a>
          </div>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={0.15} className="lg:col-span-5">
        <Workbench weather={weather} />
      </AnimatedSection>
    </section>
  );
}
