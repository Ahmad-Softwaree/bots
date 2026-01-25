"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useModalStore } from "@/lib/store/modal.store";
import { useToggleBotStatus } from "@/lib/react-query/queries/bot.query";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ExternalLink, Github, Calendar, Edit, Trash2 } from "lucide-react";
import type { Bot } from "@/lib/db/schema";
import {
  CardFadeUpMotion,
  ImageScaleMotion,
  BadgeScaleMotion,
  CardHoverMotion,
  ButtonHoverMotion,
  IconButtonMotion,
} from "@/components/shared/animate";
import dayjs from "dayjs";
import { Link } from "@/i18n/navigation";

function Home(val: Bot) {
  const t = useTranslations("bot");
  const isActive = val.status === "active";
  const formattedDate = dayjs(val.createdAt).format("MMM D, YYYY");

  return (
    <CardFadeUpMotion className="h-full">
      <Card className="group overflow-hidden border-border/40 transition-all hover:border-primary/50 hover:shadow-lg h-full flex flex-col">
        <CardHeader className="p-0">
          <div className="relative aspect-video w-full overflow-hidden bg-muted">
            <ImageScaleMotion>
              <Image
                src={val.image != "" ? val.image : "/images/placeholder.svg"}
                alt={val.name || "Bot image"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </ImageScaleMotion>
            <BadgeScaleMotion className="absolute top-3 right-3">
              <Badge
                variant={isActive ? "default" : "destructive"}
                className="shadow-md">
                {isActive ? t("active") : t("down")}
              </Badge>
            </BadgeScaleMotion>
          </div>
        </CardHeader>

        <CardContent className="p-6 flex-1">
          <Link href={`/bots/${val.id}`} className="group/title">
            <div className="flex items-start gap-3 mb-3">
              <CardHoverMotion className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                <Image
                  src={
                    val.iconImage != ""
                      ? val.iconImage
                      : "/images/placeholder.svg"
                  }
                  alt={`${val.name} icon`}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </CardHoverMotion>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-semibold line-clamp-1 group-hover/title:text-primary transition-colors">
                  {val.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                  <Calendar className="h-3 w-3" />
                  <span className="english_font">{formattedDate}</span>
                </div>
              </div>
            </div>
          </Link>

          <p className="text-sm text-muted-foreground line-clamp-3">
            {val.description}
          </p>
        </CardContent>

        <CardFooter className="flex gap-2 p-6 pt-0">
          <ButtonHoverMotion className="flex-1">
            <Button
              asChild={isActive}
              variant="default"
              className="w-full gap-2"
              disabled={!isActive}>
              {isActive ? (
                <Link href={val.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  {t("visit_bot")}
                </Link>
              ) : (
                <>
                  <ExternalLink className="h-4 w-4" />
                  {t("down")}
                </>
              )}
            </Button>
          </ButtonHoverMotion>
          <IconButtonMotion>
            <Button
              asChild
              variant="outline"
              size="icon"
              className="flex-shrink-0">
              <Link
                href={val.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("repo")}>
                <Github className="h-4 w-4" />
              </Link>
            </Button>
          </IconButtonMotion>
        </CardFooter>
      </Card>
    </CardFadeUpMotion>
  );
}

function Dashboard(val: Bot) {
  const t = useTranslations("bot");
  const common_t = useTranslations("common");
  const locale = useLocale();
  const { openModal } = useModalStore();
  const toggleStatusMutation = useToggleBotStatus({});

  const handleToggleStatus = async () => {
    toggleStatusMutation.mutate({
      id: val.id,
      currentStatus: val.status,
    });
  };

  const handleEdit = () => {
    openModal({ type: "update", modalData: val });
  };

  const handleDelete = () => {
    openModal({ type: "delete", modalData: val });
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={val.image != "" ? val.image : "/images/placeholder.svg"}
          alt={val.name || "Bot image"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <Badge
          className="absolute top-2 right-2"
          variant={val.status === "active" ? "default" : "destructive"}>
          {val.status === "active" ? t("active") : t("down")}
        </Badge>
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="flex items-start gap-3">
          <Image
            src={
              val.iconImage != "" ? val.iconImage : "/images/placeholder.svg"
            }
            alt={`${val.name} icon`}
            width={48}
            height={48}
            className="rounded-full border-2 border-border"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{val.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {val.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Link
            href={val.link}
            target="_blank"
            rel="noopener noreferrer"
            className="english_font flex items-center gap-1 text-xs text-primary hover:underline">
            <ExternalLink className="h-3 w-3" />
            Telegram
          </Link>
          <span className="text-muted-foreground">•</span>
          <Link
            href={val.repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="english_font flex items-center gap-1 text-xs text-primary hover:underline">
            <Github className="h-3 w-3" />
            Repository
          </Link>
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center space-x-2">
            <Switch
              dir={locale === "ar" || locale === "ckb" ? "rtl" : "ltr"}
              id={`status-${val.id}`}
              checked={val.status === "active"}
              onCheckedChange={handleToggleStatus}
              disabled={toggleStatusMutation.isPending}
            />
            <Label
              htmlFor={`status-${val.id}`}
              className="text-sm cursor-pointer">
              {val.status === "active" ? t("active") : t("down")}
            </Label>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 p-4 pt-0">
        <Button
          variant="outline"
          size="sm"
          onClick={handleEdit}
          className="flex-1 gap-2">
          <Edit className="h-4 w-4" />
          {common_t("edit")}
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          className="flex-1 gap-2">
          <Trash2 className="h-4 w-4" />
          {common_t("delete")}
        </Button>
      </CardFooter>
    </Card>
  );
}

export const BotCard = () => null;

BotCard.Home = Home;
BotCard.Dashboard = Dashboard;
