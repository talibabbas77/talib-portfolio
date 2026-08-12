import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { BentoShowcase } from "@/components/bento-showcase";
import { ProjectsSection } from "@/components/projects-section";
import { GlobeReachSection } from "@/components/ui/cobe-globe";
import { StackGraph } from "@/components/stack-graph";
import { SkillsSection } from "@/components/skills-section";
import { ServicesSection } from "@/components/services-section";
import { HomeContactSection } from "@/components/home-contact-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <GlobeReachSection />
      <BentoShowcase />
      <ProjectsSection />
      <StackGraph />
      <SkillsSection />
      <ServicesSection />
      <HomeContactSection />
    </>
  );
}
