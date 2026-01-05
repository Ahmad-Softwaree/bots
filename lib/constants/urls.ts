/**
 * Centralized URL constants
 */
export const URLS = {
  HOME: "/",
  BOTS: "/bots",
  BOT_DETAIL: (id: string) => `/bots/${id}`,
} as const;
