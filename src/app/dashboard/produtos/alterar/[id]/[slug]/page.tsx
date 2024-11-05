import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductForm from "../../../components/product-form";
import getProductId from "@/actions/product/get-product-id";

export const metadata: Metadata = {
  title: "Dashboard - Alterar Produto | Télu Pedidos"
};

type ProdutoIdParams = {
  params: {
    id: string;
  };
};

export default async function AlterarProdutoPage({
  params: { id }
}: ProdutoIdParams) {
  const { data } = await getProductId({ id });

  if (!data) notFound();

  return (
    <main className="max-w-full space-y-8 rounded-md bg-card px-5 pb-9 pt-4">
      <h1 className="text-2xl font-medium text-title">Alterar Produto</h1>
      {data && <ProductForm product={data} id={id} />}
    </main>
  );
}
