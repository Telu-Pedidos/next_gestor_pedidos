import { Metadata } from "next";
import getModels from "@/actions/model/get-models";
import ModelsTable from "./components/table/models-table";
import ModelCreate from "./components/model-create";

export const metadata: Metadata = {
  title: "Dashboard - Modelos | Télu Pedidos"
};

export default async function ModelosPage() {
  const { data } = await getModels();
  const newData = data?.reverse() ?? null;

  return (
    <main className="max-w-full rounded-md bg-card px-5 py-4">
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-2xl font-medium text-title">Modelos</h1>
      </div>

      <div className="flex w-full">
        <ModelCreate />
      </div>
      {newData && <ModelsTable models={newData} />}
    </main>
  );
}
