"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientDescent } from "@/components/ui/GradientDescent";
import { LEARNING_PATH, type StepState } from "@/lib/content";

const MARK: Record<StepState, string> = { done: "✓", doing: "…", next: "?" };

export function RabbitHoleSection() {
  const [active, setActive] = useState(1);
  const step = LEARNING_PATH[active];

  return (
    <section id="rabbit-hole" className="mx-auto max-w-6xl px-6 py-28 md:px-12 lg:px-24">
      <SectionHeading
        index="03"
        title="Down the ML burrow"
        kicker="I don't want model.fit() to be magic. So I'm learning the machinery from the bottom up, one concept at a time. Here's the map so far."
      />

      <div className="grid items-start gap-12 lg:grid-cols-2">
        <AnimatedSection>
          <ol className="relative space-y-3 border-l-[3px] border-dashed border-foreground/30 pl-7">
            {LEARNING_PATH.map((s, i) => (
              <li key={s.label} className="relative">
                <span
                  className={`absolute -left-[42px] top-2 flex h-6 w-6 items-center justify-center rounded-full border-[2.5px] border-foreground font-mono text-xs font-bold ${
                    s.state === "done" ? "bg-foreground text-background" : s.state === "doing" ? "bg-card-bg" : "border-dashed bg-background text-muted-foreground"
                  }`}
                >
                  {MARK[s.state]}
                </span>
                <button
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  className={`w-full rounded-lg px-3 py-2 text-left font-display text-lg transition-colors ${
                    active === i ? "bg-foreground/10 font-bold" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ol>
          <p className="mt-6 min-h-12 pl-3 text-sm text-muted-foreground">
            <span className="font-mono text-xs">note → </span>
            {step.note}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <GradientDescent />
        </AnimatedSection>
      </div>
    </section>
  );
}
