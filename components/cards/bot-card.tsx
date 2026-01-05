"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Calendar } from "lucide-react";
import { URLS } from "@/lib/constants/urls";
import type { Bot } from "@/lib/db/schema";
import { motion } from "framer-motion";
import dayjs from "dayjs";

interface BotCardProps {
  bot: Bot;
}

export function BotCard({ bot }: BotCardProps) {
  const isActive = bot.status === "active";
  const formattedDate = dayjs(bot.createdAt).format("MMM D, YYYY");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className="h-full">
      <Card className="group overflow-hidden border-border/40 transition-all hover:border-primary/50 hover:shadow-lg h-full flex flex-col">
        <CardHeader className="p-0">
          <div className="relative aspect-video w-full overflow-hidden bg-muted">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}>
              <Image
                src={bot.image}
                alt={bot.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
            <motion.div
              className="absolute top-3 right-3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}>
              <Badge
                variant={isActive ? "default" : "destructive"}
                className="shadow-md">
                {bot.status}
              </Badge>
            </motion.div>
          </div>
        </CardHeader>

        <CardContent className="p-6 flex-1">
          <Link href={URLS.BOT_DETAIL(bot.id)} className="group/title">
            <div className="flex items-start gap-3 mb-3">
              <motion.div
                className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-muted"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}>
                <Image
                  src={bot.iconImage}
                  alt={`${bot.name} icon`}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </motion.div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-semibold line-clamp-1 group-hover/title:text-primary transition-colors">
                  {bot.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                  <Calendar className="h-3 w-3" />
                  <span>{formattedDate}</span>
                </div>
              </div>
            </div>
          </Link>

          <p className="text-sm text-muted-foreground line-clamp-3">
            {bot.description}
          </p>
        </CardContent>

        <CardFooter className="flex gap-2 p-6 pt-0">
          <motion.div
            className="flex-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}>
            <Button
              asChild={isActive}
              variant="default"
              className="w-full gap-2"
              disabled={!isActive}>
              {isActive ? (
                <a href={bot.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Open Bot
                </a>
              ) : (
                <>
                  <ExternalLink className="h-4 w-4" />
                  Bot Offline
                </>
              )}
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}>
            <Button
              asChild
              variant="outline"
              size="icon"
              className="flex-shrink-0">
              <a
                href={bot.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View repository">
                <Github className="h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
