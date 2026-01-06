"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  className?: string;
  message?: string;
}

export function LoadingState({
  className,
  message = "Loading...",
}: LoadingStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12",
        className
      )}>
      <Loader2 className="h-12 w-12 animate-spin text-violet-600 mb-4" />
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}
