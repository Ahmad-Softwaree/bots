"use client";

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
import { useTranslations } from "next-intl";
import { useBotsQueries } from "@/hooks/useBotsQueries";
import { usePaginationQuery } from "@/hooks/usePaginationQueries";

export function FilterModal() {
  const t = useTranslations("filter");
  const dashboard_t = useTranslations("dashboard");
  const bot_t = useTranslations("bot");
  const common_t = useTranslations("common");
  const { modal, closeModal } = useModalStore();
  const [{ status }, setBotsQueries] = useBotsQueries();
  const [, setPaginationQueries] = usePaginationQuery();

  const handleStatusChange = (value: string) => {
    setBotsQueries({ status: value as "all" | "active" | "down" });
    setPaginationQueries({ page: 0 });
  };

  const handleClearFilters = () => {
    setBotsQueries({ status: "all" });
    setPaginationQueries({ page: 0 });
  };

  return (
    <Dialog open={modal === "filter"} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("status")}</DialogTitle>
          <DialogDescription>{dashboard_t("description")}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="status">{bot_t("status")}</Label>
            <Select value={status || "all"} onValueChange={handleStatusChange}>
              <SelectTrigger id="status">
                <SelectValue placeholder={bot_t("status")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{dashboard_t("filter_all")}</SelectItem>
                <SelectItem value="active">
                  {dashboard_t("filter_active")}
                </SelectItem>
                <SelectItem value="down">
                  {dashboard_t("filter_down")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClearFilters}>
              {t("clear")}
            </Button>
            <Button onClick={closeModal}>{common_t("close")}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
