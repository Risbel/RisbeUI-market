"use server";

import prisma from "@/app/lib/db";
import { stripe } from "@/lib/stripe";
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
    success_url: "http://localhost:3000/payment/success",
    cancel_url: "http://localhost:3000/payment/cancel",
  });

  redirect(session.url as string);
};
