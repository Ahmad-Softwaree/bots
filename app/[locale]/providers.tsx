"use client";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "next-themes";
import { ModalManager } from "@/components/shared/ModalManager";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <NuqsAdapter>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange>
          {children}
          <ModalManager />
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </NuqsAdapter>
    </QueryProvider>
  );
}
