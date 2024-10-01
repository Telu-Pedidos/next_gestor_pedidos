"use server";

import { POST_PRODUCT } from "@/functions/api";
import apiError from "@/functions/api-error";
import { ProductFormValues } from "@/validations/product-validation";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export default async function createProduct(formData: ProductFormValues) {
  try {
    const { url } = POST_PRODUCT();
    const token = cookies().get("token")?.value;
    if (!token) throw new Error("Token inválido");

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao cadastrar o produto");
    }

    revalidateTag("products");
    return { data: "", ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
