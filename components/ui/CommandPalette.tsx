"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "next-themes";
import { LINKS } from "@/lib/content";
import { useLang } from "@/lib/i18n";

interface Item {
  id: string;
  en: string;
  bn: string;
  run: () => void;
}

const go = (id: string) => () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
const open = (href: string) => () => window.open(href, "_blank", "noopener,noreferrer");

/** A ⌘K / Ctrl+K quick-jump menu: sections, links, and the day/night and language switches. */
export function CommandPalette({ hasCv, show, onClose }: { hasCv: boolean; show: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const { t, toggle: toggleLang } = useLang();
  const { resolvedTheme, setTheme } = useTheme();

  const items: Item[] = useMemo(
    () => [
      { id: "lately", en: "Lately (what I'm building)", bn: "সাম্প্রতিক কাজ", run: go("lately") },
      { id: "projects", en: "Projects", bn: "প্রজেক্ট", run: go("projects") },
      { id: "journey", en: "Journey (work and hackathons)", bn: "যাত্রাপথ (কাজ ও হ্যাকাথন)", run: go("journey") },
      { id: "skills", en: "Skills", bn: "দক্ষতা", run: go("toolbox") },
      { id: "writing", en: "Technical writing", bn: "টেকনিক্যাল লেখা", run: go("writing") },
      { id: "puzzles", en: "Puzzles (crossword)", bn: "ধাঁধা (ক্রসওয়ার্ড)", run: go("puzzles") },
      { id: "contact", en: "Contact", bn: "যোগাযোগ", run: go("contact") },
      ...(hasCv ? [{ id: "cv", en: "Open my CV (PDF)", bn: "সিভি দেখুন (PDF)", run: open("/AyeshaMashiatResume.pdf") }] : []),
      { id: "github", en: "GitHub", bn: "গিটহাব", run: open(LINKS.github) },
      { id: "linkedin", en: "LinkedIn", bn: "লিংকডইন", run: open(LINKS.linkedin) },
      { id: "theme", en: "Switch day / night", bn: "দিন / রাত বদলান", run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark") },
      { id: "lang", en: "Switch language (EN / বাংলা)", bn: "ভাষা বদলান (EN / বাংলা)", run: toggleLang },
    ],
    [hasCv, resolvedTheme, setTheme, toggleLang],
  );

  const q = query.trim().toLowerCase();
  const list = items.filter((i) => !q || i.en.toLowerCase().includes(q) || i.bn.includes(q));
  const safeCursor = Math.min(cursor, Math.max(0, list.length - 1));

  useEffect(() => {
    if (!show) return;
    input.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [show]);

  if (!show || typeof document === "undefined") return null;

  const choose = (item?: Item) => {
    if (!item) return;
    onClose();
    setQuery("");
    setTimeout(item.run, 60);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, list.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter") choose(list[safeCursor]);
  };

  return createPortal(
    <div className="fixed inset-0 z-[130] flex items-start justify-center bg-black/60 p-4 pt-[14vh]" onClick={onClose} role="dialog" aria-modal="true" aria-label={t("Where to?", "কোথায় যাবেন?")}>
      <div onClick={(e) => e.stopPropagation()} onKeyDown={onKeyDown} className="panel w-full max-w-lg overflow-hidden">
        <div className="sign flex items-center gap-3 px-4 py-3">
          <span className="font-display text-lg font-bold">{t("Where to?", "কোথায় যাবেন?")}</span>
          <input
            ref={input}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCursor(0);
            }}
            placeholder={t("type a place…", "জায়গার নাম লিখুন…")}
            aria-label={t("Search", "খুঁজুন")}
            className="min-w-0 flex-1 bg-transparent font-body text-base text-background outline-none placeholder:text-background/60"
          />
          <kbd className="hidden border border-background/60 px-1.5 font-mono text-[10px] sm:block">esc</kbd>
        </div>
        <ul className="max-h-[50vh] overflow-y-auto p-2" role="listbox">
          {list.length === 0 && <li className="px-3 py-4 text-muted-foreground">{t("No such place. Try another stop.", "এমন জায়গা নেই। অন্য কিছু চেষ্টা করুন।")}</li>}
          {list.map((item, i) => (
            <li key={item.id}>
              <button
                role="option"
                aria-selected={i === safeCursor}
                onMouseEnter={() => setCursor(i)}
                onClick={() => choose(item)}
                className={`flex w-full items-center justify-between px-3 py-2 text-left font-display text-lg ${i === safeCursor ? "bg-[var(--yellow)] text-[#1a1a1a]" : ""}`}
              >
                {t(item.en, item.bn)}
                <span className="font-mono text-xs opacity-60">{i === safeCursor ? "↵" : ""}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.body,
  );
}
