import { existsSync } from "node:fs";
import { join } from "node:path";
import { HeroSection } from "@/components/sections/HeroSection";
import { LatelySection } from "@/components/sections/LatelySection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { WritingSection } from "@/components/sections/WritingSection";
import { PuzzlesSection } from "@/components/sections/PuzzlesSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Navbar } from "@/components/ui/Navbar";
import { NewsTicker } from "@/components/ui/NewsTicker";
import { getArrivals } from "@/lib/github";

export default async function Home() {
  // The CV button only shows once the PDF is actually in /public.
  const hasCv = existsSync(join(process.cwd(), "public", "AyeshaMashiatResume.pdf"));
  const arrivals = await getArrivals();

  return (
    <main className="relative min-h-screen">
      <Navbar hasCv={hasCv} />
      <div className="px-6 pt-4 md:px-12 lg:px-24">
        <NewsTicker arrivals={arrivals} />
      </div>
      <HeroSection hasCv={hasCv} />
      <LatelySection arrivals={arrivals} />
      <ProjectsSection />
      <JourneySection />
      <SkillsSection />
      <WritingSection />
      <PuzzlesSection />
      <ContactSection hasCv={hasCv} />
    </main>
  );
}
