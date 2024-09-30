"use server";

import { GET_MODEL_ID } from "@/functions/api";
import apiError from "@/functions/api-error";
import { ModelResponse } from "@/models/model";
import { cookies } from "next/headers";

type getModelParams = {
  id: string;
};

export default async function getModelId({ id }: getModelParams) {
  try {
    const { url } = GET_MODEL_ID(id);
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
      throw new Error(errorData.message || "Erro ao buscar o modelo.");
    }

    const data = (await response.json()) as ModelResponse;

    return { data, ok: true, error: "" };
  } catch (error) {
    return apiError(error);
  }
}
