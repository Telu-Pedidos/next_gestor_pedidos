import { Checkbox } from "@/components/ui/checkbox";
import { formatPrice } from "@/utils/format-price";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { formatDateNew } from "@/helpers/date";
import { ProductResponse } from "@/models/product";
import Image from "next/image";
import { transformPhotoProduct } from "@/utils/photo-product";
import ProductState from "../product-state";
import ProductActions from "../product-actions";

export const productsColumns: ColumnDef<ProductResponse>[] = [
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
          Produto
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="flex flex-wrap items-center gap-3">
          <Image
            src={transformPhotoProduct(product.imageUrl)}
            width={40}
            height={40}
            alt={product.name}
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="text-sm font-medium text-order">{product.name}</span>
        </div>
      );
    }
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Categoria
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const product = row.original;

      return <div>{product.category ? product.category.name : "-"}</div>;
    }
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Preço mínimo
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const product = row.original;
      return <div>{formatPrice(product.price)}</div>;
    }
  },
  {
    accessorKey: "active",
    header: "Estado",
    cell: ({ row }) => {
      const product = row.original;
      return <ProductState active={product.active} id={String(product.id)} />;
    }
  },
  {
    accessorKey: "updatedAt",
    header: "Modificado em",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div>{product.updatedAt ? formatDateNew(product.updatedAt) : "-"}</div>
      );
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;
      return <ProductActions product={product} />;
    }
  }
];
