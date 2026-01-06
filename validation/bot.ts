import { z } from "zod";
import i18n from "@/i18n/i18n";

export const getBotValidation = (i18nInstance: typeof i18n) => {
  const t = i18nInstance.t.bind(i18nInstance);

  return z.object({
    id: z.string().uuid().optional(),
    name: z
      .string()
      .min(1, t("form.name_required"))
      .max(100, t("form.name_too_long")),
    description: z
      .string()
      .min(10, t("form.description_min"))
      .max(500, t("form.description_max")),
    image: z.string().url(t("form.image_invalid")),
    iconImage: z.string().url(t("form.icon_invalid")),
    link: z.string().url(t("form.link_invalid")),
    repoLink: z.string().url(t("form.repo_invalid")),
    status: z.enum(["active", "down"]),
  });
};

export const botValidationSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, "Bot name is required").max(100, "Name is too long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description is too long"),
  image: z.string().url("Must be a valid image URL"),
  iconImage: z.string().url("Must be a valid icon URL"),
  link: z.string().url("Must be a valid Telegram link"),
  repoLink: z.string().url("Must be a valid GitHub repository link"),
  status: z.enum(["active", "down"]),
});

export const createBotSchema = botValidationSchema.omit({ id: true });
export const updateBotSchema = botValidationSchema;

export type BotValidation = z.infer<ReturnType<typeof getBotValidation>>;
export type CreateBot = z.infer<typeof createBotSchema>;
export type UpdateBot = z.infer<typeof updateBotSchema>;
