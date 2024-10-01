"use client";

import useTable from "@/hooks/useTable";
import TablePage from "@/components/table/table-page";
import { CategoryResponse } from "@/models/category";
import { categoriesColumns } from "./categories-columns";

const transformIdToNameColumn = (id: string) => {
  switch (id) {
    case "name":
      return "Nome";
    case "id":
      return "Id";
    case "updatedAt":
      return "Modificado em";
    default:
      break;
  }
};

type CategoriesTableProps = {
  categories: CategoryResponse[];
};

export default function CategoriesTable({ categories }: CategoriesTableProps) {
  const { table } = useTable({ data: categories, columns: categoriesColumns });

  return (
    <TablePage
      columns={categoriesColumns}
      table={table}
      transformIdToNameColumn={transformIdToNameColumn}
    />
  );
}
