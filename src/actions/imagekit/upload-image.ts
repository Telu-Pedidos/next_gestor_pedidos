"use server";

import ImageKit from "imagekit";

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!
});

export const uploadImage = async (formData: FormData) => {
  const image = formData.get("file") as File | null;

  if (!image) {
    throw new Error("A imagem é necessária.");
  }

  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const response = await imageKit.upload({
      file: buffer,
      fileName: image.name
    });

    return response;
  } catch (error) {
    console.error("Erro ao fazer upload da imagem:", error);
    throw new Error("Falha ao fazer upload da imagem.");
  }
};
