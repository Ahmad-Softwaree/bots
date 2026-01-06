"use client";

import { useTranslation } from "react-i18next";
import { useAppQueryParams } from "@/hooks/useAppQuery";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/lib/store/modal.store";

export function FilterModal() {
  const { t } = useTranslation();
  const { modal, closeModal } = useModalStore();
  const { queries, setQueries } = useAppQueryParams();

  const handleStatusChange = (value: string) => {
    setQueries({ status: value as "all" | "active" | "down", page: 0 });
  };

  const handleClearFilters = () => {
    setQueries({ status: "all", page: 0 });
  };

  return (
    <Dialog open={modal === "filter"} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("filter.status")}</DialogTitle>
          <DialogDescription>{t("dashboard.description")}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="status">{t("bot.status")}</Label>
            <Select
              value={queries.status || "all"}
              onValueChange={handleStatusChange}>
              <SelectTrigger id="status">
                <SelectValue placeholder={t("bot.status")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("dashboard.filter_all")}</SelectItem>
                <SelectItem value="active">
                  {t("dashboard.filter_active")}
                </SelectItem>
                <SelectItem value="down">
                  {t("dashboard.filter_down")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClearFilters}>
              {t("filter.clear")}
            </Button>
            <Button onClick={closeModal}>{t("common.close")}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
