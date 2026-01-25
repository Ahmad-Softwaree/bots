import { getLocale } from "next-intl/server";
import { TAGs } from "../enums";
import { isFileForm, buildFormData } from "../functions";

const baseURL = process.env.NEXT_PUBLIC_APP_URL || "/";

type FetchOptions = {
  tags?: TAGs[];
  revalidate?: number | false;
  headers?: Record<string, string>;
};

const getHeaders = async (options?: FetchOptions, isFormData?: boolean) => {
  const locale = await getLocale();

  const headers: Record<string, string> = {
    "Content-Type": isFormData ? "" : "application/json",
    "x-locale": locale,
    ...options?.headers,
  };
  return headers;
};

export async function get<T = any>(
  path: string,
  options?: FetchOptions
): Promise<T> {
  const response = await fetch(`${baseURL}${path}`, {
    method: "GET",
    headers: await getHeaders(options),
    next: options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: response.statusText,
      statusCode: response.status,
    }));
    // Return error object instead of throwing - Server Actions need serializable data
    return {
      __isError: true,
      ...error,
      statusCode: error.statusCode || response.status,
    } as any;
  }

  return response.json();
}

export async function post<T = any>(
  path: string,
  data?: any,
  options?: FetchOptions
): Promise<T> {
  const hasFiles = isFileForm(data);
  const formData = hasFiles ? buildFormData(data) : data;
  const isFormDataInstance = formData instanceof FormData;

  const response = await fetch(`${baseURL}${path}`, {
    method: "POST",
    headers: await getHeaders(options, isFormDataInstance),
    body: isFormDataInstance
      ? formData
      : formData
      ? JSON.stringify(formData)
      : undefined,
    next: options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: response.statusText,
      statusCode: response.status,
    }));
    // Return error object instead of throwing - Server Actions need serializable data
    return {
      __isError: true,
      ...error,
      statusCode: error.statusCode || response.status,
    } as any;
  }

  return response.json();
}

export async function update<T = any>(
  path: string,
  data?: any,
  options?: FetchOptions
): Promise<T> {
  const hasFiles = isFileForm(data);
  const formData = hasFiles ? buildFormData(data) : data;
  const isFormDataInstance = formData instanceof FormData;

  const response = await fetch(`${baseURL}${path}`, {
    method: "PUT",
    headers: await getHeaders(options, isFormDataInstance),
    body: isFormDataInstance
      ? formData
      : formData
      ? JSON.stringify(formData)
      : undefined,
    next: options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: response.statusText,
      statusCode: response.status,
    }));
    // Return error object instead of throwing - Server Actions need serializable data
    return {
      __isError: true,
      ...error,
      statusCode: error.statusCode || response.status,
    } as any;
  }

  return response.json();
}

export async function del<T = any>(
  path: string,
  id: string | number,
  options?: FetchOptions
): Promise<T> {
  const response = await fetch(`${baseURL}${path}/${id}`, {
    method: "DELETE",
    headers: await getHeaders(options),
    next: options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: response.statusText,
      statusCode: response.status,
    }));
    // Return error object instead of throwing - Server Actions need serializable data
    return {
      __isError: true,
      ...error,
      statusCode: error.statusCode || response.status,
    } as any;
  }

  return response.json();
}
