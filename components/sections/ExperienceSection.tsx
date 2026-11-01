import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EXPERIENCE } from "@/lib/content";

export function ExperienceSection() {
  return (
    <section id="experience" className="border-y-2 border-foreground/15 bg-card-bg/20">
      <div className="mx-auto max-w-4xl px-6 py-28 md:px-12">
        <SectionHeading index="02" title="Out in the wild" kicker="Classrooms teach the theory. Internships teach what happens when real users and real deadlines show up." />

        <ol className="relative ml-3 space-y-10 border-l-[3px] border-dashed border-foreground/30 pl-8 md:pl-12">
          {EXPERIENCE.map((r, i) => (
            <AnimatedSection key={r.org} delay={i * 0.1}>
              <li className="relative">
                <span
                  className={`absolute -left-[46px] top-1.5 h-4 w-4 rounded-full border-[3px] border-foreground md:-left-[62px] ${
                    r.kind === "internship" ? "bg-foreground" : "bg-background"
                  }`}
                />
                <span className="font-mono text-xs text-muted-foreground">{r.kind}</span>
                <h3 className="mt-1 text-2xl font-bold md:text-3xl">{r.org}</h3>
                <p className="font-display font-bold underline decoration-wavy decoration-1 underline-offset-4">{r.role}</p>
                <p className="mt-3 max-w-xl text-muted-foreground">{r.summary}</p>
              </li>
            </AnimatedSection>
          ))}
        </ol>
      </div>
    </section>
  );
}
