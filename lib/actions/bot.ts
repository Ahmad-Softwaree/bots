"use server";

import { db } from "@/lib/db/client";
import { bots } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import type { Bot } from "@/lib/db/schema";
import type { PaginatedResponse } from "@/types/types";
import { PER_PAGE } from "@/lib/constants/enum";

/**
 * Get limited bots - for home page
 */
export async function getBotsLimited(): Promise<Bot[]> {
  const result = await db
    .select()
    .from(bots)
    .orderBy(desc(bots.createdAt))
    .limit(PER_PAGE);

  return result;
}

/**
 * Get bots with pagination - for infinite scroll/pagination
 */
export async function getBotsInfinite(
  page: number = 1
): Promise<PaginatedResponse<Bot>> {
  const offset = (page - 1) * PER_PAGE;

  const result = await db
    .select()
    .from(bots)
    .orderBy(desc(bots.createdAt))
    .limit(PER_PAGE + 1)
    .offset(offset);

  const hasNextPage = result.length > PER_PAGE;
  const data = hasNextPage ? result.slice(0, PER_PAGE) : result;

  return {
    data,
    nextPage: hasNextPage ? page + 1 : null,
  };
}

/**
 * Get specific bot by ID
 */
export async function getBotById(id: string): Promise<Bot | null> {
  const result = await db.select().from(bots).where(eq(bots.id, id)).limit(1);

  return result[0] || null;
}
