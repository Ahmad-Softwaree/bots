"use server";

import { db } from "@/lib/db/client";
import { bots, type Bot } from "@/lib/db/schema";
import { desc, eq, and, ilike, or, sql } from "drizzle-orm";
import type { QueryParam } from "@/types/types";
import { PER_PAGE, ENUMs } from "@/lib/enum";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export type CRUDReturn = { message: string; data?: any };

export type PaginationResult<T> = {
  data: T[];
  total: number;
  hasMore: boolean;
  totalPages: number;
};

type BotWithLocalizedFields = Omit<
  Bot,
  "enName" | "arName" | "ckbName" | "enDesc" | "arDesc" | "ckbDesc"
> & {
  name: string;
  description: string;
};

const getLanguage = async (): Promise<"en" | "ar" | "ckb"> => {
  const cookieStore = await cookies();
  const lang = cookieStore.get(ENUMs.GLOBAL.LANG_COOKIE)?.value;
  return (lang as "en" | "ar" | "ckb") || "en";
};

const mapBotToLocalized = (
  bot: Bot,
  lang: "en" | "ar" | "ckb"
): BotWithLocalizedFields => {
  return {
    ...bot,
    name: lang === "en" ? bot.enName : lang === "ar" ? bot.arName : bot.ckbName,
    description:
      lang === "en" ? bot.enDesc : lang === "ar" ? bot.arDesc : bot.ckbDesc,
  };
};

export const getBots = async (
  queries?: QueryParam,
  page: number = 1
): Promise<PaginationResult<BotWithLocalizedFields>> => {
  try {
    const lang = await getLanguage();
    const pageNumber = Number(page) - 1 || 0;
    const limit = Number(queries?.limit) || 100;
    const search = (queries?.search as string) || "";
    const status = (queries?.status as string) || "all";
    const offset = pageNumber * limit;

    const whereConditions: any[] = [];

    if (status !== "all") {
      whereConditions.push(eq(bots.status, status as "active" | "down"));
    }

    if (search) {
      whereConditions.push(
        or(
          ilike(bots.enName, `%${search}%`),
          ilike(bots.arName, `%${search}%`),
          ilike(bots.ckbName, `%${search}%`),
          ilike(bots.enDesc, `%${search}%`),
          ilike(bots.arDesc, `%${search}%`),
          ilike(bots.ckbDesc, `%${search}%`)
        )!
      );
    }
    const [data, totalResult] = await Promise.all([
      db
        .select()
        .from(bots)
        .where(
          whereConditions.length === 0
            ? undefined
            : whereConditions.length === 1
            ? whereConditions[0]
            : and(...whereConditions)
        )
        .orderBy(desc(bots.createdAt))
        .limit(limit)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)::int` })
        .from(bots)
        .where(
          whereConditions.length === 0
            ? undefined
            : whereConditions.length === 1
            ? whereConditions[0]
            : and(...whereConditions)
        ),
    ]);
    const total = totalResult[0]?.count || 0;
    let totalPages = Math.ceil(total / limit);
    return {
      data: data.map((bot) => mapBotToLocalized(bot, lang)),
      total,
      totalPages,
      hasMore: offset + data.length < total,
    };
  } catch (error) {
    throw error;
  }
};

export const getHomeBots = async (): Promise<BotWithLocalizedFields[]> => {
  const lang = await getLanguage();
  const result = await db
    .select()
    .from(bots)
    .where(eq(bots.status, "active"))
    .orderBy(desc(bots.createdAt))
    .limit(PER_PAGE);

  return result.map((bot) => mapBotToLocalized(bot, lang));
};

export const getBot = async (
  id: string
): Promise<BotWithLocalizedFields | null> => {
  const lang = await getLanguage();
  const result = await db.select().from(bots).where(eq(bots.id, id)).limit(1);

  return result[0] ? mapBotToLocalized(result[0], lang) : null;
};

export const addBot = async (
  form: Omit<Bot, "id" | "userId" | "createdAt" | "updatedAt">
): Promise<CRUDReturn> => {
  const [newBot] = await db
    .insert(bots)
    .values({
      ...form,
    })
    .returning();

  revalidatePath("/");
  revalidatePath("/bots");
  revalidatePath("/admin/dashboard");

  return {
    message: "Bot created successfully",
    data: newBot,
  };
};

export const updateBot = async (
  id: string,
  form: Partial<Omit<Bot, "id" | "userId" | "createdAt" | "updatedAt">>
): Promise<CRUDReturn> => {
  const [updatedBot] = await db
    .update(bots)
    .set({
      ...form,
      updatedAt: new Date(),
    })
    .where(eq(bots.id, id))
    .returning();

  if (!updatedBot) {
    throw new Error("Bot not found");
  }

  revalidatePath("/");
  revalidatePath("/bots");
  revalidatePath(`/bots/${id}`);
  revalidatePath("/admin/dashboard");

  return {
    message: "Bot updated successfully",
    data: updatedBot,
  };
};

export const deleteBot = async (id: string): Promise<CRUDReturn> => {
  const { userId: authUserId } = await auth();

  if (!authUserId || authUserId !== process.env.ADMIN_USER_ID) {
    throw new Error("Unauthorized");
  }

  const [deletedBot] = await db.delete(bots).where(eq(bots.id, id)).returning();

  if (!deletedBot) {
    throw new Error("Bot not found");
  }

  revalidatePath("/");
  revalidatePath("/bots");
  revalidatePath("/admin/dashboard");

  return {
    message: "Bot deleted successfully",
    data: deletedBot,
  };
};

export const toggleBotStatus = async (
  id: string,
  currentStatus: "active" | "down"
): Promise<CRUDReturn> => {
  const { userId } = await auth();

  if (!userId || userId !== process.env.ADMIN_USER_ID) {
    throw new Error("Unauthorized");
  }

  const newStatus = currentStatus === "active" ? "down" : "active";

  const [updatedBot] = await db
    .update(bots)
    .set({ status: newStatus, updatedAt: new Date() })
    .where(eq(bots.id, id))
    .returning();

  if (!updatedBot) {
    throw new Error("Bot not found");
  }

  revalidatePath("/");
  revalidatePath("/bots");
  revalidatePath(`/bots/${id}`);
  revalidatePath("/admin/dashboard");

  return {
    message: `Bot status changed to ${newStatus}`,
    data: updatedBot,
  };
};
