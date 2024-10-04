import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { formatDateNew } from "@/helpers/date";
import { OrderResponse } from "@/models/order";
import OrderDetails from "@/components/order/order-details";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { formatNumberToHex } from "@/utils/functions";
import { renderStatusText } from "@/components/order/order-utils";
import { formatPrice } from "@/utils/format-price";
import { PlusIcon } from "lucide-react";

export const ordersColumns: ColumnDef<OrderResponse>[] = [
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
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          # Código
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const order = row.original;

      return (
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-order">
            {formatNumberToHex(order.id)}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: "client",
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
    cell: ({ row }) => {
      const order = row.original;

      return (
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-order">
            {order.client.name}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const order = row.original;

      return (
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-order">
            {renderStatusText(order.status)}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: "products",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quant. Itens
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const order = row.original;

      return (
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-order">
            {order?.products?.length ?? 0}
          </span>
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
          Criado em
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">
        {formatDateNew(row.getValue("createdAt"))}
      </div>
    )
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total do pedido
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const order = row.original;

      return (
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-order">
            {formatPrice(order.total ?? 0)}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: "details",
    header: "",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" size="sm" className="gap-1.5">
              <PlusIcon className="size-3.5" />
              Detalhes
            </Button>
          </DialogTrigger>
          <OrderDetails order={order} status={order.status} />
        </Dialog>
      );
    }
  }
];
