import ProductEmail from "@/app/components/ProductEmail";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (req: Request) => {
  const body = await req.text();

  const signature = headers().get("Stripe-Signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_CHECKOUT_WEBHOOK_SECRET as string);
  } catch (error: unknown) {
    return new Response("webhook error", { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const { data, error } = await resend.emails.send({
        from: "RisbeUI <onboarding@resend.dev>",
        to: ["risbel961019@gmail.com"],
        subject: "Your Product from RisbeUI",
        react: ProductEmail(),
      });

      if (error) {
        return Response.json({ error }, { status: 500 });
      }

      return Response.json(data);

      break;
    }
    default: {
      console.log("Unhandled event");
    }
  }
  return new Response(null, { status: 200 });
};
