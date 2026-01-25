"use client";

import { BotCard } from "@/components/cards/BotCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Bot } from "@/lib/db/schema";
import {
  SlideUp,
  StaggerContainer,
  MotionInteractive,
} from "@/components/shared/animate";
import { useTranslations } from "next-intl";
import NoData from "../shared/NoData";

export function BotsShowcaseSection({ bots }: { bots: Bot[] }) {
  const dashboard_t = useTranslations("dashboard");
  const t = useTranslations("hero");

  return (
    <section className="py-20 md:py-24">
      <SlideUp>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            {dashboard_t("all_bots")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
      </SlideUp>

      {bots?.length === 0 ? (
        <NoData />
      ) : (
        <>
          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bots?.map((bot: Bot) => (
              <BotCard.Home key={bot.id} {...bot} />
            ))}
          </StaggerContainer>

          <SlideUp transition={{ delay: 0.3 }}>
            <div className="mt-12 text-center">
              <MotionInteractive>
                <Button asChild size="lg" className="gap-2">
                  <Link href={"/bots"}>
                    {t("cta")}
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </MotionInteractive>
            </div>
          </SlideUp>
        </>
      )}
    </section>
  );
}
