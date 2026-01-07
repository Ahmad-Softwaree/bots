"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db/client";
import { bots } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export type DeleteImageReturn = {
  success: boolean;
  message: string;
};

export const deleteImage = async (
  id: string,
  fieldName: "image" | "iconImage",
  fileKey: string
): Promise<DeleteImageReturn> => {
  try {
    const { userId } = await auth();

    if (!userId || userId !== process.env.ADMIN_USER_ID) {
      throw new Error("Unauthorized");
    }

    if (!fileKey) {
      throw new Error("File key is required");
    }

    // Delete from UploadThing FIRST (directly using UTApi in server action)
    await utapi.deleteFiles(fileKey);

    // Only update database if UploadThing deletion succeeded
    if (id) {
      const updateData =
        fieldName === "image" ? { image: "" } : { iconImage: "" };

      await db.update(bots).set(updateData).where(eq(bots.id, id));
    }

    return {
      success: true,
      message: "Image deleted successfully",
    };
  } catch (error) {
    throw error;
  }
};
