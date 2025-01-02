"use server";

import prisma from "@/app/lib/db";
import { State } from "@/types/state";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(3, { message: "The name have to be a min character length of 5" }),
  category: z.string().min(1, { message: "Category is required" }),
  price: z.number().min(0, { message: "Price can't be negative numbers" }),
  smallDescription: z.string().min(10, { message: "Please summerize your product more" }),
  description: z.string().min(10, { message: "Description required" }).optional().or(z.literal("")),
  guide: z.string().min(10, { message: "Guide required" }).optional().or(z.literal("")),
  tags: z
    .array(
      z.object({
        id: z.string().nonempty({ message: "Tag ID is required." }),
        name: z.string().nonempty({ message: "Tag name is required." }),
      })
    )
    .min(1, { message: "At least one tag is required." }),
  images: z.array(z.string(), { message: "Images are required" }),
  code: z.string().min(1, { message: "Code required" }),
});

export async function SellProduct(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    const validateFields = productSchema.safeParse({
      name: formData.get("name"),
      category: formData.get("category"),
      price: Number(formData.get("price")),
      smallDescription: formData.get("smallDescription"),
      description: formData.get("description"),
      guide: formData.get("guide"),
      tags: JSON.parse(formData.get("tags") as string), // Expecting an array of tag objects
      images: JSON.parse(formData.get("images") as string),
      code: formData.get("code") as string,
    });

    if (!validateFields.success) {
      const state: State = {
        status: "error",
        errors: validateFields.error.flatten().fieldErrors,
        message: "Oops, I think there is a mistake with your inputs.",
      };

      return state;
    }

    const validatedData = validateFields.data;

    // Extract tag IDs
    const tagConnections = validatedData.tags.map((tag: { id: string; name: string }) => ({
      id: tag.id,
    }));

    // Create the product with associated tags
    const data = await prisma.product.create({
      data: {
        name: validatedData.name,
        category: validatedData.category,
        smallDescription: validatedData.smallDescription || "",
        description: validatedData.description,
        guide: validatedData.guide,
        price: validatedData.price,
        images: validatedData.images,
        codeUrl: validatedData.code,
        userId: user.id,
        Tags: {
          connect: tagConnections, // Use `connect` with IDs
        },
      },
    });

    const state: State = {
      status: "success",
      message: "Product created successfuly",
      data: data.id,
    };

    return state;
  } catch (error) {
    console.error("Error creating product:", error);

    const state: State = {
      status: "error",
      errors: { general: ["An unexpected error occurred. Please try again."] },
      message: "Oops, something went wrong.",
    };

    return state;
  }
}

export async function DeleteProduct(productId: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product || product.userId !== user.id) {
      throw new Error("Product not found or you do not have permission to delete it.");
    }

    await prisma.product.update({
      where: { id: productId },
      data: { isDeleted: true },
    });

    return {
      status: "success",
      message: "Product marked as deleted successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: "The product could not be marked as deleted",
    };
  }
}
