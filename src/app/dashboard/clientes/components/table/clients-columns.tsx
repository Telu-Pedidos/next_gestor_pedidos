import { Checkbox } from "@/components/ui/checkbox";
import { ICON } from "@/icons";
import Link from "next/link";

import { ClientResponse } from "@/models/client";
import {
  getLastDateOrder,
  getQuantityOrders
} from "@/app/dashboard/clientes/client-functions";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";

import { formatPhoneNumber, regexPhoneNumber } from "@/helpers/phone";
import ClientDetails from "../client-details";
import { formatDateToDays } from "@/helpers/date";
import ClientActions from "../client-actions";

export const clientsColumns: ColumnDef<ClientResponse>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Telefone
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const client = row.original;

      return (
        <div className="lowercase">
          {client.phone ? formatPhoneNumber(client.phone) : "-"}
        </div>
      );
    }
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cliente há
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">
        {formatDateToDays(row.getValue("createdAt"))}
      </div>
    )
  },
  {
    accessorKey: "lastOrder",
    header: "Último pedido",
    cell: ({ row }) => (
      <div className="lowercase">
        {getLastDateOrder(row)?.length
          ? formatDateToDays(getLastDateOrder(row) || "")
          : "-"}
      </div>
    )
  },
  {
    accessorKey: "quantityOrders",
    header: "Quant. Pedidos",
    cell: ({ row }) => {
      return <div className="lowercase">{getQuantityOrders(row)}</div>;
    }
  },
  {
    accessorKey: "details",
    header: "",
    cell: ({ row }) => {
      const client = row.original;
      return (
        <div className="lowercase">
          <ClientDetails client={client} row={row} />
        </div>
      );
    }
  },
  {
    accessorKey: "message",
    header: "",
    cell: ({ row }) => {
      const client = row.original;

      if (!client.phone) return;

      return (
        <Button
          variant="secondary"
          size="sm"
          className="gap-1.5 border-[#3CAF3.57] text-[#3CAF47]"
          asChild
        >
          <Link
            target="_blank"
            href={`https://wa.me/${regexPhoneNumber(client.phone || "")}`}
          >
            <ICON.Whatsapp className="size-4" />
            Mensagem
          </Link>
        </Button>
      );
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const client = row.original;
      return <ClientActions client={client} />;
    }
  }
];
