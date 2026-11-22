import { CalculationMethod, Coordinates, HighLatitudeRule, Madhab, PrayerTimes as AdhanTimes, type CalculationParameters } from "adhan";
import ZONES from "./zones.json";

// Every IANA time zone -> [lat, lng, country], from the tz database's zone.tab (plus the old names browsers still report).
const ZONE = ZONES as unknown as Record<string, [number, number, string]>;

/**
 * Prayer times, worked out on the visitor's device for wherever they are (no API, no keys).
 * The place comes from the device time zone by default, or from the browser's location when asked.
 */

export type PrayerName = "Fajr" | "Sunrise" | "Dhuhr" | "Asr" | "Maghrib" | "Isha";
export const ORDER: PrayerName[] = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

export const NAMES: Record<PrayerName, { en: string; bn: string }> = {
  Fajr: { en: "Fajr", bn: "ফজর" },
  Sunrise: { en: "Sunrise", bn: "সূর্যোদয়" },
  Dhuhr: { en: "Dhuhr", bn: "যোহর" },
  Asr: { en: "Asr", bn: "আসর" },
  Maghrib: { en: "Maghrib", bn: "মাগরিব" },
  Isha: { en: "Isha", bn: "এশা" },
};

/** Minutes after an adhan during which the paper runs the "prayer time" bulletin. */
export const BULLETIN_MINUTES = 30;

export interface Place {
  name: string | null; // null: a spot with no city on our list nearby
  bn?: string;
  lat: number;
  lng: number;
  tz: string;
  source: "dhaka" | "timezone" | "gps" | "fallback";
}

type City = [name: string, lat: number, lng: number, tz: string, bn?: string];

