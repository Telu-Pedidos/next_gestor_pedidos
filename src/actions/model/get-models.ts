"use server";

import { GET_MODELS } from "@/functions/api";
import apiError from "@/functions/api-error";
import { ModelResponse } from "@/models/model";
import { cookies } from "next/headers";

export default async function getModels() {
  try {
    const { url } = GET_MODELS();
    const token = cookies().get("token")?.value;
    if (!token) throw new Error("Token inválido");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
      next: { tags: ["models"] }
    });

    if (!response.ok) throw new Error("Erro ao buscar os modelos.");
    const data = (await response.json()) as ModelResponse[];

    return { data, ok: true, error: "" };
  } catch (error) {
    return apiError(error);
  }
}
