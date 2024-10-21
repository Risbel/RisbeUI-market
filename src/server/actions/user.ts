"use server";

import prisma from "@/app/lib/db";
import { State } from "@/types/state";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { z } from "zod";

export async function UpdateUserSettings(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Something went wrong");
  }

  const userSettingsSchema = z.object({
    name: z.string().min(1, { message: "Minimum length of 3 required" }).or(z.literal("")).optional(),
  });

  const validateFields = userSettingsSchema.safeParse({
    name: formData.get("name"),
  });

  if (!validateFields.success) {
    const state: State = {
      status: "error",
      errors: validateFields.error.flatten().fieldErrors,
      message: "Oops, I think is a mistake with your inputs.",
    };

    return state;
  }

  const data = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      name: validateFields.data.name,
    },
  });

  const state: State = {
    status: "success",
    message: "Your settings have been uploaded",
  };

  return state;
}
