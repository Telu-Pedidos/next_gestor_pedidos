"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PencilIcon } from "lucide-react";
import { ModelResponse } from "@/models/model";
import ModelForm from "./model-form";

type ModelUpdateProps = {
  data: ModelResponse;
  id: string;
};

export default function ModelUpdate({ data, id }: ModelUpdateProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-active hover:bg-primary/20 focus:bg-primary/20"
          size="sm"
          variant="link"
        >
          <PencilIcon className="size-4" />
          Editar Modelo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <ModelForm model={data} id={id} />
      </DialogContent>
    </Dialog>
  );
}
