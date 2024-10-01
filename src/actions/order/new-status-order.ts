"use server";

import { NEW_STATUS_ORDER } from "@/functions/api";
import apiError from "@/functions/api-error";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

type newStatusParams = {
  id: string;
  newStatus: string;
};

export default async function newStatusOrder({
  id,
  newStatus
}: newStatusParams) {
  try {
    const { url } = NEW_STATUS_ORDER({ id, newStatus });
    const token = cookies().get("token")?.value;
    if (!token) throw new Error("Token inválido");

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Erro ao alterar o status do pedido"
      );
    }

    revalidateTag("orders");
    return { data: "", ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
