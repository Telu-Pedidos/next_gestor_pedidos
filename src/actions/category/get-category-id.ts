"use server";

import { GET_CATEGORY_ID } from "@/functions/api";
import apiError from "@/functions/api-error";
import { CategoryResponse } from "@/models/category";
import { cookies } from "next/headers";

type getCategoryParams = {
  id: string;
};

export default async function getCategoryId({ id }: getCategoryParams) {
  try {
    const { url } = GET_CATEGORY_ID(id);
    const token = cookies().get("token")?.value;
    if (!token) throw new Error("Token inválido");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao buscar a categoria.");
    }

    const data = (await response.json()) as CategoryResponse;

    return { data, ok: true, error: "" };
  } catch (error) {
    return apiError(error);
  }
}
