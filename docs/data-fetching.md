# Data Fetching - TanStack Query & Neon Database

## Overview

This application fetches data from a **Neon database** in a read-only manner using **Drizzle ORM**. It uses **TanStack Query** for efficient data management, caching, and infinite pagination. All data fetching is organized with action files, query hooks, centralized URLs, and query keys.

## Core Principles

- ✅ **Drizzle ORM** - Database queries with type-safe ORM
- ✅ **Read-only operations** - No add/update/delete functionality
- ✅ **No authentication required** - Landing page displays public data
- ✅ **TanStack Query for all data operations**
- ✅ **Separate action file per database table**
- ✅ **Centralized URL and query key management**
- ✅ **Three query patterns per table**: limited, infinite, specific
- ❌ **NO inline database queries in components**
- ❌ **NO hardcoded URLs or query keys**

## Environment Setup

Ensure `.env.local` contains the Neon database connection string:

```env
DATABASE_URL="postgresql://..."
```

## Folder Structure

```
lib/
├── actions/               # Server actions for data fetching
│   ├── bot-actions.ts     # Bot table actions
│   ├── user-actions.ts    # User table actions
│   └── stats-actions.ts   # Stats table actions
│
├── queries/               # TanStack Query hooks
│   ├── use-bot-queries.ts
│   ├── use-user-queries.ts
│   └── use-stats-queries.ts
│
├── constants/
│   ├── urls.ts           # Centralized URL constants
│   └── query-keys.ts     # Centralized query keys (enum)
│
└── db/
    ├── client.ts         # Drizzle database client
    └── schema.ts         # Drizzle schema definitions
```

## URL Management

All URLs must be defined in a single constants file:

**`lib/constants/urls.ts`**

```typescript
export const API_URLS = {
  BOTS: {
    LIST: "/api/bots",
    DETAIL: (id: string) => `/api/bots/${id}`,
  },
  USERS: {
    LIST: "/api/users",
    DETAIL: (id: string) => `/api/users/${id}`,
  },
  // Add more as needed
} as const;
```

## Query Keys

All query keys must be defined in an enum for type safety:

**`lib/constants/query-keys.ts`**

```typescript
export enum QueryKeys {
  // Bot queries
  BOTS_LIMITED = "bots-limited",
  BOTS_INFINITE = "bots-infinite",
  BOT_DETAIL = "bot-detail",

  // User queries
  USERS_LIMITED = "users-limited",
  USERS_INFINITE = "users-infinite",
  USER_DETAIL = "user-detail",

  // Add more as needed
}
```

## Action Files (Server Actions)

Each table gets its own action file with three functions:

**`lib/actions/bot-actions.ts`**

```typescript
"use server";

import { db } from "@/lib/db/client";
import { bots } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";

// Fetch limited data (30 items)
export async function getBots(limit: number = 30) {
  const result = await db
    .select()
    .from(bots)
    .orderBy(desc(bots.createdAt))
    .limit(limit);
  return result;
}

// Fetch for infinite pagination
export async function getBotsInfinite({
  pageParam = 0,
  limit = 30,
}: {
  pageParam?: number;
  limit?: number;
}) {
  const result = await db
    .select()
    .from(bots)
    .orderBy(desc(bots.createdAt))
    .limit(limit)
    .offset(pageParam * limit);

  return {
    data: result,
    nextPage: result.length === limit ? pageParam + 1 : undefined,
  };
}

// Fetch specific item by ID
export async function getBotById(id: string) {
  const result = await db.select().from(bots).where(eq(bots.id, id)).limit(1);
  return result[0] ?? null;
}
```

## Query Hooks (TanStack Query)

Each table gets its own query hooks file with three hooks:

**`lib/queries/use-bot-queries.ts`**

```typescript
"use client";

import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  getBots,
  getBotsInfinite,
  getBotById,
} from "@/lib/actions/bot-actions";
import { QueryKeys } from "@/lib/constants/query-keys";

// Limited data query (30 items)
export function useBotsLimited(limit: number = 30) {
  return useQuery({
    queryKey: [QueryKeys.BOTS_LIMITED, limit],
    queryFn: () => getBots(limit),
  });
}

// Infinite pagination query
export function useBotsInfinite(limit: number = 30) {
  return useInfiniteQuery({
    queryKey: [QueryKeys.BOTS_INFINITE, limit],
    queryFn: ({ pageParam }) => getBotsInfinite({ pageParam, limit }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
}

// Specific item query
export function useBotById(id: string) {
  return useQuery({
    queryKey: [QueryKeys.BOT_DETAIL, id],
    queryFn: () => getBotById(id),
    enabled: !!id,
  });
}
```

## Usage in Components

**Limited Data:**

```typescript
import { useBotsLimited } from "@/lib/queries/use-bot-queries";

export function BotsList() {
  const { data: bots, isLoading, error } = useBotsLimited(30);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading bots</div>;

  return (
    <div>
      {bots?.map((bot) => (
        <BotCard key={bot.id} bot={bot} />
      ))}
    </div>
  );
}
```

**Infinite Pagination:**

```typescript
import { useBotsInfinite } from "@/lib/queries/use-bot-queries";

export function BotsInfiniteList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useBotsInfinite(30);

  return (
    <div>
      {data?.pages.map((page, i) => (
        <div key={i}>
          {page.data.map((bot) => (
            <BotCard key={bot.id} bot={bot} />
          ))}
        </div>
      ))}

      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}
```

**Specific Item:**

```typescript
import { useBotById } from "@/lib/queries/use-bot-queries";

export function BotDetail({ id }: { id: string }) {
  const { data: bot, isLoading } = useBotById(id);

  if (isLoading) return <div>Loading...</div>;
  if (!bot) return <div>Bot not found</div>;

  return <div>{bot.name}</div>;
}
```

## Checklist for New Table

When adding a new table:

1. ✅ Create action file in `lib/actions/[table]-actions.ts`

   - Limited fetch function
   - Infinite pagination function
   - Specific item fetch function

2. ✅ Create query hooks file in `lib/queries/use-[table]-queries.ts`

   - `use[Table]Limited` hook
   - `use[Table]Infinite` hook
   - `use[Table]ById` hook

3. ✅ Add query keys to `lib/constants/query-keys.ts`

   - `[TABLE]_LIMITED`
   - `[TABLE]_INFINITE`
   - `[TABLE]_DETAIL`

4. ✅ Add URLs to `lib/constants/urls.ts` (if needed)

## Notes

- All database queries are **server actions** (marked with `'use server'`)
- All query hooks are **client-side** (marked with `'use client'`)
- Use TanStack Query's built-in caching and refetching features
- Error handling is built into TanStack Query
- No mutations needed - this is a read-only application
