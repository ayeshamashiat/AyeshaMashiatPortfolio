"use client";

import { useState } from "react";
import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSun, Sun, type LucideIcon } from "lucide-react";
import type { Weather } from "@/lib/weather";
import { bnNum, useLang } from "@/lib/i18n";

type Kind = "clear" | "partly" | "cloudy" | "fog" | "drizzle" | "rain" | "storm";

const kindOf = (code: number): Kind => {
  if (code === 0) return "clear";
  if (code <= 2) return "partly";
  if (code === 3) return "cloudy";
  if (code <= 48) return "fog";
  if (code <= 57) return "drizzle";
  if (code <= 67 || (code >= 80 && code <= 82)) return "rain";
  return "storm";
};

const KIND: Record<Kind, { icon: LucideIcon; en: string; bn: string }> = {
  clear: { icon: Sun, en: "Clear", bn: "পরিষ্কার" },
  partly: { icon: CloudSun, en: "Partly cloudy", bn: "আংশিক মেঘলা" },
  cloudy: { icon: Cloud, en: "Overcast", bn: "মেঘলা" },
  fog: { icon: CloudFog, en: "Hazy", bn: "কুয়াশা" },
  drizzle: { icon: CloudDrizzle, en: "Drizzle", bn: "গুঁড়ি বৃষ্টি" },
  rain: { icon: CloudRain, en: "Rain", bn: "বৃষ্টি" },
  storm: { icon: CloudLightning, en: "Thunderstorm", bn: "বজ্রসহ বৃষ্টি" },
};

const weekday = (date: string, lang: "en" | "bn") => new Intl.DateTimeFormat(lang === "bn" ? "bn-BD" : "en-GB", { weekday: "short", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));

/** The weather box every daily prints: live Dhaka conditions and a five-day outlook. */
export function WeatherBox({ weather }: { weather: Weather | null }) {
  const [day, setDay] = useState(0);
  const { lang, t } = useLang();
  const n = (v: number) => (lang === "bn" ? bnNum(Math.round(v)) : String(Math.round(v)));

  if (!weather) {
    return (
      <div className="text-center">
        <p className="font-display text-2xl font-black uppercase">{t("Weather", "আবহাওয়া")}</p>
        <p className="mt-4 italic text-muted-foreground">{t("The weather feed is unavailable right now.", "আবহাওয়ার তথ্য এখন পাওয়া যাচ্ছে না।")}</p>
      </div>
    );
  }

  const k = KIND[kindOf(day === 0 ? weather.now.code : weather.days[day].code)];
  const Icon = k.icon;
  const d = weather.days[day];

  return (
    <div>
      <div className="border-b-[3px] border-double border-foreground pb-2 text-center">
        <p className="font-display text-2xl font-black uppercase tracking-wide md:text-3xl">{t("Weather", "আবহাওয়া")}</p>
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{t("Dhaka · live", "ঢাকা · সরাসরি")}</p>
      </div>

      <div className="mt-5 flex items-center gap-5 border-b border-foreground pb-5">
        <Icon className="h-16 w-16 shrink-0" strokeWidth={1.5} aria-hidden />
        <div>
          <p className="font-display text-6xl font-black leading-none">
            {day === 0 ? n(weather.now.temp) : n(d.max)}
            <span className="ml-1 align-top font-ui text-2xl font-bold text-muted-foreground">°C</span>
          </p>
          <p className="mt-1 font-display text-lg font-bold">{t(k.en, k.bn)}</p>
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            {day === 0
              ? `${t("humidity", "আর্দ্রতা")} ${n(weather.now.humidity)}% · ${t("wind", "বাতাস")} ${n(weather.now.wind)} km/h`
              : `${t("high", "সর্বোচ্চ")} ${n(d.max)}° · ${t("low", "সর্বনিম্ন")} ${n(d.min)}°`}
          </p>
        </div>
      </div>

      <ul className="mt-5 grid grid-cols-5 divide-x divide-foreground border-y-[3px] border-double border-foreground" role="tablist" aria-label={t("Five-day outlook", "পাঁচ দিনের পূর্বাভাস")}>
        {weather.days.map((w, i) => {
          const DayIcon = KIND[kindOf(w.code)].icon;
          return (
            <li key={w.date}>
              <button
                role="tab"
                aria-selected={day === i}
                onClick={() => setDay(i)}
                className={`flex w-full flex-col items-center gap-0.5 py-2.5 transition-colors ${day === i ? "bg-foreground text-background" : "hover:bg-[var(--yellow)] hover:text-[#1a1a1a]"}`}
              >
                <span className="font-ui text-[11px] font-bold uppercase tracking-wider">{i === 0 ? t("Today", "আজ") : weekday(w.date, lang)}</span>
                <DayIcon className="h-6 w-6" strokeWidth={1.6} aria-hidden />
                <span className="font-display text-sm font-bold">
                  {n(w.max)}° <span className="opacity-60">{n(w.min)}°</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
