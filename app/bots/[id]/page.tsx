"use client";

import { useGetBot } from "@/lib/react-query/queries/bot.query";
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
import { URLS } from "@/lib/urls";
import dayjs from "dayjs";
import {
  SlideUp,
  Scale,
  FadeIn,
  MotionInteractive,
  BackBtnMotion,
  ImageScaleMotion,
  CardHoverMotion,
  BadgeScaleMotion,
  SlideMotion,
} from "@/components/shared/animate";
import { useTranslation } from "react-i18next";
import Loading from "@/components/shared/Loading";

export default function BotDetailPage() {
  const { t } = useTranslation();
  const params = useParams();
  const id = params.id as string;
  const { data: bot, isLoading, error } = useGetBot(id);

  if (isLoading) {
    return <Loading.Spinner />;
  }

  if (error || !bot) {
    return (
      <div className=" max-w-screen-lg py-20">
        <FadeIn>
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold mb-4">
              {t("bot_detail.not_found")}
            </h1>
            <p className="text-muted-foreground mb-8">
              {t("bot_detail.not_found_desc")}
            </p>
            <MotionInteractive>
              <Button asChild>
                <Link href={URLS.BOTS} className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  {t("bot_detail.back_to_bots")}
                </Link>
              </Button>
            </MotionInteractive>
          </div>
        </FadeIn>
      </div>
    );
  }

  const isActive = bot.status === "active";
  const formattedDate = dayjs(bot.createdAt).format("MMMM D, YYYY");

  return (
    <div className=" max-w-screen-lg py-12 md:py-20">
      {/* Back button */}
      <SlideUp>
        <BackBtnMotion>
          <Button asChild variant="ghost" className="mb-8 gap-2">
            <Link href={URLS.BOTS}>
              <ArrowLeft className="h-4 w-4" />
              {t("bot_detail.back_to_bots")}
            </Link>
          </Button>
        </BackBtnMotion>
      </SlideUp>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Main content */}
        <div className="md:col-span-2 space-y-8">
          {/* Hero image */}
          <Scale>
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-muted">
              <ImageScaleMotion>
                <Image
                  src={bot.image}
                  alt={bot.name || "Bot image"}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
              </ImageScaleMotion>
            </div>
          </Scale>

          {/* Bot info */}
          <SlideUp>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <CardHoverMotion className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-muted">
                  <Image
                    src={bot.iconImage}
                    alt={`${bot.name} icon`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </CardHoverMotion>
                <div className="flex-1 min-w-0">
                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">
                    {bot.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3">
                    <BadgeScaleMotion>
                      <Badge variant={isActive ? "default" : "destructive"}>
                        <Activity className="h-3 w-3 mr-1" />
                        {isActive ? t("bot.active") : t("bot.down")}
                      </Badge>
                    </BadgeScaleMotion>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {t("bot_detail.created_on")} {formattedDate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <h2 className="text-xl font-semibold mb-3">
                  {t("bot_detail.about")}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {bot.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <MotionInteractive>
                  <Button
                    asChild={isActive}
                    size="lg"
                    className="gap-2"
                    disabled={!isActive}>
                    {isActive ? (
                      <a
                        href={bot.link}
                        target="_blank"
                        rel="noopener noreferrer">
                        <ExternalLink className="h-5 w-5" />
                        {t("bot_detail.visit_telegram")}
                      </a>
                    ) : (
                      <>
                        <ExternalLink className="h-5 w-5" />
                        {t("bot.down")}
                      </>
                    )}
                  </Button>
                </MotionInteractive>
                <MotionInteractive>
                  <Button asChild size="lg" variant="outline" className="gap-2">
                    <a
                      href={bot.repoLink}
                      target="_blank"
                      rel="noopener noreferrer">
                      <Github className="h-5 w-5" />
                      {t("bot_detail.view_source")}
                    </a>
                  </Button>
                </MotionInteractive>
              </div>
            </div>
          </SlideUp>
        </div>

        {/* Sidebar */}
        <SlideUp transition={{ delay: 0.2 }}>
          <Card className="sticky top-20 border-border/40">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
                  {t("bot_detail.quick_info")}
                </h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium mb-1">
                      {t("bot.status")}
                    </dt>
                    <dd>
                      <Badge variant={isActive ? "default" : "destructive"}>
                        {isActive ? t("bot.active") : t("bot.down")}
                      </Badge>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium mb-1">
                      {t("bot.created")}
                    </dt>
                    <dd className="text-sm text-muted-foreground">
                      {formattedDate}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium mb-1">
                      {t("bot_detail.category")}
                    </dt>
                    <dd className="text-sm text-muted-foreground">
                      {t("bot_detail.daily_life_automation")}
                    </dd>
                  </div>
                </dl>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
                  {t("bot_detail.resources")}
                </h3>
                <div className="space-y-2">
                  <SlideMotion>
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
                          {t("bot_detail.telegram_bot")}
                        </a>
                      ) : (
                        <>
                          <ExternalLink className="h-4 w-4" />
                          {t("bot_detail.bot_offline")}
                        </>
                      )}
                    </Button>
                  </SlideMotion>
                  <SlideMotion>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full justify-start gap-2">
                      <a
                        href={bot.repoLink}
                        target="_blank"
                        rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        {t("bot_detail.github_repository")}
                      </a>
                    </Button>
                  </SlideMotion>
                </div>
              </div>
            </CardContent>
          </Card>
        </SlideUp>
      </div>
    </div>
  );
}
