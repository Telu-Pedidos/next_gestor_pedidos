/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { ProductFormValues } from "@/validations/product-validation";
import { uploadImage } from "@/lib/cloudinary/upload-image";
import toast from "react-hot-toast";
import createProduct from "@/actions/product/create-product";
import editProduct from "@/actions/product/edit-product";

export default function useProducts({ id }: { id?: string }) {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const [previewImage, setPreviewImage] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onSubmit = async (data: ProductFormValues) => {
    startTransition(async () => {
      try {
        if (data.file) {
          const formData = new FormData();
          formData.append("upload-image", data.file);
          const uploadResult = await uploadImage(formData);
          if (uploadResult?.secure_url) {
            data.imageUrl = uploadResult.secure_url;
          } else {
            toast.error("Erro ao fazer upload da imagem.");
            return;
          }
        }

        if (id) {
          await handleEditProduct(data);
        } else {
          await handleCreateProduct(data);
        }
      } catch (error) {
        console.error("Erro:", error);
      }
    });
  };

  const handleCreateProduct = async (data: ProductFormValues) => {
    const { file, ...newData } = data;

    try {
      const result = await createProduct(newData);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success("Produto cadastrado com sucesso!");
      router.push("/dashboard/produtos");
    } catch (error) {
      console.error("Erro no servidor", error);
      toast.error("Ocorreu um erro ao cadastrar o produto.");
    }
  };

  const handleEditProduct = async (data: ProductFormValues) => {
    if (!id) {
      router.push("/dashboard/produtos");
      return;
    }

    const { file, ...newData } = data;

    try {
      const result = await editProduct(newData, id);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success("Produto alterado com sucesso!");
      router.push("/dashboard/produtos");
    } catch (error) {
      console.error("Erro no servidor", error);
      toast.error("Ocorreu um erro ao alterar o produto.");
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/produtos");
  };
  const handleImageChange = (file: File | null) => {
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return {
    onSubmit,
    selectedFile,
    handleImageChange,
    previewImage,
    handleCancel,
    isPending
  };
}
