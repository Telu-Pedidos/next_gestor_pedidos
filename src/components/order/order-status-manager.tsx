"use client";

import { useState } from "react";
import { Status } from "./order-utils";
import OrderStatus from "./order-status";

export default function OrderStatusManager() {
  const [activeStatus, setActiveStatus] = useState<Status>("pending");

  return (
    <div className="flex flex-wrap gap-3">
      <OrderStatus
        status="pending"
        activeStatus={activeStatus}
        setActiveStatus={setActiveStatus}
      />
      <OrderStatus
        status="accepted"
        activeStatus={activeStatus}
        setActiveStatus={setActiveStatus}
      />

      <OrderStatus
        status="preparation"
        activeStatus={activeStatus}
        setActiveStatus={setActiveStatus}
      />

      <OrderStatus
        status="completed"
        activeStatus={activeStatus}
        setActiveStatus={setActiveStatus}
      />
    </div>
  );
}
