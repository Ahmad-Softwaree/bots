"use client";

import { BotCard } from "@/components/cards/BotCard";
import { StaggerContainer } from "@/components/shared/animate";
import NoData from "@/components/shared/NoData";
import { PaginationControls } from "@/components/shared/PaginationControls";
import Search from "@/components/shared/Search";
import { Bot, PaginationResult } from "@/types/global";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
export default function BotsContent({ data }: { data: PaginationResult<Bot> }) {
  const t = useTranslations("dashboard");
  const hero_t = useTranslations("hero");
  const pathname = usePathname();
  const isDashboard = pathname.includes("dashboard");
  return (
    <section className="py-8">
      {!isDashboard && (
        <div className="flex flex-col gap-6">
          <div className="text-center ">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
              {t("all_bots")}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto ">
              {hero_t("subtitle")}
            </p>
          </div>
          <div className="max-w-md mx-auto w-full">
            <Search />
          </div>
        </div>
      )}
      {data.data.length === 0 ? (
        <NoData />
      ) : (
        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 my-10">
          {data.data?.map((bot: Bot) =>
            isDashboard ? (
              <BotCard.Dashboard key={bot.id} {...bot} />
            ) : (
              <BotCard.Home key={bot.id} {...bot} />
            )
          )}
        </StaggerContainer>
      )}
      <PaginationControls total={data.total} totalPages={data.totalPages} />
    </section>
  );
}
