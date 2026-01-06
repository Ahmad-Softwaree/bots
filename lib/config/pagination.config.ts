/**
 * Pagination configuration and cookie management
 */

import { getCookie, setCookie } from "./cookie.config";

const LIMIT_COOKIE_NAME = "pagination_limit";
const DEFAULT_LIMIT = 100;

/**
 * Get limit value from cookie or return default
 */
export function getLimitFromCookie(): number {
  const savedLimit = getCookie(LIMIT_COOKIE_NAME);
  return savedLimit ? parseInt(savedLimit, 10) : DEFAULT_LIMIT;
}

/**
 * Save limit value to cookie
 */
export function setLimitCookie(limit: number): void {
  setCookie(LIMIT_COOKIE_NAME, limit.toString());
}
