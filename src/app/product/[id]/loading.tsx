import { Skeleton } from "@/components/ui/skeleton";

const LoadingProduct = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 lg:grid lg:grid-rows-1 lg:grid-cols-7 gap-x-16 lg:gap-y-10">
      <Skeleton className="h-[500px] lg:row-end-1 lg:col-span-4 rounded-lg" />
      <div className="flex flex-col gap-4 lg:row-end-2 lg:row-span-2 lg:col-span-3">
        <Skeleton className="h-[100px]" />
        <Skeleton className="h-[100px]" />
        <Skeleton className="h-[40px]" />
        <Skeleton className="h-[40px]" />
      </div>
    </div>
  );
};

export default LoadingProduct;
