"use server";

import { get, post, update, del } from "@/lib/config/api.config";
import { BotsQueryParams } from "@/hooks/useBotsQueries";
import { SearchQueryParams } from "@/hooks/useSearchQuery";
import { PaginationQueryParams } from "@/hooks/usePaginationQueries";
import type { Bot, PaginationResult, CRUDReturn } from "@/types/global";
import { handleServerError } from "@/lib/error-handler";
import { URLS } from "@/lib/urls";
import { ENUMs } from "@/lib/enums";
import { revalidatePath, revalidateTag } from "next/cache";

export const getBots = async (
  queries: BotsQueryParams,
  search: SearchQueryParams,
  pagination: PaginationQueryParams
): Promise<PaginationResult<Bot>> => {
  try {
    const params = new URLSearchParams({
      page: String(pagination.page),
      limit: String(pagination.limit),
      search: search.search || "",
      status: queries.status || "all",
    });

    const response = await get<PaginationResult<Bot>>(
      `${URLS.BOTS}?${params.toString()}`,
      {
        tags: [ENUMs.TAGS.BOTS],
        revalidate: 0,
      }
    );

    if (response && (response as any).__isError) return response;

    return response;
  } catch (error) {
    throw handleServerError(error) as any;
  }
};

export const getHomeBots = async (): Promise<Bot[]> => {
  try {
    const response = await get<Bot[]>(URLS.HOME_BOTS, {
      tags: [ENUMs.TAGS.HOME_BOTS],
      revalidate: 0,
    });
    if (response && (response as any).__isError) return response;

    return response;
  } catch (error) {
    throw handleServerError(error) as any;
  }
};

export const getBot = async (id: string): Promise<Bot> => {
  try {
    const response = await get<Bot>(`${URLS.BOTS}/${id}`, {
      tags: [ENUMs.TAGS.ONE_BOT],
      revalidate: 0,
    });

    if (response && (response as any).__isError) return response;
    return response;
  } catch (error) {
    throw handleServerError(error) as any;
  }
};

export const addBot = async (
  form: Omit<Bot, "id" | "createdAt" | "updatedAt">
): Promise<CRUDReturn> => {
  try {
    const response = await post<CRUDReturn>(URLS.BOTS, form, {
      tags: [ENUMs.TAGS.BOTS],
    });

    if (response && (response as any).__isError) return response;
    revalidatePath(ENUMs.TAGS.BOTS);
    return response;
  } catch (error) {
    return handleServerError(error) as any;
  }
};

export const updateBot = async (
  id: string,
  form: Partial<Omit<Bot, "id" | "createdAt" | "updatedAt">>
): Promise<CRUDReturn> => {
  try {
    const response = await update<CRUDReturn>(`${URLS.BOTS}/${id}`, form, {
      tags: [ENUMs.TAGS.BOTS],
    });

    if (response && (response as any).__isError) return response;
    revalidatePath(ENUMs.TAGS.BOTS);

    return response;
  } catch (error) {
    return handleServerError(error) as any;
  }
};

export const deleteBot = async (id: string): Promise<CRUDReturn> => {
  try {
    const response = await del<CRUDReturn>(URLS.BOTS, id, {
      tags: [ENUMs.TAGS.BOTS],
    });

    if (response && (response as any).__isError) return response;
    revalidatePath(ENUMs.TAGS.BOTS);

    return response;
  } catch (error) {
    return handleServerError(error) as any;
  }
};

export const toggleBotStatus = async (
  id: string,
  currentStatus: "active" | "down"
): Promise<CRUDReturn> => {
  try {
    const response = await update<CRUDReturn>(`${URLS.BOTS}/${id}/toggle`, {
      currentStatus,
    });

    if (response && (response as any).__isError) return response;

    return response;
  } catch (error) {
    return handleServerError(error) as any;
  }
};
