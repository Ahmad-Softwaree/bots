import { db } from "@/lib/db/client";
import { bots } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { ENUMs } from "@/lib/enums";
import type { Bot } from "@/types/global";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export function mapBotToLocalized(bot: Bot, lang: string): Bot {
  const localizedName =
    lang == "en" ? bot.enName : lang === "ar" ? bot.arName : bot.ckbName;
  const localizedDesc =
    lang === "en" ? bot.enDesc : lang === "ar" ? bot.arDesc : bot.ckbDesc;

  return {
    ...bot,
    name: localizedName || bot.enName,
    description: localizedDesc || bot.enDesc,
  };
}

export async function GET() {
  try {
    const lang = (await headers()).get("x-locale") || "en";
    const result = await db
      .select()
      .from(bots)
      .where(eq(bots.status, "active"))
      .orderBy(desc(bots.createdAt))
      .limit(ENUMs.GLOBAL.PER_PAGE);

    const localizedBots = result.map((bot) => mapBotToLocalized(bot, lang));

    return NextResponse.json(localizedBots);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
