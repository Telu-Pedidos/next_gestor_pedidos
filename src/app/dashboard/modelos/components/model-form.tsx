"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import useModels from "@/hooks/useModels";
import { ModelResponse } from "@/models/model";
import { ModelFormValues, modelSchema } from "@/validations/model-validation";
import Image from "next/image";
import { CameraIcon } from "lucide-react";
import { IMAGE } from "@/utils/image";

type ModelFormProps = {
  model?: ModelResponse;
  id?: string;
};

export default function ModelForm({ model, id }: ModelFormProps) {
  const form = useForm<ModelFormValues>({
    resolver: zodResolver(modelSchema),
    defaultValues: {
      name: model?.name || "",
      imageUrl: model?.imageUrl || "",
      file: model?.file || undefined
    }
  });

  const { onSubmit, isPending, handleImageChange, previewImage, selectedFile } =
    useModels({ id });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem className="w-full max-w-52 space-y-1 font-medium text-[#595548]">
                  <FormLabel
                    className="cursor-pointer text-[#595548]"
                    htmlFor="fileInput"
                    aria-label="Mudar Foto"
                  >
                    Foto do Modelo
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      id="fileInput"
                      onChange={(e) => {
                        const file =
                          e.target.files?.[0] || selectedFile || null;
                        field.onChange(file);
                        handleImageChange(file);
                      }}
                      className="hidden"
                      accept=".jpg, .jpeg, .png, .webp"
                      multiple={false}
                    />
                  </FormControl>
                  <div
                    className="relative mt-4 h-48 w-48 cursor-pointer"
                    onClick={() =>
                      document.getElementById("fileInput")?.click()
                    }
                  >
                    <Image
                      src={
                        previewImage || model?.imageUrl || IMAGE.PreviewImage
                      }
                      alt="Pré-visualização da imagem"
                      className="h-full w-full rounded object-contain"
                      width={192}
                      height={192}
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 transition-colors hover:bg-black/20">
                      <CameraIcon className="text-white" size={32} />
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full max-w-52 space-y-1">
                  <FormLabel className="text-[#595548]">Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do modelo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator className="mt-4 block h-[1px] w-full bg-border" />

          <div className="col-span-2 mt-6 flex w-full flex-wrap gap-4">
            <Button disabled={isPending}>{id ? "Alterar" : "Salvar"}</Button>
            <DialogClose>
              <Button type="button" variant="outline" className="gap-3">
                Cancelar
              </Button>
            </DialogClose>
          </div>
        </form>
      </Form>
    </>
  );
}
