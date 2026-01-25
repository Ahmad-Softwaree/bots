"use client";

import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { SignedIn, UserButton } from "@clerk/nextjs";

function AuthButton() {
  return (
    <AnimatePresence>
      <motion.button
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: 20 }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className={cn(
          "fixed bottom-8 left-8 z-50",
          "flex items-center justify-center",
          "w-12 h-12 rounded-full",
          "bg-gradient-to-br from-primary to-primary/80",
          "text-primary-foreground",
          "shadow-lg hover:shadow-xl",
          "border border-primary/20",
          "transition-shadow duration-300",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          "group"
        )}
        aria-label="Scroll to top">
        <SignedIn>
          <UserButton />
        </SignedIn>
      </motion.button>
    </AnimatePresence>
  );
}

export default AuthButton;
