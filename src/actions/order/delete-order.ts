"use server";

import { DELETE_ORDER } from "@/functions/api";
import apiError from "@/functions/api-error";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function deleteOrder(id: string) {
  try {
    const { url } = DELETE_ORDER(id);
    const token = cookies().get("token")?.value;
    if (!token) throw new Error("Token inválido");

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao deletar o pedido.");
    }
  } catch (error: unknown) {
    return apiError(error);
  }
  revalidateTag("orders");
  redirect("/dashboard/pedidos");
}
