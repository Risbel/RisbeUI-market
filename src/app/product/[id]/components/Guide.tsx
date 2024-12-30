import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import React from "react";
import ProductJson from "./ProductJson";

const Guide = async ({ productId, productPrice }: { productId: string; productPrice: number }) => {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return null;
  }

  let guide;

  if (productPrice === 0) {
    // if the price is 0 bring the guide directly
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: {
        guide: true,
      },
    });

    guide = product?.guide;
  } else {
    // but if price is greater than 0 bring the guide by his purchase
    const purchase = await prisma.purchase.findFirst({
      where: {
        userId: user.id,
        productId,
      },
      select: {
        Product: {
          select: {
            guide: true,
          },
        },
      },
    });

    guide = purchase?.Product.guide;
  }

  if (!guide) {
    return null;
  }

  return <ProductJson content={guide as string} />;
};

export default Guide;
