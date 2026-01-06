"use client";

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/lib/react-query/keys";
import {
  addBot,
  deleteBot,
  getBot,
  getBots,
  getHomeBots,
  toggleBotStatus,
  updateBot,
} from "@/lib/react-query/actions/bot.action";
import type { QueryParam } from "@/types/types";
import type { Bot } from "@/lib/db/schema";
import { useModalStore } from "@/lib/store/modal.store";

export const useGetBots = (queryKey: [string, QueryParam]) => {
  const [name, params] = queryKey;

  return useInfiniteQuery({
    queryKey: [name, params],
    queryFn: ({ pageParam }) =>
      getBots(params, pageParam as number | undefined),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPage.hasMore ? lastPageParam + 1 : undefined;
    },
  });
};

export const useGetHomeBots = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.HOME_BOTS],
    queryFn: () => getHomeBots(),
  });
};

export const useGetBot = (id: string | null) => {
  return useQuery({
    queryKey: [QUERY_KEYS.BOT, id ?? ""],
    queryFn: () => getBot(id ?? ""),
    enabled: !!id,
  });
};

export const useAddBot = ({
  closeTheModal,
  successMessage,
}: {
  closeTheModal?: () => void;
  successMessage?: string;
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { closeModal } = useModalStore();

  return useMutation({
    mutationFn: (
      form: Omit<Bot, "id" | "userId" | "createdAt" | "updatedAt">
    ) => addBot(form),
    onSuccess: (data) => {
      toast.success(successMessage || t("bot.createSuccess"));
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOTS] });
      closeModal();
      closeTheModal?.();
    },
    onError: (error: Error) => {
      toast.error(error.message || t("bot.createError"));
    },
  });
};

export const useUpdateBot = ({
  closeTheModal,
  successMessage,
}: {
  closeTheModal?: () => void;
  successMessage?: string;
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { closeModal } = useModalStore();

  return useMutation({
    mutationFn: ({
      id,
      form,
    }: {
      id: string;
      form: Partial<Omit<Bot, "id" | "userId" | "createdAt" | "updatedAt">>;
    }) => updateBot(id, form),
    onSuccess: (data) => {
      toast.success(successMessage || t("bot.updateSuccess"));
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOTS] });
      closeModal();
      closeTheModal?.();
    },
    onError: (error: Error) => {
      toast.error(error.message || t("bot.updateError"));
    },
  });
};

export const useDeleteBot = ({
  closeTheModal,
  successMessage,
}: {
  closeTheModal?: () => void;
  successMessage?: string;
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBot(id),
    onSuccess: () => {
      toast.success(successMessage || t("bot.deleteSuccess"));
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOTS] });
      closeTheModal?.();
    },
    onError: (error: Error) => {
      toast.error(error.message || t("bot.deleteError"));
    },
  });
};

export const useToggleBotStatus = ({
  closeTheModal,
  successMessage,
}: {
  closeTheModal?: () => void;
  successMessage?: string;
}) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      currentStatus,
    }: {
      id: string;
      currentStatus: "active" | "down";
    }) => toggleBotStatus(id, currentStatus),
    onSuccess: (data) => {
      toast.success(
        successMessage || data.message || t("bot.statusToggleSuccess")
      );
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOTS] });
      closeTheModal?.();
    },
    onError: (error: Error) => {
      toast.error(error.message || t("bot.statusToggleError"));
    },
  });
};
