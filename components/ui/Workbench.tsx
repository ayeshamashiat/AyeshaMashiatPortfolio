"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { InteractiveTerminal } from "@/components/ui/InteractiveTerminal";
import { BookNoteBody } from "@/components/ui/BookNook";

const NOTES: { title: string; body: string; color: string; rot: number; x: number; y: number; reading?: boolean }[] = [
  { title: "Ayesha Mashiat", body: "Software engineer from Dhaka, studying SWE at IUT", color: "#fde68a", rot: -3, x: 3, y: 3 },
  { title: "interests", body: "APIs, databases, auth, how AI really works, and books", color: "#bfdbfe", rot: 2.5, x: 52, y: 2 },
  { title: "fuelled by", body: "cha, books, and niche history facts at 2 AM", color: "#bbf7d0", rot: -2, x: 4, y: 33 },
  { title: "currently studying", body: "databases, system design, distributed systems, and ML fundamentals", color: "#fecaca", rot: 3, x: 52, y: 34 },
  { title: "reading", body: "", color: "#e9d5ff", rot: -1.5, x: 26, y: 64, reading: true },
];

/** Hero card: drag-around sticky notes about me, the reading corner, and a pocket terminal. */
export function Workbench() {
  const [tab, setTab] = useState<"about" | "terminal">("about");
  const board = useRef<HTMLDivElement>(null);

  return (
    <div className="doodle-card p-4 md:p-5" data-no-doodle>
      <div role="tablist" className="mb-3 flex gap-2 font-display text-sm">
        {(["about", "terminal"] as const).map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`rounded-full border-2 px-4 py-1 transition-colors ${
              tab === t ? "border-foreground bg-foreground text-background" : "border-foreground/30 text-muted-foreground hover:border-foreground"
            }`}
          >
            {t === "about" ? "about me" : "pocket terminal"}
          </button>
        ))}
      </div>

      {tab === "about" ? (
        <>
          <div ref={board} className="relative h-[480px] overflow-hidden border-2 border-dashed border-foreground/30" style={{ borderRadius: "10px 4px 12px 4px / 4px 12px 4px 10px" }}>
            {NOTES.map((n) => (
              <motion.div
                key={n.title}
                drag
                dragConstraints={board}
                dragElastic={0.1}
                whileDrag={{ scale: 1.06, rotate: 0, zIndex: 10 }}
                initial={{ rotate: n.rot }}
                className="absolute w-[44%] cursor-grab p-3 text-[#1a1a1a] shadow-[2px_3px_0_0_rgba(0,0,0,0.35)] active:cursor-grabbing"
                style={{ left: `${n.x}%`, top: `${n.y}%`, background: n.color, borderRadius: "3px 8px 4px 6px" }}
              >
                <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[#1a1a1a] bg-red-500" />
                <p className="font-display text-sm font-bold underline decoration-wavy">{n.title}</p>
                {n.reading ? <BookNoteBody /> : <p className="mt-1 font-display text-xs leading-snug">{n.body}</p>}
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        <div className="overflow-hidden border-2 border-foreground" style={{ borderRadius: "10px 4px 12px 4px / 4px 12px 4px 10px" }}>
          <InteractiveTerminal />
        </div>
      )}
    </div>
  );
}
