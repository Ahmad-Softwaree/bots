"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getBotValidation, type BotValidation } from "@/types/validation/bot";
import { useTranslation } from "react-i18next";
import { useModalStore } from "@/lib/store/modal.store";
import { useAddBot, useUpdateBot } from "@/lib/react-query/queries/bot.query";
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

interface BotFormProps {
  state: "insert" | "update";
  onFinalClose?: () => void;
}

export function BotForm({ state, onFinalClose }: BotFormProps) {
  const { t } = useTranslation();
  const { modalData, closeModal } = useModalStore();

  const form = useForm<BotValidation>({
    resolver: zodResolver(getBotValidation(t)),
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

  const onSubmit = (data: BotValidation) => {
    if (state === "insert") {
      addMutation.mutate(data);
    } else {
      updateMutation.mutate({
        id: modalData.id,
        form: data,
      });
    }
  };

  const isLoading = addMutation.isPending || updateMutation.isPending;

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
                  onRemove={() => field.onChange("")}
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
                  onRemove={() => field.onChange("")}
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
