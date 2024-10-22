"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { UploadIcon } from "lucide-react";
import ModelForm from "./model-form";

export default function ModelCreate() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <UploadIcon className="size-[1.125rem]" />
          Cadastrar Modelo
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90%]">
        <ModelForm />
      </DialogContent>
    </Dialog>
  );
}
