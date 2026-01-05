import { HeroSection } from "@/components/sections/hero-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { BotsShowcaseSection } from "@/components/sections/bots-showcase-section";
import { CtaSection } from "@/components/sections/cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <BotsShowcaseSection />
      <CtaSection />
    </>
  );
}
