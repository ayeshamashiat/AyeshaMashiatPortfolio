"use client";

import { ArrowUpRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BouncerDemo } from "@/components/ui/BouncerDemo";
import { OLDER_WORK, PROJECTS } from "@/lib/content";

export function ProjectsSection() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-28 md:px-12 lg:px-24">
      <SectionHeading index="01" title="Case files" kicker="I treat side projects like investigations: find the itch, build the trick, keep the receipt." />

      <div className="grid gap-10 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <AnimatedSection key={p.id} delay={(i % 2) * 0.1}>
            <article className="doodle-card flex h-full flex-col p-6 md:p-7">
              <span className="font-mono text-xs text-muted-foreground">file {p.id}</span>
              <h3 className="mt-1 text-2xl font-bold md:text-3xl">{p.title}</h3>
              <p className="font-display text-muted-foreground">{p.tagline}</p>

              <dl className="mt-5 space-y-3 text-sm leading-relaxed">
                <div>
                  <dt className="font-display font-bold underline decoration-wavy decoration-1 underline-offset-4">the itch</dt>
                  <dd className="mt-1 text-muted-foreground">{p.itch}</dd>
                </div>
                <div>
                  <dt className="font-display font-bold underline decoration-wavy decoration-1 underline-offset-4">the trick</dt>
                  <dd className="mt-1 text-muted-foreground">{p.trick}</dd>
                </div>
              </dl>

              <p className="mt-5 flex items-baseline gap-3 border-t-2 border-dashed border-foreground/20 pt-4">
                <span className="font-display text-3xl font-bold">{p.receipt.value}</span>
                <span className="text-xs text-muted-foreground">{p.receipt.label}</span>
              </p>

              {p.id === "01" && <BouncerDemo />}

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {p.stack.map((t) => (
                  <li key={t} className="rounded-full border-[1.5px] border-foreground/30 px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex gap-5 pt-6 font-display font-bold">
                <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:underline hover:decoration-wavy">
                  code <ArrowUpRight className="h-4 w-4" />
                </a>
                {p.live && (
                  <a href={p.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:underline hover:decoration-wavy">
                    live <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            </article>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection className="mt-14">
        <h3 className="mb-4 font-mono text-xs text-muted-foreground">cold cases (older work)</h3>
        <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
          {OLDER_WORK.map((w) => (
            <li key={w.name}>
              <a href={w.href} target="_blank" rel="noreferrer" className="marker-underline flex items-baseline justify-between gap-3 border-b-2 border-dashed border-foreground/15 py-2">
                <span className="font-display font-bold">{w.name}</span>
                <span className="truncate text-xs text-muted-foreground">{w.note}</span>
              </a>
            </li>
          ))}
        </ul>
      </AnimatedSection>
    </section>
  );
}
