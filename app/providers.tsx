"use client";

import { ThemeProvider } from "@/providers/theme-provider";
import LanguageProvider from "@/providers/language-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/themes";
import { QueryProvider } from "@/providers/query-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      afterSignOutUrl={"/"}
      appearance={{
        baseTheme: shadcn,
      }}>
      <QueryProvider>
        <NuqsAdapter>
          <LanguageProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange>
              {children}
            </ThemeProvider>
          </LanguageProvider>
        </NuqsAdapter>
      </QueryProvider>
    </ClerkProvider>
  );
}
