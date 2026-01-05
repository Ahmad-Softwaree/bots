"use client";

import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { QueryKeys } from "@/lib/constants/query-keys";
import {
  getBotsLimited,
  getBotsInfinite,
  getBotById,
  getBotsForAdmin,
  createBot,
  updateBot,
  deleteBot,
  toggleBotStatus,
} from "@/lib/actions/bot";
import type { Bot } from "@/lib/db/schema";
import type { PaginatedResponse } from "@/types/types";
import type { CreateBot } from "@/types/validation/bot";

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

/**
 * Hook to fetch all bots for admin with search and filter
 */
export function useBotsAdmin(
  search?: string,
  statusFilter?: "active" | "down" | "all"
) {
  return useQuery({
    queryKey: [QueryKeys.BOTS_ADMIN, search, statusFilter],
    queryFn: () => getBotsForAdmin(search, statusFilter),
    staleTime: 1000 * 30, // 30 seconds
  });
}

/**
 * Hook to create a new bot
 */
export function useCreateBot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.CREATE_BOT],
    mutationFn: (data: CreateBot) => createBot(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BOTS_ADMIN] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BOTS_LIMITED] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BOTS_INFINITE] });
    },
  });
}

/**
 * Hook to update an existing bot
 */
export function useUpdateBot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.UPDATE_BOT],
    mutationFn: (data: CreateBot & { id: string }) => updateBot(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BOTS_ADMIN] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BOTS_LIMITED] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BOTS_INFINITE] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BOT_BY_ID] });
    },
  });
}

/**
 * Hook to delete a bot
 */
export function useDeleteBot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.DELETE_BOT],
    mutationFn: (id: string) => deleteBot(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BOTS_ADMIN] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BOTS_LIMITED] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BOTS_INFINITE] });
    },
  });
}

/**
 * Hook to toggle bot status between active and down
 */
export function useToggleBotStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.TOGGLE_BOT_STATUS],
    mutationFn: ({
      id,
      currentStatus,
    }: {
      id: string;
      currentStatus: "active" | "down";
    }) => toggleBotStatus(id, currentStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BOTS_ADMIN] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BOTS_LIMITED] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BOTS_INFINITE] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BOT_BY_ID] });
    },
  });
}
