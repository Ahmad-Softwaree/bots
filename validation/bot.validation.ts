import { useTranslations } from "next-intl";
import { z } from "zod";

export const getBotSchema = () => {
  const t = useTranslations("validation");

  return z.object({
    enName: z
      .string(t("enName_required"))
      .min(1, t("enName_required"))
      .max(100, t("enName_too_long")),
    arName: z
      .string(t("arName_required"))
      .min(1, t("arName_required"))
      .max(100, t("arName_too_long")),
    ckbName: z
      .string(t("ckbName_required"))
      .min(1, t("ckbName_required"))
      .max(100, t("ckbName_too_long")),
    enDesc: z
      .string(t("enDesc_min"))
      .min(10, t("enDesc_min"))
      .max(500, t("enDesc_max")),
    arDesc: z
      .string(t("arDesc_min"))
      .min(10, t("arDesc_min"))
      .max(500, t("arDesc_max")),
    ckbDesc: z
      .string(t("ckbDesc_min"))
      .min(10, t("ckbDesc_min"))
      .max(500, t("ckbDesc_max")),
    image: z.any(),
    iconImage: z.any(),
    link: z.string(t("link_invalid")),
    repoLink: z.string(t("repo_invalid")),
    status: z.enum(["active", "down"]),
  });
};

export type BotSchema = z.infer<ReturnType<typeof getBotSchema>>;
