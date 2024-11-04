import prisma from "@/app/lib/db";
import { stripe } from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  noStore();
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
    const account = await stripe.accounts.create({
      email: user.email as string,
      controller: {
        losses: {
          payments: "application",
        },
        fees: {
          payer: "application",
        },
        stripe_dashboard: {
          type: "express",
        },
      },
    });

    const initials = user.given_name?.slice(0, 3).toUpperCase();

    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        name: user.given_name ?? "",
        email: user.email ?? "",
        avatarImage: user.picture ?? `https://avatar.vercel.sh/${user.given_name}.svg?text=${initials}`,
        connectedAccountId: account.id,
      },
    });
  }

  return NextResponse.redirect(
    process.env.NODE_ENV === "development" ? "http://localhost:3000" : (process.env.KINDE_SITE_URL as string)
  );
}
