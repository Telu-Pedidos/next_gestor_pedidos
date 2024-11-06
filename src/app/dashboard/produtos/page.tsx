import getProducts from "@/actions/product/get-products";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import ProductsTable from "./components/table/products-table";
import { UploadIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard - Produtos | Télu Pedidos"
};

export default async function ProdutosPage() {
  const { data } = await getProducts();
  const newData = data?.reverse() ?? null;

  return (
    <main className="w-full max-w-full rounded-md bg-card px-5 py-4">
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-2xl font-medium text-title">Produtos</h1>
      </div>

      <div className="mb-6 flex w-full sm:mb-1">
        <Button className="gap-2" asChild>
          <Link href="/dashboard/produtos/cadastrar">
            <UploadIcon className="size-[1.125rem]" />
            Cadastrar Produto
          </Link>
        </Button>
      </div>
      {newData && <ProductsTable products={newData} />}
    </main>
  );
}
