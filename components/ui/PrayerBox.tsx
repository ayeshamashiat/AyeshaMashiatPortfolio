"use client";

import { useState, useSyncExternalStore } from "react";
import { LocateFixed, Moon, X } from "lucide-react";
import { BULLETIN_MINUTES, DHAKA, NAMES, ORDER, clock, gpsPlace, guessPlace, prayerDay, type Place, type PrayerName } from "@/lib/prayer";
import { bnNum, useLang } from "@/lib/i18n";

/* ───────── a clock that ticks every 20 s (0 on the server, so nothing time-dependent prerenders) ───────── */

const TICK = 20_000;
const subscribeClock = (cb: () => void) => {
  const id = setInterval(cb, TICK);
  return () => clearInterval(id);
};
const useNow = () => {
  const tick = useSyncExternalStore(subscribeClock, () => Math.floor(Date.now() / TICK), () => 0);
  return tick ? new Date(tick * TICK) : null;
};

/* ───────── where the visitor is: time zone guess, or the device location once they ask ───────── */

const KEY = "prayer-place";
type View = { here: Place; showDhaka: boolean };
const listeners = new Set<() => void>();
let view: View | null = null;

const browserTz = () => Intl.DateTimeFormat().resolvedOptions().timeZone;
const readView = (): View => {
  let here = guessPlace(browserTz());
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? "null");
    if (saved && typeof saved.lat === "number" && typeof saved.lng === "number") here = gpsPlace(saved.lat, saved.lng, browserTz());
  } catch {
    /* storage unavailable: stick with the time zone guess */
  }
  return { here, showDhaka: false };
};
const SERVER_VIEW: View = { here: DHAKA, showDhaka: false };
const setView = (next: View) => {
  view = next;
  listeners.forEach((cb) => cb());
};
const usePlace = () => {
  const v = useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => (view ??= readView()),
    () => SERVER_VIEW,
  );
  const inDhaka = v.here.tz === "Asia/Dhaka" && v.here.name === "Dhaka";
  return { place: v.showDhaka ? DHAKA : v.here, here: v.here, showDhaka: v.showDhaka, inDhaka };
};

/* ───────── formatting ───────── */

const useFmt = () => {
  const { lang, t } = useLang();
  const num = (s: string | number) => (lang === "bn" ? bnNum(s) : String(s));
  const time = (d: Date, tz: string) => (lang === "bn" ? bnNum(clock(d, tz).replace(/\s?[AP]M/, "")) : clock(d, tz));
  const name = (n: PrayerName, friday = false) => (friday && n === "Dhuhr" ? t("Jumu'ah", "জুমা") : t(NAMES[n].en, NAMES[n].bn));
  const span = (ms: number) => {
    const mins = Math.max(0, Math.round(ms / 60000));
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (!h) return t(`${m} min`, `${num(m)} মিনিট`);
    return t(`${h} h ${m} min`, `${num(h)} ঘণ্টা ${num(m)} মিনিট`);
  };
  const where = (p: Place) =>
    p.source === "gps" ? (p.name ? t(`near ${p.name}`, `${p.bn ?? p.name}-এর কাছে`) : t("your location", "আপনার অবস্থান")) : t(p.name ?? "Dhaka", p.bn ?? p.name ?? "ঢাকা");
  return { lang, t, num, time, name, span, where };
};

/* ───────── the box ───────── */

