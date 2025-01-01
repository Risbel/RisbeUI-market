"use server";

import { Code } from "@/app/sell/components/SellForm";
import { State } from "@/types/state";
import { UTApi, UTFile } from "uploadthing/server";
import { z } from "zod";

export async function uploadJsonFile(code: Code) {
  const utapi = new UTApi();

  const codeSchema = z.object({
    jsx: z.string().min(10, { message: "Minimum length of 10 required" }),
    tsx: z.string().min(10, { message: "Minimum length of 10 required" }),
  });

  const validateField = codeSchema.safeParse(code);

  if (!validateField.success) {
    const state: State = {
      status: "error",
      errors: validateField.error.flatten().fieldErrors,
      message: "Invalid code.",
    };

    return state;
  }

  // Create a JSON file
  const file = new UTFile([JSON.stringify(code, null, 2)], "code.json", {
    type: "application/json",
  });

  // Upload the file to UploadThing
  const response = await utapi.uploadFiles([file]);

  if (!response[0]?.data?.url) {
    const state: State = {
      status: "error",
      message: `${response[0].error?.message}`,
    };

    return state;
  }

  const state: State = {
    status: "success",
    message: "Your settings have been uploaded",
    data: response[0]?.data?.url,
  };

  return state;
}
