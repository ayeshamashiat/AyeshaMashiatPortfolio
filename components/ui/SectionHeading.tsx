import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <AnimatedSection className="mb-14 max-w-2xl">
      <span className="font-mono text-xs text-muted-foreground">{index}</span>
      <h2 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight font-display">
        <span className="underline decoration-wavy decoration-2 underline-offset-8 decoration-foreground/40">{title}</span>
      </h2>
    </AnimatedSection>
  );
}
