"use client";

import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useState } from "react";
import { formatPhoneNumber } from "@/helpers/phone";
import { formatDateToDays } from "@/helpers/date";
import {
  CalendarIcon,
  MapPinIcon,
  PencilIcon,
  PhoneIcon,
  PlusIcon,
  TrashIcon,
  TriangleAlertIcon,
  UserIcon
} from "lucide-react";
import { ICON } from "@/icons";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

const data: Client[] = [
  {
    id: "e9288369-37fe-4c89-9f46-8cdad46b1dbf",
    name: "Fulano Silva",
    email: "fulano@email.com",
    address: "Rua de um endereço",
    phone: "21543215425",
    createdAt: "2024-09-21T22:41:02.984818"
  },
  {
    id: "c59e4698-c7db-4758-80f1-3c899841d0b2",
    name: "Fulano Silva",
    email: "fulano@email.com",
    address: "Rua de um endereço",
    phone: "21543215425",
    createdAt: "2024-09-24T21:17:51.939332"
  },
  {
    id: "7d55bcdf-0567-4995-a0ed-d058d80946af",
    name: "Neymar Junior",
    email: "neymar@email.com",
    address: "Rua de um endereço",
    phone: "21543215425",
    createdAt: "2024-09-24T21:17:59.662152"
  },
  {
    id: "7af30627-dd99-4eef-a491-7095c327eeea",
    name: "Pablo Veggeti",
    email: "vegetti@email.com",
    address: "Rua de um endereço",
    phone: "21543215425",
    createdAt: "2024-09-24T21:18:09.3204"
  },
  {
    id: "a0ffe198-9b41-41ab-b9b8-de054685d276",
    name: "Philippe Coutinho",
    email: "coutinho@email.com",
    address: "Rua de um endereço",
    phone: "21543214425",
    createdAt: "2024-09-24T21:18:24.225629"
  },
  {
    id: "a9a104c2-b15a-41d7-a71a-eff96e25b45a",
    name: "André Ramos",
    email: "andre@email.com",
    address: "Rua de um endereço",
    phone: "21543214424",
    createdAt: "2024-09-24T21:18:34.325867"
  }
];

export type Client = {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  createdAt: string;
};

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

export const columns: ColumnDef<Client>[] = [
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
    cell: ({ row }) => (
      <div className="lowercase">
        {formatPhoneNumber(row.getValue("phone"))}
      </div>
    )
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
    cell: () => <div className="lowercase">2 dias</div>
  },
  {
    accessorKey: "quantityOrders",
    header: "Quant. Pedidos",
    cell: () => <div className="lowercase">2</div>
  },
  {
    accessorKey: "details",
    header: "",
    cell: ({ row }) => (
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
                <div className="flex flex-wrap items-center gap-1 text-[#605E48]">
                  <PhoneIcon className="size-[0.875rem]" />
                  <p className="text-sm font-medium">
                    {formatPhoneNumber(row.getValue("phone"))}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-1 text-[#605E48]">
                  <MapPinIcon className="size-[0.875rem]" />
                  <p className="text-sm font-medium">
                    Rua dos Jacintos, 123, Sobrinho, Campo Grande/MS, CEP:
                    79110501
                  </p>
                </div>
              </DialogDescription>

              <div className="flex w-full items-baseline justify-between gap-3 px-4">
                <div className="flex h-full flex-col gap-2 rounded border border-border px-9 py-3">
                  <div className="h-full">
                    <p className="text-sm font-medium text-[#666358]">
                      Total de pedidos
                    </p>
                    <span className="text-sm font-semibold text-title">
                      2 pedidos
                    </span>
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-medium text-title">
                      Última compra:
                    </p>
                    <div className="flex items-center gap-1 text-xs font-medium text-[#666358]">
                      <CalendarIcon className="size-4" />
                      <span>Há 2 dias (18/09/2024)</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="rounded border border-border px-9 py-3 text-center">
                    <p className="text-sm font-medium text-[#666358]">
                      Cliente há
                    </p>
                    <span className="text-sm font-semibold text-title">
                      3 dias
                    </span>
                  </div>
                  <div className="rounded border border-border px-9 py-3 text-center">
                    <p className="text-sm font-medium text-[#666358]">
                      Total gasto pelo cliente
                    </p>
                    <span className="text-sm font-semibold text-title">
                      R$ 220,00
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex w-full items-center justify-center gap-4 px-4">
                <DialogClose asChild>
                  <Button variant="secondary" className="gap-2 text-active">
                    <PencilIcon className="size-4" />
                    Alterar
                  </Button>
                </DialogClose>
                <Dialog>
                  <DialogTrigger
                    className="rounded-md border border-border px-4 py-2 font-medium text-destructive transition-colors hover:bg-destructive hover:text-white focus-visible:bg-destructive focus-visible:text-white"
                    asChild
                  >
                    <Button
                      variant="secondary"
                      className="gap-2 text-destructive"
                    >
                      <TrashIcon className="size-4" />
                      Excluir
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-xl">
                    <DialogHeader className="flex flex-col items-center justify-center gap-4">
                      <DialogTitle className="text-lg font-medium">
                        Excluir cliente: <strong>{row.getValue("name")}</strong>
                      </DialogTitle>
                      <DialogDescription className="flex w-full flex-col gap-4 text-lg text-foreground">
                        <div className="flex gap-1.5 text-center text-destructive">
                          <TriangleAlertIcon className="size-6" />
                          <span className="text-base font-medium">
                            Atenção! Você está prestes a excluir o cliente{" "}
                            <strong>{row.getValue("name")}</strong>.
                          </span>
                        </div>
                        <ul className="text-sm text-[#666358]">
                          <li>* Não será possível desfazer esta exclusão;</li>
                          <li>
                            * Não será possível acessar aos dados deste cliente;
                          </li>
                          <li>
                            * Os pedidos já tirados para este cliente serão
                            mantidos no sistema.
                          </li>
                        </ul>
                        <p className="text-base font-medium text-destructive">
                          Deseja excluir este cliente mesmo assim?
                        </p>
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-wrap items-start gap-4">
                      <DialogClose asChild>
                        <Button variant="secondary">Cancelar</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button variant="destructive">Excluir</Button>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    )
  },
  {
    accessorKey: "message",
    header: "",
    cell: ({ row }) => (
      <Button
        variant="secondary"
        size="sm"
        className="gap-1.5 border-[#3CAF3.57] text-[#3CAF47]"
        asChild
      >
        <Link target="_blank" href={`https://wa.me/${row.getValue("phone")}`}>
          <ICON.Whatsapp className="size-4" />
          Mensagem
        </Link>
      </Button>
    )
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
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(client.phone)}
            >
              Copiar telefone
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Visualizar Cliente</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];

export default function ClientsTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Busque por nome"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colunas <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {transformIdToNameColumn(column.id)}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linha(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
}
