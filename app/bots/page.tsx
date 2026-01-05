"use client";

import { BotCard } from "@/components/cards/bot-card";
import { LoadingState } from "@/components/shared/loading-state";
import { Pagination } from "@/components/shared/pagination";
import { useBotsInfinite } from "@/lib/queries/bot";
import type { Bot } from "@/lib/db/schema";

export default function BotsPage() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useBotsInfinite();

  const allBots = data?.pages.flatMap((page) => page.data) ?? [];

  if (isLoading) {
    return (
      <div className="  py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            All Telegram Bots
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our complete collection of Telegram bots.
          </p>
        </div>
        <LoadingState />
      </div>
    );
  }

  if (error) {
    return (
      <div className="  py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            All Telegram Bots
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our complete collection of Telegram bots.
          </p>
        </div>
        <div className="text-center py-20">
          <p className="text-muted-foreground">
            Failed to load bots. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="  py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          All Telegram Bots
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Browse our complete collection of {allBots.length}+ Telegram bots.
        </p>
      </div>

      <Pagination<Bot>
        data={allBots}
        hasNextPage={hasNextPage ?? false}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        renderItem={(bot: Bot) => <BotCard bot={bot} />}
        emptyMessage="No bots available at the moment."
        loadMoreText="Load More Bots"
      />
    </div>
  );
}
