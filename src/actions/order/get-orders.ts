"use server";

import { GET_ORDERS } from "@/functions/api";
import apiError from "@/functions/api-error";
import { OrderResponse } from "@/models/order";
import { cookies } from "next/headers";

type getOrdersParams = {
  status?: string;
  startDate?: string;
  endDate?: string;
};

export default async function getOrders({
  status,
  startDate,
  endDate
}: getOrdersParams) {
  try {
    const { url } = GET_ORDERS({ status, startDate, endDate });
    const token = cookies().get("token")?.value;
    if (!token) throw new Error("Token inválido");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
      next: { tags: ["orders"] }
    });

    if (!response.ok) throw new Error("Erro ao buscar os pedidos.");
    const data = (await response.json()) as OrderResponse[];

    return { data, ok: true, error: "" };
  } catch (error) {
    return apiError(error);
  }
}
