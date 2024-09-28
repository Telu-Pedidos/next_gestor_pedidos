import { ClientResponse } from "@/models/client";
import { Row } from "@tanstack/react-table";
import toast from "react-hot-toast";

export const copyPhone = (phoneNumber: string) => {
  navigator.clipboard.writeText(phoneNumber);
  toast.success("Número copiado com sucesso!");
};

export const getQuantityOrders = (row: Row<ClientResponse>) => {
  const orders = row.original.orders;
  const quantityOrders = orders ? orders.length : 0;
  return quantityOrders;
};

export const getLastDateOrder = (row: Row<ClientResponse>): string | null => {
  if (!row.original.orders || row.original.orders.length === 0) return null;

  const lastOrder = row.original.orders[row.original.orders.length - 1];
  return lastOrder.updatedAt || null;
};

export const getTotalSpentOrder = (row: Row<ClientResponse>) => {
  const orders = row.original.orders;
  const total =
    orders?.reduce((sum, order) => sum + (order.total ? order?.total : 0), 0) ??
    0;
  return total;
};
