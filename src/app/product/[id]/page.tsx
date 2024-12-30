import prisma from "@/app/lib/db";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import { BuyProduct } from "@/server/actions/stripe";
import BuyButton from "@/app/components/buttons/BuyButton";
import { unstable_noStore as noStore } from "next/cache";
import SourceCode from "./components/SourceCode";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Guide from "./components/Guide";
import ProductJson from "./components/ProductJson";

async function getData(id: string) {
  return await prisma.product.findUnique({
    where: { id },
    select: {
      id: true,
      category: true,
      smallDescription: true,
      description: true,
      name: true,
      images: true,
      price: true,
      createdAt: true,
      User: {
        select: {
          avatarImage: true,
          name: true,
        },
      },
    },
  });
}

const ProductPage = async ({ params }: { params: { id: string } }) => {
  noStore();
  const data = await getData(params.id);

  return (
    <div className="flex flex-col px-6 md:px-10 gap-12">
      <div className="flex flex-col-reverse md:flex-row md:gap-12">
        <Carousel className="w-full md:w-1/2">
          <CarouselContent>
            {data?.images.map((item, index) => (
              <CarouselItem key={index}>
                <div className="flex justify-center aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
                  <Image src={item as string} alt="Product image" fill className="object-contain rounded-lg" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-14" />
          <CarouselNext className="mr-14" />
        </Carousel>

        <div className="w-full md:w-1/2">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{data?.name}</h1>
          <p className="mt-6 text-muted-foreground">{data?.smallDescription}</p>

          <form action={BuyProduct}>
            <input type="hidden" name="id" value={data?.id} />
            <BuyButton price={data?.price as number} />
          </form>

          <div className="my-10 flex flex-col gap-4">
            <div className="border-t border-gray-200"></div>

            <div className="grid grid-cols-2 w-full gap-y-4 md:gap-y-8">
              <h3 className="text-sm font-medium text-muted-foreground col-span-1">Released:</h3>
              <h3 className="text-sm font-medium col-span-1">
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "full",
                }).format(data?.createdAt)}
              </h3>
              <h3 className="text-sm font-medium text-muted-foreground col-span-1">Category</h3>
              <h3 className="text-sm font-medium col-span-1">{data?.category}</h3>
            </div>

            <div className="border-t border-gray-200"></div>
          </div>
        </div>
      </div>

      <ProductJson content={data?.description as string} />

      <Suspense fallback={<Skeleton className="h-52 w-full" />}>
        <Guide productId={params.id} productPrice={data?.price as number} />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-52 w-full" />}>
        <SourceCode productId={params.id} productPrice={data?.price as number} />
      </Suspense>
    </div>
  );
};

export default ProductPage;
