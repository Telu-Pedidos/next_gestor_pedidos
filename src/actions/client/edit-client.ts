"use server";

import { PUT_CLIENT } from "@/functions/api";
import apiError from "@/functions/api-error";
import { ClientFormValues } from "@/validations/client-validation";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export default async function editClient(
  formData: ClientFormValues,
  id: string
) {
  try {
    const { url } = PUT_CLIENT(id);
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
      throw new Error(errorData.message || "Erro ao editar o cliente");
    }

    revalidateTag("clients");
    return { data: "", ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
