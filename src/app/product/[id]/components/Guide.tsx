import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import React from "react";
import ProductJson from "./ProductJson";

const Guide = async ({ productId }: { productId: string }) => {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return null;
  }

  const data = await prisma.purchase.findFirst({
    where: {
      userId: user.id,
      productId,
    },
    select: {
      Product: {
        select: {
          guide: true, // only included if the purchase exists
        },
      },
    },
  });

  if (!data) {
    return null;
  }

  const description = data.Product.guide;

  return <ProductJson content={description as string} />;
};

export default Guide;
