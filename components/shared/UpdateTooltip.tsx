import { Pen } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { DataTypes } from "@/types/global";
import { Button } from "../ui/button";
import { useModalStore } from "@/lib/store/modal.store";
import { useLocale, useTranslations } from "next-intl";

const UpdateTooltip = <T extends DataTypes | any>({
  onClick,
  oldData,
  id,
}: {
  onClick?: () => void;
  oldData?: T;
  id?: number;
}) => {
  const t = useTranslations();
  const { openModal } = useModalStore();
  return (
    <Tooltip>
      <TooltipTrigger
        className="w-full"
        onClick={
          onClick
            ? onClick
            : () => {
                openModal({ type: "update", id, modalData: oldData });
              }
        }>
        <Button className="w-full" variant={"secondary"}>
          <Pen />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{t("tooltip.update")}</TooltipContent>
    </Tooltip>
  );
};

export default UpdateTooltip;