/** The prayer-times box Dhaka dailies print, adapted to wherever the reader is, with the running waqt picked out. */
export function PrayerBox() {
  const now = useNow();
  const { place, here, showDhaka, inDhaka } = usePlace();
  const { t, time, name, span, where } = useFmt();
  const [locating, setLocating] = useState<"idle" | "busy" | "denied" | "unsupported">("idle");

  const locate = () => {
    if (!("geolocation" in navigator)) return setLocating("unsupported");
    setLocating("busy");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          localStorage.setItem(KEY, JSON.stringify({ lat: +latitude.toFixed(3), lng: +longitude.toFixed(3) }));
        } catch {
          /* fine: it just won't be remembered */
        }
        setView({ here: gpsPlace(latitude, longitude, browserTz()), showDhaka: false });
        setLocating("idle");
      },
      () => setLocating("denied"),
      { timeout: 10_000, maximumAge: 60 * 60 * 1000 },
    );
  };

  const header = (
    <div className="border-b-[3px] border-double border-foreground pb-2 text-center">
      <p className="font-display text-2xl font-black uppercase tracking-wide md:text-3xl">{t("Prayer times", "নামাজের সময়সূচি")}</p>
      <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        {where(place)} · {t("today", "আজ")}
      </p>
    </div>
  );

  if (!now) {
    return (
      <div>
        {header}
        <p className="mt-6 text-center italic text-muted-foreground">{t("Working out the times…", "সময় হিসাব করা হচ্ছে…")}</p>
      </div>
    );
  }

  const day = prayerDay(place, now);
  const tz = place.tz;
  const endLabel = day.endsAt === "NextFajr" || day.endsAt === "Fajr" ? name("Fajr") : day.endsAt === "Sunrise" ? t("sunrise", "সূর্যোদয়") : day.endsAt ? name(day.endsAt, day.friday) : "";

  return (
    <div>
      {header}

      {/* whose times: here or Dhaka, and how we know where "here" is */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 font-ui text-xs">
        {!inDhaka && (
          <div role="radiogroup" aria-label={t("Whose times", "কোন জায়গার সময়")} className="flex border border-foreground">
            {[
              { on: !showDhaka, label: t("Here", "এখানে"), act: () => setView({ here, showDhaka: false }) },
              { on: showDhaka, label: t("Dhaka", "ঢাকা"), act: () => setView({ here, showDhaka: true }) },
            ].map((o) => (
              <button key={o.label} role="radio" aria-checked={o.on} onClick={o.act} className={`px-2.5 py-0.5 font-bold uppercase tracking-wider ${o.on ? "bg-foreground text-background" : "hover:bg-[var(--yellow)] hover:text-[#1a1a1a]"}`}>
                {o.label}
              </button>
            ))}
          </div>
        )}
        {!showDhaka && here.source !== "gps" && (
          <button onClick={locate} disabled={locating === "busy"} className="flex items-center gap-1 underline decoration-dotted underline-offset-2 hover:text-[var(--red)]">
            <LocateFixed className="h-3.5 w-3.5" aria-hidden />
            {locating === "busy" ? t("Finding you…", "খোঁজা হচ্ছে…") : t("Use my location", "আমার অবস্থান ব্যবহার করুন")}
          </button>
        )}
        {!showDhaka && here.source === "gps" && <span className="text-muted-foreground">{t("From your device's location", "আপনার ডিভাইসের অবস্থান থেকে")}</span>}
      </div>
      {!showDhaka && here.source === "timezone" && !inDhaka && <p className="mt-1 text-center font-ui text-[11px] text-muted-foreground">{t("Guessed from your time zone.", "আপনার টাইম জোন থেকে অনুমান।")}</p>}
      {!showDhaka && here.source === "fallback" && (
        <p className="mt-1 text-center font-ui text-[11px] text-muted-foreground">{t("Showing Dhaka. Use your location for local times.", "ঢাকার সময় দেখানো হচ্ছে। স্থানীয় সময়ের জন্য অবস্থান ব্যবহার করুন।")}</p>
      )}
      {locating === "denied" && <p className="mt-1 text-center font-ui text-[11px] text-[var(--red)]">{t("Couldn't get your location, so these are still a guess.", "অবস্থান পাওয়া যায়নি, তাই এগুলো এখনো অনুমান।")}</p>}
      {locating === "unsupported" && <p className="mt-1 text-center font-ui text-[11px] text-[var(--red)]">{t("This browser can't share a location.", "এই ব্রাউজার অবস্থান জানাতে পারে না।")}</p>}

      <ul className="mt-3 divide-y divide-foreground/40 border-b border-foreground">
        {ORDER.map((n) => {
          const on = day.current === n;
          const sunrise = n === "Sunrise";
          return (
            <li key={n} className={`px-2 py-2.5 transition-colors ${on ? "bg-foreground text-background" : ""}`} aria-current={on ? "time" : undefined}>
              <div className="flex items-baseline justify-between gap-3">
                <span className={`font-display text-lg font-bold ${sunrise ? "font-normal italic text-muted-foreground" : ""}`}>
                  {name(n, day.friday)}
                  {on && <span className="ml-2 align-middle font-ui text-[10px] font-bold uppercase tracking-widest text-[var(--yellow)]">{t("now", "চলছে")}</span>}
                </span>
                <span className={`font-display text-lg font-black tabular-nums ${sunrise ? "font-normal text-muted-foreground" : ""}`}>{time(day.times[n], tz)}</span>
              </div>
              {on && day.ends && (
                <p className="mt-0.5 font-ui text-xs opacity-80">
                  {t(`Until ${endLabel} at ${time(day.ends, tz)} · `, `${endLabel} পর্যন্ত, ${time(day.ends, tz)} · `)}
                  <strong>{t(`${span(day.ends.getTime() - now.getTime())} left`, `আর ${span(day.ends.getTime() - now.getTime())} বাকি`)}</strong>
                </p>
              )}
            </li>
          );
        })}
      </ul>

      <p className="mt-4 text-center font-display text-base">
        {t("Next adhan:", "পরবর্তী আজান:")} <strong>{name(day.next, day.friday)}</strong> {t("in", "আর")} <strong>{span(day.nextAt.getTime() - now.getTime())}</strong>
        {t("", " পরে")}
      </p>
      <p className="mt-3 text-center font-mono text-[10px] uppercase leading-relaxed tracking-wider text-muted-foreground">
        {t(
          `${day.method.label} method, ${day.method.hanafi ? "Hanafi" : "standard"} Asr. Your local mosque may differ by a few minutes.`,
          `${day.method.label} পদ্ধতি, ${day.method.hanafi ? "হানাফি" : "সাধারণ"} আসর। স্থানীয় মসজিদের সাথে কয়েক মিনিট পার্থক্য হতে পারে।`,
        )}
      </p>
    </div>
  );
}

