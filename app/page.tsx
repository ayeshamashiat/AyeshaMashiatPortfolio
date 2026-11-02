import { existsSync } from "node:fs";
import { join } from "node:path";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { WritingSection } from "@/components/sections/WritingSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Preloader } from "@/components/ui/Preloader";
import { Navbar } from "@/components/ui/Navbar";
import { ClickDoodles } from "@/components/ui/ClickDoodles";
import { DrawingPad } from "@/components/ui/DrawingPad";

export default function Home() {
  // The CV button only shows once the PDF is actually in /public.
  const hasCv = existsSync(join(process.cwd(), "public", "AyeshaMashiatResume.pdf"));

  return (
    <main className="relative min-h-screen">
      <Preloader />
      <Navbar />
      <ClickDoodles />
      <DrawingPad />
      <HeroSection hasCv={hasCv} />
      <ProjectsSection />
      <ExperienceSection />
      <SkillsSection />
      <WritingSection />
      <AchievementsSection />
      <ContactSection hasCv={hasCv} />
    </main>
  );
}
