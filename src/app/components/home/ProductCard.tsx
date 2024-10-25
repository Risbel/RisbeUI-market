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
    <div className="rounded-lg">
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

      <div className="flex justify-between items-center mt-2">
        <h1 className="font-semibold">{name}</h1>
        <h3>${price}</h3>
      </div>
      <p className="text-gray-600 line-clamp-2">{smallDescription}</p>

      <Button asChild className="w-full mt-5">
        <Link href={`/product/${id}`}>More details</Link>
      </Button>
    </div>
  );
};

export default ProductCard;
