"use server";

import { GET_ORDER_MONTH } from "@/functions/api";
import apiError from "@/functions/api-error";
import { OrderResponse } from "@/models/order";
import { cookies } from "next/headers";

type getOrderParams = {
  month: number;
};

export default async function getOrderMonth({ month }: getOrderParams) {
  try {
    const { url } = GET_ORDER_MONTH(month);
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
      throw new Error(errorData.message || "Erro ao buscar o mês do pedido.");
    }

    const data = (await response.json()) as OrderResponse[];

    return { data, ok: true, error: "" };
  } catch (error) {
    return apiError(error);
  }
}
