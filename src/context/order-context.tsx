"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useTransition
} from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import createOrder from "@/actions/order/create-order";
import editOrder from "@/actions/order/edit-order";
import newStatusOrder from "@/actions/order/new-status-order";
import { OrderFormValues, Status } from "@/validations/order-validation";
import finishOrder from "@/actions/order/finish-order";

interface OrderContextProps {
  activeStatus: Status | null;
  setActiveStatus: Dispatch<
    SetStateAction<"PENDING" | "ACCEPTED" | "PREPARATION" | "COMPLETED" | null>
  >;
  handleNewStatusOrder: (id: string, newStatus: Status) => Promise<void>;
  handleFinishOrder: (id: string) => Promise<void>;
  onSubmit: (data: OrderFormValues, id?: string) => Promise<void>;
  isPending: boolean;
  handleCancel: () => void;
}

export const OrderContext = createContext<OrderContextProps | undefined>(
  undefined
);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [activeStatus, setActiveStatus] = useState<Status | null>(null);
  const [isPending, startTransition] = useTransition();
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

  const handleFinishOrder = async (id: string) => {
    try {
      await finishOrder(id);
      toast.success("Pedido finalizado com sucesso.");
    } catch (error) {
      console.error("Erro no servidor", error);
      toast.error("Ocorreu um erro ao tentar finalizar o pedido.");
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

  const handleEditOrder = async (data: OrderFormValues, id: string) => {
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

  const onSubmit = async (data: OrderFormValues, id?: string) => {
    startTransition(async () => {
      try {
        if (id) {
          await handleEditOrder(data, id);
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

  return (
    <OrderContext.Provider
      value={{
        activeStatus,
        setActiveStatus,
        handleNewStatusOrder,
        handleFinishOrder,
        onSubmit,
        isPending,
        handleCancel
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
