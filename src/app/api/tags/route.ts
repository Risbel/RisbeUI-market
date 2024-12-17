import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";

// GET method to fetch tags
export async function GET() {
  try {
    const tags = await prisma.tag.findMany({
      select: {
        id: true,
        name: true,
        icon: true,
      },
    });

    return NextResponse.json(tags, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch tags:", error);
    return NextResponse.json({ error: "Failed to fetch tags" }, { status: 500 });
  }
}
