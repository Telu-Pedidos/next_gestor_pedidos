"use client";

import { OrderResponse } from "@/models/order";
import { OrderDateRange } from "./order-date-range";
import OrdersTable from "./table/orders-table";
import useOrders from "@/hooks/useOrders";
import { startOfDay, isBefore, isAfter, isEqual } from "date-fns";
import { useMemo } from "react";

export default function OrderHistoryManager({
  data
}: {
  data: OrderResponse[];
}) {
  const { date } = useOrders({});

  const filterOrderDate = useMemo(() => {
    console.log("Data:", data);
    console.log("Date Range:", date);

    return (
      data.filter((order) => {
        const orderStart = startOfDay(new Date(order.startAt));
        const orderEnd = startOfDay(new Date(order.endAt));

        console.log("Order Start:", orderStart);
        console.log("Order End:", orderEnd);

        if (date?.from) {
          const filterStart = startOfDay(new Date(date.from));

          if (!date.to) {
            return isEqual(orderStart, filterStart);
          }

          const filterEnd = startOfDay(new Date(date.to));
          return (
            (isEqual(orderStart, filterStart) ||
              isAfter(orderStart, filterStart)) &&
            (isEqual(orderEnd, filterEnd) || isBefore(orderEnd, filterEnd))
          );
        }

        return true;
      }) || data
    );
  }, [data, date]);

  return (
    <>
      <OrderDateRange />
      {data && <OrdersTable orders={filterOrderDate} />}
    </>
  );
}
