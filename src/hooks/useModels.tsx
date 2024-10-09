/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { uploadImage } from "@/actions/imagekit/upload-image";
import createModel from "@/actions/model/create-model";
import editModel from "@/actions/model/edit-model";
import getModels from "@/actions/model/get-models";
import { ModelResponse } from "@/models/model";
import { ModelFormValues } from "@/validations/model-validation";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";

export default function useModels({ id }: { id?: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [models, setModels] = useState<ModelResponse[]>();

  const [previewImage, setPreviewImage] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const getAllModels = () => {
    startTransition(async () => {
      try {
        const result = await getModels();
        if (result.ok) {
          setModels(result.data);
        } else {
          console.error(result.error || "Erro ao buscar os modelos");
        }
      } catch (error) {
        toast.error("Erro ao buscar os modelos.");
        console.error(error);
      }
    });
  };

  const onSubmit = async (modelData: ModelFormValues) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        if (modelData.file) {
          formData.append("file", modelData.file);

          const imageData = await uploadImage(formData);

          const newImageUrl = imageData.url;

          if (!newImageUrl) {
            throw new Error("Erro ao obter a URL da imagem");
          }

          modelData.imageUrl = newImageUrl;
        }

        if (id) {
          await handleEditModel(modelData);
        } else {
          await handleCreateModel(modelData);
        }
      } catch (error) {
        console.error("Erro:", error);
        toast.error("Ocorreu um erro ao salvar o modelo.");
      }
    });
  };

  const handleCreateModel = async (data: ModelFormValues) => {
    const { file, ...newData } = data;

    try {
      const result = await createModel(newData);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success("Modelo cadastrado com sucesso!");
      router.push("/dashboard/modelos");
    } catch (error) {
      console.error("Erro no servidor", error);
      toast.error("Ocorreu um erro ao cadastrar o modelo.");
    }
  };

  const handleEditModel = async (data: ModelFormValues) => {
    if (!id) {
      router.push("/dashboard/modelos");
      return;
    }

    const { file, ...newData } = data;

    try {
      const result = await editModel(newData, id);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success("Modelo alterado com sucesso!");
      router.push("/dashboard/modelos");
    } catch (error) {
      console.error("Erro no servidor", error);
      toast.error("Ocorreu um erro ao alterar o modelo.");
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/modelos");
  };
  const handleImageChange = (file: File | null) => {
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    getAllModels();
  }, []);

  return {
    handleCreateModel,
    handleEditModel,
    handleCancel,
    handleImageChange,
    onSubmit,
    isPending,
    models,
    previewImage,
    selectedFile
  };
}
