"use client";

import useTable from "@/hooks/useTable";
import TablePage from "@/components/table/table-page";
import { OrderResponse } from "@/models/order";
import { ordersColumns } from "./orders-columns";

const transformIdToNameColumn = (id: string) => {
  switch (id) {
    case "id":
      return "Código";
    case "client":
      return "Nome";
    case "status":
      return "Status";
    case "products":
      return "Quant. Itens";
    case "createdAt":
      return "Criado em";
    case "total":
      return "Total do pedido";
    case "details":
      return "Detalhes";
    default:
      break;
  }
};

type OrdersTableProps = {
  orders: OrderResponse[];
};

export default function OrdersTable({ orders }: OrdersTableProps) {
  const { table } = useTable({ data: orders, columns: ordersColumns });

  return (
    <TablePage
      columns={ordersColumns}
      table={table}
      transformIdToNameColumn={transformIdToNameColumn}
      showInput={false}
    />
  );
}
