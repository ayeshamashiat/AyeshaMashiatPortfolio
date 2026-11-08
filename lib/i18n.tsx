"use client";

import { useEffect, useSyncExternalStore, type ReactNode } from "react";

export type Lang = "en" | "bn";

// Tiny external store so the language survives reloads without setState-in-effect.
const KEY = "lang";
const listeners = new Set<() => void>();
const read = (): Lang => {
  try {
    return localStorage.getItem(KEY) === "bn" ? "bn" : "en";
  } catch {
    return "en";
  }
};
let current: Lang | null = null;
const snapshot = (): Lang => (current ??= read());
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

export function setLang(next: Lang) {
  current = next;
  try {
    localStorage.setItem(KEY, next);
  } catch {
    /* storage unavailable: the choice just won't persist */
  }
  listeners.forEach((cb) => cb());
}

export function useLang() {
  const lang = useSyncExternalStore(subscribe, snapshot, () => "en" as Lang);
  return { lang, toggle: () => setLang(lang === "en" ? "bn" : "en"), t: (en: string, bn: string) => (lang === "bn" ? bn : en) };
}

/** Inline translated text: <T en="Projects" bn="প্রজেক্ট" /> */
export function T({ en, bn }: { en: string; bn: string }) {
  return <>{useLang().t(en, bn)}</>;
}

const DIGITS = "০১২৩৪৫৬৭৮৯";
export const bnNum = (n: number | string) => String(n).replace(/\d/g, (d) => DIGITS[Number(d)]);

/** Keeps <html lang> in step with the chosen language. */
export function LangProvider({ children }: { children: ReactNode }) {
  const { lang } = useLang();
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return <>{children}</>;
}
