"use client";

import { OrderResponse } from "@/models/order";
import OrderStatus from "./order-status";
import useOrders from "@/hooks/useOrders";
import { statuses } from "@/validations/order-validation";

export default function OrderStatusManager({
  orders
}: {
  orders: OrderResponse[] | null;
}) {
  const { activeStatus, setActiveStatus } = useOrders({});

  return (
    <div className="flex flex-wrap gap-3 clock:flex-nowrap">
      {statuses.map((orderStatus) => {
        const activeOrdersData =
          orders?.filter((order) => order.status === orderStatus) ?? [];

        const activerOrdersSize = activeOrdersData?.length ?? 0;

        return (
          <OrderStatus
            key={orderStatus}
            status={orderStatus}
            activeStatus={activeStatus}
            setActiveStatus={setActiveStatus}
            orderSize={activerOrdersSize}
          />
        );
      })}
    </div>
  );
}
