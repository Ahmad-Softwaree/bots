"use client";

import { Zap, Shield, Code, Clock } from "lucide-react";
import { SlideUp, StaggerContainer } from "@/components/shared/animate";
import { useTranslation } from "react-i18next";
import FeatureCard from "../cards/FeatureCard";

export type Feature = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
};

export function FeaturesSection() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Zap,
      title: t("features.lightning_fast"),
      description: t("features.lightning_fast_desc"),
    },
    {
      icon: Shield,
      title: t("features.reliable_secure"),
      description: t("features.reliable_secure_desc"),
    },
    {
      icon: Code,
      title: t("features.open_source"),
      description: t("features.open_source_desc"),
    },
    {
      icon: Clock,
      title: t("features.always_available"),
      description: t("features.always_available_desc"),
    },
  ];

  return (
    <section className="  py-20 md:py-24">
      <SlideUp>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            {t("features.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("features.subtitle")}
          </p>
        </div>
      </SlideUp>

      <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </StaggerContainer>
    </section>
  );
}
