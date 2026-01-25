import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db/client";
import { bots } from "@/lib/db/schema";
import { eq, desc, like, and, or, sql } from "drizzle-orm";
import { ENUMs } from "@/lib/enums";
import type { Bot, PaginationResult } from "@/types/global";
import { mapBotToLocalized } from "./home/route";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const lang = (await headers()).get("x-locale") || "en";
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(
      searchParams.get("limit") || String(ENUMs.GLOBAL.PER_PAGE)
    );
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") as "active" | "down" | "all";

    const conditions = [];

    if (status && status !== "all") {
      conditions.push(eq(bots.status, status));
    }

    if (search) {
      conditions.push(
        or(
          like(bots.enName, `%${search}%`),
          like(bots.arName, `%${search}%`),
          like(bots.ckbName, `%${search}%`)
        )
      );
    }

    const pageNumber = Math.max(0, page - 1);
    const offset = pageNumber * limit;

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [result, totalResult] = await Promise.all([
      db
        .select()
        .from(bots)
        .where(whereClause)
        .orderBy(desc(bots.createdAt))
        .limit(limit)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)` })
        .from(bots)
        .where(whereClause),
    ]);

    const total = Number(totalResult[0]?.count || 0);
    const totalPages = Math.ceil(total / limit);
    const hasMore = page < totalPages;

    const localizedBots = result.map((bot) => mapBotToLocalized(bot, lang));

    const response: PaginationResult<Bot> = {
      data: localizedBots,
      total,
      hasMore,
      totalPages,
    };

    return NextResponse.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    await db.insert(bots).values({
      ...body,
    });

    return NextResponse.json(
      {
        message: "Bot created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
