"use client";
import { Button } from "@/components/ui/button";

const GlobalError = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  return (
    <div className="flex justify-center h-full items-center">
      <div className="flex flex-col lg:gap-4 items-center text-center lg:p-12 rounded-3xl lg:bg-secondary/90">
        <span className="text-xl sm:text-3xl lg:text-5xl font-extrabold text-primary">Oops! something went wrong</span>
        <span className="font-bold text-lg lg:text-4xl text-blue-950">please try leater...😒</span>
        <Button className="px-8 mt-4" type="button" onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </div>
  );
};

export default GlobalError;
