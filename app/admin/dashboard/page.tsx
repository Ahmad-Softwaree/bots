"use client";

import { useState } from "react";
import { useBotsAdmin, useCreateBot, useUpdateBot } from "@/lib/queries/bot";
import { BotCard } from "@/components/dashboard/bot-card";
import { BotForm } from "@/components/forms/bot-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Loader2 } from "lucide-react";
import type { Bot } from "@/lib/db/schema";
import type { CreateBot } from "@/types/validation/bot";

export default function AdminDashboard() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"active" | "down" | "all">(
    "all"
  );
  const [formOpen, setFormOpen] = useState(false);
  const [editingBot, setEditingBot] = useState<Bot | null>(null);

  const { data: bots, isLoading } = useBotsAdmin(search, statusFilter);
  const createMutation = useCreateBot();
  const updateMutation = useUpdateBot();

  const handleOpenForm = (bot?: Bot) => {
    if (bot) {
      setEditingBot(bot);
    } else {
      setEditingBot(null);
    }
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingBot(null);
  };

  const handleSubmit = async (data: CreateBot) => {
    if (editingBot) {
      // Update existing bot
      await updateMutation.mutateAsync({
        ...data,
        id: editingBot.id,
      });
      handleCloseForm();
    } else {
      // Create new bot
      await createMutation.mutateAsync(data);
      handleCloseForm();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your Telegram bots
          </p>
        </div>
        <Button onClick={() => handleOpenForm()}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Bot
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bots..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value: "active" | "down" | "all") =>
            setStatusFilter(value)
          }>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Bots</SelectItem>
            <SelectItem value="active">Active Only</SelectItem>
            <SelectItem value="down">Down Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bots Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : bots && bots.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bots.map((bot) => (
            <BotCard key={bot.id} bot={bot} onEdit={handleOpenForm} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {search || statusFilter !== "all"
              ? "No bots found matching your filters"
              : "No bots yet. Create your first bot!"}
          </p>
        </div>
      )}

      {/* Bot Form Modal */}
      <BotForm
        open={formOpen}
        onOpenChange={handleCloseForm}
        onSubmit={handleSubmit}
        bot={editingBot}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}
