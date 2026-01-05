"use client";

import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
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
export function useBotsInfinite(search?: string) {
  return useInfiniteQuery<PaginatedResponse<Bot>, Error>({
    queryKey: [QueryKeys.BOTS_INFINITE, search],
    queryFn: ({ pageParam = 1 }) =>
      getBotsInfinite(pageParam as number, search),
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
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Bot created successfully");
        queryClient.invalidateQueries({ queryKey: [QueryKeys.BOTS_ADMIN] });
        queryClient.invalidateQueries({ queryKey: [QueryKeys.BOTS_LIMITED] });
        queryClient.invalidateQueries({ queryKey: [QueryKeys.BOTS_INFINITE] });
      } else {
        toast.error(result.error || "Failed to create bot");
      }
    },
    onError: () => {
      toast.error("Failed to create bot");
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
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Bot updated successfully");
        queryClient.invalidateQueries({ queryKey: [QueryKeys.BOTS_ADMIN] });
        queryClient.invalidateQueries({ queryKey: [QueryKeys.BOTS_LIMITED] });
        queryClient.invalidateQueries({ queryKey: [QueryKeys.BOTS_INFINITE] });
        queryClient.invalidateQueries({ queryKey: [QueryKeys.BOT_BY_ID] });
      } else {
        toast.error(result.error || "Failed to update bot");
      }
    },
    onError: () => {
      toast.error("Failed to update bot");
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
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Bot deleted successfully");
        queryClient.invalidateQueries({ queryKey: [QueryKeys.BOTS_ADMIN] });
        queryClient.invalidateQueries({ queryKey: [QueryKeys.BOTS_LIMITED] });
        queryClient.invalidateQueries({ queryKey: [QueryKeys.BOTS_INFINITE] });
      } else {
        toast.error(result.error || "Failed to delete bot");
      }
    },
    onError: () => {
      toast.error("Failed to delete bot");
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
    onSuccess: (result, variables) => {
      if (result.success) {
        const newStatus =
          variables.currentStatus === "active" ? "down" : "active";
        toast.success(`Bot status changed to ${newStatus}`);
        queryClient.invalidateQueries({ queryKey: [QueryKeys.BOTS_ADMIN] });
        queryClient.invalidateQueries({ queryKey: [QueryKeys.BOTS_LIMITED] });
        queryClient.invalidateQueries({ queryKey: [QueryKeys.BOTS_INFINITE] });
        queryClient.invalidateQueries({ queryKey: [QueryKeys.BOT_BY_ID] });
      } else {
        toast.error(result.error || "Failed to update status");
      }
    },
    onError: () => {
      toast.error("Failed to update status");
    },
  });
}
