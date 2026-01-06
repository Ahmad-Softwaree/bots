import { NoDataProps } from "@/types/global";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Icon } from "iconsax-react";
import { useTranslation } from "react-i18next";
export default function NoData({ children, className, ...props }: NoDataProps) {
  const { t } = useTranslation();
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon />
        </EmptyMedia>
        <EmptyTitle className="text-text">{t("dashboard.no_data")}</EmptyTitle>
        <EmptyDescription className="text-text">
          {t("dashboard.no_data_found")}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
