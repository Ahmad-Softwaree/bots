"use client";

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { useState } from "react";
import { X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  disabled?: boolean;
  label?: string;
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  disabled,
  label = "Upload Image",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="space-y-4">
      {value ? (
        <div className="relative w-full h-40 rounded-lg border border-border overflow-hidden bg-muted">
          <img
            src={value}
            alt="Upload preview"
            className="w-full h-full object-cover"
          />
          {onRemove && !disabled && (
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={onRemove}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ) : (
        <div className="w-full h-40 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted/20">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Upload className="h-8 w-8" />
            <p className="text-sm">{label}</p>
          </div>
        </div>
      )}

      {!value && (
        <UploadButton<OurFileRouter, "botImageUploader">
          endpoint="botImageUploader"
          disabled={disabled || isUploading}
          onClientUploadComplete={(res) => {
            if (res?.[0]?.url) {
              onChange(res[0].url);
            }
            setIsUploading(false);
          }}
          onUploadError={(error: Error) => {
            console.error("Upload error:", error);
            alert(`Upload failed: ${error.message}`);
            setIsUploading(false);
          }}
          onUploadBegin={() => {
            setIsUploading(true);
          }}
          appearance={{
            button:
              "ut-ready:bg-primary ut-ready:text-primary-foreground hover:ut-ready:bg-primary/90 ut-uploading:bg-primary/50 ut-uploading:cursor-not-allowed transition-colors",
            container: "w-full",
            allowedContent: "text-xs text-muted-foreground",
          }}
        />
      )}
    </div>
  );
}
