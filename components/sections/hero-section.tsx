"use client";

import { Button } from "@/components/ui/button";
import { Bot, Sparkles } from "lucide-react";
import Link from "next/link";
import { URLS } from "@/lib/urls";
import {
  SlideDown,
  SlideUp,
  MotionInteractive,
} from "@/components/shared/animate";
import { useTranslation } from "react-i18next";

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="py-20 md:py-28 lg:py-32">
      <div className="flex flex-col items-center gap-8 text-center">
        {/* Gradient Background Orbs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl" />
        </div>

        <SlideDown>
          <div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-muted/50 px-4 py-1.5 text-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-medium">{t("hero.badge")}</span>
          </div>
        </SlideDown>

        <SlideUp>
          <div className="max-w-4xl space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              {t("hero.title_part1")}{" "}
              <span
                className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                style={{
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                {t("hero.title_part2")}
              </span>{" "}
              {t("hero.title_part3")}{" "}
              <span
                className="bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 bg-clip-text text-transparent"
                style={{
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                {t("hero.title_part4")}
              </span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
              {t("hero.subtitle")}
            </p>
          </div>
        </SlideUp>

        <SlideUp transition={{ delay: 0.2 }}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <MotionInteractive>
              <Button asChild size="lg" className="gap-2">
                <Link href={URLS.BOTS}>
                  <Bot className="h-5 w-5" />
                  {t("hero.cta")}
                </Link>
              </Button>
            </MotionInteractive>
            <MotionInteractive>
              <Button asChild size="lg" variant="outline">
                <a
                  href="https://github.com/Ahmad-Softwaree"
                  target="_blank"
                  rel="noopener noreferrer">
                  {t("hero.learn_more")}
                </a>
              </Button>
            </MotionInteractive>
          </div>
        </SlideUp>
      </div>
    </section>
  );
}
