"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { InteractiveTerminal } from "@/components/ui/InteractiveTerminal";
import { BookNoteBody } from "@/components/ui/BookNook";

const NOTES: { title: string; body: string; rot: number; x: number; y: number; reading?: boolean }[] = [
  { title: "Ayesha Mashiat", body: "Software engineer from Dhaka, studying SWE at IUT", rot: -1.5, x: 3, y: 3 },
  { title: "interests", body: "APIs, databases, auth, how AI really works, and books", rot: 1.2, x: 52, y: 2 },
  { title: "fuelled by", body: "cha, books, and niche history facts at 2 AM", rot: -1, x: 4, y: 33 },
  { title: "currently studying", body: "databases, system design, distributed systems, and ML fundamentals", rot: 1.5, x: 52, y: 34 },
  { title: "reading", body: "", rot: -0.8, x: 26, y: 64, reading: true },
];

/** Front-page sidebar: drag-around clippings about me, plus a pocket terminal. */
export function Workbench() {
  const [tab, setTab] = useState<"about" | "terminal">("about");
  const board = useRef<HTMLDivElement>(null);

  return (
    <div className="panel p-4">
      <div role="tablist" className="mb-3 flex gap-5 border-b border-foreground font-display text-sm font-bold uppercase tracking-wider">
        {(["about", "terminal"] as const).map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`-mb-px border-b-[3px] pb-1.5 transition-colors ${tab === t ? "border-[var(--red)]" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          >
            {t === "about" ? "About me" : "Pocket terminal"}
          </button>
        ))}
      </div>

      {tab === "about" ? (
        <div ref={board} className="relative h-[480px] overflow-hidden bg-[var(--muted)]/60">
          {NOTES.map((n) => (
            <motion.div
              key={n.title}
              drag
              dragConstraints={board}
              dragElastic={0.1}
              whileDrag={{ scale: 1.04, rotate: 0, zIndex: 10 }}
              initial={{ rotate: n.rot }}
              className="absolute w-[44%] cursor-grab border border-foreground bg-card-bg p-3 text-foreground shadow-[3px_3px_0_rgba(0,0,0,0.25)] active:cursor-grabbing"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
            >
              <p className="kicker !text-[10px]">{n.title}</p>
              {n.reading ? <BookNoteBody /> : <p className="mt-1 text-sm leading-snug">{n.body}</p>}
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="overflow-hidden border border-foreground">
          <InteractiveTerminal />
        </div>
      )}
    </div>
  );
}
