"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { URLS } from "@/lib/urls";
import { motion } from "framer-motion";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../mode-toggle";
import { LangToggle } from "../lang-toggle";
import { useTranslation } from "react-i18next";
import { MotionInteractive } from "../shared/animate";

export function Header() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}>
      <div>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href={URLS.HOME} className="flex items-center gap-2 shrink-0">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}>
              <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </motion.div>
            <span className="text-sm sm:text-base md:text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent whitespace-nowrap">
              {t("header.logo_text")}
            </span>
          </Link>

          <nav className="flex items-center gap-1 sm:gap-2 md:gap-4">
            {!isAdminRoute && (
              <>
                <MotionInteractive className="hidden md:block">
                  <Link
                    href={URLS.HOME}
                    className="text-sm font-medium transition-colors hover:text-violet-600">
                    {t("header.home")}
                  </Link>
                </MotionInteractive>
                <MotionInteractive>
                  <Link
                    href={URLS.BOTS}
                    className="text-xs sm:text-sm font-medium transition-colors hover:text-violet-600 px-2">
                    {t("header.bots")}
                  </Link>
                </MotionInteractive>
                <MotionInteractive className="hidden sm:block">
                  <Button
                    asChild
                    size="sm"
                    className="english_font text-xs sm:text-sm bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
                    <a
                      href="https://github.com/Ahmad-Softwaree"
                      target="_blank"
                      rel="noopener noreferrer">
                      {t("header.github_link")}
                    </a>
                  </Button>
                </MotionInteractive>
              </>
            )}
            {isAdminRoute && (
              <>
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button variant="outline" size="sm">
                      {t("header.sign_in")}
                    </Button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </>
            )}
            <div className="flex items-center gap-0.5 sm:gap-1 border-l border-border/40 pl-1 sm:pl-2 ml-1 sm:ml-2">
              <ModeToggle />
              <LangToggle />
            </div>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
