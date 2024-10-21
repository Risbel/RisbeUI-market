"use server";
import prisma from "@/app/lib/db";
import { State } from "@/types/state";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { CAtegoryTypes } from "@prisma/client";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(3, { message: "The name have to be a min character length of 5" }),
  category: z.string().min(1, { message: "Category is required" }),
  price: z.number().min(0, { message: "Price can't be negative numbers" }),
  smallDescription: z.string().min(10, { message: "Please summerize your product more" }),
  description: z.string().min(10, { message: "Description required" }),
  images: z.array(z.string(), { message: "Images are required" }),
  productFile: z.string().min(10, { message: "Please upload a zip of your product" }),
});

export async function SellProduct(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Something went wrong");
  }

  const validateFields = productSchema.safeParse({
    name: formData.get("name"),
    category: formData.get("category"),
    price: Number(formData.get("price")),
    smallDescription: formData.get("smallDescription"),
    description: formData.get("description"),
    images: JSON.parse(formData.get("images") as string),
    productFile: formData.get("productFile"),
  });

  if (!validateFields.success) {
    const state: State = {
      status: "error",
      errors: validateFields.error.flatten().fieldErrors,
      message: "Oops, I think there is a mistake with your inputs.",
    };

    return state;
  }

  await prisma.product.create({
    data: {
      name: validateFields.data.name,
      category: validateFields.data.category as CAtegoryTypes,
      smallDescription: validateFields.data.smallDescription,
      description: JSON.parse(validateFields.data.description),
      price: validateFields.data.price,
      images: validateFields.data.images,
      productFile: validateFields.data.productFile,
      userId: user.id,
    },
  });

  const state: State = {
    status: "success",
    message: "Your Product has been created.",
  };

  return state;
}
