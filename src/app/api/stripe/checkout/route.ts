import ProductEmail from "@/app/components/ProductEmail";
import prisma from "@/app/lib/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { Resend } from "resend";
import Stripe from "stripe";

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (req: Request) => {
  const body = await req.text();

  const signature = headers().get("stripe-signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, "whsec_nCApXMFM95tVEHRvMzAQQp6eq4AdUnKj" as string);
  } catch (error: unknown) {
    return new Response("webhook error", { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      console.log("this is the session, " + session);

      console.log("this is the session metadata: " + session.metadata);

      try {
        const userId = session.metadata?.userId as string;
        const productId = session.metadata?.productId as string;

        await prisma.purchase.create({
          data: {
            userId,
            productId,
            quantity: 1, // Puedes modificarlo si se soporta cantidad personalizada
          },
        });

        const userEmail = session?.customer_email as string;

        const { data, error } = await resend.emails.send({
          from: "RisbeUI <onboarding@resend.dev>",
          to: ["risbel961019@gmail.com"],
          subject: "Your Product from RisbeUI",
          react: ProductEmail(),
        });

        if (error) {
          return Response.json({ error }, { status: 500 });
        }

        return new Response(JSON.stringify(data), { status: 200 });
      } catch (error) {
        console.error("Error manejando el evento:", error);
        return new Response("Error interno", { status: 500 });
      }
    }
    default: {
      console.log("Unhandled event");
    }
  }
  return new Response(null, { status: 200 });
};
