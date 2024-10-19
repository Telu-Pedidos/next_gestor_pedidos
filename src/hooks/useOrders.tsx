/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { OrderContext } from "@/context/order-context";
import { timeZone } from "@/helpers/date";
import { OrderFormValues } from "@/validations/order-validation";
import { format, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { useContext } from "react";

export default function useOrders({ id }: { id?: string }) {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders deve ser usado dentro de um OrderProvider");
  }

  const { onSubmit, ...rest } = context;

  const handleSubmit = async (data: OrderFormValues) => {
    const startAt = toZonedTime(parseISO(data.startAt), timeZone);
    const endAt = toZonedTime(parseISO(data.endAt), timeZone);

    const formattedStartAt = format(startAt, "yyyy-MM-dd'T'HH:mm:ssXXX");
    const formattedEndAt = format(endAt, "yyyy-MM-dd'T'HH:mm:ssXXX");

    const payload = {
      ...data,
      startAt: formattedStartAt,
      endAt: formattedEndAt
    };

    await onSubmit(payload, id);
  };

  return {
    ...rest,
    onSubmit: handleSubmit
  };
}
