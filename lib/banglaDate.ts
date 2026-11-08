/**
 * Bangladesh's revised Bangla calendar (as printed in Dhaka dailies):
 * the year starts on 14 April (Pohela Boishakh); the first five months have 31 days,
 * the other seven have 30, and Falgun gets a 31st day when its Gregorian year is a leap year.
 */
const NAMES = [
  { en: "Boishakh", bn: "বৈশাখ" },
  { en: "Joishtho", bn: "জ্যৈষ্ঠ" },
  { en: "Asharh", bn: "আষাঢ়" },
  { en: "Srabon", bn: "শ্রাবণ" },
  { en: "Bhadro", bn: "ভাদ্র" },
  { en: "Ashwin", bn: "আশ্বিন" },
  { en: "Kartik", bn: "কার্তিক" },
  { en: "Agrahayan", bn: "অগ্রহায়ণ" },
  { en: "Poush", bn: "পৌষ" },
  { en: "Magh", bn: "মাঘ" },
  { en: "Falgun", bn: "ফাল্গুন" },
  { en: "Choitro", bn: "চৈত্র" },
];

const isLeap = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
const DAY = 86_400_000;

export interface BanglaDate {
  day: number;
  month: { en: string; bn: string };
  year: number;
}

export function toBanglaDate(year: number, month: number, day: number): BanglaDate {
  // month is 1-12 (Gregorian). Work in UTC so DST never shifts a day.
  const date = Date.UTC(year, month - 1, day);
  let startYear = year;
  if (date < Date.UTC(year, 3, 14)) startYear = year - 1; // before 14 April: still last Bangla year
  let offset = Math.round((date - Date.UTC(startYear, 3, 14)) / DAY);

  const lengths = [31, 31, 31, 31, 31, 30, 30, 30, 30, 30, isLeap(startYear + 1) ? 31 : 30, 30];
  let m = 0;
  while (offset >= lengths[m]) offset -= lengths[m++];
  return { day: offset + 1, month: NAMES[m], year: startYear - 593 };
}
