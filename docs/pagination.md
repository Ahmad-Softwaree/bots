# Pagination Standards

**Last Updated**: January 6, 2026  
**Version**: 1.0.0

## 📋 Overview

This document defines pagination standards for the Link Shortener application. All paginated data uses a **generic DataBox component** with **card-based displays** and **manual pagination controls**.

## 🎯 Core Principles

- **DataBox Component**: Single reusable component for all paginated data
- **Card Display**: Use card components (NO TanStack Table in this project)
- **Manual Pagination**: Page-based navigation with limit controls
- **URL State Management**: nuqs for page/limit/search parameters
- **Type Safety**: Full TypeScript support with generics
- **Consistent UX**: Unified loading, empty, and error states

## 📦 Dependencies

```bash
# React Query for data fetching (already installed)
bun add @tanstack/react-query

# nuqs for URL state management (already installed)
bun add nuqs

# shadcn/ui components (already installed)
```

## 🏗️ Component Structure

### File Organization

```
components/
  table/
    data-box.tsx                # Generic pagination component
  shared/
    PaginationControls.tsx      # Pagination controls (prev/next/pages/limit)
    NoData.tsx                  # Empty state component
    QueryErrorBoundary.tsx      # Error boundary for queries
  cards/
    LinkCard.Simple.tsx         # Card component for displaying items

hooks/
  usePaginationQueries.tsx     # Pagination URL params (page, limit)
  useSearchQuery.tsx            # Search URL params
  useBotsQueries.tsx            # Bot-specific filter params (status)

lib/
  config/
    pagination.config.ts        # Pagination config (cookie management)
```

## 🔧 Implementation Patterns

### 1. DataBox Component (`components/table/data-box.tsx`)

**Generic component that handles:**

- Loading states
- Empty states
- Card grid layout
- Pagination controls (top and bottom)

```typescript
"use client";

import React from "react";
import { DataTypes } from "@/types/global";
import NoData from "../shared/NoData";
import { PaginationControls } from "../shared/PaginationControls";
import type { UseQueryResult } from "@tanstack/react-query";
import type { PaginationResult } from "@/lib/react-query/actions/links.action";

interface DataBoxProps<T> {
  Component: React.ComponentType<T>;
  queryFn: () => UseQueryResult<PaginationResult<T>>;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  currentPage: number;
  limit: number;
}

export function DataBox<T extends DataTypes>({
  queryFn,
  Component,
  onPageChange,
  onLimitChange,
  currentPage,
  limit,
}: DataBoxProps<T>) {
  const { data, isLoading } = queryFn();

  const items = data?.data || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-48 bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return <NoData />;
  }

  return (
    <div className="w-full space-y-4">
      {total > 0 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          limit={limit}
          total={total}
          onPageChange={onPageChange}
          onLimitChange={onLimitChange}
        />
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((val: T, i: number) => (
          <Component key={i} {...val} />
        ))}
      </div>

      {total > 0 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          limit={limit}
          total={total}
          onPageChange={onPageChange}
          onLimitChange={onLimitChange}
        />
      )}
    </div>
  );
}
```

**Key Features:**

- ✅ Generic type `<T>` for any data type
- ✅ Loading skeleton with 6 placeholder cards
- ✅ Empty state when no data
- ✅ Grid layout (2 cols on md, 3 cols on lg)
- ✅ Pagination controls at top AND bottom
- ✅ Accepts query result function (not direct data)

### 2. Pagination Controls (`components/shared/PaginationControls.tsx`)

**Component that provides:**

- Current page info ("Showing X-Y of Z")
- Limit selector dropdown
- Page navigation (prev/next/numbered pages)

