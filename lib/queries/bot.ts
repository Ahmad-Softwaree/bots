"use client";

import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/lib/constants/query-keys";
import { getBotsLimited, getBotsInfinite, getBotById } from "@/lib/actions/bot";
import type { Bot } from "@/lib/db/schema";
import type { PaginatedResponse } from "@/types/types";

/**
 * Hook to fetch limited bots (30 items) for home page
 */
export function useBotsLimited() {
  return useQuery<Bot[], Error>({
    queryKey: [QueryKeys.BOTS_LIMITED],
    queryFn: () => getBotsLimited(),
  });
}

/**
 * Hook to fetch bots with infinite pagination
 */
export function useBotsInfinite() {
  return useInfiniteQuery<PaginatedResponse<Bot>, Error>({
    queryKey: [QueryKeys.BOTS_INFINITE],
    queryFn: ({ pageParam = 1 }) => getBotsInfinite(pageParam as number),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });
}

/**
 * Hook to fetch a specific bot by ID
 */
export function useBotById(id: string) {
  return useQuery<Bot | null, Error>({
    queryKey: [QueryKeys.BOT_BY_ID, id],
    queryFn: () => getBotById(id),
    enabled: !!id,
  });
}
