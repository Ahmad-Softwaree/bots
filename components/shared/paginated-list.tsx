"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";
import {
  StaggerContainer,
  MotionInteractive,
  SlideDown,
  SlideUp,
  ContentFadeIn,
} from "./animate";
import { useState, useEffect } from "react";

interface PaginatedListProps<T> {
  // Data from infinite query
  data: T[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  error: Error | null;

  // Functions
  fetchNextPage: () => void;
  renderItem: (item: T) => React.ReactNode;

  // Search props
  onSearchChange?: (search: string) => void;
  searchPlaceholder?: string;
  enableSearch?: boolean;

  // Customization
  title?: string;
  description?: string;
  emptyMessage?: string;
  loadMoreText?: string;
  gridClassName?: string;
}

export function PaginatedList<T extends { id: string }>({
  data,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  error,
  fetchNextPage,
  renderItem,
  onSearchChange,
  searchPlaceholder = "Search...",
  enableSearch = false,
  title,
  description,
  emptyMessage = "No items available",
  loadMoreText = "Load More",
  gridClassName = "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
}: PaginatedListProps<T>) {
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enableSearch && onSearchChange) {
        onSearchChange(searchInput);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput, onSearchChange, enableSearch]);

  if (isLoading) {
    return (
      <div className="py-20">
        {title && (
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              {title}
            </h1>
            {description && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20">
        {title && (
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              {title}
            </h1>
            {description && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}
        <div className="text-center py-20">
          <p className="text-muted-foreground">
            Failed to load data. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20">
      {/* Header Section */}
      {title && (
        <SlideDown className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {description.replace("{count}", data.length.toString())}
            </p>
          )}
        </SlideDown>
      )}

      {/* Search Bar */}
      {enableSearch && (
        <SlideUp className="max-w-md mx-auto mb-8" transition={{ delay: 0.1 }}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={searchPlaceholder}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10"
            />
          </div>
        </SlideUp>
      )}

      {/* Empty State */}
      {data.length === 0 ? (
        <SlideUp className="text-center py-20">
          <p className="text-muted-foreground">
            {searchInput
              ? `No results found for "${searchInput}"`
              : emptyMessage}
          </p>
        </SlideUp>
      ) : (
        <>
          {/* Data Grid */}
          <StaggerContainer className={gridClassName}>
            {data.map((item: T) => (
              <div key={item.id}>{renderItem(item)}</div>
            ))}
          </StaggerContainer>

          {/* Load More Button */}
          {hasNextPage && (
            <ContentFadeIn className="mt-12 text-center">
              <MotionInteractive>
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
              </MotionInteractive>
            </ContentFadeIn>
          )}
        </>
      )}
    </div>
  );
}
