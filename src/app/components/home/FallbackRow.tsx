import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import SkeletonProductCard from "./SkeletonProductCard";

const FallbackRow = () => {
  return (
    <div>
      <Skeleton className="h-8 w-56" />
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 gap-10 lg:grid-cols-3">
        <SkeletonProductCard />
        <SkeletonProductCard />
        <SkeletonProductCard />
      </div>
    </div>
  );
};

export default FallbackRow;
