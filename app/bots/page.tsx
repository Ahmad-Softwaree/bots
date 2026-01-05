"use client";

import { BotCard } from "@/components/cards/bot-card";
import { PaginatedList } from "@/components/shared/paginated-list";
import { useBotsInfinite } from "@/lib/queries/bot";
import type { Bot } from "@/lib/db/schema";
import { useState } from "react";

export default function BotsPage() {
  const [search, setSearch] = useState("");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useBotsInfinite(search);

  const allBots = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <PaginatedList<Bot>
      data={allBots}
      hasNextPage={hasNextPage ?? false}
      isFetchingNextPage={isFetchingNextPage}
      isLoading={isLoading}
      error={error}
      fetchNextPage={fetchNextPage}
      renderItem={(bot: Bot) => <BotCard bot={bot} />}
      onSearchChange={setSearch}
      enableSearch={true}
      searchPlaceholder="Search bots by name or description..."
      title="All Telegram Bots"
      description="Browse our complete collection of {count}+ Telegram bots."
      emptyMessage="No bots available at the moment."
      loadMoreText="Load More Bots"
    />
  );
}
