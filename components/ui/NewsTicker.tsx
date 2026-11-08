import type { Arrival } from "@/components/ui/LatelyBoard";

const FALLBACK = ["Python", "FastAPI", "PostgreSQL", "Docker", "AWS", "React", "Next.js", "RAG", "LoRA"];

const shortDate = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });

/** The "Latest" strip: a red label and a slow ticker of what was pushed recently (from GitHub). */
export function NewsTicker({ arrivals }: { arrivals: Arrival[] }) {
  const items = arrivals.length
    ? arrivals.map((a) => `${a.name}: ${a.lastCommit ?? a.description ?? "updated"} (${shortDate(a.pushedAt)})`)
    : FALLBACK;

  return (
    <div className="mx-auto flex max-w-6xl items-stretch border-y border-foreground">
      <span className="font-ui shrink-0 bg-[var(--red)] px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white">Latest</span>
      <div className="marquee min-w-0 flex-1 overflow-hidden py-2" role="marquee" aria-label="Latest activity">
        <div className="marquee-track items-center text-[0.95rem] font-semibold">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
              {items.map((it) => (
                <span key={`${dup}-${it}`} className="flex items-center">
                  <span className="whitespace-nowrap px-5">{it}</span>
                  <span className="text-[var(--red)]">■</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
