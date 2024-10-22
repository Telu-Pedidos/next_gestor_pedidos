"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { UploadIcon } from "lucide-react";
import CategoryForm from "./category-form";

export default function CategoryCreate() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <UploadIcon className="size-[1.125rem]" />
          Cadastrar Categoria
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90%]">
        <CategoryForm />
      </DialogContent>
    </Dialog>
  );
}
