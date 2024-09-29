"use server";

import { UploadApiOptions, UploadApiResponse } from "cloudinary";
import cloudinary from "./config";
import streamifier from "streamifier";

const uploadFileToCloud = async (
  file: File,
  options?: UploadApiOptions
): Promise<UploadApiResponse | undefined> => {
  if (file.size <= 0) return;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) reject(error.message);

        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export const uploadImage = async (formData: FormData) => {
  const file = formData.get("upload-image");
  if (file instanceof File) {
    const result = await uploadFileToCloud(file);

    return result;
  }
};
