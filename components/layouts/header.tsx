"use client";

import Link from "next/link";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { URLS } from "@/lib/constants/urls";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";

export function Header() {
  const { user } = useUser();
  const isAdmin = user?.id === process.env.NEXT_PUBLIC_ADMIN_USER_ID;

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}>
      <div className=" flex h-16  items-center justify-between">
        <Link href={URLS.HOME} className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}>
            <Bot className="h-6 w-6 text-primary" />
          </motion.div>
          <span className="text-xl font-bold">Telegram Bots</span>
        </Link>

        <nav className="flex items-center gap-6">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={URLS.HOME}
              className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={URLS.BOTS}
              className="text-sm font-medium transition-colors hover:text-primary">
              All Bots
            </Link>
          </motion.div>
          {isAdmin && (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={URLS.ADMIN_DASHBOARD}
                className="text-sm font-medium transition-colors hover:text-primary">
                Dashboard
              </Link>
            </motion.div>
          )}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild>
              <a
                href="https://github.com/Ahmad-Softwaree"
                target="_blank"
                rel="noopener noreferrer">
                GitHub
              </a>
            </Button>
          </motion.div>
        </nav>
      </div>
    </motion.header>
  );
}
