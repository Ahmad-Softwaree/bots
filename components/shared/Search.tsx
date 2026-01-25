"use client";

import { Search as SearchIcon, X } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { debounce } from "nuqs";
import { useSearchQuery } from "@/hooks/useSearchQuery";

const Search = ({
  className,
  placeholder,
  ...props
}: React.PropsWithChildren<React.ComponentProps<"input">>) => {
  const t = useTranslations("common");

  const [{ search }, setQueries] = useSearchQuery();

  return (
    <div className="relative w-full">
      <Input
        onChange={(e) =>
          setQueries(
            (prev) => ({
              ...prev,
              search: e.currentTarget.value,
            }),
            {
              limitUrlUpdates:
                e.target.value === "" ? undefined : debounce(500),
            }
          )
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setQueries((prev) => ({
              ...prev,
              search: e.currentTarget.value,
            }));
          }
        }}
        value={search}
        placeholder={placeholder ?? t("search")}
        className={cn(className, "pe-10")}
        type="text"
        {...props}
      />

      {search === "" && (
        <Button
          variant="link"
          className="absolute top-1/2 transform -translate-y-1/2 text-muted-foreground end-0">
          <SearchIcon />
        </Button>
      )}

      {search !== "" && (
        <Button
          onClick={() =>
            setQueries((prev) => ({
              ...prev,
              search: "",
            }))
          }
          variant="ghost"
          className="absolute top-1/2 transform -translate-y-1/2 text-muted-foreground end-0">
          <X />
        </Button>
      )}
    </div>
  );
};

export default Search;
