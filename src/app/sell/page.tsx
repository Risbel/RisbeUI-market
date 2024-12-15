import { Card } from "@/components/ui/card";
import SellForm from "./components/SellForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

const getData = async (userId: string) => {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      stripeConnectedLinked: true,
    },
  });

  if (data?.stripeConnectedLinked === false) {
    return redirect("/billing");
  }

  return null;
};

const Sell = async () => {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/login");
    return null;
  }

  const data = await getData(user.id);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 pb-28">
      <Card>
        <SellForm />
      </Card>
    </section>
  );
};

export default Sell;