// Bangladesh first, so the time zone guess for Asia/Dhaka lands on Dhaka; the rest give "near Rajshahi" labels.
const CITIES: City[] = [
  ["Dhaka", 23.8103, 90.4125, "Asia/Dhaka", "ঢাকা"],
  ["Chattogram", 22.3569, 91.7832, "Asia/Dhaka", "চট্টগ্রাম"],
  ["Rajshahi", 24.3745, 88.6042, "Asia/Dhaka", "রাজশাহী"],
  ["Khulna", 22.8456, 89.5403, "Asia/Dhaka", "খুলনা"],
  ["Sylhet", 24.8949, 91.8687, "Asia/Dhaka", "সিলেট"],
  ["Barishal", 22.701, 90.3535, "Asia/Dhaka", "বরিশাল"],
  ["Rangpur", 25.7439, 89.2752, "Asia/Dhaka", "রংপুর"],
  ["Mymensingh", 24.7471, 90.4203, "Asia/Dhaka", "ময়মনসিংহ"],
  ["Cumilla", 23.4607, 91.1809, "Asia/Dhaka", "কুমিল্লা"],
  ["Gazipur", 23.9999, 90.4203, "Asia/Dhaka", "গাজীপুর"],
  ["Narayanganj", 23.6238, 90.5, "Asia/Dhaka", "নারায়ণগঞ্জ"],
  ["Cox's Bazar", 21.4272, 92.0058, "Asia/Dhaka", "কক্সবাজার"],
  ["Bogura", 24.8465, 89.3773, "Asia/Dhaka", "বগুড়া"],
  ["Jashore", 23.1664, 89.2081, "Asia/Dhaka", "যশোর"],
  ["Dinajpur", 25.6217, 88.6354, "Asia/Dhaka", "দিনাজপুর"],
  ["Kolkata", 22.5726, 88.3639, "Asia/Kolkata", "কলকাতা"],
  ["New Delhi", 28.6139, 77.209, "Asia/Kolkata"],
  ["Kolkata", 22.5726, 88.3639, "Asia/Calcutta", "কলকাতা"],
  ["Karachi", 24.8607, 67.0011, "Asia/Karachi"],
  ["Kathmandu", 27.7172, 85.324, "Asia/Kathmandu"],
  ["Colombo", 6.9271, 79.8612, "Asia/Colombo"],
  ["Thimphu", 27.4728, 89.639, "Asia/Thimphu"],
  ["Yangon", 16.8409, 96.1735, "Asia/Yangon"],
  ["Kabul", 34.5553, 69.2075, "Asia/Kabul"],
  ["Hong Kong", 22.3193, 114.1694, "Asia/Hong_Kong", "হংকং"],
  ["Singapore", 1.3521, 103.8198, "Asia/Singapore", "সিঙ্গাপুর"],
  ["Kuala Lumpur", 3.139, 101.6869, "Asia/Kuala_Lumpur", "কুয়ালালামপুর"],
  ["Jakarta", -6.2088, 106.8456, "Asia/Jakarta"],
  ["Bangkok", 13.7563, 100.5018, "Asia/Bangkok"],
  ["Manila", 14.5995, 120.9842, "Asia/Manila"],
  ["Shanghai", 31.2304, 121.4737, "Asia/Shanghai"],
  ["Tokyo", 35.6762, 139.6503, "Asia/Tokyo", "টোকিও"],
  ["Seoul", 37.5665, 126.978, "Asia/Seoul"],
  ["Dubai", 25.2048, 55.2708, "Asia/Dubai", "দুবাই"],
  ["Riyadh", 24.7136, 46.6753, "Asia/Riyadh", "রিয়াদ"],
  ["Makkah", 21.3891, 39.8579, "Asia/Riyadh", "মক্কা"],
  ["Madinah", 24.5247, 39.5692, "Asia/Riyadh", "মদিনা"],
  ["Doha", 25.2854, 51.531, "Asia/Qatar", "দোহা"],
  ["Kuwait City", 29.3759, 47.9774, "Asia/Kuwait"],
  ["Manama", 26.2285, 50.586, "Asia/Bahrain"],
  ["Muscat", 23.588, 58.3829, "Asia/Muscat"],
  ["Tehran", 35.6892, 51.389, "Asia/Tehran"],
  ["Baghdad", 33.3152, 44.3661, "Asia/Baghdad"],
  ["Amman", 31.9454, 35.9284, "Asia/Amman"],
  ["Beirut", 33.8938, 35.5018, "Asia/Beirut"],
  ["Damascus", 33.5138, 36.2765, "Asia/Damascus"],
  ["Gaza", 31.5017, 34.4668, "Asia/Gaza", "গাজা"],
  ["Hebron", 31.5326, 35.0998, "Asia/Hebron"],
  ["Al-Quds", 31.7683, 35.2137, "Asia/Jerusalem", "আল-কুদস"],
  ["Tashkent", 41.2995, 69.2401, "Asia/Tashkent"],
  ["Almaty", 43.222, 76.8512, "Asia/Almaty"],
  ["Istanbul", 41.0082, 28.9784, "Europe/Istanbul"],
  ["London", 51.5074, -0.1278, "Europe/London", "লন্ডন"],
  ["Birmingham", 52.4862, -1.8904, "Europe/London"],
  ["Manchester", 53.4808, -2.2426, "Europe/London"],
  ["Dublin", 53.3498, -6.2603, "Europe/Dublin"],
  ["Paris", 48.8566, 2.3522, "Europe/Paris"],
  ["Berlin", 52.52, 13.405, "Europe/Berlin"],
  ["Madrid", 40.4168, -3.7038, "Europe/Madrid"],
  ["Rome", 41.9028, 12.4964, "Europe/Rome"],
  ["Amsterdam", 52.3676, 4.9041, "Europe/Amsterdam"],
  ["Brussels", 50.8503, 4.3517, "Europe/Brussels"],
  ["Stockholm", 59.3293, 18.0686, "Europe/Stockholm"],
  ["Oslo", 59.9139, 10.7522, "Europe/Oslo"],
  ["Copenhagen", 55.6761, 12.5683, "Europe/Copenhagen"],
  ["Helsinki", 60.1699, 24.9384, "Europe/Helsinki"],
  ["Vienna", 48.2082, 16.3738, "Europe/Vienna"],
  ["Zurich", 47.3769, 8.5417, "Europe/Zurich"],
  ["Lisbon", 38.7223, -9.1393, "Europe/Lisbon"],
  ["Athens", 37.9838, 23.7275, "Europe/Athens"],
  ["Warsaw", 52.2297, 21.0122, "Europe/Warsaw"],
  ["Moscow", 55.7558, 37.6173, "Europe/Moscow"],
  ["Cairo", 30.0444, 31.2357, "Africa/Cairo"],
  ["Casablanca", 33.5731, -7.5898, "Africa/Casablanca"],
  ["Algiers", 36.7538, 3.0588, "Africa/Algiers"],
  ["Tunis", 36.8065, 10.1815, "Africa/Tunis"],
  ["Khartoum", 15.5007, 32.5599, "Africa/Khartoum"],
  ["Lagos", 6.5244, 3.3792, "Africa/Lagos"],
  ["Nairobi", -1.2921, 36.8219, "Africa/Nairobi"],
  ["Johannesburg", -26.2041, 28.0473, "Africa/Johannesburg"],
  ["New York", 40.7128, -74.006, "America/New_York", "নিউ ইয়র্ক"],
  ["Toronto", 43.6532, -79.3832, "America/Toronto", "টরন্টো"],
  ["Chicago", 41.8781, -87.6298, "America/Chicago"],
  ["Denver", 39.7392, -104.9903, "America/Denver"],
  ["Phoenix", 33.4484, -112.074, "America/Phoenix"],
  ["Los Angeles", 34.0522, -118.2437, "America/Los_Angeles"],
  ["Vancouver", 49.2827, -123.1207, "America/Vancouver"],
  ["Mexico City", 19.4326, -99.1332, "America/Mexico_City"],
  ["São Paulo", -23.5505, -46.6333, "America/Sao_Paulo"],
  ["Buenos Aires", -34.6037, -58.3816, "America/Argentina/Buenos_Aires"],
  ["Sydney", -33.8688, 151.2093, "Australia/Sydney", "সিডনি"],
  ["Melbourne", -37.8136, 144.9631, "Australia/Melbourne"],
  ["Brisbane", -27.4698, 153.0251, "Australia/Brisbane"],
  ["Perth", -31.9505, 115.8605, "Australia/Perth"],
  ["Auckland", -36.8485, 174.7633, "Pacific/Auckland"],
];

