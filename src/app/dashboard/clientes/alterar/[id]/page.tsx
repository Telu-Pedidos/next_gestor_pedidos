import React from "react";
import ClientForm from "../../components/client-form";
import { Metadata } from "next";
import getClientId from "@/actions/client/get-client-id";

export const metadata: Metadata = {
  title: "Dashboard - Alterar Cliente | Telú Personalizados"
};

type ClientIdParams = {
  params: {
    id: string;
  };
};

export default async function AlterarClientePage({
  params: { id }
}: ClientIdParams) {
  const { data } = await getClientId({ id });

  return (
    <main className="max-w-[1180px] space-y-8 rounded-md bg-card px-5 pb-9 pt-4">
      <h1 className="text-2xl font-medium text-title">Alterar Cliente</h1>
      {data && <ClientForm client={data} id={id} />}
    </main>
  );
}
