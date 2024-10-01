"use server";

import { PUT_ORDER } from "@/functions/api";
import apiError from "@/functions/api-error";
import { OrderFormValues } from "@/validations/order-validation";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export default async function editOrder(formData: OrderFormValues, id: string) {
  try {
    const { url } = PUT_ORDER(id);
    const token = cookies().get("token")?.value;
    if (!token) throw new Error("Token inválido");

    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao editar o pedido");
    }

    revalidateTag("orders");
    return { data: "", ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
