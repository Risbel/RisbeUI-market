"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectCategory from "./SelectCategory";
import { Textarea } from "@/components/ui/textarea";
import TipTapEditor from "@/app/components/editor/Editor";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { type State } from "@/types/state";
import { SellProduct } from "@/server/actions/product";
import { type JSONContent } from "@tiptap/react";
import CodeInput from "./CodeInput";
import { cn } from "@/lib/utils";

const SellForm = () => {
  const initialState: State = { message: "", status: undefined };
  const { pending, data } = useFormStatus();
  const [state, formAction] = useFormState(SellProduct, initialState);
  const [json, setJson] = useState<null | JSONContent>(null);
  const [images, setImages] = useState<null | string[]>(null);
  const [productFile, setProductFile] = useState<null | string>(null);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (state.status === "success") {
      toast({
        variant: "default",
        title: "Successful",
        description: "The Product was created successfully!",
      });
    } else if (state.status === "error") {
      toast({
        variant: "destructive",
        title: "Erros",
        description: `There was an error! ${state.message}`,
      });
    }
  }, [state]);

  return (
    <form action={formAction}>
      <Card>
        <CardHeader>
          <CardTitle>Sell your product with easy</CardTitle>
          <CardDescription>Describe your product here in detail so that it can be sold</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-3 lg:gap-y-5">
          <div className="flex flex-col gap-y-2">
            <Label>Name</Label>
            <Input minLength={3} name="name" type="text" placeholder="Name of the product" />
            {state?.errors?.["name"]?.[0] && <p className="text-destructive">{state.errors?.["name"]?.[0]}</p>}
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Category</Label>
            <SelectCategory selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            {state?.errors?.["category"]?.[0] && <p className="text-destructive">{state.errors?.["category"]?.[0]}</p>}
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Price</Label>
            <Input min={0} name="price" placeholder="$29" type="number" />
            {state?.errors?.["price"]?.[0] && <p className="text-destructive">{state.errors?.["price"]?.[0]}</p>}
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Small Sumary</Label>
            <Textarea
              required
              name="smallDescription"
              minLength={10}
              placeholder="Please describe your product shortly right here..."
            />
            {state?.errors?.["smallDescription"]?.[0] && (
              <p className="text-destructive">{state.errors?.["smallDescription"]?.[0]}</p>
            )}
          </div>
          <div className="flex flex-col gap-y-2">
            <input type="hidden" name="description" value={JSON.stringify(json)} />
            <Label>Description</Label>
            <TipTapEditor json={json} setJson={setJson} />
            {state?.errors?.["description"]?.[0] && (
              <p className="text-destructive">{state.errors?.["description"]?.[0]}</p>
            )}
          </div>
          <div className={cn(selectedCategory !== "template" && "hidden")}>
            <Label>Code</Label>
            <CodeInput />
          </div>
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex-1 flex flex-col gap-y-2">
              <input type="hidden" name="images" value={JSON.stringify(images)} />
              <Label>Product Images</Label>
              <UploadDropzone
                endpoint="imageUploader"
                disabled={images ? true : false}
                onClientUploadComplete={(res) => {
                  setImages(res.map((item) => item.url));
                  toast({
                    variant: "default",
                    description: "Your images have been uploaded",
                  });
                }}
                onUploadError={(error) => {
                  toast({
                    variant: "destructive",
                    description: `${state.message}`,
                  });
                }}
              />
              {state?.errors?.["images"]?.[0] && <p className="text-destructive">{state.errors?.["images"]?.[0]}</p>}
            </div>

            <div className="flex-1 flex flex-col gap-y-2">
              <input type="hidden" name="productFile" value={JSON.stringify(productFile ?? "")} />
              <Label>Product File</Label>
              <UploadDropzone
                endpoint="productFileUpload"
                disabled={productFile ? true : false}
                onClientUploadComplete={(res) => {
                  setProductFile(res[0].url);
                  toast({
                    variant: "default",
                    description: "Your Product File have been uploaded",
                  });
                }}
                onUploadError={(error) => {
                  toast({
                    variant: "destructive",
                    description: `${state.message}`,
                  });
                }}
              />
              {state?.errors?.["productFile"]?.[0] && (
                <p className="text-destructive">{state.errors?.["productFile"]?.[0]}</p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button type="submit">Submit {pending && <Loader2 className="animate-spin" />}</Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default SellForm;
