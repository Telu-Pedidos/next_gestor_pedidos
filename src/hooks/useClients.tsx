"use client";

import createClient from "@/actions/client/create-client";
import editClient from "@/actions/client/edit-client";
import { ClientFormValues } from "@/validations/client-validation";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

export default function useClients({ id }: { id?: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreateClient = async (data: ClientFormValues) => {
    try {
      const result = await createClient(data);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success("Cliente cadastrado com sucesso!");
      router.push("/dashboard/clientes");
    } catch (error) {
      console.error("Erro no servidor", error);
      toast.error("Ocorreu um erro ao cadastrar o cliente.");
    }
  };

  const handleEditClient = async (data: ClientFormValues) => {
    if (!id) {
      router.push("/dashboard/clientes");
      return;
    }

    try {
      const result = await editClient(data, id);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success("Cliente alterado com sucesso!");
      router.push("/dashboard/clientes");
    } catch (error) {
      console.error("Erro no servidor", error);
      toast.error("Ocorreu um erro ao alterar o cliente.");
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/clientes");
  };

  const onSubmit = async (data: ClientFormValues) => {
    startTransition(async () => {
      try {
        if (id) {
          await handleEditClient(data);
        } else {
          await handleCreateClient(data);
        }
      } catch (error) {
        console.error("Erro:", error);
      }
    });
  };

  return {
    handleCreateClient,
    handleEditClient,
    handleCancel,
    onSubmit,
    isPending
  };
}
