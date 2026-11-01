import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

interface Day {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

async function getContributions(): Promise<{ days: Day[]; total: number } | null> {
  try {
    const res = await fetch("https://github-contributions-api.jogruber.de/v4/ayeshamashiat?y=last", {
      next: { revalidate: 60 * 60 * 12 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return { days: data.contributions as Day[], total: data.total?.lastYear ?? 0 };
  } catch {
    return null;
  }
}

// busier days get a fancier ball
const BALLS = [
  null,
  { top: "#ef4444", name: "Poké Ball" },
  { top: "#3b82f6", name: "Great Ball" },
  { top: "#eab308", name: "Ultra Ball" },
  { top: "#a855f7", name: "Master Ball" },
] as const;

const CELL = 15;

export async function PokeballSection() {
  const data = await getContributions();

  // pad so the first column starts on Sunday
  const days = data?.days ?? [];
  const offset = days.length ? new Date(days[0].date + "T00:00:00Z").getUTCDay() : 0;
  const cols = Math.ceil((days.length + offset) / 7);

  return (
    <section id="contributions" className="mx-auto max-w-6xl px-6 py-28 md:px-12 lg:px-24">
      <SectionHeading
        index="06"
        title="Days I showed up"
        kicker="Every active day on GitHub becomes a Pokéball, and busier days earn rarer ones. Bare grass means I was off doing something else. Pulled live, refreshed twice a day."
      />

      <AnimatedSection>
        {data ? (
          <>
            <div className="doodle-card overflow-x-auto p-5">
              <svg
                role="img"
                aria-label={`${data.total} GitHub contributions in the last year, one Pokéball per active day`}
                viewBox={`0 0 ${cols * CELL} ${7 * CELL}`}
                className="min-w-[720px] w-full"
              >
                {days.map((d, i) => {
                  const idx = i + offset;
                  const cx = Math.floor(idx / 7) * CELL + CELL / 2;
                  const cy = (idx % 7) * CELL + CELL / 2;
                  const ball = BALLS[d.level];
                  return (
                    <g key={d.date} transform={`translate(${cx} ${cy})`}>
                      <title>{`${d.count} contribution${d.count === 1 ? "" : "s"} on ${d.date}`}</title>
                      {ball ? (
                        <>
                          <circle r="5.2" fill="var(--card-bg)" stroke="currentColor" strokeWidth="1.1" />
                          <path d="M-5.2 0 A5.2 5.2 0 0 1 5.2 0 Z" fill={ball.top} stroke="currentColor" strokeWidth="1.1" />
                          <path d="M-5.2 0 H5.2" stroke="currentColor" strokeWidth="1.1" />
                          <circle r="1.6" fill="var(--card-bg)" stroke="currentColor" strokeWidth="1" />
                        </>
                      ) : (
                        <path d="M-2 2 L-1 -1 M0 3 L0.5 -2 M2 2 L1.5 -1" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.22" fill="none" />
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
            <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-xs text-muted-foreground">
              <span className="font-bold text-foreground">{data.total} contributions in the last year</span>
              {BALLS.slice(1).map((b) => (
                <span key={b!.name} className="inline-flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full border border-foreground" style={{ background: b!.top }} />
                  {b!.name}
                </span>
              ))}
            </p>
          </>
        ) : (
          <p className="doodle-card p-6 text-muted-foreground">
            The Pokéballs wandered off. See the real grass on{" "}
            <a href="https://github.com/ayeshamashiat" className="text-foreground underline decoration-wavy">GitHub</a>.
          </p>
        )}
      </AnimatedSection>
    </section>
  );
}
