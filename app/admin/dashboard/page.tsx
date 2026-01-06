"use client";

import Page from "@/containers/Page";
import { DataBox } from "@/components/table/data-box";
import type { Bot } from "@/lib/db/schema";
import { useGetBots } from "@/lib/react-query/queries/bot.query";
import { QUERY_KEYS } from "@/lib/react-query/keys";
import { BotCard } from "@/components/cards/BotCard";

export default function AdminDashboard() {
  return (
    <Page
      search={true}
      parameters={["status"]}
      statusCards={false}
      extraFilter={true}>
      <DataBox<Bot>
        queryFn={useGetBots}
        name={QUERY_KEYS.BOTS}
        Component={BotCard.Dashboard}
      />
    </Page>
  );
}
