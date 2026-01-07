"use client";

import Link from "next/link";
import { Bot, Github } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { URLS } from "@/lib/urls";
import { SlideUp } from "@/components/shared/animate";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="py-12">
        <SlideUp>
          <div className="grid gap-8 md:grid-cols-4">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link href={URLS.HOME} className="flex items-center gap-2 mb-4">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}>
                  <Bot className="h-6 w-6 text-primary" />
                </motion.div>
                <span className="text-xl font-bold">Telegram Bots</span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-md">
                {t("footer_links.brand_description")}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">
                {t("footer_links.quick_links")}
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}>
                    <Link
                      href={URLS.HOME}
                      className="text-muted-foreground hover:text-primary transition-colors">
                      {t("footer_links.home")}
                    </Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}>
                    <Link
                      href={URLS.BOTS}
                      className="text-muted-foreground hover:text-primary transition-colors">
                      {t("footer_links.all_bots")}
                    </Link>
                  </motion.div>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="font-semibold mb-4">
                {t("footer_links.connect")}
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}>
                    <a
                      href="https://github.com/Ahmad-Softwaree"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="english_font text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                      <Github className="h-4 w-4" />
                      {t("footer_links.github")}
                    </a>
                  </motion.div>
                </li>
                <li>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}>
                    <a
                      href="https://ahmad-software.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="english_font text-muted-foreground hover:text-primary transition-colors">
                      Portfolio
                    </a>
                  </motion.div>
                </li>
              </ul>
            </div>
          </div>
        </SlideUp>

        <Separator className="my-8" />

        <div className="flex flex-col gap-2 text-center text-sm text-muted-foreground md:flex-row md:justify-between">
          <p>
            © {currentYear} Telegram Bots. {t("footer.rights")}
          </p>
          <p>{t("cta.powered_by")}</p>
        </div>
      </div>
    </footer>
  );
}
