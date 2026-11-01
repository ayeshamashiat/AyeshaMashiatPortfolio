"use client";

import { useEffect, useState } from "react";

const GLYPHS = [
  // star
  "M12 3 L14.5 9 L21 9.5 L16 14 L17.5 20.5 L12 17 L6.5 20.5 L8 14 L3 9.5 L9.5 9 Z",
  // heart
  "M12 20 C4 14, 3 9, 6.5 6.5 C9 5, 11 6.5, 12 8.5 C13 6.5, 15 5, 17.5 6.5 C21 9, 20 14, 12 20 Z",
  // squiggle
  "M3 14 C6 6, 9 6, 11 13 C13 20, 16 20, 21 8",
  // spiral
  "M12 12 C12 10, 15 10, 15 13 C15 17, 9 17, 8 12 C7 6, 15 4, 18 10",
  // cross sparkle
  "M12 3 L12 21 M3 12 L21 12 M6 6 L18 18 M18 6 L6 18",
];
const COLORS = ["#ef4444", "#f59e0b", "#3b82f6", "#22c55e", "#a855f7", "#ec4899"];

interface Particle {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  rot: number;
  glyph: number;
  color: string;
}

let nextId = 0;

/** Sprays little hand-drawn doodles wherever the visitor clicks. */
export function ClickDoodles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("[data-no-doodle], input, textarea")) return;

      const burst: Particle[] = Array.from({ length: 6 }, (_, i) => {
        const angle = (Math.PI * 2 * i) / 6 + Math.random() * 0.8;
        const dist = 34 + Math.random() * 38;
        return {
          id: nextId++,
          x: e.clientX,
          y: e.clientY,
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist,
          rot: (Math.random() - 0.5) * 240,
          glyph: Math.floor(Math.random() * GLYPHS.length),
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        };
      });
      const ids = new Set(burst.map((p) => p.id));
      setParticles((prev) => [...prev, ...burst]);
      setTimeout(() => setParticles((prev) => prev.filter((p) => !ids.has(p.id))), 800);
    };

    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <svg
          key={p.id}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke={p.color}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute"
          style={{
            left: p.x - 9,
            top: p.y - 9,
            animation: "pop-out 0.75s ease-out forwards",
            ["--dx" as string]: `${p.dx}px`,
            ["--dy" as string]: `${p.dy}px`,
            ["--rot" as string]: `${p.rot}deg`,
          }}
        >
          <path d={GLYPHS[p.glyph]} />
        </svg>
      ))}
    </div>
  );
}
