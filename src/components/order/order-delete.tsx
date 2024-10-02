"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog";

import deleteOrder from "@/actions/order/delete-order";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { formatNumberToHex } from "@/utils/functions";

type OrderDeleteProps = {
  id: number;
};

export default function OrderDelete({ id }: OrderDeleteProps) {
  const [isPending, startTransition] = useTransition();

  async function handleClick() {
    startTransition(async () => {
      try {
        await deleteOrder(String(id));
        toast.success("Pedido deletado com sucesso");
      } catch (error) {
        console.error(error);
        toast.error("ocorreu um erro ao tentar excluir o pedido");
      }
    });
  }

  return (
    <Dialog>
      <DialogTrigger className="rounded-md border border-border px-4 py-2 font-medium text-destructive transition-colors hover:bg-destructive hover:text-white focus-visible:bg-destructive focus-visible:text-white">
        Deletar
      </DialogTrigger>
      <DialogContent className="w-full max-w-xl">
        <DialogHeader className="flex flex-col items-center justify-center gap-6">
          <DialogTitle className="mx-auto inline-flex size-[7.5rem] cursor-default items-center justify-center rounded-full border border-[#FFA624] px-12 py-3 text-7xl font-medium text-[#FFA624]">
            !
          </DialogTitle>
          <DialogDescription className="flex w-full flex-col text-center text-lg text-foreground">
            <p>
              Tem certeza que deseja remover o pedido &quot;
              <strong>{formatNumberToHex(id)}</strong>
              &quot;?
            </p>
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancelar</Button>
            </DialogClose>
            <DialogClose>
              {isPending ? (
                <Button variant="destructive" onClick={handleClick} disabled>
                  Excluindo...
                </Button>
              ) : (
                <Button variant="destructive" onClick={handleClick}>
                  Excluir
                </Button>
              )}
            </DialogClose>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
