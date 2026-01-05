"use client";

import { useState } from "react";
import { Bot } from "@/lib/db/schema";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, ExternalLink, Github } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ConfirmationDialog } from "@/components/shared/confirmation-dialog";
import { useDeleteBot, useToggleBotStatus } from "@/lib/queries/bot";

interface BotCardProps {
  bot: Bot;
  onEdit: (bot: Bot) => void;
}

export function BotCard({ bot, onEdit }: BotCardProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const deleteMutation = useDeleteBot();
  const toggleStatusMutation = useToggleBotStatus();

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(bot.id);
    setDeleteDialogOpen(false);
  };

  const handleToggleStatus = async (checked: boolean) => {
    await toggleStatusMutation.mutateAsync({
      id: bot.id,
      currentStatus: bot.status,
    });
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={bot.image}
            alt={bot.name}
            className="w-full h-full object-cover"
          />
          <Badge
            className="absolute top-2 right-2"
            variant={bot.status === "active" ? "default" : "destructive"}>
            {bot.status}
          </Badge>
        </div>

        <CardContent className="p-4 space-y-3">
          <div className="flex items-start gap-3">
            <img
              src={bot.iconImage}
              alt={`${bot.name} icon`}
              className="w-12 h-12 rounded-full border-2 border-border"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg truncate">{bot.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {bot.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <a
              href={bot.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-primary hover:underline">
              <ExternalLink className="h-3 w-3" />
              Telegram
            </a>
            <span className="text-muted-foreground">•</span>
            <a
              href={bot.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-primary hover:underline">
              <Github className="h-3 w-3" />
              Repository
            </a>
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center space-x-2">
              <Switch
                id={`status-${bot.id}`}
                checked={bot.status === "active"}
                onCheckedChange={handleToggleStatus}
                disabled={toggleStatusMutation.isPending}
              />
              <Label
                htmlFor={`status-${bot.id}`}
                className="text-sm cursor-pointer">
                {bot.status === "active" ? "Active" : "Down"}
              </Label>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onEdit(bot)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="flex-1"
            onClick={() => setDeleteDialogOpen(true)}
            disabled={deleteMutation.isPending}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </CardFooter>
      </Card>

      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Bot"
        description={`Are you sure you want to delete "${bot.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </>
  );
}
