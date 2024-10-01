"use client";

import useTable from "@/hooks/useTable";
import TablePage from "@/components/table/table-page";
import { ModelResponse } from "@/models/model";
import { modelsColumns } from "./models-columns";

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

type ModelsTableProps = {
  models: ModelResponse[];
};

export default function ModelsTable({ models }: ModelsTableProps) {
  const { table } = useTable({ data: models, columns: modelsColumns });

  return (
    <TablePage
      columns={modelsColumns}
      table={table}
      transformIdToNameColumn={transformIdToNameColumn}
    />
  );
}
