import { HeroSection } from "@/components/sections/hero-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { BotsShowcaseSection } from "@/components/sections/bots-showcase-section";
import { CtaSection } from "@/components/sections/cta-section";
import { getHomeBots } from "@/lib/react-query/actions/bot.action";

export default async function page() {
  const bots = await getHomeBots();
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <BotsShowcaseSection bots={bots} />
      <CtaSection />
    </>
  );
}
