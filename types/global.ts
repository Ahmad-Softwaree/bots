import { Bot } from "@/lib/db/schema";

export type { Bot };

export type DataTypes = Bot;

export type PaginationProps = {
  queryFn?: any;
  name?: string;
  tableName?: string;
};

export type GlobalFormProps = {
  state: "insert" | "update";
  onFinalClose?: () => void;
};

export type PaginationResult<T> = {
  data: T[];
  total: number;
  hasMore: boolean;
  totalPages: number;
};

export type CRUDReturn = {
  message: string;
  data?: any;
};

export type QueryParam = {
  page: number;
  limit: number;
  search: string;
  status: "active" | "down" | "all";
};
