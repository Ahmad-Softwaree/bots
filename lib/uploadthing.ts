import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { UTApi } from "uploadthing/server";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();

export const utapi = new UTApi();
