import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import React from "react";

import { BuyProduct } from "@/server/actions/stripe";
import UnlockButton from "./UnlockButton";
import { CodePreview } from "./CodePreview";

const mockCode = {
  tsx: `
import React from 'react';

const RisbeUI: React.FC = () => {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-indigo-500 via-pink-500 to-blue-500 overflow-hidden flex items-center justify-center relative rounded-xl">
        {/* Floating Dots */}
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="absolute bg-white opacity-60 blur-xl rounded-full"
            style={{
              width: \`\${50 + index * 10}px\`,
              height: \`\${30 + index * 10}px\`,
              top: \`\${Math.random() * 100}%\`,
              left: \`\${Math.random() * 100}%\`,
            }}
          ></div>
        ))}

        {/* Main Content */}
        <div className="relative text-center flex flex-col items-center rounded-xl">
          <h1 className="flex gap-2 items-center text-6xl md:text-8xl font-extrabold text-white drop-shadow-lg">
            Seriously bro?
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-white">
            This component is a gift from RisbeUI for intruders like you hahaha 😁😉
          </p>
          <Link
            href="/"
            className="w-fit text-white mt-10 px-6 py-3 bg-blue-600 font-bold rounded-lg shadow-lg transition duration-500"
          >
            Let's forget that this happened 😌
          </Link>
        </div>
      </div>
  );
};

export default RisbeUI;`,
};

async function getProductWithPurchase(userId: string, productId: string) {
  return await prisma.purchase.findFirst({
    where: {
      userId,
      productId,
    },
    select: {
      Product: {
        select: {
          codeUrl: true,
        },
      },
    },
  });
}

async function getProductCode(productId: string) {
  return await prisma.product.findUnique({
    where: { id: productId },
    select: {
      codeUrl: true,
    },
  });
}

async function getCodeFromUrl(url: string | null) {
  if (!url) return null;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to fetch code from ${url}`);
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching code from ${url}:`, error);
    return null;
  }
}

const SourceCode = async ({ productId, productPrice }: { productId: string; productPrice: number }) => {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return null;
  }

  let codeUrl;

  if (productPrice === 0) {
    // Fetch the codeUrl directly if the product is free
    const product = await getProductCode(productId);
    codeUrl = product?.codeUrl;
  } else {
    // Fetch the codeUrl through the purchase record if the product is paid
    const hasPurchased = await getProductWithPurchase(user.id, productId);
    codeUrl = hasPurchased?.Product?.codeUrl;

    if (!hasPurchased) {
      return (
        <div className="relative flex w-full border border-b-0 rounded-xl h-[700px] overflow-hidden">
          <div className="absolute h-full w-full backdrop-blur-[2px] bg-gradient-to-b from-transparent via-white/50 to-white"></div>
          <form className="absolute top-1/3 flex justify-center w-full" action={BuyProduct}>
            <input type="hidden" name="id" value={productId} />
            <UnlockButton />
          </form>
          <div className="px-8 py-6 w-full">
            <CodePreview codeData={mockCode} />
          </div>
        </div>
      );
    }
  }

  const dataCode = codeUrl && (await getCodeFromUrl(codeUrl));

  if (!dataCode) {
    return <CodePreview codeData={{ jsx: `//No code bro, contact us to resolve this issue.` }} />;
  }

  return <CodePreview codeData={dataCode} />;
};

export default SourceCode;
