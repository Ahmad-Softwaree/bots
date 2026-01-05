import Link from "next/link";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { URLS } from "@/lib/constants/urls";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" flex h-16  items-center justify-between">
        <Link href={URLS.HOME} className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Telegram Bots</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href={URLS.HOME}
            className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link
            href={URLS.BOTS}
            className="text-sm font-medium transition-colors hover:text-primary">
            All Bots
          </Link>
          <Button asChild>
            <a
              href="https://github.com/Ahmad-Softwaree"
              target="_blank"
              rel="noopener noreferrer">
              GitHub
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
