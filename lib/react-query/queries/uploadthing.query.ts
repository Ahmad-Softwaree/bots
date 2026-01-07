import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteImage } from "@/lib/react-query/actions/uploadthing.action";
import { QUERY_KEYS } from "@/lib/react-query/keys";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useDeleteImage = (id: string) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      fileKey,
      fieldName,
    }: {
      fileKey: string;
      fieldName: "image" | "iconImage";
    }) => deleteImage(id, fieldName, fileKey),
    onSuccess: () => {
      toast.success(t("bot.imageDeleteSuccess"));
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOTS] });
    },
    onError: (error: Error) => {
      toast.error(t("bot.imageDeleteError"));
    },
  });
};
