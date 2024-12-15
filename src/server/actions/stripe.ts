"use server";

import prisma from "@/app/lib/db";
import { stripe } from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export const BuyProduct = async (formData: FormData) => {
  const id = formData.get("id") as string;

  const data = await prisma.product.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      smallDescription: true,
      price: true,
      images: true,
      User: {
        select: {
          connectedAccountId: true,
        },
      },
    },
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: Math.round((data?.price as number) * 100),
          product_data: {
            name: data?.name as string,
            description: data?.smallDescription,
            images: data?.images,
          },
        },
        quantity: 1,
      },
    ],
    payment_intent_data: {
      application_fee_amount: Math.round((data?.price as number) * 0.08),
      transfer_data: {
        destination: data?.User?.connectedAccountId as string,
      },
    },
    success_url:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/payment/success"
        : (`${process.env.KINDE_SITE_URL}/payment/success` as string),
    cancel_url:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/payment/cancel"
        : (`${process.env.KINDE_SITE_URL}/payment/cancel` as string),
  });

  redirect(session.url as string);
};

export const CreateStripeAccount = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error();
  }

  const data = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      connectedAccountId: true,
    },
  });

  const accountLink = await stripe.accountLinks.create({
    account: data?.connectedAccountId as string,
    refresh_url:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/billing"
        : (`${process.env.KINDE_SITE_URL}/billing` as string),
    return_url:
      process.env.NODE_ENV === "development"
        ? `http://localhost:3000/return/${data?.connectedAccountId}`
        : (`${process.env.KINDE_SITE_URL}/return/${data?.connectedAccountId}` as string),
    type: "account_onboarding",
  });

  return redirect(accountLink.url);
};

export const DeleteStripeAccount = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error();
  }

  const data = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      connectedAccountId: true,
    },
  });

  await stripe.accounts.del(data?.connectedAccountId as string);
};

export const GetStripeDashboardLink = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error();
  }

  const data = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      connectedAccountId: true,
    },
  });

  const loginLink = await stripe.accounts.createLoginLink(data?.connectedAccountId as string);

  return redirect(loginLink.url);
};
