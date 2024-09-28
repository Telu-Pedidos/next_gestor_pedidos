import React from "react";
import ClientForm from "../components/client-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Cadastrar Clientes | Telú Personalizados"
};

export default function CadastrarClientePage() {
  return (
    <main className="max-w-[1180px] space-y-8 rounded-md bg-card px-5 pb-9 pt-4">
      <h1 className="text-2xl font-medium text-title">Adicionar Cliente</h1>
      <ClientForm />
    </main>
  );
}