```typescript
"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
};

const LIMIT_OPTIONS = [50, 100, 150, 200];

export function PaginationControls({
  currentPage,
  totalPages,
  limit,
  total,
  onPageChange,
  onLimitChange,
}: PaginationControlsProps) {
  const t = useTranslations("pagination");

  const startItem = currentPage * limit + 1;
  const endItem = Math.min((currentPage + 1) * limit, total);

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 2) {
        pages.push(0, 1, 2, "ellipsis", totalPages - 1);
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          0,
          "ellipsis",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1
        );
      } else {
        pages.push(
          0,
          "ellipsis",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "ellipsis",
          totalPages - 1
        );
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="hidden sm:inline">
          {t("showing")} {startItem}-{endItem} {t("of")} {total} {t("links")}
        </span>
        <span className="sm:hidden">
          {startItem}-{endItem} / {total}
        </span>
        <Select
          value={limit.toString()}
          onValueChange={(value) => onLimitChange(Number(value))}>
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {LIMIT_OPTIONS.map((option) => (
              <SelectItem key={option} value={option.toString()}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(Math.max(0, currentPage - 1))}
              className={
                currentPage === 0
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {pageNumbers.map((pageNum, idx) =>
            pageNum === "ellipsis" ? (
              <PaginationItem key={`ellipsis-${idx}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  onClick={() => onPageChange(pageNum)}
                  isActive={currentPage === pageNum}
                  className="cursor-pointer">
                  {pageNum + 1}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                onPageChange(Math.min(totalPages - 1, currentPage + 1))
              }
              className={
                currentPage >= totalPages - 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
```

**Key Features:**

- ✅ Smart page number display with ellipsis
- ✅ Limit selector with predefined options (50, 100, 150, 200)
- ✅ Showing "X-Y of Z items" info
- ✅ Responsive (mobile shows condensed view)
- ✅ Internationalized (i18n)
- ✅ Disabled prev/next when at boundaries

### 3. URL Parameter Hooks (`hooks/`)

**Individual hooks using nuqs for type-safe URL state:**

#### usePaginationQuery.tsx

```typescript
"use client";

import { useQueryStates, parseAsInteger } from "nuqs";

export function usePaginationQuery() {
  return useQueryStates({
    page: parseAsInteger.withDefault(0).withOptions({
      shallow: false,
    }),
    limit: parseAsInteger.withDefault(0).withOptions({
      shallow: false,
    }),
  });
}

export type PaginationQueryParams = ReturnType<typeof usePaginationQuery>[0];
```

#### useSearchQuery.tsx

```typescript
"use client";

import { useQueryStates, parseAsString } from "nuqs";

export function useSearchQuery() {
  return useQueryStates({
    search: parseAsString.withDefault("").withOptions({
      shallow: false,
    }),
  });
}

export type SearchQueryParams = ReturnType<typeof useSearchQuery>[0];
```

#### useBotsQueries.tsx

```typescript
"use client";

importSeparate hooks**: Each hook manages specific URL parameters
- ✅ **Type-safe**: TypeScript types exported for each hook
- ✅ **Shallow routing**: Uses `shallow: false` for proper navigation
- ✅ **Default values**: page=0, limit=0 (or empty), search=""
- ✅ **Composable**: Use multiple hooks together for complex filteringve", "down"])
      .withDefault("all")
      .withOptions({
        shallow: false,
      }),
  });
}

export type BotsQueryParams = ReturnType<typeof useBotsQueries>[0];
```

**Key Features:**

- ✅ **Page**: 0-based index (page 0 = first page)
- ✅ **Limit**: Stored in cookie, synced to URL
- ✅ **Search**: Empty string by default
- ✅ **Reset to page 0** when changing limit or search
- ✅ Cookies persist user's limit preference

### 4. Pagination Config (`lib/config/pagination.config.ts`)

**Cookie management for limit preference:**

```typescript
import { getCookie, setCookie } from "./cookie.config";

const LIMIT_COOKIE_NAME = "pagination_limit";
const VALID_LIMITS = [50, 100, 150, 200] as const;
const DEFAULT_LIMIT = 100;

export const getLimitFromCookie = (): number => {
  const cookieValue = getCookie(LIMIT_COOKIE_NAME);
  if (!cookieValue) return DEFAULT_LIMIT;

  const parsedLimit = parseInt(cookieValue, 10);

  if (VALID_LIMITS.includes(parsedLimit as any)) {
    return parsedLimit;
  }

  return DEFAULT_LIMIT;
};

export const setLimitCookie = (limit: number): void => {
  if (VALID_LIMITS.includes(limit as any)) {
    setCookie(LIMIT_COOKIE_NAME, limit.toString(), 30);
  }
};
```

## 🎨 Usage in Pages

### Complete Page Example

```typescript
// app/dashboard/page.tsx
"use client";

