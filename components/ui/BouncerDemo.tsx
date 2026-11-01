"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Verdict = "ALLOW" | "ASK" | "BLOCK";
interface Skill {
  name: string;
  path: string[];
  verdict: Verdict;
}

const SKILLS: Skill[] = [
  { name: "markdown-formatter", path: [], verdict: "ALLOW" },
  { name: "pdf-helper", path: ["shared-domain.xyz", "reused-ip", "ledger-of-bad-actors"], verdict: "ASK" },
  { name: "free-gpu-booster", path: ["shared-domain.xyz", "known-malware"], verdict: "BLOCK" },
];

const TONE: Record<Verdict, string> = { ALLOW: "#22c55e", ASK: "#f59e0b", BLOCK: "#ef4444" };

/** A toy version of Bouncer's rule: 2 hops from known malware = BLOCK, 3-4 = ASK. */
export function BouncerDemo() {
  const [picked, setPicked] = useState(2);
  const skill = SKILLS[picked];
  const nodes = ["skill", ...skill.path];

  return (
    <div data-no-doodle className="mt-5 border-t-2 border-dashed border-foreground/20 pt-4">
      <p className="mb-2 font-mono text-[11px] text-muted-foreground">try it: pick a skill to install</p>
      <div className="flex flex-wrap gap-2">
        {SKILLS.map((s, i) => (
          <button
            key={s.name}
            onClick={() => setPicked(i)}
            aria-pressed={picked === i}
            className={`rounded-full border-2 px-3 py-1 font-mono text-[11px] transition-colors ${
              picked === i ? "border-foreground bg-foreground text-background" : "border-foreground/30 hover:border-foreground"
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div key={skill.name} className="mt-4 flex flex-wrap items-center gap-y-2 font-mono text-[11px]">
        {nodes.map((n, i) => (
          <motion.span
            key={n}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.18 }}
            className="flex items-center"
          >
            <span className="rounded border-2 border-foreground/60 px-2 py-0.5">{n}</span>
            {i < nodes.length - 1 && <span className="px-1.5 text-muted-foreground">→</span>}
          </motion.span>
        ))}
        {nodes.length === 1 && <span className="ml-2 text-muted-foreground">no connections to anything bad</span>}
        <motion.span
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: nodes.length * 0.18, type: "spring", stiffness: 300 }}
          className="ml-3 -rotate-3 border-[2.5px] px-2 py-0.5 text-sm font-bold"
          style={{ color: TONE[skill.verdict], borderColor: TONE[skill.verdict], borderRadius: "6px 3px 8px 3px" }}
        >
          {skill.verdict}
        </motion.span>
      </div>
    </div>
  );
}
