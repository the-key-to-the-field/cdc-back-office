"use server";
import { UTApi } from "uploadthing/server";

export interface uploadResponse {
  data: Data | null; // Allow data to be null
  error: Error | null; // Allow error to be null
}

export interface Data {
  key: string;
  url: string;
  appUrl: string;
  lastModified?: number; // Make optional
  name: string;
  size: number;
  type: string;
  customId: string | number | object; // Specify a more precise type
  fileHash: string;
}
interface deleteResponse {
  success: boolean;
  // error: string;
}
const utapi = new UTApi();

export const deleteUTFiles = async (files: string[]) => {
  try {
    await utapi.deleteFiles(files);
  } catch (error) {
    console.error("UTAPI: Error deleting files", error);
  }
};
export async function uploadFiles(
  formData: FormData,
): Promise<uploadResponse[]> {
  const files = formData.getAll("files") as File[];
  try {
    const response = await utapi.uploadFiles(files);
    console.log("response", response);
    return response.map((result) => ({
      data: result.data
        ? {
            key: result.data.key,
            url: result.data.url,
            appUrl: result.data.appUrl,
            lastModified: result.data.lastModified,
            name: result.data.name,
            size: result.data.size,
            type: result.data.type,
            customId: result.data.customId as string | number | object, // Ensure customId is a string or number
            fileHash: result.data.fileHash,
          }
        : null,
      error: result.error ? new Error(result.error.message) : null,
    }));
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to upload files: ${error.message}`);
    } else {
      throw new Error("Failed to upload files: Unknown error");
    }
  }
}
