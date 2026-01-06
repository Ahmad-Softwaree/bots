import { z } from "zod";

export const getBotValidation = (t: any) => {
  return z.object({
    id: z.string().uuid().optional(),
    enName: z
      .string()
      .min(1, t("form.name_required"))
      .max(100, t("form.name_too_long")),
    arName: z
      .string()
      .min(1, t("form.name_required"))
      .max(100, t("form.name_too_long")),
    ckbName: z
      .string()
      .min(1, t("form.name_required"))
      .max(100, t("form.name_too_long")),
    enDesc: z
      .string()
      .min(10, t("form.description_min"))
      .max(500, t("form.description_max")),
    arDesc: z
      .string()
      .min(10, t("form.description_min"))
      .max(500, t("form.description_max")),
    ckbDesc: z
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

export type BotValidation = z.infer<ReturnType<typeof getBotValidation>>;
