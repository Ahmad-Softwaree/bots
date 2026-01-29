import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layouts/header";
import { Footer } from "@/components/layouts/footer";
import { Providers } from "./providers";
import { PageTransition } from "@/components/shared/page-transition";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { shadcn } from "@clerk/themes";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Telegram Bots - Daily Life Automation",
  description:
    "Discover powerful Telegram bots designed to automate your daily tasks and enhance productivity.",
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  return (
    <ClerkProvider
      afterSignOutUrl={`/${locale}`}
      signInForceRedirectUrl={`/${locale}/admin/dashboard`}
      appearance={{
        baseTheme: shadcn,
        elements: {
          footerAction: {
            display: "none",
          },
        },
      }}>
      <html
        dir={locale === "en" ? "ltr" : "rtl"}
        lang={locale}
        suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${
            locale == "en"
              ? "english_font"
              : locale == "ar"
              ? "arabic_font"
              : "kurdish_font"
          }  antialiased min-h-screen flex flex-col overflow-x-hidden`}>
          <NextIntlClientProvider>
            <Providers>
              <Header />
              <main className="flex-1 min-h-screen">
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer />
              <ScrollToTop />
            </Providers>
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
