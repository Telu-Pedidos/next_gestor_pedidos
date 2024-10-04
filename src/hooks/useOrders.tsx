/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { OrderContext } from "@/context/order-context";
import { OrderFormValues } from "@/validations/order-validation";
import { useContext } from "react";

export default function useOrders({ id }: { id?: string }) {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders deve ser usado dentro de um OrderProvider");
  }

  const { onSubmit, ...rest } = context;

  const handleSubmit = async (data: OrderFormValues) => {
    await onSubmit(data, id);
  };

  return {
    ...rest,
    onSubmit: handleSubmit
  };
}
