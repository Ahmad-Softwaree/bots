import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Icon } from "iconsax-react";
import { useTranslations } from "next-intl";
export default function NoData() {
  const t = useTranslations("dashboard");
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon />
        </EmptyMedia>
        <EmptyTitle className="text-text">{t("no_data")}</EmptyTitle>
        <EmptyDescription className="text-text">
          {t("no_data_found")}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
