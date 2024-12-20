import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";
import Link from "next/link";
import getClients from "@/actions/client/get-clients";
import { Metadata } from "next";
import ClientsTable from "./components/table/clients-table";

export const metadata: Metadata = {
  title: "Dashboard - Clientes | Télu Pedidos"
};

export default async function ClientesPage() {
  const { data } = await getClients();
  const newData = data?.reverse() ?? null;

  return (
    <main className="w-full max-w-full rounded-md bg-card px-5 py-4">
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-2xl font-medium text-title">Clientes</h1>

        <div className="text-sm font-medium">
          <p className="mb-1 text-[#666358]">Total de clientes</p>
          <span className="text-title">{newData?.length}</span>
        </div>
      </div>
      <div className="flex w-full">
        <Button className="gap-2" asChild>
          <Link href="/dashboard/clientes/cadastrar">
            <UploadIcon className="size-[1.125rem]" />
            Cadastrar Cliente
          </Link>
        </Button>
      </div>
      {newData && <ClientsTable clients={newData} />}
    </main>
  );
}
