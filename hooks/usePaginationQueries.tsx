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
