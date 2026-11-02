"use client";

import { useState } from "react";
import books from "@/data/books.json";

interface Book {
  title: string;
  author: string;
  rating: number;
  status: string;
  dateRead: string;
}

const all = books as Book[];
const reading = all.filter((b) => b.status === "currently-reading");
const year = String(new Date().getFullYear());
const read = all.filter((b) => b.status === "read" && b.dateRead.startsWith(year));
const favourites = read.filter((b) => b.rating >= 5);
const PALETTE = ["#fde68a", "#bfdbfe", "#fecaca", "#bbf7d0", "#fed7aa", "#a5f3fc", "#ffffff"];
const hash = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
const short = (t: string) => t.split(/[:(]/)[0].trim();

/** Body of the "reading" sticky note: mini spines, what I'm reading, and a random favourite. */
export function BookNoteBody() {
  const [fav, setFav] = useState<Book | null>(null);
  if (!read.length && !reading.length) return null;

  const pull = () => {
    let next = favourites[Math.floor(Math.random() * favourites.length)];
    if (favourites.length > 1) while (next === fav) next = favourites[Math.floor(Math.random() * favourites.length)];
    setFav(next);
  };

  return (
    <>
      <div className="mt-1.5 flex items-end gap-[3px] border-b-[3px] border-[#1a1a1a] px-0.5">
        {[...reading, ...read].slice(0, 7).map((b) => (
          <span
            key={b.title}
            className="block w-[10px] border-2 border-[#1a1a1a]"
            style={{ height: 22 + (hash(b.title) % 14), background: PALETTE[hash(b.title) % PALETTE.length], borderRadius: "2px 3px 1px 2px" }}
          />
        ))}
      </div>
      <p className="mt-1.5 font-display text-xs">
        {read.length} read in {year} · {reading.length} on the go
      </p>
      {reading[0] && (
        <p className="mt-1 font-display text-xs leading-snug">
          🔖 {short(reading[0].title)}
          {reading.length > 1 && ` + ${reading.length - 1} more`}
        </p>
      )}
      {fav && (
        <p className="mt-2 font-display text-xs leading-snug">
          <strong>{short(fav.title)}</strong> by {fav.author} ★★★★★
        </p>
      )}
      {favourites.length > 0 && (
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={pull}
          className="mt-2 rounded-full border-2 border-[#1a1a1a] bg-white/60 px-2.5 py-0.5 font-display text-xs font-bold hover:bg-white"
        >
          pull a favourite
        </button>
      )}
    </>
  );
}
