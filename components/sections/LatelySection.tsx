import { SectionHeading } from "@/components/ui/SectionHeading";
import { LatelyBoard, type Arrival } from "@/components/ui/LatelyBoard";

export function LatelySection({ arrivals }: { arrivals: Arrival[] }) {
  return (
    <section id="lately" className="mx-auto max-w-6xl px-6 py-16 md:px-12 lg:px-24">
      <SectionHeading index="01" title="Lately" bn="সাম্প্রতিক" />
      <LatelyBoard arrivals={arrivals} />
    </section>
  );
}
