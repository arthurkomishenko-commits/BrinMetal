import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { WorkshopSection } from "@/components/sections/WorkshopSection";
import { PrecisionSection } from "@/components/sections/PrecisionSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <CapabilitiesSection />
      <ProjectsSection />
      <WorkshopSection />
      <PrecisionSection />
      <TrustSection />
      <ContactSection />
    </>
  );
}
