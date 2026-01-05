"use server";

import { db } from "@/lib/db/client";
import { bots } from "@/lib/db/schema";
import { desc, eq, and, ilike, or } from "drizzle-orm";
import type { Bot } from "@/lib/db/schema";
import type { PaginatedResponse } from "@/types/types";
import { PER_PAGE } from "@/lib/constants/enum";
import { auth } from "@clerk/nextjs/server";
import { createBotSchema, updateBotSchema } from "@/types/validation/bot";
import { revalidatePath } from "next/cache";

/**
 * Get limited active bots - for home page (PUBLIC - only active bots)
 */
export async function getBotsLimited(): Promise<Bot[]> {
  const result = await db
    .select()
    .from(bots)
    .where(eq(bots.status, "active"))
    .orderBy(desc(bots.createdAt))
    .limit(PER_PAGE);

  return result;
}

/**
 * Get active bots with pagination - for infinite scroll (PUBLIC - only active bots)
 */
export async function getBotsInfinite(
  page: number = 1
): Promise<PaginatedResponse<Bot>> {
  const offset = (page - 1) * PER_PAGE;

  const result = await db
    .select()
    .from(bots)
    .where(eq(bots.status, "active"))
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
 * Get specific bot by ID (PUBLIC)
 */
export async function getBotById(id: string): Promise<Bot | null> {
  const result = await db.select().from(bots).where(eq(bots.id, id)).limit(1);

  return result[0] || null;
}

/**
 * Get all bots for admin with optional search and status filter (ADMIN ONLY)
 */
export async function getBotsForAdmin(
  search?: string,
  statusFilter?: "active" | "down" | "all"
): Promise<Bot[]> {
  const { userId } = await auth();

  if (!userId || userId !== process.env.ADMIN_USER_ID) {
    throw new Error("Unauthorized");
  }

  let query = db.select().from(bots);

  const conditions = [];

  // Apply status filter
  if (statusFilter && statusFilter !== "all") {
    conditions.push(eq(bots.status, statusFilter));
  }

  // Apply search filter
  if (search && search.trim()) {
    conditions.push(
      or(
        ilike(bots.name, `%${search}%`),
        ilike(bots.description, `%${search}%`)
      )!
    );
  }

  if (conditions.length > 0) {
    query = query.where(and(...conditions)!) as typeof query;
  }

  const result = await query.orderBy(desc(bots.createdAt));

  return result;
}

/**
 * Create a new bot (ADMIN ONLY)
 */
export async function createBot(
  data: unknown
): Promise<{ success: boolean; error?: string; data?: Bot }> {
  try {
    const { userId } = await auth();

    if (!userId || userId !== process.env.ADMIN_USER_ID) {
      return { success: false, error: "Unauthorized" };
    }

    const validatedData = createBotSchema.parse(data);

    const [newBot] = await db
      .insert(bots)
      .values({
        ...validatedData,
        userId,
      })
      .returning();

    revalidatePath("/");
    revalidatePath("/bots");
    revalidatePath("/admin/dashboard");

    return { success: true, data: newBot };
  } catch (error) {
    console.error("Error creating bot:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create bot",
    };
  }
}

/**
 * Update an existing bot (ADMIN ONLY)
 */
export async function updateBot(
  data: unknown
): Promise<{ success: boolean; error?: string; data?: Bot }> {
  try {
    const { userId } = await auth();

    if (!userId || userId !== process.env.ADMIN_USER_ID) {
      return { success: false, error: "Unauthorized" };
    }

    const validatedData = updateBotSchema.parse(data);
    const { id, ...updateData } = validatedData;

    const [updatedBot] = await db
      .update(bots)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(bots.id, id))
      .returning();

    if (!updatedBot) {
      return { success: false, error: "Bot not found" };
    }

    revalidatePath("/");
    revalidatePath("/bots");
    revalidatePath(`/bots/${id}`);
    revalidatePath("/admin/dashboard");

    return { success: true, data: updatedBot };
  } catch (error) {
    console.error("Error updating bot:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update bot",
    };
  }
}

/**
 * Delete a bot (ADMIN ONLY)
 */
export async function deleteBot(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { userId } = await auth();

    if (!userId || userId !== process.env.ADMIN_USER_ID) {
      return { success: false, error: "Unauthorized" };
    }

    await db.delete(bots).where(eq(bots.id, id));

    revalidatePath("/");
    revalidatePath("/bots");
    revalidatePath("/admin/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error deleting bot:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete bot",
    };
  }
}

/**
 * Toggle bot status between active and down (ADMIN ONLY)
 */
export async function toggleBotStatus(
  id: string,
  currentStatus: "active" | "down"
): Promise<{ success: boolean; error?: string; data?: Bot }> {
  try {
    const { userId } = await auth();

    if (!userId || userId !== process.env.ADMIN_USER_ID) {
      return { success: false, error: "Unauthorized" };
    }

    const newStatus = currentStatus === "active" ? "down" : "active";

    const [updatedBot] = await db
      .update(bots)
      .set({ status: newStatus, updatedAt: new Date() })
      .where(eq(bots.id, id))
      .returning();

    if (!updatedBot) {
      return { success: false, error: "Bot not found" };
    }

    revalidatePath("/");
    revalidatePath("/bots");
    revalidatePath(`/bots/${id}`);
    revalidatePath("/admin/dashboard");

    return { success: true, data: updatedBot };
  } catch (error) {
    console.error("Error toggling bot status:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to toggle bot status",
    };
  }
}
