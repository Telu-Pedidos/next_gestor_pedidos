import getProducts from "@/actions/product/get-products";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import ProductsTable from "./components/table/products-table";
import { UploadIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard - Produtos | Télu Personalizados"
};

export default async function ProdutosPage() {
  const { data } = await getProducts();

  return (
    <main>
      <div className="max-w-7xl rounded-md bg-card px-5 py-4">
        <div className="mb-3 flex items-center justify-between">
          <h1 className="text-2xl font-medium text-title">Produtos</h1>
        </div>

        <div className="flex w-full">
          <Button className="gap-2" asChild>
            <Link href="/dashboard/produtos/cadastrar">
              <UploadIcon className="size-[1.125rem]" />
              Cadastrar Produto
            </Link>
          </Button>
        </div>
        {data && <ProductsTable products={data} />}
      </div>
    </main>
  );
}
