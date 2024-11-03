import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { Button } from "@/components/ui/button";
import { CreateStripeAccount, DeleteStripeAccount, GetStripeDashboardLink } from "@/server/actions/stripe";
import SubmitButton from "../components/buttons/SubmitButton";
import { redirect } from "next/navigation";

const getData = async (userId: string) => {
  const data = prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      stripeConnectedLinked: true,
    },
  });

  return data;
};

const BillingRoute = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/login"); // Redirige al usuario no autenticado
    return null;
  }

  const data = await getData(user.id);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
      <Card>
        <CardHeader>
          <CardTitle>Billing</CardTitle>
          <CardDescription>Find all your details regarding your payments</CardDescription>
        </CardHeader>
        <CardContent>
          {data?.stripeConnectedLinked === false && (
            <form action={CreateStripeAccount}>
              <SubmitButton title="Link your Account to Stripe" />
            </form>
          )}
          {data?.stripeConnectedLinked === true && (
            <form action={GetStripeDashboardLink}>
              <SubmitButton title="View Dashboard" />
            </form>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default BillingRoute;
