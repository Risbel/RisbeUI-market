import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingSettings = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <Card>
        <CardHeader className="h-[300px]">
          <Skeleton className="w-full h-full" />
        </CardHeader>
      </Card>
    </div>
  );
};

export default LoadingSettings;
