import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";
import ClientsTable from "./components/clients-table";

export default function ClientesPage() {
  return (
    <main>
      <div className="max-w-6xl rounded-md bg-card px-5 py-4">
        <div className="mb-3 flex items-center justify-between">
          <h1 className="text-2xl font-medium text-title">Clientes</h1>

          <div className="text-sm font-medium">
            <p className="mb-1 text-[#666358]">Total de clientes</p>
            <span className="text-title">6</span>
          </div>
        </div>
        <div className="flex w-full">
          <Button className="gap-2">
            <UploadIcon className="size-[1.125rem]" />
            Cadastrar Cliente
          </Button>
        </div>
        <ClientsTable />
      </div>
    </main>
  );
}
