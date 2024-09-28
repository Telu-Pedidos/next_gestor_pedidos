"use server";

import { GET_CLIENTS } from "@/functions/api";
import apiError from "@/functions/api-error";
import { ClientResponse } from "@/models/client";
import { cookies } from "next/headers";

type getClientsParams = {
  name?: string;
};

export default async function getClients({ name = "" }: getClientsParams = {}) {
  try {
    const { url } = GET_CLIENTS({ name });
    const token = cookies().get("token")?.value;
    if (!token) throw new Error("Token inválido");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
      next: { tags: ["clients"] }
    });

    if (!response.ok) throw new Error("Erro ao buscar os clientes.");
    const data = (await response.json()) as ClientResponse[];

    return { data, ok: true, error: "" };
  } catch (error) {
    return apiError(error);
  }
}
