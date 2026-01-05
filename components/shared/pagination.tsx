"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface PaginationProps<T> {
  data: T[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  renderItem: (item: T) => React.ReactNode;
  emptyMessage?: string;
  loadMoreText?: string;
  gridClassName?: string;
}

export function Pagination<T extends { id: string }>({
  data,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  renderItem,
  emptyMessage = "No items available",
  loadMoreText = "Load More",
  gridClassName = "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
}: PaginationProps<T>) {
  if (data.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <>
      <div className={gridClassName}>
        {data.map((item: T) => (
          <div key={item.id}>{renderItem(item)}</div>
        ))}
      </div>

      {hasNextPage && (
        <div className="mt-12 text-center">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            size="lg"
            className="gap-2">
            {isFetchingNextPage ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading...
              </>
            ) : (
              loadMoreText
            )}
          </Button>
        </div>
      )}
    </>
  );
}
