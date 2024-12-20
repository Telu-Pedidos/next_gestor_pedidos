"use client";

import OrderCard from "./order-card";
import { OrderResponse } from "@/models/order";
import useOrders from "@/hooks/useOrders";
import { useSearchParams } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function OrderCardManager({
  orders
}: {
  orders: OrderResponse[];
}) {
  const { setActiveStatus } = useOrders({});

  const searchParams = useSearchParams();
  const selectedStatus = searchParams.get("newStatus") || "";

  const orderDataStatus = selectedStatus
    ? orders.filter((order) => order.status === selectedStatus)
    : orders;

  return (
    <ScrollArea className="h-[calc(100vh-16rem)] w-full">
      <ul className="flex flex-wrap gap-6">
        {orderDataStatus.map((order) => (
          <OrderCard
            key={order.id}
            setActiveStatus={setActiveStatus}
            status={order.status}
            order={order}
          />
        ))}
      </ul>
    </ScrollArea>
  );
}
