"use client";

import { useBotById } from "@/lib/queries/bot";
import { LoadingState } from "@/components/shared/loading-state";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ExternalLink,
  Github,
  Calendar,
  ArrowLeft,
  Activity,
} from "lucide-react";
import { URLS } from "@/lib/constants/urls";
import dayjs from "dayjs";

export default function BotDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: bot, isLoading, error } = useBotById(id);

  if (isLoading) {
    return (
      <div className=" max-w-screen-lg py-20">
        <LoadingState />
      </div>
    );
  }

  if (error || !bot) {
    return (
      <div className=" max-w-screen-lg py-20">
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold mb-4">Bot Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The bot you are looking for does not exist or has been removed.
          </p>
          <Button asChild>
            <Link href={URLS.BOTS} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to All Bots
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const isActive = bot.status === "active";
  const formattedDate = dayjs(bot.createdAt).format("MMMM D, YYYY");

  return (
    <div className=" max-w-screen-lg py-12 md:py-20">
      {/* Back button */}
      <Button asChild variant="ghost" className="mb-8 gap-2">
        <Link href={URLS.BOTS}>
          <ArrowLeft className="h-4 w-4" />
          Back to All Bots
        </Link>
      </Button>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Main content */}
        <div className="md:col-span-2 space-y-8">
          {/* Hero image */}
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-muted">
            <Image
              src={bot.image}
              alt={bot.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 66vw"
            />
          </div>

          {/* Bot info */}
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-muted">
                <Image
                  src={bot.iconImage}
                  alt={`${bot.name} icon`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">
                  {bot.name}
                </h1>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant={isActive ? "default" : "destructive"}>
                    <Activity className="h-3 w-3 mr-1" />
                    {bot.status}
                  </Badge>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Created {formattedDate}</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <h2 className="text-xl font-semibold mb-3">About This Bot</h2>
              <p className="text-muted-foreground leading-relaxed">
                {bot.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                asChild={isActive}
                size="lg"
                className="gap-2"
                disabled={!isActive}>
                {isActive ? (
                  <a href={bot.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-5 w-5" />
                    Open in Telegram
                  </a>
                ) : (
                  <>
                    <ExternalLink className="h-5 w-5" />
                    Bot Currently Offline
                  </>
                )}
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2">
                <a
                  href={bot.repoLink}
                  target="_blank"
                  rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                  View Source Code
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="md:col-span-1">
          <Card className="sticky top-20 border-border/40">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
                  Quick Info
                </h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium mb-1">Status</dt>
                    <dd>
                      <Badge variant={isActive ? "default" : "destructive"}>
                        {isActive ? "Active & Online" : "Currently Down"}
                      </Badge>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium mb-1">Created</dt>
                    <dd className="text-sm text-muted-foreground">
                      {formattedDate}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium mb-1">Category</dt>
                    <dd className="text-sm text-muted-foreground">
                      Daily Life Automation
                    </dd>
                  </div>
                </dl>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
                  Resources
                </h3>
                <div className="space-y-2">
                  <Button
                    asChild={isActive}
                    variant="outline"
                    className="w-full justify-start gap-2"
                    disabled={!isActive}>
                    {isActive ? (
                      <a
                        href={bot.link}
                        target="_blank"
                        rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        Telegram Bot
                      </a>
                    ) : (
                      <>
                        <ExternalLink className="h-4 w-4" />
                        Bot Offline
                      </>
                    )}
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-start gap-2">
                    <a
                      href={bot.repoLink}
                      target="_blank"
                      rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                      GitHub Repository
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
