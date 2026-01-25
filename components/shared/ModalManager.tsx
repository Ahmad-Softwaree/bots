"use client";

import { useModalStore } from "@/lib/store/modal.store";
import { useTranslations } from "next-intl";
import Modal from "@/components/shared/Modal";
import { BotForm } from "@/components/forms/BotForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteBot } from "@/lib/react-query/queries/bot.query";
import { FilterModal } from "@/components/shared/FilterModal";

export function ModalManager() {
  const { modal, closeModal, modalData } = useModalStore();
  const confirm_t = useTranslations("confirm");
  const form_t = useTranslations("form");
  const bot_t = useTranslations("bot");
  const deleteMutation = useDeleteBot({
    successMessage: bot_t("deleteSuccess"),
  });

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(modalData.id);
    closeModal();
  };

  if (modal === "add") {
    return (
      <Modal
        title={form_t("create_title")}
        description={form_t("create_description")}>
        <BotForm state="insert" />
      </Modal>
    );
  }

  if (modal === "update") {
    return (
      <Modal
        title={form_t("update_title")}
        description={form_t("update_description")}>
        <BotForm state="update" />
      </Modal>
    );
  }

  if (modal === "delete") {
    return (
      <AlertDialog open={true} onOpenChange={closeModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{confirm_t("delete_title")}</AlertDialogTitle>
            <AlertDialogDescription>
              {confirm_t("delete_description")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{confirm_t("cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {deleteMutation.isPending ? "..." : confirm_t("delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  if (modal === "filter") {
    return <FilterModal />;
  }

  return null;
}
