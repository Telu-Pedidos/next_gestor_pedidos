/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import createOrder from "@/actions/order/create-order";
import editOrder from "@/actions/order/edit-order";
import newStatusOrder from "@/actions/order/new-status-order";
import { OrderFormValues, Status } from "@/validations/order-validation";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";

export default function useOrders({ id }: { id?: string }) {
  const [isPending, startTransition] = useTransition();
  const [activeStatus, setActiveStatus] = useState<Status | null>(null);
  const router = useRouter();

  const handleNewStatusOrder = async (id: string, newStatus: Status) => {
    try {
      await newStatusOrder({ id, newStatus });
      toast.success("Pedido atualizado com sucesso.");
    } catch (error) {
      console.error("Erro no servidor", error);
      toast.error("Ocorreu um erro ao tentar atualizar o status.");
    }
  };

  const handleCreateOrder = async (data: OrderFormValues) => {
    try {
      const result = await createOrder(data);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success("Pedido cadastrado com sucesso!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Erro no servidor", error);
      toast.error("Ocorreu um erro ao cadastrar o pedido.");
    }
  };

  const handleEditOrder = async (data: OrderFormValues) => {
    if (!id) {
      return;
    }

    try {
      const result = await editOrder(data, id);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success("Pedido alterado com sucesso!");
    } catch (error) {
      console.error("Erro no servidor", error);
      toast.error("Ocorreu um erro ao alterar o pedido.");
    }
  };

  const onSubmit = async (data: OrderFormValues) => {
    startTransition(async () => {
      try {
        if (id) {
          await handleEditOrder(data);
        } else {
          await handleCreateOrder(data);
        }
      } catch (error) {
        console.error("Erro:", error);
      }
    });
  };

  const handleCancel = () => {
    router.push("/dashboard");
  };

  return {
    activeStatus,
    setActiveStatus,
    handleNewStatusOrder,
    onSubmit,
    isPending,
    handleCancel
  };
}
