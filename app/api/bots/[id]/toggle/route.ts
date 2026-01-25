import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db/client";
import { bots } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId || userId !== process.env.ADMIN_USER_ID) {
      return NextResponse.json(
        { message: "Unauthorized" },
        {
          status: 401,
        }
      );
    }

    const { id } = await params;
    const { currentStatus } = await req.json();

    if (!currentStatus || !["active", "down"].includes(currentStatus)) {
      return NextResponse.json(
        { message: "Invalid status provided" },
        { status: 400 }
      );
    }

    const newStatus = currentStatus === "active" ? "down" : "active";

    const [updatedBot] = await db
      .update(bots)
      .set({ status: newStatus, updatedAt: new Date() })
      .where(eq(bots.id, id))
      .returning();

    if (!updatedBot) {
      return NextResponse.json(
        { message: "Bot not found" },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      message: `Bot status changed to ${newStatus}`,
      data: updatedBot,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
