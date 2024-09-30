"use client";

import getModels from "@/actions/model/get-models";
import { ModelResponse } from "@/models/model";
import { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";

export default function useModels() {
  const [isPendingModels, startTransition] = useTransition();
  const [models, setModels] = useState<ModelResponse[]>();

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

  useEffect(() => {
    getAllModels();
  }, []);

  return {
    isPendingModels,
    startTransition,
    models
  };
}
