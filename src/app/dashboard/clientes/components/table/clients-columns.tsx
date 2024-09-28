import { Checkbox } from "@/components/ui/checkbox";
import {
  CalendarIcon,
  MailIcon,
  MapPinIcon,
  PencilIcon,
  PhoneIcon,
  PlusIcon,
  UserIcon
} from "lucide-react";
import { ICON } from "@/icons";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { ClientResponse } from "@/models/client";
import {
  copyPhone,
  getLastDateOrder,
  getQuantityOrders,
  getTotalSpentOrder
} from "../client-functions";
import { formatPrice } from "@/utils/format-price";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";

import { formatPhoneNumber, regexPhoneNumber } from "@/helpers/phone";
import { formatDateNew, formatDateToDays } from "@/helpers/date";
import ClientDelete from "../client-delete";

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
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" size="sm" className="gap-1.5">
                <PlusIcon className="size-3.5" />
                Detalhes
              </Button>
            </DialogTrigger>

            <DialogContent className="w-full max-w-xl px-0 py-8">
              <DialogHeader className="flex flex-col gap-5">
                <DialogTitle className="px-4 text-base font-medium">
                  Detalhes do cliente
                </DialogTitle>
                <Separator />

                <DialogDescription className="mt-5 space-y-2.5 px-4">
                  <div className="flex flex-wrap items-center gap-1 text-[#605E48]">
                    <UserIcon className="size-[0.875rem]" />
                    <p className="text-sm font-semibold">
                      {row.getValue("name")}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-10">
                    {client.phone ? (
                      <div className="flex flex-wrap items-center gap-1 text-[#605E48]">
                        <PhoneIcon className="size-[0.875rem]" />
                        <p className="text-sm font-medium">
                          {formatPhoneNumber(row.getValue("phone"))}
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                    {client.email ? (
                      <div className="flex flex-wrap items-center gap-1 text-[#605E48]">
                        <MailIcon className="size-[0.875rem]" />
                        <p className="text-sm font-medium">{client.email}</p>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  {client.address ? (
                    <div className="flex flex-wrap items-center gap-1 text-[#605E48]">
                      <MapPinIcon className="size-[0.875rem]" />
                      <p className="text-sm font-medium">{client.address}</p>
                    </div>
                  ) : (
                    ""
                  )}
                </DialogDescription>

                <div className="flex w-full items-baseline justify-between gap-3 px-4">
                  <div className="flex h-full flex-col gap-2 rounded border border-border px-9 py-3">
                    <div className="h-full">
                      <p className="text-sm font-medium text-[#666358]">
                        Total de pedidos
                      </p>
                      <span className="text-sm font-semibold text-title">
                        {getQuantityOrders(row)}{" "}
                        {getQuantityOrders(row) === 1 ? "pedido" : "pedidos"}
                      </span>
                    </div>

                    <div className="text-xs font-medium">
                      <p className="mb-1 text-title">Última compra:</p>
                      {getLastDateOrder(row) !== null ? (
                        <div className="flex items-center gap-1 text-[#666358]">
                          <CalendarIcon className="size-4" />
                          <span>
                            Há {formatDateToDays(getLastDateOrder(row) || "")}{" "}
                            {formatDateNew(getLastDateOrder(row) || "")}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[#666358]">
                          Não existem compras
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="rounded border border-border px-9 py-3 text-center">
                      <p className="text-sm font-medium text-[#666358]">
                        Cliente há
                      </p>
                      <span className="text-sm font-semibold text-title">
                        {formatDateToDays(row.getValue("createdAt"))}
                      </span>
                    </div>
                    <div className="rounded border border-border px-9 py-3 text-center">
                      <p className="text-sm font-medium text-[#666358]">
                        Total gasto pelo cliente
                      </p>
                      <span className="text-sm font-semibold text-title">
                        {formatPrice(getTotalSpentOrder(row))}
                      </span>
                    </div>
                  </div>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
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

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir Menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {client.phone && (
              <>
                <DropdownMenuItem onClick={() => copyPhone(client.phone || "")}>
                  Copiar telefone
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem
              asChild
              className="flex items-center gap-2 text-active"
            >
              <Link href={`/dashboard/clientes/alterar/${client.id}`}>
                <PencilIcon className="size-4" />
                Editar Cliente
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              asChild
              className="flex items-center gap-2 text-active"
            >
              <ClientDelete name={client.name} id={client.id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];
