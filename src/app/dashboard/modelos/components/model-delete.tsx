import deleteModel from "@/actions/model/delete-model";
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
import { TrashIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

type ModelDeleteProps = {
  id: string;
  name: string;
};

export default function ModelDelete({ id, name }: ModelDeleteProps) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      await deleteModel(id);
      toast.success("modelo deletado com sucesso");
    } catch (error) {
      console.error(error);
      toast.error("ocorreu um erro ao tentar excluir o modelo");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-destructive hover:bg-primary/20 focus:bg-primary/20">
        <TrashIcon className="size-4" />
        Excluir Modelo
      </DialogTrigger>
      <DialogContent className="flex w-full max-w-xl flex-col items-center justify-center gap-9">
        <DialogHeader className="flex flex-col items-center justify-center gap-4">
          <DialogTitle className="flex h-[7.5rem] w-[7.5rem] cursor-default items-center justify-center rounded-full border-4 border-[#FFA624] px-12 py-3 text-[5rem] font-medium text-[#FFA624]">
            !
          </DialogTitle>
          <DialogDescription className="flex w-full flex-col gap-4 text-lg text-foreground">
            <div className="flex gap-1.5 text-center text-foreground">
              <p className="text-2xl font-medium">
                Tem certeza que deseja remover o modelo{" "}
                <strong>&quot;{name}&quot;</strong>?
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap gap-4">
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <DialogClose>
            {loading ? (
              <Button variant="destructive" onClick={handleClick} disabled>
                Excluindo...
              </Button>
            ) : (
              <Button variant="destructive" onClick={handleClick}>
                Excluir
              </Button>
            )}
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}