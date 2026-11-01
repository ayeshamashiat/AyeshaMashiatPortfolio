import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { RabbitHoleSection } from "@/components/sections/RabbitHoleSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { WritingSection } from "@/components/sections/WritingSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { PokeballSection } from "@/components/sections/PokeballSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Preloader } from "@/components/ui/Preloader";
import { Navbar } from "@/components/ui/Navbar";
import { ClickDoodles } from "@/components/ui/ClickDoodles";
import { DrawingPad } from "@/components/ui/DrawingPad";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Preloader />
      <Navbar />
      <ClickDoodles />
      <DrawingPad />
      <HeroSection />
      <ProjectsSection />
      <ExperienceSection />
      <RabbitHoleSection />
      <SkillsSection />
      <WritingSection />
      <PokeballSection />
      <AchievementsSection />
      <ContactSection />
    </main>
  );
}
