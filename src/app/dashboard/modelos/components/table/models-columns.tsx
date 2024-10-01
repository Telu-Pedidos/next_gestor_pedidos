import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { formatDateNew } from "@/helpers/date";
import { formatNumberToHex } from "@/utils/functions";
import { ModelResponse } from "@/models/model";
import ModelActions from "../model-actions";
import Image from "next/image";
import { IMAGE } from "@/utils/image";

export const modelsColumns: ColumnDef<ModelResponse>[] = [
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
          Id
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const model = row.original;

      return (
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-order">
            {formatNumberToHex(model.id)}
          </span>
        </div>
      );
    }
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
    cell: ({ row }) => {
      const model = row.original;

      return (
        <div className="flex flex-wrap items-center gap-3">
          <Image
            src={model.imageUrl || IMAGE.PreviewImage}
            width={40}
            height={40}
            alt={model.name}
            className="h-10 w-10 rounded-full object-cover"
          />

          <span className="text-sm font-medium text-order">{model.name}</span>
        </div>
      );
    }
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Modificado em
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const model = row.original;

      return (
        <div>{model.updatedAt ? formatDateNew(model.updatedAt) : "-"}</div>
      );
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const model = row.original;
      return <ModelActions model={model} />;
    }
  }
];
