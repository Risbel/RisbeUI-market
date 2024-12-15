"use server";

import { UTApi, UTFile } from "uploadthing/server";

type UploadResult = {
  fileName: string;
  status: "success" | "error";
  url?: string;
  errorMessage?: string;
};

export async function uploadImage(file: { name: string; type: string; data: string }): Promise<UploadResult> {
  const { name, type, data } = file;

  try {
    const fileBuffer = Buffer.from(data, "base64");
    const utFile = new UTFile([fileBuffer], name, { type });

    const utapi = new UTApi();

    const response = await utapi.uploadFiles([utFile]);

    if (!response[0]?.data?.url) {
      return {
        fileName: name,
        status: "error",
        errorMessage: response[0]?.error?.message || "Unknown error",
      };
    }

    return {
      fileName: name,
      status: "success",
      url: response[0].data.url,
    };
  } catch (error) {
    return {
      fileName: name,
      status: "error",
      errorMessage: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