const cityPlace = (c: City, source: Place["source"]): Place => ({ name: c[0], bn: c[4], lat: c[1], lng: c[2], tz: c[3], source });

export const DHAKA: Place = cityPlace(CITIES[0], "dhaka");

/**
 * The visitor's whereabouts, guessed from their device time zone: every zone in the tz database has a
 * reference city, so this works anywhere without asking for permission. "Use my location" refines it.
 */
export function guessPlace(tz: string): Place {
  const named = CITIES.find((x) => x[3] === tz);
  if (named) return cityPlace(named, "timezone");
  const tail = tz.split("/").pop() ?? "";
  const key = ZONE[tz] ? tz : Object.keys(ZONE).find((z) => z.endsWith(`/${tail}`));
  if (!key) return { ...DHAKA, source: "fallback" };
  const [lat, lng] = ZONE[key];
  return { name: key.split("/").pop()!.replace(/_/g, " "), lat, lng, tz, source: "timezone" };
}

const km = (aLat: number, aLng: number, bLat: number, bLng: number) => {
  const r = Math.PI / 180;
  const h = Math.sin(((bLat - aLat) * r) / 2) ** 2 + Math.cos(aLat * r) * Math.cos(bLat * r) * Math.sin(((bLng - aLng) * r) / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(h));
};

/** A place from the device's own location, labelled with the nearest city on the list if it's within 60 km. */
export function gpsPlace(lat: number, lng: number, tz: string): Place {
  let best: City | null = null;
  let bestKm = 60;
  for (const c of CITIES) {
    const d = km(lat, lng, c[1], c[2]);
    if (d < bestKm) {
      bestKm = d;
      best = c;
    }
  }
  return { name: best?.[0] ?? null, bn: best?.[4], lat, lng, tz, source: "gps" };
}

/* ───────── which method the local mosques use ───────── */

const country = (tz: string) => ZONE[tz]?.[2] ?? "";
const KARACHI = ["BD", "IN", "PK", "AF", "NP", "LK", "BT", "MV"];
const HANAFI = [...KARACHI, "TR", "UZ", "KZ", "KG", "TJ", "TM", "AZ"];
const EGYPTIAN = ["EG", "SD", "SS", "LY", "SY", "LB", "JO", "PS", "IQ", "IL", "DZ", "TN", "MA", "EH", "MR"];
const SINGAPORE = ["SG", "MY", "ID", "BN"];

export interface Method {
  label: string;
  hanafi: boolean;
  params: () => CalculationParameters;
}

