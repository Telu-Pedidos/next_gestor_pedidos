"use client";

import createCategory from "@/actions/category/create-category";
import editCategory from "@/actions/category/edit-category";
import getCategories from "@/actions/category/get-categories";
import { CategoryResponse } from "@/models/category";
import { CategoryFormValues } from "@/validations/category-validation";
import { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";

export default function useCategories({ id }: { id?: string }) {
  const [isPending, startTransition] = useTransition();
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

  const handleCreateCategory = async (data: CategoryFormValues) => {
    try {
      const result = await createCategory(data);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success("Categoria cadastrada com sucesso!");
    } catch (error) {
      console.error("Erro no servidor", error);
      toast.error("Ocorreu um erro ao cadastrar a categoria.");
    }
  };

  const handleEditCategory = async (data: CategoryFormValues) => {
    if (!id) {
      return;
    }

    try {
      const result = await editCategory(data, id);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success("Categoria alterada com sucesso!");
    } catch (error) {
      console.error("Erro no servidor", error);
      toast.error("Ocorreu um erro ao alterar a categoria.");
    }
  };

  const onSubmit = async (data: CategoryFormValues) => {
    startTransition(async () => {
      try {
        if (id) {
          await handleEditCategory(data);
        } else {
          await handleCreateCategory(data);
        }
      } catch (error) {
        console.error("Erro:", error);
      }
    });
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return {
    handleCreateCategory,
    handleEditCategory,
    onSubmit,
    isPending,
    categories
  };
}
