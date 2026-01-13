import { z } from "zod";
import { i18n } from "i18next";

export const getBotSchema = (lang: i18n) => {
  const v = lang.t("validation", { returnObjects: true });

  return z.object({
    enName: z
      .string(v.enName_required)
      .min(1, v.enName_required)
      .max(100, v.enName_too_long),
    arName: z
      .string(v.arName_required)
      .min(1, v.arName_required)
      .max(100, v.arName_too_long),
    ckbName: z
      .string(v.ckbName_required)
      .min(1, v.ckbName_required)
      .max(100, v.ckbName_too_long),
    enDesc: z.string(v.enDesc_min).min(10, v.enDesc_min).max(500, v.enDesc_max),
    arDesc: z.string(v.arDesc_min).min(10, v.arDesc_min).max(500, v.arDesc_max),
    ckbDesc: z
      .string(v.ckbDesc_min)
      .min(10, v.ckbDesc_min)
      .max(500, v.ckbDesc_max),
    image: z.any(),
    iconImage: z.any(),
    link: z.string(v.link_invalid),
    repoLink: z.string(v.repo_invalid),
    status: z.enum(["active", "down"]),
  });
};

export type BotSchema = z.infer<ReturnType<typeof getBotSchema>>;
