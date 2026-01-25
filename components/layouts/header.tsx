"use client";

import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LangToggle } from "../lang-toggle";
import { useTranslations } from "next-intl";
import {
  MotionInteractive,
  HeaderSlideMotion,
  FloatingIconMotion,
} from "../shared/animate";
import { ThemeToggle } from "../theme-toggle";
import { Link } from "@/i18n/navigation";

export function Header() {
  const t = useTranslations("header");

  return (
    <HeaderSlideMotion className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href={"/"} className="flex items-center gap-2 shrink-0">
            <FloatingIconMotion>
              <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </FloatingIconMotion>
            <span className="text-sm sm:text-base md:text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent whitespace-nowrap">
              {t("logo_text")}
            </span>
          </Link>

          <nav className="flex items-center gap-1 sm:gap-2 md:gap-4">
            <MotionInteractive className="hidden md:block">
              <Link
                href={"/"}
                className="text-sm font-medium transition-colors hover:text-violet-600">
                {t("home")}
              </Link>
            </MotionInteractive>
            <MotionInteractive>
              <Link
                href={"/bots"}
                className="text-xs sm:text-sm font-medium transition-colors hover:text-violet-600 px-2">
                {t("bots")}
              </Link>
            </MotionInteractive>
            <MotionInteractive className="hidden sm:block">
              <Button
                asChild
                size="sm"
                className="english_font text-xs sm:text-sm bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
                <Link
                  href="https://github.com/Ahmad-Softwaree"
                  target="_blank"
                  rel="noopener noreferrer">
                  {t("github_link")}
                </Link>
              </Button>
            </MotionInteractive>

            <div className="flex items-center gap-0.5 sm:gap-1 border-l border-border/40 pl-1 sm:pl-2 ml-1 sm:ml-2">
              <ThemeToggle />
              <LangToggle />
            </div>
          </nav>
        </div>
      </div>
    </HeaderSlideMotion>
  );
}
