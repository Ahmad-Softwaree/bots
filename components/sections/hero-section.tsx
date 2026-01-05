import { Button } from "@/components/ui/button";
import { Bot, Sparkles } from "lucide-react";
import Link from "next/link";
import { URLS } from "@/lib/constants/urls";

export function HeroSection() {
  return (
    <section className="  py-20 md:py-28 lg:py-32">
      <div className="flex flex-col items-center gap-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-muted/50 px-4 py-1.5 text-sm">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="font-medium">Automate Your Daily Tasks</span>
        </div>

        <div className="max-w-4xl space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Powerful{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Telegram Bots
            </span>{" "}
            for Everyone
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
            Discover a collection of intelligent Telegram bots designed to
            simplify your life. From productivity to entertainment, find the
            perfect bot for your needs.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg" className="gap-2">
            <Link href={URLS.BOTS}>
              <Bot className="h-5 w-5" />
              Explore All Bots
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a
              href="https://github.com/Ahmad-Softwaree"
              target="_blank"
              rel="noopener noreferrer">
              View on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
