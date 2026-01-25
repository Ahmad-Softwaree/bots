"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/lib/react-query/keys";
import {
  addBot,
  updateBot,
  deleteBot,
  toggleBotStatus,
} from "@/lib/react-query/actions/bot.action";
import type { Bot } from "@/types/global";
import { useModalStore } from "@/lib/store/modal.store";
import { handleMutationError } from "@/lib/error-handler";

export const useAddBot = ({
  closeTheModal,
  successMessage,
}: {
  closeTheModal?: () => void;
  successMessage?: string;
}) => {
  const t = useTranslations("bot");
  const queryClient = useQueryClient();
  const { closeModal } = useModalStore();

  return useMutation({
    mutationFn: (form: Omit<Bot, "id" | "createdAt" | "updatedAt">) =>
      addBot(form),
    onSuccess: (data) => {
      toast.success(successMessage || t("createSuccess"));
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOTS] });
      closeModal();
      closeTheModal?.();
    },
    onError: (error: Error) => {
      handleMutationError(error, t, "bot.createError", (msg) =>
        toast.error(msg)
      );
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
  const t = useTranslations("bot");
  const queryClient = useQueryClient();
  const { closeModal } = useModalStore();

  return useMutation({
    mutationFn: ({
      id,
      form,
    }: {
      id: string;
      form: Partial<Omit<Bot, "id" | "createdAt" | "updatedAt">>;
    }) => updateBot(id, form),
    onSuccess: (data) => {
      toast.success(successMessage || t("updateSuccess"));
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOTS] });
      closeModal();
      closeTheModal?.();
    },
    onError: (error: Error) => {
      handleMutationError(error, t, "bot.updateError", (msg) =>
        toast.error(msg)
      );
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
  const t = useTranslations("bot");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBot(id),
    onSuccess: () => {
      toast.success(successMessage || t("deleteSuccess"));
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOTS] });
      closeTheModal?.();
    },
    onError: (error: Error) => {
      handleMutationError(error, t, "bot.deleteError", (msg) =>
        toast.error(msg)
      );
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
  const t = useTranslations("bot");
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
      toast.success(successMessage || data.message || t("statusToggleSuccess"));
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOTS] });
      closeTheModal?.();
    },
    onError: (error: Error) => {
      handleMutationError(error, t, "bot.statusToggleError", (msg) =>
        toast.error(msg)
      );
    },
  });
};
