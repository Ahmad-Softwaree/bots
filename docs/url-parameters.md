# URL Parameter Handling - nuqs with Specific Hooks

**Last Updated**: January 24, 2026  
**Version**: 2.0.0

**🚨 CRITICAL:** ALWAYS use **individual hooks** (`usePaginationQuery`, `useSearchQuery`, `useBotsQueries`) for managing URL parameters.  
**NEVER use raw `searchParams`, `useSearchParams`, or manual URL manipulation.**

## 📋 Overview

This project uses **[nuqs](https://nuqs.47ng.com/)** for type-safe URL state management through **specific, focused hooks** that each manage a distinct set of URL parameters.

## 🎯 Core Principles

1. **Specific hooks for specific purposes** - Separate hooks for pagination, search, and filters
2. **Type-safe parameters** - Automatic parsing with `parseAsInteger`, `parseAsString`, `parseAsStringEnum`
3. **Automatic URL sync** - State changes automatically update the URL
4. **Composable** - Use multiple hooks together for complex state
5. **Server & Client compatibility** - Works in both environments
6. **Integration with React Query** - URL params drive query keys for data fetching

## 📦 Installation

```bash
# nuqs is already installed in this project
bun add nuqs
```

## 🔧 Architecture

```
Page Component
  ↓
Individual Hooks (usePaginationQuery, useSearchQuery, useBotsQueries)
  ↓
nuqs (useQueryStates)
  ↓
URL Parameters (page, limit, search, status)
  ↓
React Query (useBots)
  ↓
Server Action (getBots)
```

## 🎯 The Individual Hooks

**🚨 ALWAYS use these specific hooks. DO NOT use nuqs directly or create generic hooks.**

### Hook 1: `usePaginationQuery`

**Purpose:** Manage page and limit URL parameters

**Location:** `hooks/usePaginationQueries.tsx`

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

**Return Value:**

- `[{page, limit}, setQueries]` - Tuple with state and setter

**Default Values:**

- `page`: `0` (0-based indexing)
- `limit`: `0` (or configured default)

### Hook 2: `useSearchQuery`

**Purpose:** Manage search URL parameter

**Location:** `hooks/useSearchQuery.tsx`

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

**Return Value:**

- `[{search}, setSearch]` - Tuple with state and setter

**Default Values:**

- `search`: `""` (empty string)

### Hook 3: `useBotsQueries`

**Purpose:** Manage bot-specific filter parameters (status)

**Location:** `hooks/useBotsQueries.tsx`

```typescript
"use client";

import { useQueryStates, parseAsStringEnum } from "nuqs";

export function useBotsQueries() {
  return useQueryStates({
    status: parseAsStringEnum(["all", "active", "down"])
      .withDefault("all")
      .withOptions({
        shallow: false,
      }),
  });
}

export type BotsQueryParams = ReturnType<typeof useBotsQueries>[0];
```

**Return Value:**

- `[{status}, setStatus]` - Tuple with state and setter

**Default Values:**

- `status`: `"all"` (enum: "all" | "active" | "down")

## 📝 Usage Patterns

### Pattern 1: Basic Pagination in DataBox Component

```typescript
// components/table/data-box.tsx
"use client";

import { usePaginationQuery } from "@/hooks/usePaginationQuery";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import { useBotsQueries } from "@/hooks/useBotsQueries";

export function DataBox<T>({ queryFn, Component }: DataBoxProps<T>) {
  const [{ page, limit }] = usePaginationQuery();
  const [{ search }] = useSearchQuery();
  const [{ status }] = useBotsQueries();

  const queryResult = queryFn();

  // Pagination controls will automatically update URL
  return (
    <div>
      {/* Display cards */}
      <PaginationControls
        currentPage={page}
        limit={limit}
        total={queryResult.data?.total || 0}
      />
    </div>
  );
}
```

**Key Points:**

- ✅ Destructure specific parameters from each hook
- ✅ Each hook returns a tuple `[state, setState]`
- ✅ URL automatically syncs with state changes

### Pattern 2: Page Component with Multiple Hooks

```typescript
// app/[locale]/bots/page.tsx
"use client";

import { usePaginationQuery } from "@/hooks/usePaginationQuery";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import { useBotsQueries } from "@/hooks/useBotsQueries";
import { useBotsInfinite } from "@/lib/react-query/queries/bot.query";

export default function BotsPage() {
  const [{ page, limit }] = usePaginationQuery();
  const [{ search }] = useSearchQuery();
  const [{ status }] = useBotsQueries();

  const queryResult = useBotsInfinite({
    page,
    limit,
    search,
    status,
  });

  return <DataBox queryFn={() => queryResult} Component={BotCard} />;
}
```

**Key Points:**

- ✅ Use all three hooks together for complex filtering
- ✅ Pass individual params to React Query hooks
- ✅ Each hook manages its own URL parameters

### Pattern 3: Search Component

```typescript
// components/shared/Search.tsx
"use client";

import { useSearchQuery } from "@/hooks/useSearchQuery";
import { usePaginationQuery } from "@/hooks/usePaginationQuery";

export function Search() {
  const [{ search }, setSearch] = useSearchQuery();
  const [_, setPagination] = usePaginationQuery();

  const handleSearch = (value: string) => {
    setSearch({ search: value });
    // Reset to page 0 when searching
    setPagination({ page: 0 });
  };

  return (
    <input
      value={search}
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

**Key Points:**

- ✅ Reset page to 0 when search changes
- ✅ Use setter from destructured tuple
- ✅ Multiple hooks work independently

### Pattern 4: Filter Modal Component

```typescript
// components/shared/FilterModal.tsx
"use client";

import { useBotsQueries } from "@/hooks/useBotsQueries";
import { usePaginationQuery } from "@/hooks/usePaginationQuery";

export function FilterModal() {
  const [{ status }, setStatus] = useBotsQueries();
  const [_, setPagination] = usePaginationQuery();

  const handleStatusChange = (newStatus: "all" | "active" | "down") => {
    setStatus({ status: newStatus });
    // Reset to page 0 when filter changes
    setPagination({ page: 0 });
  };

  return (
    <Select value={status} onValueChange={handleStatusChange}>
      <SelectItem value="all">All</SelectItem>
      <SelectItem value="active">Active</SelectItem>
      <SelectItem value="down">Down</SelectItem>
    </Select>
  );
}
```

**Key Points:**

- ✅ Use bot-specific hook for status filter
- ✅ Reset page when filter changes
- ✅ Type-safe enum values

### Pattern 5: Integration with React Query

```typescript
// lib/react-query/queries/bot.query.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { getBots } from "@/lib/react-query/actions/bot.action";

export function useBotsInfinite({
  page,
  limit,
  search,
  status,
}: {
  page: number;
  limit: number;
  search?: string;
  status?: string;
}) {
  return useInfiniteQuery({
    queryKey: ["bots", "infinite", page, limit, search, status],
    queryFn: ({ pageParam = 0 }) =>
      getBots({
        page: pageParam,
        limit,
        search,
        status,
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length : undefined;
    },
  });
}
```

**Key Points:**

- ✅ URL params become part of query key
- ✅ Query refetches automatically when URL changes
- ✅ Type-safe with destructured parameters

### Pattern 6: Server Action Integration

```typescript
// lib/react-query/actions/bot.action.ts
"use server";

export const getBots = async ({
  page = 0,
  limit = 30,
  search = "",
  status = "all",
}: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}) => {
  const offset = page * limit;

  const whereConditions: any[] = [];

  // Search filter
  if (search) {
    whereConditions.push(
      or(
        ilike(bots.name, `%${search}%`),
        ilike(bots.description, `%${search}%`)
      )!
    );
  }

  // Status filter
  if (status !== "all") {
    whereConditions.push(eq(bots.status, status));
  }

  const [data, totalResult] = await Promise.all([
    db
      .select()
      .from(bots)
      .where(and(...whereConditions))
      .orderBy(desc(bots.createdAt))
      .limit(limit)
      .offset(offset),
    db
      .select({ count: sql<number>`count(*)::int` })
      .from(bots)
      .where(and(...whereConditions)),
  ]);

  const total = totalResult[0]?.count || 0;

  return { data, total, hasMore: offset + data.length < total };
};
```

**Key Points:**

- ✅ Extract parameters with defaults
- ✅ Calculate offset from page and limit
- ✅ Apply filters conditionally

## 📊 URL State Flow

### Example URL States

```
Initial load:
?page=0&limit=30&search=&status=all

After search:
?page=0&limit=30&search=telegram&status=all

After page change:
?page=2&limit=30&search=telegram&status=all

After filter change:
?page=0&limit=30&search=telegram&status=active

After limit change:
?page=0&limit=50&search=telegram&status=active
```

### State Transitions

```
1. User types in search
   ↓
   setSearch({ search: "telegram" })
   setPagination({ page: 0 })
   ↓
   URL updates: ?page=0&limit=30&search=telegram&status=all
   ↓
   React Query detects query key change
   ↓
   Refetches data with new params

2. User changes status filter
   ↓
   setStatus({ status: "active" })
   setPagination({ page: 0 })
   ↓
   URL updates: ?page=0&limit=30&search=telegram&status=active
   ↓
   React Query refetches

3. User changes page
   ↓
   setPagination({ page: 2 })
   ↓
   URL updates: ?page=2&limit=30&search=telegram&status=active
   ↓
   React Query refetches
```

## 🚫 Common Mistakes

❌ **DON'T use nuqs directly:**

```typescript
const [search, setSearch] = useQueryState("search"); // ❌
```

❌ **DON'T use useState for URL params:**

```typescript
const [page, setPage] = useState(0); // ❌
```

❌ **DON'T use Next.js searchParams directly:**

```typescript
export default function Page({ searchParams }: { searchParams: any }) {
  const page = searchParams.page; // ❌
}
```

❌ **DON'T forget to reset page when changing filters:**

```typescript
setSearch({ search: "test" }); // ❌ (should also reset page)
```

❌ **DON'T create a generic useAppQuery hook:**

```typescript
function useAppQuery() {
  // ❌ (use specific hooks instead)
  return useQueryStates({ page, limit, search, status });
}
```

## ✅ Best Practices

- ✅ **Use individual hooks** (`usePaginationQuery`, `useSearchQuery`, `useBotsQueries`)
- ✅ **Reset to page 0** when changing search or filters
- ✅ **Destructure only needed params** from each hook
- ✅ **Pass params individually** to React Query hooks
- ✅ **Type-safe** with exported TypeScript types
- ✅ **0-based page indexing** (page 0 = first page)
- ✅ **Shallow routing disabled** for proper navigation
- ✅ **Composable hooks** - use multiple together as needed

## 🔄 Adding New URL Parameters

If you need to add new URL parameters in the future:

### Option 1: Create a New Specific Hook

```typescript
// hooks/useCategoryQuery.tsx
"use client";

import { useQueryStates, parseAsString } from "nuqs";

export function useCategoryQuery() {
  return useQueryStates({
    category: parseAsString.withDefault("all").withOptions({
      shallow: false,
    }),
  });
}

export type CategoryQueryParams = ReturnType<typeof useCategoryQuery>[0];
```

### Option 2: Extend Existing Hook (if related)

```typescript
// hooks/useBotsQueries.tsx
"use client";

import { useQueryStates, parseAsStringEnum, parseAsString } from "nuqs";

export function useBotsQueries() {
  return useQueryStates({
    status: parseAsStringEnum(["all", "active", "down"])
      .withDefault("all")
      .withOptions({
        shallow: false,
      }),
    category: parseAsString.withDefault("all").withOptions({
      shallow: false,
    }),
  });
}

export type BotsQueryParams = ReturnType<typeof useBotsQueries>[0];
```

## 🎯 Summary

**This project uses:**

- ✅ **Three specific hooks**:
  - `usePaginationQuery` - page, limit
  - `useSearchQuery` - search
  - `useBotsQueries` - status (bot-specific filters)
- ✅ **Focused responsibility** - Each hook manages specific parameters
- ✅ **Type-safe** with TypeScript
- ✅ **Automatic URL synchronization**
- ✅ **Integration with React Query**
- ✅ **Composable** - Use multiple hooks together
- ✅ **0-based page indexing**

**DO NOT use:**

- ❌ Direct nuqs hooks (`useQueryState`, etc.)
- ❌ useState for URL parameters
- ❌ Next.js searchParams directly
- ❌ Generic `useAppQuery` or `useAppQueryParams` hook
- ❌ Manual URL manipulation

## 📚 Related Documentation

- [Pagination Standards](./pagination.md) - DataBox component and pagination controls
- [Data Fetching](./data-fetching.md) - TanStack Query integration
- [AGENTS.md](../AGENTS.md) - Project-wide coding standards

---

**Last Updated**: January 24, 2026  
**Maintainer**: Ahmad-Softwaree
