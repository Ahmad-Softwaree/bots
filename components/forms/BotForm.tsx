"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
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

interface BotFormProps {
  state: "insert" | "update";
  onFinalClose?: () => void;
}

export function BotForm({ state, onFinalClose }: BotFormProps) {
  const { t, i18n } = useTranslation();
  const { modalData, closeModal } = useModalStore();
  const [isUploading, setIsUploading] = useState(false);

  const { startUpload } = useUploadThing("botImageUploader");

  const form = useForm<BotSchema>({
    resolver: zodResolver(getBotSchema(i18n)),
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
    successMessage: t("bot.createSuccess"),
  });

  const updateMutation = useUpdateBot({
    closeTheModal: onFinalClose,
    successMessage: t("bot.updateSuccess"),
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
          toast.error(t("bot.imageUploadError") || "Failed to upload images");
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
      toast.error(t("bot.imageUploadError") || "Failed to upload images");
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
              <FormLabel>{t("bot.name")} (English)</FormLabel>
              <FormControl>
                <Input placeholder={t("bot.name")} {...field} />
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
              <FormLabel>{t("bot.name")} (العربية)</FormLabel>
              <FormControl>
                <Input placeholder={t("bot.name")} {...field} />
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
              <FormLabel>{t("bot.name")} (کوردی)</FormLabel>
              <FormControl>
                <Input placeholder={t("bot.name")} {...field} />
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
              <FormLabel>{t("bot.description")} (English)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("bot.description")}
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
              <FormLabel>{t("bot.description")} (العربية)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("bot.description")}
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
              <FormLabel>{t("bot.description")} (کوردی)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("bot.description")}
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
              <FormLabel>{t("bot.image")}</FormLabel>
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
              <FormLabel>{t("bot.icon")}</FormLabel>
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
              <FormLabel>{t("bot.link")}</FormLabel>
              <FormControl>
                <Input placeholder="https://t.me/botname" {...field} />
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
              <FormLabel>{t("bot.repo")}</FormLabel>
              <FormControl>
                <Input placeholder="https://github.com/user/repo" {...field} />
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
              <FormLabel>{t("bot.status")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("bot.status")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="active">{t("bot.active")}</SelectItem>
                  <SelectItem value="down">{t("bot.down")}</SelectItem>
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
            {t("common.cancel")}
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading
              ? t("common.loading")
              : state === "insert"
              ? t("common.add")
              : t("common.save")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
