import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { uploadImage } from "@/server/actions/uploadImage";
import { Loader, UploadCloud, X } from "lucide-react";
import Image from "next/image";
import React, { useState, useTransition } from "react";

export default function CustomDropZone({
  setUploadedImagesUrls,
  uploadedImagesUrls,
}: {
  setUploadedImagesUrls: React.SetStateAction<any>;
  uploadedImagesUrls: string[];
}) {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSelectImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];

    // Combine current selected files with new files
    const totalFiles = [...selectedImages, ...files];

    // Validate the total number of files
    if (totalFiles.length > 3) {
      setError("You can only upload up to 3 files.");
      return;
    }

    // Validate file sizes (600KB = 600 * 1024 bytes)
    const oversizedFiles = files.filter((file) => file.size > 500 * 1024);
    if (oversizedFiles.length > 0) {
      setError("Files can't exceed the 500KB of size.");
      return;
    }

    setError(null); // Clear previous error
    setSelectedImages(totalFiles);
  };

  const handleUploadImages = () => {
    startTransition(async () => {
      const uploadedUrls: string[] = [];

      //  list of promises the upload of all the images
      const uploadPromises = selectedImages.map(async (file) => {
        // Optional: Add timestamp to the original file name
        const timestamp = Date.now();
        const customName = `${file.name}-${timestamp}`;

        // Convert file to Base64
        const base64Data = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve((reader.result as string).split(",")[1]);
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        });

        const {
          status,
          url: imageUrl,
          errorMessage,
        } = await uploadImage({
          name: customName,
          type: file.type,
          data: base64Data,
        });

        if (status === "success" && imageUrl) {
          uploadedUrls.push(imageUrl);
        } else {
          toast({ variant: "destructive", title: "Error", description: errorMessage || "Failed to upload image." });
        }
      });

      await Promise.all(uploadPromises);

      setUploadedImagesUrls(uploadedUrls);
      setSelectedImages([]);
    });
  };

  return (
    <div className="space-y-3">
      {/* DropZone */}

      {!uploadedImagesUrls.length && (
        <div className="flex items-center justify-center w-full mt-2">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-blue-100"
          >
            <div className="flex flex-col items-center justify-center pt-2 pb-2">
              <UploadCloud height={40} width={40} className="stroke-blue-700" />
              {selectedImages.length == 0 ? (
                <>
                  <p className="text-xs text-center">
                    <span className="font-semibold">Click to upload</span> or drag and drop <br />
                    <span>Images for your event</span>
                  </p>
                </>
              ) : (
                <div>
                  <span>
                    {selectedImages.length} file{selectedImages.length > 1 && "s"} selected
                  </span>
                </div>
              )}
            </div>
            <input
              hidden
              required
              disabled={isPending ? true : false}
              id="dropzone-file"
              type="file"
              accept="image/*"
              multiple
              onChange={handleSelectImages}
              max={2}
            />
          </label>
        </div>
      )}
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

      {/* Preview List */}
      {selectedImages.length > 0 && (
        <div className="space-y-4">
          <p className="text-sm font-semibold text-gray-700">Selected Images:</p>
          <div className="flex flex-wrap gap-4">
            {selectedImages.map((image, index) => {
              return (
                <div key={index} className="relative p-3 bg-gray-100 border rounded-lg shadow-sm">
                  {/* Thumbnail */}
                  <Image
                    height={200}
                    width={350}
                    src={URL.createObjectURL(image)}
                    alt={`Selected ${index}`}
                    className="object-cover  h-[200px] w-[350] rounded-md"
                  />
                  {/* Filename */}
                  <p className="mt-2 text-sm font-medium text-center text-gray-600 truncate">{image.name}</p>
                  {/* Remove Button */}
                  <button
                    type="button"
                    disabled={isPending ? true : false}
                    onClick={() => setSelectedImages((prev) => prev.filter((_, i) => i !== index))}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
                    aria-label="Remove image"
                  >
                    <X size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Upload Button */}
      <Button
        className="flex gap-2 mb-2 rounded-3xl"
        disabled={selectedImages.length === 0 || isPending ? true : false}
        type="button"
        onClick={handleUploadImages}
      >
        <span className="text-xs"> {isPending ? "Uploading..." : "Upload Images"}</span>
        {isPending ? <Loader className="animate-spin stroke-white" /> : <UploadCloud />}
      </Button>
    </div>
  );
}
