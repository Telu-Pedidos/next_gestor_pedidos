"use server";

import { GET_CATEGORIES } from "@/functions/api";
import apiError from "@/functions/api-error";
import { CategoryResponse } from "@/models/category";
import { cookies } from "next/headers";

export default async function getCategories() {
  try {
    const { url } = GET_CATEGORIES();
    const token = cookies().get("token")?.value;
    if (!token) throw new Error("Token inválido");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
      next: { tags: ["categories"] }
    });

    if (!response.ok) throw new Error("Erro ao buscar as categorias.");
    const data = (await response.json()) as CategoryResponse[];

    return { data, ok: true, error: "" };
  } catch (error) {
    return apiError(error);
  }
}
