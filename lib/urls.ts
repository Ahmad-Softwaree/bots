export const URLS = {
  HOME: "/",
  BOTS: "/bots",
  BOT_DETAIL: (id: string) => `/bots/${id}`,
  ADMIN_DASHBOARD: "/admin/dashboard",
} as const;
