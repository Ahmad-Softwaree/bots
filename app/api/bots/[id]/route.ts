import { db } from "@/lib/db/client";
import { bots } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { UTApi } from "uploadthing/server";
import { mapBotToLocalized } from "../home/route";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const utapi = new UTApi({
  token: process.env.UPLOADTHING_TOKEN,
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // If request is for a static file, skip middleware
    if (req.nextUrl.pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|ico)$/)) {
      return NextResponse.next();
    }
    const { id } = await params;
    const lang = (await headers()).get("x-locale") || "en";
    const result = await db.select().from(bots).where(eq(bots.id, id)).limit(1);

    if (!result[0]) {
      return NextResponse.json(null, { status: 404 });
    }

    const localizedBot = mapBotToLocalized(result[0], lang);

    return NextResponse.json(localizedBot);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    let data = await req.json();
    await db
      .update(bots)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(bots.id, id));

    return NextResponse.json({
      message: "Bot updated successfully",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const [deletedBot] = await db
      .delete(bots)
      .where(eq(bots.id, id))
      .returning();

    if (!deletedBot) {
      return NextResponse.json(null, { status: 404 });
    }

    try {
      const imageUrls = [deletedBot.image, deletedBot.iconImage].filter(
        Boolean
      );

      const fileKeys = imageUrls
        .map((url) => {
          const match = url.match(/\/f\/([^?]+)/);
          return match ? match[1] : null;
        })
        .filter((key): key is string => key !== null);

      if (fileKeys.length > 0) {
        await utapi.deleteFiles(fileKeys);
      }
    } catch (error) {
      console.error("Failed to delete images from UploadThing:", error);
    }

    return NextResponse.json({
      message: "Bot deleted successfully",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
