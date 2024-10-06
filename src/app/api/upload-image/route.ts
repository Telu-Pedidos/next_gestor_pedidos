/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary/config";
import streamifier from "streamifier";
import { UploadApiResponse } from "cloudinary";

export async function POST(req: NextRequest) {
  console.log("Request:", req);
  try {
    const formData = await req.formData();
    const file = formData.get("upload-image") as Blob;

    if (!file) {
      return NextResponse.json(
        { error: "Nenhum arquivo encontrado" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result: UploadApiResponse = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result: UploadApiResponse) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      streamifier.createReadStream(buffer).pipe(uploadStream);
    });

    return NextResponse.json(
      { secure_url: result.secure_url },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erro no upload:", error);
    return NextResponse.json(
      { error: `Erro no upload da imagem: ${error.message}`, details: error },
      { status: 500 }
    );
  }
}
