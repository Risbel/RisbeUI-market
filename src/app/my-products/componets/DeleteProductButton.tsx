"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { DeleteProduct } from "@/server/actions/product";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteProductButton = ({ id }: { id: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      setIsLoading(true);

      try {
        const response = await DeleteProduct(id);

        if (response.status === "success") {
          toast({
            title: "Product deleted",
            description: "Product deleted successfuly.",
            variant: "default",
          });
          router.refresh(); // Refresca los datos dinámicos
        } else {
          toast({
            title: "Unespected error",
            description: response.message || "Your product can't be deleted.",
            variant: "default",
          });
        }
      } catch (error) {
        toast({
          title: "Unespected error",
          description: "Unespected error during the delete action",
          variant: "default",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <Button
      className="flex gap-2 items-center"
      type="button"
      variant="destructive"
      onClick={() => handleDelete(id)}
      disabled={isLoading}
    >
      Eliminar
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
    </Button>
  );
};

export default DeleteProductButton;