/** The calculation local mosques usually follow, by the country the time zone belongs to. */
export function methodFor(tz: string): Method {
  const cc = country(tz);
  const pick = (label: string, make: () => CalculationParameters): Method => ({ label, hanafi: HANAFI.includes(cc), params: make });
  if (KARACHI.includes(cc)) return pick("Karachi", CalculationMethod.Karachi);
  if (cc === "SA" || cc === "YE") return pick("Umm al-Qura", CalculationMethod.UmmAlQura);
  if (cc === "AE" || cc === "OM") return pick("Dubai", CalculationMethod.Dubai);
  if (cc === "QA" || cc === "BH") return pick("Qatar", CalculationMethod.Qatar);
  if (cc === "KW") return pick("Kuwait", CalculationMethod.Kuwait);
  if (cc === "IR") return pick("Tehran", CalculationMethod.Tehran);
  if (cc === "TR") return pick("Diyanet", CalculationMethod.Turkey);
  if (EGYPTIAN.includes(cc)) return pick("Egyptian", CalculationMethod.Egyptian);
  if (SINGAPORE.includes(cc)) return pick("Singapore", CalculationMethod.Singapore);
  if (cc === "US" || cc === "CA") return pick("ISNA", CalculationMethod.NorthAmerica);
  if (cc === "GB" || cc === "IE") return pick("Moonsighting Committee", CalculationMethod.MoonsightingCommittee);
  return pick("Muslim World League", CalculationMethod.MuslimWorldLeague);
}

/* ───────── the day's times, and where we are in them ───────── */

const dayIn = (tz: string, at: Date, offsetDays = 0) => {
  const p = new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" }).format(at).split("-").map(Number);
  // adhan reads the calendar date from the Date's local fields
  return new Date(p[0], p[1] - 1, p[2] + offsetDays);
};

function timesOn(place: Place, day: Date): Record<PrayerName, Date> {
  const coords = new Coordinates(place.lat, place.lng);
  const m = methodFor(place.tz);
  const params = m.params();
  params.madhab = m.hanafi ? Madhab.Hanafi : Madhab.Shafi;
  params.highLatitudeRule = HighLatitudeRule.recommended(coords);
  const t = new AdhanTimes(coords, day, params);
  return { Fajr: t.fajr, Sunrise: t.sunrise, Dhuhr: t.dhuhr, Asr: t.asr, Maghrib: t.maghrib, Isha: t.isha };
}

export interface PrayerDay {
  place: Place;
  method: Method;
  times: Record<PrayerName, Date>;
  current: PrayerName | null; // null between sunrise and Dhuhr
  started: Date | null; // when the current waqt began
  ends: Date | null; // when it runs out
  endsAt: PrayerName | "NextFajr" | null; // what ends it
  next: PrayerName; // the next adhan
  nextAt: Date;
  friday: boolean;
}

/** Today's times for a place, which waqt it is there now, and how long that waqt has left. */
export function prayerDay(place: Place, now: Date): PrayerDay {
  const today = timesOn(place, dayIn(place.tz, now));
  const yesterdayIsha = timesOn(place, dayIn(place.tz, now, -1)).Isha;
  const tomorrowFajr = timesOn(place, dayIn(place.tz, now, 1)).Fajr;
  const t = now.getTime();

  let current: PrayerName | null = null;
  let started: Date | null = null;
  let ends: Date | null = null;
  let endsAt: PrayerDay["endsAt"] = null;
  if (t < today.Fajr.getTime()) [current, started, ends, endsAt] = ["Isha", yesterdayIsha, today.Fajr, "Fajr"];
  else if (t < today.Sunrise.getTime()) [current, started, ends, endsAt] = ["Fajr", today.Fajr, today.Sunrise, "Sunrise"];
  else if (t < today.Dhuhr.getTime()) current = null;
  else if (t < today.Asr.getTime()) [current, started, ends, endsAt] = ["Dhuhr", today.Dhuhr, today.Asr, "Asr"];
  else if (t < today.Maghrib.getTime()) [current, started, ends, endsAt] = ["Asr", today.Asr, today.Maghrib, "Maghrib"];
  else if (t < today.Isha.getTime()) [current, started, ends, endsAt] = ["Maghrib", today.Maghrib, today.Isha, "Isha"];
  else [current, started, ends, endsAt] = ["Isha", today.Isha, tomorrowFajr, "NextFajr"];

  const fard: PrayerName[] = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  const upcoming = fard.find((n) => today[n].getTime() > t);
  const weekday = new Intl.DateTimeFormat("en-GB", { timeZone: place.tz, weekday: "short" }).format(now);

  return {
    place,
    method: methodFor(place.tz),
    times: today,
    current,
    started,
    ends,
    endsAt,
    next: upcoming ?? "Fajr",
    nextAt: upcoming ? today[upcoming] : tomorrowFajr,
    friday: weekday === "Fri",
  };
}

/** A time as it reads on the clock in that place, e.g. "3:36 PM". */
export const clock = (d: Date, tz: string) => new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", minute: "2-digit" }).format(d);
