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
