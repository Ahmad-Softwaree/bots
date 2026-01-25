import { CircleFadingPlus } from "lucide-react";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { useModalStore } from "@/lib/store/modal.store";

const AddButton = ({ onClick }: { onClick?: () => void }) => {
  const t = useTranslations("common");
  const { openModal } = useModalStore();
  return (
    <Button
      title="addForm"
      type="button"
      onClick={onClick ? onClick : () => openModal({ type: "add" })}
      className="flex flex-row cursor-pointer items-center justify-center gap-2 p-2 px-4 text-sm rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all">
      <CircleFadingPlus className="h-5 w-5" />
      <p className="font-semibold">{t("add")}</p>
    </Button>
  );
};

export default AddButton;
