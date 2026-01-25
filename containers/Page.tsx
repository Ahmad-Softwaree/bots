"use client";

import AddButton from "@/components/shared/AddButton";
import Search from "@/components/shared/Search";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Home } from "lucide-react";
import { useTranslations } from "next-intl";
import ActionTooltip from "@/components/shared/ActionTooltip";
import { Link } from "@/i18n/navigation";
import { useModalStore } from "@/lib/store/modal.store";
import { useBotsQueries } from "@/hooks/useBotsQueries";

interface PageProps {
  children?: React.ReactNode;
  parameters?: string[];
  search?: boolean;
}

const Page = ({ children, parameters, search = true }: PageProps) => {
  const { openModal } = useModalStore();
  const t = useTranslations();
  const [{ status }, setBotsQueries] = useBotsQueries();

  const handleAddLink = () => {
    openModal({
      type: "add",
      modalData: {},
    });
  };

  const shouldShowFilterButton = parameters && parameters.length > 0;

  return (
    <div className="px-4 py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-row flex-wrap justify-between w-full gap-5">
          <div className="flex flex-row flex-wrap items-center justify-start gap-3">
            {search && (
              <div className="min-w-[300px]">
                <Search />
              </div>
            )}

            {shouldShowFilterButton && (
              <>
                <ActionTooltip label={t("filter.status")}>
                  <Button
                    onClick={() => openModal({ type: "filter" })}
                    variant="outline"
                    size="icon"
                    className="hover:bg-primary/10 hover:text-primary hover:border-primary transition-all">
                    <SlidersHorizontal className="w-4 h-4" />
                  </Button>
                </ActionTooltip>

                {status && status !== "all" && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setBotsQueries({ status: null });
                    }}>
                    {t("filter.clear")}
                  </Button>
                )}
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            <ActionTooltip label={t("dashboard.return_to_home")}>
              <Button
                asChild
                variant="outline"
                size="icon"
                className="hover:bg-primary/10 hover:text-primary hover:border-primary transition-all">
                <Link href="/">
                  <Home className="w-4 h-4" />
                </Link>
              </Button>
            </ActionTooltip>

            <AddButton onClick={handleAddLink} />
          </div>
        </div>

        <div className="mt-4">
          <h1 className="text-3xl font-bold mb-2">{t("dashboard.title")}</h1>
          <p className="text-muted-foreground mb-6">
            {t("dashboard.description")}
          </p>

          {children}
        </div>
      </div>
    </div>
  );
};

export default Page;
