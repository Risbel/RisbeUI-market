import ProductCard from "@/app/components/home/ProductCard";
import prisma from "@/app/lib/db";
import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";

async function getData(category: string) {
  let input;

  switch (category) {
    case "template": {
      input = "template";
      break;
    }
    case "uikit": {
      input = "uikit";
      break;
    }
    case "components": {
      input = "component";
      break;
    }
    case "all": {
      input = undefined;
      break;
    }
    default: {
      return notFound();
    }
  }

  const data = prisma.product.findMany({
    where: {
      category: input,
      isDeleted: false,
    },
    select: {
      id: true,
      name: true,
      images: true,
      smallDescription: true,
      price: true,
    },
  });

  return data;
}

const CategoryPage = async ({ params }: { params: { category: string } }) => {
  noStore();
  const data = await getData(params.category);
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-4">
        {data.map((product) => (
          <ProductCard
            id={product.id}
            key={product.id}
            images={product.images}
            name={product.name}
            price={product.price}
            smallDescription={product.smallDescription}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoryPage;
