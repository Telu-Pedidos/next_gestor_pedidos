/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { ProductFormValues } from "@/validations/product-validation";
import toast from "react-hot-toast";
import createProduct from "@/actions/product/create-product";
import editProduct from "@/actions/product/edit-product";
import getProducts from "@/actions/product/get-products";
import { ProductResponse } from "@/models/product";
import { uploadImage } from "@/actions/imagekit/upload-image";

export default function useProducts({ id }: { id?: string }) {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const [previewImage, setPreviewImage] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [products, setProducts] = useState<ProductResponse[]>();

  const getAllProducts = () => {
    startTransition(async () => {
      try {
        const result = await getProducts();
        if (result.ok) {
          setProducts(result.data);
        } else {
          console.error(result.error || "Erro ao buscar os produtos");
        }
      } catch (error) {
        toast.error("Erro ao buscar os produtos.");
        console.error(error);
      }
    });
  };

  const onSubmit = async (modelData: ProductFormValues) => {
    startTransition(async () => {
      try {
        if (modelData.file) {
          const formData = new FormData();
          formData.append("file", modelData.file);

          const imageData = await uploadImage(formData);

          const newImageUrl = imageData.url;

          if (!newImageUrl) {
            throw new Error("Erro ao obter a URL da imagem");
          }

          modelData.imageUrl = newImageUrl;

          if (id) {
            await handleEditProduct(modelData);
          } else {
            await handleCreateProduct(modelData);
          }
        }
      } catch (error) {
        console.error("Erro:", error);
        toast.error("Ocorreu um erro ao salvar o modelo.");
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

  useEffect(() => {
    getAllProducts();
  }, []);

  return {
    onSubmit,
    selectedFile,
    handleImageChange,
    previewImage,
    handleCancel,
    isPending,
    products
  };
}
