"use client";

import { useState, useRef } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  value?: string | File;
  onChange: (file: File | string) => void;
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
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      onChange(file);
    }
  };

  const handleRemove = async () => {
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }

    if (typeof value === "string" && onRemove) {
      onRemove(value);
    }

    onChange("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // Determine display URL
  const displayUrl = preview || (typeof value === "string" ? value : null);

  return (
    <div className="space-y-4">
      {displayUrl ? (
        <div className="relative w-full h-40 rounded-lg border border-border overflow-hidden bg-muted">
          <img
            src={displayUrl}
            alt="Upload preview"
            className="w-full h-full object-cover"
          />
          {!disabled && (
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
        <div
          className="w-full h-40 rounded-lg border-2 border-dashed border-primary/50 flex items-center justify-center bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer"
          onClick={handleClick}>
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <div className="p-4 rounded-full bg-primary/10">
              <ImageIcon className="h-8 w-8 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Click to select image
              </p>
            </div>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        disabled={disabled}
      />

      {!displayUrl && (
        <Button
          type="button"
          onClick={handleClick}
          disabled={disabled}
          className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] border-2 border-primary/20 transition-all duration-300">
          <Upload className="h-4 w-4 mr-2" />
          Select Image
        </Button>
      )}
    </div>
  );
}
