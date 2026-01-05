"use client";

import { BotCard } from "@/components/cards/bot-card";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/shared/loading-state";
import { useBotsLimited } from "@/lib/queries/bot";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { URLS } from "@/lib/constants/urls";
import type { Bot } from "@/lib/db/schema";

export function BotsShowcaseSection() {
  const { data: bots, isLoading, error } = useBotsLimited();

  if (isLoading) {
    return (
      <section className="  py-20 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Featured Bots
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of Telegram bots built for daily automation.
          </p>
        </div>
        <LoadingState />
      </section>
    );
  }

  if (error) {
    return (
      <section className="  py-20 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Featured Bots
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of Telegram bots built for daily automation.
          </p>
        </div>
        <div className="text-center py-20">
          <p className="text-muted-foreground">
            Failed to load bots. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  if (!bots || bots.length === 0) {
    return (
      <section className="  py-20 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Featured Bots
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of Telegram bots built for daily automation.
          </p>
        </div>
        <div className="text-center py-20">
          <p className="text-muted-foreground">
            No bots available at the moment.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="  py-20 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
          Featured Bots
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our collection of Telegram bots built for daily automation.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bots.map((bot: Bot) => (
          <BotCard key={bot.id} bot={bot} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button asChild size="lg" className="gap-2">
          <Link href={URLS.BOTS}>
            See All Bots
            <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
