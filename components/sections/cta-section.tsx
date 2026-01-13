"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Github } from "lucide-react";
import {
  Scale,
  MotionInteractive,
  ContentFadeIn,
  BlobMotion,
} from "@/components/shared/animate";
import { useTranslation } from "react-i18next";

export function CtaSection() {
  const { t } = useTranslation();

  return (
    <section className="  py-20 md:py-24">
      <Scale>
        <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-br from-primary/10 via-accent/5 to-background p-8 md:p-16">
          <ContentFadeIn className="relative z-10 mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
              {t("cta.title")}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t("cta.subtitle")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <MotionInteractive>
                <Button asChild size="lg" className="gap-2">
                  <a
                    href="https://wa.me/9647701993085"
                    target="_blank"
                    rel="noopener noreferrer">
                    {t("cta.get_started")}
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </Button>
              </MotionInteractive>
              <MotionInteractive>
                <Button asChild size="lg" variant="outline" className="gap-2">
                  <a
                    href="https://github.com/Ahmad-Softwaree"
                    target="_blank"
                    rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                    {t("cta.star_github")}
                  </a>
                </Button>
              </MotionInteractive>
            </div>
          </ContentFadeIn>

          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
            <BlobMotion className="absolute top-10 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
            <BlobMotion
              className="absolute bottom-10 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
              scale={[1, 1.1, 1]}
              opacity={[0.3, 0.4, 0.3]}
              duration={10}
              delay={1}
            />
          </div>
        </div>
      </Scale>
    </section>
  );
}
