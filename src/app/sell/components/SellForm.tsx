"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectCategory from "./SelectCategory";
import { Textarea } from "@/components/ui/textarea";
import TipTapEditor from "@/app/components/editor/Editor";
import { Check, CheckCircle2Icon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { type State } from "@/types/state";
import { SellProduct } from "@/server/actions/product";
import { type JSONContent } from "@tiptap/react";
import CodeInput from "./CodeInput";
import ButtonUploadCode from "./ButtonUploadCode";
import CustomDropZone from "./CustomDropZone";
import { Tag, TagsSelector } from "./TagsSelector";
import { useRouter } from "next/navigation";
import SubmitButton from "@/app/components/buttons/SubmitButton";

export interface Code {
  jsx: string;
  tsx: string;
}

const SellForm = () => {
  const router = useRouter();
  const initialState: State = { message: "", status: undefined };

  const [state, formAction] = useFormState(SellProduct, initialState);
  const [descriptionJson, setDescriptionJson] = useState<null | JSONContent>(null);
  const [guideJson, setGuideJson] = useState<null | JSONContent>(null);

  const [uploadedImagesUrls, setUploadedImagesUrls] = useState<string[]>([]);

  const [code, setCode] = useState<Code>({ jsx: "", tsx: "" });
  const [uploadedCodeUrl, setUploadedCodeUrl] = useState("");
  const [activeFormat, setActiveFormat] = useState<"jsx" | "tsx">("jsx");

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    if (state.status === "success") {
      toast({
        variant: "default",
        title: "Successful",
        description: "The Product was created successfully!",
      });

      router.push(`/product/${state.data}`);
    } else if (state.status === "error") {
      toast({
        variant: "destructive",
        title: "Erros",
        description: `There was an error! ${state.message}`,
      });
    }
  }, [state]);

  const formats: ("jsx" | "tsx")[] = ["jsx", "tsx"];

  return (
    <form action={formAction}>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Sell your product with easy</CardTitle>
          <CardDescription>Describe your product here in detail so that it can be sold</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-3 lg:gap-y-5">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="name">Name</Label>
            <Input required minLength={3} id="name" name="name" type="text" placeholder="Name of the product" />
            {state?.errors?.["name"]?.[0] && <p className="text-destructive">{state.errors?.["name"]?.[0]}</p>}
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Category</Label>
            <SelectCategory selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            {state?.errors?.["category"]?.[0] && <p className="text-destructive">{state.errors?.["category"]?.[0]}</p>}
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="price">Price</Label>
            <Input id="price" min={0} name="price" placeholder="Set price for your product." type="number" />
            {state?.errors?.["price"]?.[0] && <p className="text-destructive">{state.errors?.["price"]?.[0]}</p>}
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="smallDescription">Small Sumary</Label>
            <Textarea
              required
              id="smallDescription"
              name="smallDescription"
              minLength={10}
              placeholder="Please describe your product shortly right here..."
            />
            {state?.errors?.["smallDescription"]?.[0] && (
              <p className="text-destructive">{state.errors?.["smallDescription"]?.[0]}</p>
            )}
          </div>
          <div className="flex flex-col gap-y-2">
            <input type="hidden" name="description" value={JSON.stringify(descriptionJson)} />
            <Label>Public description</Label>
            <TipTapEditor json={descriptionJson} setJson={setDescriptionJson} />
            {state?.errors?.["description"]?.[0] && (
              <p className="text-destructive">{state.errors?.["description"]?.[0]}</p>
            )}
          </div>
          <div className="flex flex-col gap-y-2">
            <input type="hidden" name="guide" value={JSON.stringify(guideJson)} />
            <Label>Guide available if product is purchased</Label>
            <TipTapEditor json={guideJson} setJson={setGuideJson} />
            {state?.errors?.["guide"]?.[0] && <p className="text-destructive">{state.errors?.["guide"]?.[0]}</p>}
          </div>
          <div>
            <input type="hidden" name="tags" value={JSON.stringify(tags)} />
            <Label>Tags</Label>
            <TagsSelector tags={tags} setTags={setTags} />
          </div>

          <div className="flex flex-col gap-2 border p-3 rounded-lg">
            <input type="hidden" name="code" value={uploadedCodeUrl} />

            <div className="flex gap-2 items-center">
              {formats.map((format) => (
                <button
                  type="button"
                  key={format}
                  onClick={() => setActiveFormat(format)}
                  className={`relative px-4 pr-8 py-2 rounded-md transition ${
                    activeFormat === format ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
                  }`}
                >
                  {format.toUpperCase()}
                  {code[format] && (
                    <Check className="absolute top-1 right-1 h-4 w-4 rounded-md border border-black stroke-black bg-white"></Check>
                  )}
                </button>
              ))}
            </div>

            <CodeInput
              id={activeFormat}
              code={code[activeFormat]}
              setCode={(newCode: string) =>
                setCode((prev) => ({
                  ...prev,
                  [activeFormat]: newCode,
                }))
              }
              isDisabled={false}
            />

            <ButtonUploadCode
              isDisabled={(!code.jsx && !code.tsx) || uploadedCodeUrl ? true : false}
              setUploadedCodeUrl={setUploadedCodeUrl}
              code={code}
            />

            {uploadedCodeUrl && (
              <div className="mt-2">
                <p className="text-green-600">Code uploaded successfully</p>
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex-1 flex flex-col gap-y-1">
              <Label htmlFor="dropzone-file">Product Images</Label>
              <input type="hidden" name="images" readOnly value={JSON.stringify(uploadedImagesUrls)} />
              {!uploadedImagesUrls?.length ? (
                <CustomDropZone setUploadedImagesUrls={setUploadedImagesUrls} uploadedImagesUrls={uploadedImagesUrls} />
              ) : (
                <div className="flex items-center max-w-max font-medium text-green-900 gap-2 mt-2 px-4 py-2 bg-green-200 rounded-md">
                  <p>Images uploaded successfuly</p>
                  <CheckCircle2Icon />
                </div>
              )}

              {state?.errors?.["images"]?.[0] && <p className="text-destructive">{state.errors?.["images"]?.[0]}</p>}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <SubmitButton
            title="Create product"
            loadingText="Creating product..."
            isDisabled={!setUploadedCodeUrl || uploadedImagesUrls.length === 0}
          />
        </CardFooter>
      </Card>
    </form>
  );
};

export default SellForm;
