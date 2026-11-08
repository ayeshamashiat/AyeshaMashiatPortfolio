"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import books from "@/data/books.json";
import { useLang } from "@/lib/i18n";

export interface Arrival {
  name: string;
  pushedAt: string;
  language: string | null;
  description: string | null;
  lastCommit: string | null;
  url: string;
  homepage: string | null;
}

const reading = (books as { title: string; status: string }[]).filter((b) => b.status === "currently-reading").map((b) => b.title.split(/[:(]/)[0].trim());

function ago(iso: string, lang: "en" | "bn", now: number) {
  const days = Math.max(0, Math.floor((now - new Date(iso).getTime()) / 86_400_000));
  const rtf = new Intl.RelativeTimeFormat(lang === "bn" ? "bn" : "en", { numeric: "auto" });
  if (days < 1) return rtf.format(0, "day");
  if (days < 30) return rtf.format(-days, "day");
  if (days < 365) return rtf.format(-Math.floor(days / 30), "month");
  return rtf.format(-Math.floor(days / 365), "year");
}

/** Headlines: the repos I touched most recently, newest first. Click a headline for the full story. */
export function LatelyBoard({ arrivals }: { arrivals: Arrival[] }) {
  const [open, setOpen] = useState(0);
  const { lang, t } = useLang();
  const [now] = useState(() => Date.now());
  const recent = arrivals.filter((a) => now - new Date(a.pushedAt).getTime() < 30 * 86_400_000).length;

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="flex items-center justify-between border-b border-foreground pb-2 font-mono text-[11px] uppercase tracking-widest">
          <span>{t("Latest headlines · from GitHub", "সাম্প্রতিক শিরোনাম · GitHub থেকে")}</span>
          <span className="flex items-center gap-2 text-[var(--red)]">
            <span className="h-2 w-2 rounded-full bg-[var(--red)]" style={{ animation: "pulse-ring 1.8s ease-out infinite" }} aria-hidden />
            {t("live", "সরাসরি")}
          </span>
        </div>

        {arrivals.length === 0 ? (
          <p className="py-6">
            {t("The wire is down. Read the original on", "সংযোগ বন্ধ। মূল খবর পড়ুন:")} <a href="https://github.com/ayeshamashiat" className="font-bold underline">GitHub</a>.
          </p>
        ) : (
          <ul>
            {arrivals.map((a, i) => (
              <li key={a.name} className="border-b border-foreground/40">
                <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} className="w-full py-4 text-left">
                  <span className="flex items-baseline justify-between gap-4">
                    <span className="kicker">{a.language ?? "repo"}</span>
                    <span suppressHydrationWarning className="font-mono text-xs text-muted-foreground">{ago(a.pushedAt, lang, now)}</span>
                  </span>
                  <span className={`mt-1 block font-display font-black leading-tight ${i === 0 ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"} ${open === i ? "text-[var(--red)]" : "hover:underline"}`}>{a.name}</span>
                  <span className="mt-1 block truncate italic text-muted-foreground">{a.lastCommit ?? a.description ?? ""}</span>
                </button>
                {open === i && (
                  <div className="pb-4 text-[0.95rem]">
                    {a.description && <p>{a.description}</p>}
                    <p className="mt-2 flex flex-wrap gap-x-5 font-display font-bold">
                      <a href={a.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline decoration-2 underline-offset-4 hover:text-[var(--red)]">
                        {t("Read the code", "কোড পড়ুন")} <ArrowUpRight className="h-4 w-4" />
                      </a>
                      {a.homepage && (
                        <a href={a.homepage} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline decoration-2 underline-offset-4 hover:text-[var(--red)]">
                          {t("See it live", "লাইভ দেখুন")} <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                    </p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
        {arrivals.length > 0 && (
          <p className="mt-3 font-mono text-xs text-muted-foreground" suppressHydrationWarning>
            {recent}/{arrivals.length} {t("repos moved in the past 30 days. Refreshed hourly.", "রিপোজিটরি গত ৩০ দিনে নড়েছে। প্রতি ঘণ্টায় হালনাগাদ।")}
          </p>
        )}
      </div>

      <aside className="space-y-6 lg:border-l lg:border-foreground lg:pl-8">
        <div>
          <p className="kicker">{t("In brief: at work", "সংক্ষেপে: কাজে")}</p>
          <p className="mt-1 font-display text-xl font-black">RedDot Digital</p>
          <p className="mt-1 text-[0.95rem] text-muted-foreground">
            {t("Smart ECRM for Smart Cambodia, in the ESD Division. Software Engineering Intern since Sep 2026.", "স্মার্ট কম্বোডিয়ার জন্য Smart ECRM, ESD বিভাগে। সেপ্টেম্বর ২০২৬ থেকে সফটওয়্যার ইঞ্জিনিয়ারিং ইন্টার্ন।")}
          </p>
        </div>
        {reading.length > 0 && (
          <div className="border-t border-foreground pt-5">
            <p className="kicker">{t("In brief: on the nightstand", "সংক্ষেপে: বিছানার পাশে")}</p>
            <ul className="mt-2 space-y-1">
              {reading.slice(0, 4).map((r) => (
                <li key={r} className="truncate">🔖 {r}</li>
              ))}
              {reading.length > 4 && <li className="text-muted-foreground">+ {reading.length - 4} {t("more", "আরও")}</li>}
            </ul>
          </div>
        )}
      </aside>
    </div>
  );
}
