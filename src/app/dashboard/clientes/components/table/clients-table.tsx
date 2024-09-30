"use client";

import { ClientResponse } from "@/models/client";
import { clientsColumns } from "./clients-columns";
import useTable from "@/hooks/useTable";
import TablePage from "@/components/table/table-page";

const transformIdToNameColumn = (id: string) => {
  switch (id) {
    case "name":
      return "Nome";
    case "phone":
      return "Telefone";
    case "createdAt":
      return "Data";
    case "lastOrder":
      return "Ult.Pedido";
    case "quantityOrders":
      return "Quant.Pedidos";
    case "details":
      return "Detalhes";
    case "message":
      return "Mensagem";

    default:
      break;
  }
};

type ClientsTableProps = {
  clients: ClientResponse[];
};

export default function ClientsTable({ clients }: ClientsTableProps) {
  const { table } = useTable({ data: clients, columns: clientsColumns });

  return (
    <TablePage
      columns={clientsColumns}
      table={table}
      transformIdToNameColumn={transformIdToNameColumn}
    />
  );
}
