"use client";

import { ProductResponse } from "@/models/product";
import { productsColumns } from "./products-columns";
import useTable from "@/hooks/useTable";
import TablePage from "@/components/table/table-page";

const transformIdToNameColumn = (id: string) => {
  switch (id) {
    case "name":
      return "Nome";
    case "category":
      return "Categoria";
    case "price":
      return "Preço mínimo";
    case "active":
      return "Ativo";
    case "updatedAt":
      return "Modificado em";
    default:
      break;
  }
};

type ProductsTableProps = {
  products: ProductResponse[];
};

export default function ProductsTable({ products }: ProductsTableProps) {
  const { table } = useTable({ data: products, columns: productsColumns });

  return (
    <TablePage
      columns={productsColumns}
      table={table}
      transformIdToNameColumn={transformIdToNameColumn}
    />
  );
}
