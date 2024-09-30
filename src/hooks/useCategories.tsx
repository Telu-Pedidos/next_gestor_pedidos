"use client";

import getCategories from "@/actions/category/get-categories";
import { CategoryResponse } from "@/models/category";
import { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";

export default function useCategories() {
  const [isPendingCategories, startTransition] = useTransition();
  const [categories, setCategories] = useState<CategoryResponse[]>();

  const getAllCategories = () => {
    startTransition(async () => {
      try {
        const result = await getCategories();
        if (result.ok) {
          setCategories(result.data);
        } else {
          console.error(result.error || "Erro ao buscar as categorias");
        }
      } catch (error) {
        toast.error("Erro ao buscar as categorias.");
        console.error(error);
      }
    });
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return {
    isPendingCategories,
    startTransition,
    categories
  };
}
