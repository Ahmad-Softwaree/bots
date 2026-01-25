"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModalStore } from "@/lib/store/modal.store";
import { useAddBot, useUpdateBot } from "@/lib/react-query/queries/bot.query";
import { useDeleteImage } from "@/lib/react-query/queries/uploadthing.query";
import { useUploadThing } from "@/lib/uploadthing";
import { useState } from "react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/shared/image-upload";
import { BotSchema, getBotSchema } from "@/validation/bot.validation";
import { GlobalFormProps } from "@/types/global";
import { useTranslations } from "next-intl";

export function BotForm({ state, onFinalClose }: GlobalFormProps) {
  const t = useTranslations("bot");
  const common_t = useTranslations("common");
  const { modalData, closeModal } = useModalStore();
  const [isUploading, setIsUploading] = useState(false);

  const { startUpload } = useUploadThing("botImageUploader");

  const form = useForm<BotSchema>({
    resolver: zodResolver(getBotSchema()),
    defaultValues:
      state === "update" && modalData
        ? {
            enName: modalData.enName || "",
            arName: modalData.arName || "",
            ckbName: modalData.ckbName || "",
            enDesc: modalData.enDesc || "",
            arDesc: modalData.arDesc || "",
            ckbDesc: modalData.ckbDesc || "",
            image: modalData.image,
            iconImage: modalData.iconImage,
            link: modalData.link,
            repoLink: modalData.repoLink,
            status: modalData.status,
          }
        : {
            enName: "",
            arName: "",
            ckbName: "",
            enDesc: "",
            arDesc: "",
            ckbDesc: "",
            image: "",
            iconImage: "",
            link: "",
            repoLink: "",
            status: "active",
          },
  });

  const addMutation = useAddBot({
    closeTheModal: onFinalClose,
    successMessage: t("createSuccess"),
  });

  const updateMutation = useUpdateBot({
    closeTheModal: onFinalClose,
    successMessage: t("updateSuccess"),
  });

  const deleteImageMutation = useDeleteImage(modalData?.id || "");

  const handleImageRemove = async (
    url: string,
    fieldName: "image" | "iconImage"
  ) => {
    const match = url.match(/\/f\/([^?]+)/);
    const fileKey = match ? match[1] : null;

    if (!fileKey) return;

    try {
      await deleteImageMutation.mutateAsync({
        fileKey,
        fieldName,
      });

      form.setValue(fieldName, "");
    } catch (error) {
      console.error("Failed to delete image:", error);
    }
  };

  const onSubmit = async (data: BotSchema) => {
    try {
      setIsUploading(true);

      let imageUrl = data.image;
      let iconImageUrl = data.iconImage;

      const filesToUpload: File[] = [];
      if (data.image instanceof File) {
        filesToUpload.push(data.image);
      }
      if (data.iconImage instanceof File) {
        filesToUpload.push(data.iconImage);
      }

      if (filesToUpload.length > 0) {
        const uploadResults = await startUpload(filesToUpload);

        if (!uploadResults) {
          toast.error(t("imageUploadError") || "Failed to upload images");
          return;
        }

        let uploadIndex = 0;

        if (data.image instanceof File) {
          imageUrl = uploadResults[uploadIndex]?.url || "";
          uploadIndex++;
        }

        if (data.iconImage instanceof File) {
          iconImageUrl = uploadResults[uploadIndex]?.url || "";
        }
      }

      const finalData = {
        ...data,
        image: typeof imageUrl === "string" ? imageUrl : "",
        iconImage: typeof iconImageUrl === "string" ? iconImageUrl : "",
      };

      if (state === "insert") {
        addMutation.mutate(finalData);
      } else {
        updateMutation.mutate({
          id: modalData.id,
          form: finalData,
        });
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(t("imageUploadError") || "Failed to upload images");
    } finally {
      setIsUploading(false);
    }
  };

  const isLoading =
    addMutation.isPending || updateMutation.isPending || isUploading;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="enName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("name")} (English)</FormLabel>
              <FormControl>
                <Input placeholder={t("name")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="arName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("name")} (العربية)</FormLabel>
              <FormControl>
                <Input placeholder={t("name")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ckbName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("name")} (کوردی)</FormLabel>
              <FormControl>
                <Input placeholder={t("name")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="enDesc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("description")} (English)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("description")}
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="arDesc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("description")} (العربية)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("description")}
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ckbDesc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("description")} (کوردی)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("description")}
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("image")}</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  onChange={field.onChange}
                  onRemove={(url) => handleImageRemove(url, "image")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="iconImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("icon")}</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  onChange={field.onChange}
                  onRemove={(url) => handleImageRemove(url, "iconImage")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("link")}</FormLabel>
              <FormControl>
                <Input
                  dir="ltr"
                  className="english_font"
                  placeholder="https://t.me/botname"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="repoLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("repo")}</FormLabel>
              <FormControl>
                <Input
                  dir="ltr"
                  className="english_font"
                  placeholder="https://github.com/user/repo"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("status")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("status")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="active">{t("active")}</SelectItem>
                  <SelectItem value="down">{t("down")}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={closeModal}
            disabled={isLoading}>
            {common_t("cancel")}
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading
              ? common_t("loading")
              : state === "insert"
              ? common_t("add")
              : common_t("save")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
