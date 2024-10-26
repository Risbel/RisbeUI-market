import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user === null || !user.id) {
    throw new Error("Something went wrong...");
  }

  let dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    const initials = user.given_name?.slice(0, 3).toUpperCase();

    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        name: user.given_name ?? "",
        email: user.email ?? "",
        avatarImage: user.picture ?? `https://avatar.vercel.sh/${user.given_name}.svg?text=${initials}`,
      },
    });
  }

  return NextResponse.redirect("http://localhost:3000");
}
