"use client";

import { DataBox } from "@/components/table/data-box";
import type { Bot } from "@/lib/db/schema";
import Search from "@/components/shared/Search";
import { useTranslation } from "react-i18next";
import { BotCard } from "@/components/cards/BotCard";
import { QUERY_KEYS } from "@/lib/react-query/keys";
import { useGetBots } from "@/lib/react-query/queries/bot.query";
export default function BotsPage() {
  const { t } = useTranslation();

  return (
    <div className="py-8">
      <div className="flex flex-col gap-6">
        <div className="text-center ">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            {t("dashboard.all_bots")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto ">
            {t("hero.subtitle")}
          </p>
        </div>
        <div className="max-w-md mx-auto w-full">
          <Search />
        </div>

        <DataBox<Bot>
          queryFn={useGetBots}
          name={QUERY_KEYS.BOTS}
          Component={BotCard.Home}
        />
      </div>
    </div>
  );
}
