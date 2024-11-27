import prisma from "@/app/lib/db";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import ProductDescription from "./components/ProductDescription";
import { type JSONContent } from "@tiptap/react";
import { BuyProduct } from "@/server/actions/stripe";
import BuyButton from "@/app/components/buttons/BuyButton";
import { unstable_noStore as noStore } from "next/cache";
import { CodePreview } from "./components/CodePreview";

async function getData(id: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      category: true,
      description: true,
      smallDescription: true,
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

  return data;
}

const ProductPage = async ({ params }: { params: { id: string } }) => {
  noStore();
  const data = await getData(params.id);
  const productCode = `
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProductDisplayProps {
  name: string
  description: string
  price: number
  category: string
}

export function ProductDisplay({ name, description, price, category }: ProductDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">$2</span>
          <Badge>{category}</Badge>
        </div>
      </CardContent>
    </Card>
  )
}`;

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10">
      <Carousel className="lg:row-end-1 lg:col-span-4">
        <CarouselContent>
          {data?.images.map((item, index) => (
            <CarouselItem key={index}>
              <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
                <Image
                  src={item as string}
                  alt="Product image"
                  fill
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </Carousel>

      <div className="max-w-2xl mx-auto mt-5 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{data?.name}</h1>
        <p className="mt-6 text-muted-foreground">{data?.smallDescription}</p>

        <form action={BuyProduct}>
          <input type="hidden" name="id" value={data?.id} />
          <BuyButton price={data?.price as number} />
        </form>

        <div className="border-t border-gray-200 mt-10 pt-10">
          <div className="grid grid-cols-2 w-full gap-y-3">
            <h3 className="text-sm font-medium text-muted-foreground col-span-1">Released:</h3>
            <h3 className="text-sm font-medium col-span-1">
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "full",
              }).format(data?.createdAt)}
            </h3>
            <h3 className="text-sm font-medium text-muted-foreground col-span-1">Category</h3>
            <h3 className="text-sm font-medium col-span-1">{data?.category}</h3>
          </div>

          <div className="border-t border-gray-200 mt-10"></div>
        </div>
      </div>

      <div className="w-full max-x-2xl mx-auto mt-6 lg:mt-0 lg:col-span-7 pb-16 px-2 lg:px-0">
        <ProductDescription content={data?.description as JSONContent} />
      </div>

      <CodePreview jsx={productCode} />
    </div>
  );
};

export default ProductPage;
