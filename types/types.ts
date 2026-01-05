/**
 * Paginated response type
 */
export type PaginatedResponse<T> = {
  data: T[];
  nextPage: number | null;
};
