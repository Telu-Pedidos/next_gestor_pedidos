"use server";

import { GET_PRODUCT_ID } from "@/functions/api";
import apiError from "@/functions/api-error";
import { ProductResponse } from "@/models/product";
import { cookies } from "next/headers";

type getProductParams = {
  id: string;
};

export default async function getProductId({ id }: getProductParams) {
  try {
    const { url } = GET_PRODUCT_ID(id);
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
      throw new Error(errorData.message || "Erro ao buscar o produto.");
    }

    const data = (await response.json()) as ProductResponse;

    return { data, ok: true, error: "" };
  } catch (error) {
    return apiError(error);
  }
}
