import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated and is admin
    const { userId } = await auth();

    if (!userId || userId !== process.env.ADMIN_USER_ID) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { fileKey } = await request.json();

    if (!fileKey) {
      return NextResponse.json(
        { error: "File key is required" },
        { status: 400 }
      );
    }

    // Delete the file from UploadThing
    await utapi.deleteFiles(fileKey);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting file from UploadThing:", error);
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 }
    );
  }
}
