"use server";

import { GET_CLIENT_ID } from "@/functions/api";
import apiError from "@/functions/api-error";
import { ClientResponse } from "@/models/client";
import { cookies } from "next/headers";

type getClientParams = {
  id: string;
};

export default async function getClientId({ id }: getClientParams) {
  try {
    const { url } = GET_CLIENT_ID(id);
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
      throw new Error(errorData.message || "Erro ao buscar o cliente.");
    }

    const data = (await response.json()) as ClientResponse;

    return { data, ok: true, error: "" };
  } catch (error) {
    return apiError(error);
  }
}