/** A strip above the ticker for the first half hour after each adhan, wherever the reader is. */
export function PrayerBulletin() {
  const now = useNow();
  const { place } = usePlace();
  const { t, time, name, where } = useFmt();
  const [dismissed, setDismissed] = useState<string | null>(null);
  if (!now) return null;

  const day = prayerDay(place, now);
  if (!day.current || !day.started || now.getTime() - day.started.getTime() > BULLETIN_MINUTES * 60_000) return null;
  const key = `${day.started.toISOString()}-${place.lat},${place.lng}`;
  if (dismissed === key) return null;

  const n = name(day.current, day.friday);
  const at = time(day.started, place.tz);
  const city = where(place);
  return (
    <div className="mx-auto mb-2 flex max-w-6xl items-stretch border border-foreground bg-[var(--green)] text-white" role="status">
      <span className="font-ui flex shrink-0 items-center gap-1.5 bg-[#1a1a1a] px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white">
        <Moon className="h-3.5 w-3.5" aria-hidden /> {t("Prayer time", "নামাজের সময়")}
      </span>
      <p className="flex-1 px-4 py-2 font-display text-[0.95rem] font-semibold">
        {t(`It's ${n} time ${place.source === "gps" && !place.name ? "where you are" : `in ${city}`}. The adhan was at ${at}.`, `${city}-এ এখন ${n}-এর ওয়াক্ত। আজান হয়েছে ${at}-এ।`)}
      </p>
      <button onClick={() => setDismissed(key)} className="px-3 hover:bg-black/20" aria-label={t("Dismiss", "বন্ধ করুন")}>
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
