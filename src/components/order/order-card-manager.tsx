"use client";

import { useState } from "react";
import OrderCard from "./order-card";
import { Status } from "./order-utils";

export default function OrderCardManager() {
  const [activeStatus, setActiveStatus] = useState<Status>("pending");

  return (
    <ul className="flex flex-wrap justify-between gap-4">
      <OrderCard
        activeStatus={activeStatus}
        setActiveStatus={setActiveStatus}
        status="pending"
      />
      <OrderCard
        activeStatus={activeStatus}
        setActiveStatus={setActiveStatus}
        status="accepted"
      />
      <OrderCard
        activeStatus={activeStatus}
        setActiveStatus={setActiveStatus}
        status="completed"
      />
      <OrderCard
        activeStatus={activeStatus}
        setActiveStatus={setActiveStatus}
        status="preparation"
      />
      <OrderCard
        activeStatus={activeStatus}
        setActiveStatus={setActiveStatus}
        status="completed"
      />
    </ul>
  );
}
