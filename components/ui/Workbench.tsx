"use client";

import { useState } from "react";
import { BookNoteBody } from "@/components/ui/BookNook";
import { WeatherBox } from "@/components/ui/WeatherBox";
import { useLang } from "@/lib/i18n";
import type { Weather } from "@/lib/weather";

// The profile box: a label, then the line printed beside it (English, Bengali).
const FACTS: { label: [string, string]; value?: [string, string]; reading?: boolean }[] = [
  { label: ["Name", "নাম"], value: ["Ayesha Mashiat", "আয়েশা মাশিয়াত"] },
  { label: ["From", "শহর"], value: ["Dhaka, Bangladesh", "ঢাকা, বাংলাদেশ"] },
  { label: ["Studies", "পড়াশোনা"], value: ["Software Engineering, senior year, IUT", "সফটওয়্যার ইঞ্জিনিয়ারিং, শেষ বর্ষ, আইইউটি"] },
  { label: ["At work", "কর্মস্থল"], value: ["SWE intern, RedDot Digital", "এসডব্লিউই ইন্টার্ন, রেডডট ডিজিটাল"] },
  { label: ["Interests", "আগ্রহ"], value: ["APIs, databases, auth, how AI really works, hackathons, books", "এপিআই, ডাটাবেস, অথ, এআই আসলে কীভাবে কাজ করে, হ্যাকাথন, বই"] },
  { label: ["Fuelled by", "জ্বালানি"], value: ["Cha, books, and niche history facts at 2 AM", "চা, বই, আর রাত দুইটার অদ্ভুত ইতিহাসের তথ্য"] },
  { label: ["Studying", "পড়ছি"], value: ["Databases, system design, distributed systems, ML fundamentals", "ডাটাবেস, সিস্টেম ডিজাইন, ডিস্ট্রিবিউটেড সিস্টেম, এমএল-এর মূলকথা"] },
  { label: ["Reading", "বই"], reading: true },
];

/** Front-page sidebar: a profile box set like a newspaper fact file, plus the weather box. */
export function Workbench({ weather = null }: { weather?: Weather | null }) {
  const [tab, setTab] = useState<"about" | "weather">("about");
  const { lang } = useLang();
  const i = lang === "bn" ? 1 : 0;

  return (
    <div className="panel p-4">
      <div role="tablist" className="mb-3 flex gap-5 border-b border-foreground font-display text-sm font-bold uppercase tracking-wider">
        {(["about", "weather"] as const).map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`-mb-px border-b-[3px] pb-1.5 transition-colors ${tab === t ? "border-[var(--red)]" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          >
            {t === "about" ? (lang === "bn" ? "আমার কথা" : "About me") : lang === "bn" ? "আবহাওয়া" : "Weather"}
          </button>
        ))}
      </div>

      {tab === "about" ? (
        <div>
          <div className="border-b-[3px] border-double border-foreground pb-2 text-center">
            <p className="font-display text-2xl font-black uppercase tracking-wide md:text-3xl">{lang === "bn" ? "পরিচিতি" : "Profile"}</p>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{lang === "bn" ? "লেখক, সংক্ষেপে" : "The author, in brief"}</p>
          </div>
          <blockquote className="my-4 border-b border-foreground pb-4 text-center font-display text-xl font-bold italic leading-snug md:text-2xl">
            “{lang === "bn" ? "চা, বই, আর রাত দুইটার ইতিহাস।" : "Cha, books, and history at 2 AM."}”
          </blockquote>
          <dl className="divide-y divide-foreground/40">
            {FACTS.map((f) => (
              <div key={f.label[0]} className="grid grid-cols-[6.5rem_1fr] gap-3 py-2.5 sm:grid-cols-[8rem_1fr]">
                <dt className="kicker pt-0.5">{f.label[i]}</dt>
                <dd className="leading-snug">{f.reading ? <BookNoteBody /> : f.value![i]}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : (
        <WeatherBox weather={weather} />
      )}
    </div>
  );
}
