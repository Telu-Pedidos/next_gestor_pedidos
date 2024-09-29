import React from "react";
import { Metadata } from "next";
import ProductForm from "../components/product-form";

export const metadata: Metadata = {
  title: "Dashboard - Cadastrar Produtos | Télu Personalizados"
};

export default function CadastrarProdutoPage() {
  return (
    <section className="max-w-[1180px] space-y-8 rounded-md bg-card px-5 pb-9 pt-4">
      <h1 className="text-2xl font-medium text-title">Adicionar Produto</h1>
      <ProductForm />
    </section>
  );
}
