"use server";

import { GET_PRODUCTS } from "@/functions/api";
import apiError from "@/functions/api-error";
import { ProductResponse } from "@/models/product";
import { cookies } from "next/headers";

export default async function getProducts() {
  try {
    const { url } = GET_PRODUCTS();
    const token = cookies().get("token")?.value;
    if (!token) throw new Error("Token inválido");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
      next: { tags: ["products"] }
    });

    if (!response.ok) throw new Error("Erro ao buscar os produtos.");
    const data = (await response.json()) as ProductResponse[];

    return { data, ok: true, error: "" };
  } catch (error) {
    return apiError(error);
  }
}
