import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import ProductCard from "../components/home/ProductCard";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import DeleteProductButton from "./componets/DeleteProductButton";

const getData = async (userId: string) => {
  const data = await prisma.product.findMany({
    where: {
      userId: userId,
    },
    select: {
      name: true,
      images: true,
      price: true,
      smallDescription: true,
      id: true,
    },
  });

  return data;
};

const MyProducts = async () => {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login?");
    return null;
  }

  const data = await getData(user.id);
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      <h1 className="text-2xl font-bold">My Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-4">
        {data.map((item) => {
          return (
            <div key={item.id} className="flex flex-col gap-2">
              <ProductCard
                id={item.id}
                images={item.images}
                name={item.name}
                price={item.price}
                smallDescription={item.smallDescription}
              />
              <DeleteProductButton id={item.id} />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MyProducts;
