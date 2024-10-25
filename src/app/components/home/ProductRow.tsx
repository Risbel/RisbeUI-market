import prisma from "@/app/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "./ProductCard";
import { Suspense } from "react";
import FallbackRow from "./FallbackRow";

interface iAppProps {
  category: "newest" | "templates" | "uikits" | "icons";
}

export const getData = async ({ category }: iAppProps) => {
  switch (category) {
    case "icons": {
      const data = await prisma.product.findMany({
        where: {
          category: "icon",
        },
        select: {
          price: true,
          name: true,
          smallDescription: true,
          id: true,
          images: true,
        },
        take: 3,
      });

      return {
        data: data,
        title: "Icons",
        link: "/products/icon",
      };
    }
    case "newest": {
      const data = await prisma.product.findMany({
        select: {
          price: true,
          name: true,
          smallDescription: true,
          id: true,
          images: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 3,
      });

      return {
        data: data,
        title: "Newest Products",
        link: "/products/all",
      };
    }
    case "templates": {
      const data = await prisma.product.findMany({
        where: {
          category: "template",
        },
        select: {
          price: true,
          name: true,
          smallDescription: true,
          id: true,
          images: true,
        },
        take: 3,
      });

      return {
        data: data,
        title: "Templates",
        link: "/products/template",
      };
    }
    case "uikits": {
      const data = await prisma.product.findMany({
        where: {
          category: "uikit",
        },
        select: {
          price: true,
          name: true,
          smallDescription: true,
          id: true,
          images: true,
        },
        take: 3,
      });

      return {
        data: data,
        title: "UI Kits",
        link: "/products/uikit",
      };
    }
    default: {
      return notFound();
    }
  }
};

const ProductRow = async ({ category }: iAppProps) => {
  return (
    <section className="mt-12">
      <Suspense fallback={<FallbackRow />}>
        <LoadRows category={category} />
      </Suspense>
    </section>
  );
};

export default ProductRow;

export const LoadRows = async ({ category }: iAppProps) => {
  const data = await getData({ category: category });
  return (
    <>
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-extrabold tracking-tight">{data.title}</h2>
        <Link href={data.link} className="text-sm hidden font-medium text-primary hover:text-primary/90 md:block">
          All Products <span>&rarr;</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4 gap-10">
        {data.data.map((product) => {
          return (
            <ProductCard
              key={product.id}
              images={product.images}
              name={product.name}
              price={product.price}
              smallDescription={product.smallDescription}
              id={product.id}
            />
          );
        })}
      </div>
    </>
  );
};
