"use client";

import { useEffect, useRef, useState } from "react";

const W = 320;
const H = 190;
const RANGE = 4; // x in [-4, 4]
const px = (x: number) => W / 2 + (x / RANGE) * (W / 2 - 14);
const py = (x: number) => H - 18 - (x * x) / (RANGE * RANGE) * (H - 36);

/** Tiny gradient-descent toy on y = x². Slide the learning rate too high and it blows up. */
export function GradientDescent() {
  const [lr, setLr] = useState(0.15);
  const [trail, setTrail] = useState<number[]>([3.4]);
  const x = trail[trail.length - 1];
  const [running, setRunning] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const diverged = Math.abs(x) > RANGE * 1.2;
  const converged = Math.abs(x) < 0.02;
  const active = running && !diverged && !converged;

  const step = () => setTrail((t) => [...t.slice(-24), t[t.length - 1] * (1 - 2 * lr)]);

  useEffect(() => {
    if (!active) return;
    timer.current = setInterval(step, 350);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, lr]);

  const reset = () => {
    setRunning(false);
    setTrail([3.4]);
  };

  const curve = Array.from({ length: 41 }, (_, i) => {
    const v = -RANGE + (i * 2 * RANGE) / 40;
    return `${i === 0 ? "M" : "L"}${px(v).toFixed(1)} ${py(v).toFixed(1)}`;
  }).join(" ");

  const bx = Math.max(10, Math.min(W - 10, px(x)));
  const by = Math.max(10, Math.min(H - 10, py(Math.max(-RANGE, Math.min(RANGE, x)))));

  const mood = diverged ? "it exploded. lower the learning rate." : converged ? "found the bottom!" : lr > 0.85 ? "that's… a lot of bouncing" : "watch the ball roll downhill";

  return (
    <div data-no-doodle className="doodle-card p-5">
      <p className="mb-1 font-mono text-[11px] text-muted-foreground">model.fit(X, y) — what&apos;s that line doing?</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d={curve} />
        <path d={`M12 ${H - 18} L${W - 12} ${H - 18}`} strokeWidth="1.5" strokeDasharray="3 5" opacity={0.4} />
        {trail.slice(0, -1).map((t, i) => (
          <circle key={i} cx={px(t)} cy={py(t)} r="2.5" fill="currentColor" opacity={0.15 + (i / trail.length) * 0.35} stroke="none" />
        ))}
        <circle cx={bx} cy={by} r="9" fill="var(--card-bg)" stroke={diverged ? "#ef4444" : converged ? "#22c55e" : "currentColor"} style={{ transition: "cx .3s, cy .3s" }} />
      </svg>

      <label className="mt-2 flex items-center gap-3 font-display text-sm">
        <span className="w-28 shrink-0">learning rate</span>
        <input
          type="range"
          min={0.02}
          max={1.1}
          step={0.01}
          value={lr}
          onChange={(e) => setLr(Number(e.target.value))}
          className="min-w-0 flex-1 accent-current"
          aria-label="Learning rate"
        />
        <span className="w-10 text-right font-mono text-xs">{lr.toFixed(2)}</span>
      </label>

      <div className="mt-3 flex items-center gap-3">
        <button onClick={step} disabled={diverged || converged} className="doodle-button px-3 py-1 text-sm font-bold disabled:opacity-40">step</button>
        <button onClick={() => (diverged || converged ? reset() : setRunning((r) => !r))} className="doodle-button px-3 py-1 text-sm font-bold">
          {diverged || converged ? "reset" : active ? "pause" : "run"}
        </button>
        <span className="text-xs text-muted-foreground">{mood}</span>
      </div>
    </div>
  );
}
