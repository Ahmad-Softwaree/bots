"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { StaggerContainer } from "./animate";

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
      <motion.div
        className="text-center py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <p className="text-muted-foreground">{emptyMessage}</p>
      </motion.div>
    );
  }

  return (
    <>
      <StaggerContainer className={gridClassName}>
        {data.map((item: T) => (
          <div key={item.id}>{renderItem(item)}</div>
        ))}
      </StaggerContainer>

      {hasNextPage && (
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
