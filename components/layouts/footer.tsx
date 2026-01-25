"use client";

import { Bot, Github } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  SlideUp,
  FloatingIconMotion,
  SlideMotion,
} from "@/components/shared/animate";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="py-12">
        <SlideUp>
          <div className="grid gap-8 md:grid-cols-4">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link href={"/"} className="flex items-center gap-2 mb-4">
                <FloatingIconMotion>
                  <Bot className="h-6 w-6 text-primary" />
                </FloatingIconMotion>
                <span className="text-xl font-bold">Telegram Bots</span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-md">
                {t("brand_description")}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">{t("quick_links")}</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <SlideMotion>
                    <Link
                      href={"/"}
                      className="text-muted-foreground hover:text-primary transition-colors">
                      {t("home")}
                    </Link>
                  </SlideMotion>
                </li>
                <li>
                  <SlideMotion>
                    <Link
                      href={"/bots"}
                      className="text-muted-foreground hover:text-primary transition-colors">
                      {t("all_bots")}
                    </Link>
                  </SlideMotion>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="font-semibold mb-4">{t("connect")}</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <SlideMotion>
                    <Link
                      href="https://github.com/Ahmad-Softwaree"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="english_font text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                      <Github className="h-4 w-4" />
                      {t("github")}
                    </Link>
                  </SlideMotion>
                </li>
                <li>
                  <SlideMotion>
                    <Link
                      href="https://ahmad-software.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="english_font text-muted-foreground hover:text-primary transition-colors">
                      Portfolio
                    </Link>
                  </SlideMotion>
                </li>
              </ul>
            </div>
          </div>
        </SlideUp>

        <Separator className="my-8" />

        <div className="flex flex-col gap-2 text-center text-sm text-muted-foreground md:flex-row md:justify-between">
          <p>
            <span className="english_font">© {currentYear} Telegram Bots.</span>{" "}
            {t("rights")}
          </p>
          <p>{t("powered_by")}</p>
        </div>
      </div>
    </footer>
  );
}