import { DataBox } from "@/components/table/data-box";
import type { Bot } from "@/lib/db/schema";
import { BotCard } from "@/components/cards/BotCard";
import { useBotsInfinite } from "@/lib/react-query/queries/bot.query";
import { usePaginationQuery } from "@/hooks/usePaginationQuery";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import { useBotsQueries } from "@/hooks/useBotsQueries";

export default function BotsPage() {
  const [{ page, limit }] = usePaginationQuery();
  const [{ search }] = useSearchQuery();
  const [{ status }] = useBotsQueries();

  const queryResult = useBotsInfinite({ page, limit, search, status });
  };

  return (
    <Page search={true} parameters={[]} statusCards={false} extraFilter={false}>
      <QueryErrorBoundary>
        <DataBox<Link>
          queryFn={() => queryResult}
          Component={SimpleLinkCard}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
          currentPage={queries.page}
          limit={queries.limit}
        />
      </QueryErrorBoundary>
    </Page>
  );
}
```

**Flow:**

1. ✅ `usePaginationQuery`, `useSearchQuery`, `useBotsQueries` get params from URL
2. ✅ `useGetLinks` fetches data with those parameters
3. ✅ `DataBox` renders cards with pagination controls
4. ✅ `handlePageChange` updates URL (triggers refetch)
5. ✅ `handleLimitChange` updates URL + cookie (triggers refetch)

## 📊 Server Action Pattern

Server actions MUST support pagination:

```typescript
export const getLinks = async (
  userId: string,
  queries?: QueryParam
): Promise<PaginationResult<Link>> => {
  const page = Number(queries?.page) || 0;
  const limit = Number(queries?.limit) || 100;
  const search = (queries?.search as string) || "";

  const offset = page * limit;

  const [data, totalResult] = await Promise.all([
    db
      .select()
      .from(links)
      .where(/* conditions */)
      .orderBy(desc(links.createdAt))
      .limit(limit)
      .offset(offset),
    db
      .select({ count: sql<number>`count(*)::int` })
      .from(links)
      .where(/* same conditions */),
  ]);

  const total = totalResult[0]?.count || 0;

  return {
    data,
    total,
    hasMore: offset + data.length < total,
  };
};
```

## 🚫 Common Mistakes

❌ **DON'T use 1-based page indexing:**

```typescript
const page = Number(queries?.page) || 1;
```

❌ **DON'T use infinite scroll (this project uses manual pagination):**

```typescript
const { fetchNextPage } = useInfiniteQuery(/* ... */);
```

❌ **DON'T use TanStack Table (this project uses cards):**

```typescript
import { useReactTable } from "@tanstack/react-table";
```

❌ **DON'T forget to pass both handlers:**

```typescript
<DataBox queryFn={() => queryResult} Component={SimpleLinkCard} />
```

❌ **DON'T manage page state locally:**

```typescript
const [page, setPage] = useState(0);
```

## ✅ Best Practices

- ✅ **0-based page indexing** (page 0 = first page)
- ✅ **Cookie for limit preference** (persists across sessions)
- ✅ **Reset to page 0** when changing filters or limit
- ✅ **URL as single source of truth** for pagination state
- ✅ **Parallel queries** for data + count in server actions
- ✅ **Loading skeletons** matching the grid layout
- ✅ **Pagination controls** at both top and bottom
- ✅ **Generic DataBox** for all paginated data
- ✅ **Card-based display** (no tables)
- ✅ **Type-safe** with generics

## 📋 Pagination Limits

Valid limit options (defined in `PaginationControls.tsx`):

- 50 items per page
- 100 items per page (default)
- 150 items per page
- 200 items per page

## 🎯 Summary

**This project uses:**

- ✅ Manual pagination (NOT infinite scroll)
- ✅ Card displays (NOT tables)
- ✅ DataBox component (generic, reusable)
- ✅ nuqs for URL state (page, limit, search)
- ✅ Cookies for limit preference
- ✅ 0-based page indexing
- ✅ PaginationControls at top and bottom
- ✅ Smart page number display with ellipsis
- ✅ Responsive design
