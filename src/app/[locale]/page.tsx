import { HeroSection } from "@/components/sections/HeroSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { AboutSection } from "@/components/sections/AboutSection";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { WorkshopSection } from "@/components/sections/WorkshopSection";
import { PrecisionSection } from "@/components/sections/PrecisionSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ShimmerDivider } from "@/components/ui/ShimmerDivider";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero -- massive, split layout */}
      <HeroSection />

      {/* 2. Trust Strip -- immediate trust, thin bar */}
      <TrustStrip />

      {/* 3. About + Andrey -- standard */}
      <AboutSection />
      <ShimmerDivider />

      {/* 4. Capabilities -- standard */}
      <CapabilitiesSection />
      <ShimmerDivider />

      {/* 5. Workshop / Process -- standard with photo */}
      <WorkshopSection />
      <ShimmerDivider />

      {/* 6. Precision Metrics -- compressed */}
      <PrecisionSection />
      <ShimmerDivider />

      {/* 7. Projects Gallery -- standard */}
      <ProjectsSection />
      <ShimmerDivider />

      {/* 8. Trust -- compressed */}
      <TrustSection />
      <ShimmerDivider />

      {/* 9. Contact -- standard */}
      <ContactSection />
    </>
  );
}
