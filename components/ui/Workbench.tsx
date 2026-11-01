"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { InteractiveTerminal } from "@/components/ui/InteractiveTerminal";

const NOTES = [
  { title: "shipping", body: "graph-based gatekeeping for AI agents", color: "#fde68a", rot: -3, x: 6, y: 8 },
  { title: "studying", body: "how models actually learn (not just .fit())", color: "#bfdbfe", rot: 2.5, x: 52, y: 4 },
  { title: "writing", body: "postmortems on my own projects, on DEV", color: "#fecaca", rot: -1.5, x: 4, y: 52 },
  { title: "fuelled by", body: "cha. always cha.", color: "#bbf7d0", rot: 3, x: 54, y: 56 },
];

/** Hero widget: a pocket terminal, plus a corkboard of drag-around sticky notes. */
export function Workbench() {
  const [tab, setTab] = useState<"now" | "terminal">("now");
  const board = useRef<HTMLDivElement>(null);

  return (
    <div className="doodle-card p-4 md:p-5" data-no-doodle>
      <div role="tablist" className="mb-3 flex gap-2 font-display text-sm">
        {(["now", "terminal"] as const).map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`rounded-full border-2 px-4 py-1 transition-colors ${
              tab === t ? "border-foreground bg-foreground text-background" : "border-foreground/30 text-muted-foreground hover:border-foreground"
            }`}
          >
            {t === "now" ? "right now" : "pocket terminal"}
          </button>
        ))}
      </div>

      {tab === "now" ? (
        <div ref={board} className="relative h-[270px] overflow-hidden border-2 border-dashed border-foreground/30" style={{ borderRadius: "10px 4px 12px 4px / 4px 12px 4px 10px" }}>
          {NOTES.map((n) => (
            <motion.div
              key={n.title}
              drag
              dragConstraints={board}
              dragElastic={0.1}
              whileDrag={{ scale: 1.06, rotate: 0, zIndex: 10 }}
              initial={{ rotate: n.rot }}
              className="absolute w-[42%] cursor-grab p-3 text-[#1a1a1a] shadow-[2px_3px_0_0_rgba(0,0,0,0.35)] active:cursor-grabbing"
              style={{ left: `${n.x}%`, top: `${n.y}%`, background: n.color, borderRadius: "3px 8px 4px 6px" }}
            >
              <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[#1a1a1a] bg-red-500" />
              <p className="font-display text-sm font-bold underline decoration-wavy">{n.title}</p>
              <p className="mt-1 font-display text-xs leading-snug">{n.body}</p>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="overflow-hidden border-2 border-foreground" style={{ borderRadius: "10px 4px 12px 4px / 4px 12px 4px 10px" }}>
          <InteractiveTerminal />
        </div>
      )}
      <p className="mt-3 text-center text-xs text-muted-foreground">
        {tab === "now" ? "drag the notes around. they don't mind." : "it's a real prompt. try `help`."}
      </p>
    </div>
  );
}
