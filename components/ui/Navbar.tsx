"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Moon, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { bnNum, useLang } from "@/lib/i18n";
import { toBanglaDate } from "@/lib/banglaDate";

const SECTIONS = [
  { en: "Lately", bn: "সাম্প্রতিক", href: "#lately" },
  { en: "Projects", bn: "প্রজেক্ট", href: "#projects" },
  { en: "Journey", bn: "যাত্রাপথ", href: "#journey" },
  { en: "Skills", bn: "দক্ষতা", href: "#toolbox" },
  { en: "Writing", bn: "লেখালেখি", href: "#writing" },
  { en: "Puzzles", bn: "ধাঁধা", href: "#puzzles" },
];

// Today's date as a stable string (empty on the server so hydration matches).
const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};
const noopSubscribe = () => () => {};

export function Navbar({ hasCv = false }: { hasCv?: boolean }) {
  const [palette, setPalette] = useState(false);
  const [active, setActive] = useState("");
  const { resolvedTheme, setTheme } = useTheme();
  const { lang, toggle, t } = useLang();
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const stamp = useSyncExternalStore(noopSubscribe, today, () => "");
  const night = mounted && resolvedTheme === "dark";

  // Ctrl+K / ⌘K opens the quick-jump menu.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Underline the section currently on screen.
  useEffect(() => {
    const els = SECTIONS.map((x) => document.getElementById(x.href.slice(1))).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.2, 1] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const dateline = (() => {
    if (!stamp) return { greg: "", bangla: "" };
    const [y, m, d] = stamp.split("-").map(Number);
    const greg = new Intl.DateTimeFormat(lang === "bn" ? "bn-BD" : "en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date(y, m - 1, d));
    // Dhaka dailies print the Bangla calendar date beside the English one.
    const bd = toBanglaDate(y, m, d);
    const bangla = lang === "bn" ? `${bnNum(bd.day)} ${bd.month.bn} ${bnNum(bd.year)} বঙ্গাব্দ` : `${bd.month.en} ${bd.day}, ${bd.year} BS`;
    return { greg, bangla };
  })();

  const iconBtn = "flex h-7 w-7 items-center justify-center border border-foreground text-[13px] transition-colors hover:bg-foreground hover:text-background";

  return (
    <>
      <header id="top" className="mx-auto max-w-6xl px-6 pt-3 md:px-12 lg:px-24">
        <div className="font-ui flex items-center justify-between gap-3 border-b border-foreground pb-2 text-[13px]">
          <span suppressHydrationWarning className="min-w-0 truncate">
            <span className="font-bold">{t("Dhaka", "ঢাকা")}</span>
            {dateline.greg && <span className="text-muted-foreground"> · {dateline.greg}</span>}
            {dateline.bangla && <span className="hidden text-muted-foreground sm:inline"> · {dateline.bangla}</span>}
          </span>
          <span className="flex shrink-0 items-center gap-1.5">
            <button onClick={() => setPalette(true)} className={iconBtn} aria-label={t("Search and jump (Ctrl+K)", "খুঁজুন ও যান (Ctrl+K)")} title="Ctrl + K">
              <Search className="h-3.5 w-3.5" />
            </button>
            <button onClick={toggle} className={`${iconBtn} font-bold`} aria-label={t("বাংলায় দেখুন", "Switch to English")}>
              {lang === "en" ? "বাং" : "EN"}
            </button>
            <button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} className={iconBtn} aria-label={t("Switch day / night edition", "দিন / রাতের সংস্করণ")}>
              {night ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
          </span>
        </div>

        <a href="#top" aria-label="Ayesha Mashiat, home" className="flex items-center justify-center gap-4 py-4 text-center md:gap-8 md:py-6">
          <span aria-hidden className="hidden h-px flex-1 bg-foreground md:block" />
          <span className="font-display text-5xl font-black tracking-tight md:text-8xl">{t("Ayesha Mashiat", "আয়েশা মাশিয়াত")}</span>
          <span aria-hidden className="hidden h-px flex-1 bg-foreground md:block" />
        </a>
      </header>

      <nav aria-label="Sections" className="sticky top-0 z-50 border-y-2 border-foreground bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 md:px-12 lg:px-24">
          <ul className="no-scrollbar flex gap-6 overflow-x-auto md:gap-9">
            {SECTIONS.map((s) => (
              <li key={s.href} className="shrink-0">
                <a href={s.href} aria-current={active === s.href.slice(1) ? "location" : undefined} className={`font-ui block border-b-[3px] py-2 text-[13px] font-bold uppercase tracking-[0.12em] transition-colors hover:text-[var(--red)] md:text-sm ${active === s.href.slice(1) ? "border-[var(--red)]" : "border-transparent"}`}>
                  {t(s.en, s.bn)}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn hidden shrink-0 px-4 py-1 text-sm uppercase sm:inline-flex">
            {t("Contact", "যোগাযোগ")}
          </a>
        </div>
      </nav>

      <CommandPalette hasCv={hasCv} show={palette} onClose={() => setPalette(false)} />
    </>
  );
}
