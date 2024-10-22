import deleteClient from "@/actions/client/delete-client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { TrashIcon, TriangleAlertIcon } from "lucide-react";
import { useTransition } from "react";
import toast from "react-hot-toast";

type ClientDeleteProps = {
  id: string;
  name: string;
};

export default function ClientDelete({ id, name }: ClientDeleteProps) {
  const [isPending, startTransition] = useTransition();

  async function handleClick() {
    startTransition(async () => {
      try {
        await deleteClient(id);
        toast.success("cliente deletado com sucesso");
      } catch (error) {
        console.error(error);
        toast.error("ocorreu um erro ao tentar excluir o cliente");
      }
    });
  }

  return (
    <Dialog>
      <DialogTrigger className="flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-destructive hover:bg-primary/20 focus:bg-primary/20">
        <TrashIcon className="size-4" />
        Excluir Cliente
      </DialogTrigger>
      <DialogContent className="w-full max-w-xl">
        <DialogHeader className="flex flex-col items-center justify-center gap-4">
          <DialogTitle className="text-lg font-medium">
            Excluir cliente: <strong>{name}</strong>
          </DialogTitle>
          <DialogDescription className="flex w-full flex-col gap-4 text-lg text-foreground">
            <div className="flex gap-1.5 text-center text-destructive">
              <TriangleAlertIcon className="size-6" />
              <span className="text-base font-medium">
                Atenção! Você está prestes a excluir o cliente{" "}
                <strong>{name}</strong>.
              </span>
            </div>
            <ul className="text-sm text-[#666358]">
              <li>* Não será possível desfazer esta exclusão;</li>
              <li>* Não será possível acessar aos dados deste cliente;</li>
              <li>
                * Os pedidos já tirados para este cliente serão mantidos no
                sistema.
              </li>
            </ul>
            <p className="text-base font-medium text-destructive">
              Deseja excluir este cliente mesmo assim?
            </p>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap items-start gap-4">
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <DialogClose>
            <Button
              variant="destructive"
              onClick={handleClick}
              disabled={isPending}
            >
              Excluir
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
