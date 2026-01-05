"use client";

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { useState } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: (url: string) => void;
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

  const handleRemove = async () => {
    if (value && onRemove) {
      onRemove(value);
    }
  };

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
              onClick={handleRemove}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ) : (
        <div className="w-full h-40 rounded-lg border-2 border-dashed border-primary/50 flex items-center justify-center bg-primary/5 hover:bg-primary/10 transition-colors">
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <div className="p-4 rounded-full bg-primary/10">
              <ImageIcon className="h-8 w-8 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Click below to upload
              </p>
            </div>
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
              "w-full ut-ready:bg-gradient-to-r ut-ready:from-primary ut-ready:to-primary/80 ut-ready:text-primary-foreground hover:ut-ready:from-primary/90 hover:ut-ready:to-primary/70 ut-uploading:bg-primary/50 ut-uploading:cursor-not-allowed transition-all duration-300 font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] border-2 border-primary/20",
            container: "w-full",
            allowedContent: "text-xs text-muted-foreground mt-2 font-medium",
          }}
        />
      )}
    </div>
  );
}
