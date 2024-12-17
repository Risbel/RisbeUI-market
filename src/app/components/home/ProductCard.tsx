import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

interface iAppProps {
  images: string[];
  name: string;
  price: number;
  smallDescription: string;
  id: string;
}

const ProductCard = ({ images, name, price, smallDescription, id }: iAppProps) => {
  return (
    <div className="flex flex-col justify-between bg-gray-50 p-4 rounded-xl hover:shadow-md">
      <Carousel className="w-full mx-auto">
        <CarouselContent>
          {images.map((image, index) => {
            return (
              <CarouselItem key={index}>
                <div className="relative h-[230px]">
                  <Image alt="product image" src={image} fill className="object-cover w-full h-full rounded-lg" />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="ml-14" />
        <CarouselNext className="mr-14" />
      </Carousel>

      <div className="flex justify-between items-center mt-1">
        <h1 className="font-bold max-w-[85%] text-nowrap text-ellipsis overflow-clip">{name}</h1>
        {price == 0 ? (
          <p className="px-2 bg-green-200 text-sm md:text-md font-semibold border-2 border-green-300 rounded-2xl text-green-700">
            free
          </p>
        ) : (
          <p className="px-2 bg-blue-200 text-sm md:text-md font-bold border-2 border-blue-300 rounded-2xl text-blue-900">
            ${price}
          </p>
        )}
      </div>
      <p className="text-gray-500 text-sm line-clamp-2">{smallDescription}</p>

      <Button asChild className="w-full mt-5">
        <Link href={`/product/${id}`}>More details</Link>
      </Button>
    </div>
  );
};

export default ProductCard;
