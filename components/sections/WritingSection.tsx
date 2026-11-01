import { ArrowUpRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LINKS } from "@/lib/content";

interface Post {
  title: string;
  url: string;
  readable_publish_date: string;
  reading_time_minutes: number;
  description: string;
}

async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch("https://dev.to/api/articles?username=ayeshamashiat&per_page=6", { next: { revalidate: 60 * 60 * 12 } });
    return res.ok ? ((await res.json()) as Post[]) : [];
  } catch {
    return [];
  }
}

export async function WritingSection() {
  const posts = await getPosts();
  if (!posts.length) return null;

  return (
    <section id="writing" className="mx-auto max-w-6xl px-6 py-28 md:px-12 lg:px-24">
      <SectionHeading index="05" title="Postmortems & field notes" kicker="After a project ships I write down what actually happened, including the parts that didn't go to plan." />

      <div className="grid gap-6 md:grid-cols-3">
        {posts.slice(0, 3).map((p, i) => (
          <AnimatedSection key={p.url} delay={i * 0.08}>
            <a href={p.url} target="_blank" rel="noreferrer" className="doodle-card group flex h-full flex-col p-5">
              <span className="font-mono text-[11px] text-muted-foreground">
                {p.readable_publish_date} · {p.reading_time_minutes} min read
              </span>
              <h3 className="mt-2 font-display text-lg font-bold leading-snug">{p.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{p.description}</p>
              <span className="mt-auto inline-flex items-center gap-1 pt-4 font-display font-bold">
                read on DEV <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          </AnimatedSection>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        More at <a href={LINKS.devto} className="text-foreground underline decoration-wavy">dev.to/ayeshamashiat</a>
      </p>
    </section>
  );
}
