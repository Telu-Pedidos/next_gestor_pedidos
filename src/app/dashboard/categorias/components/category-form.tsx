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
import { CategoryResponse } from "@/models/category";
import {
  CategoryFormValues,
  categorySchema
} from "@/validations/category-validation";
import useCategories from "@/hooks/useCategories";
import { DialogClose } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

type CategoryFormProps = {
  category?: CategoryResponse;
  id?: string;
};

export default function CategoryForm({ category, id }: CategoryFormProps) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name || ""
    }
  });

  const { onSubmit, isPending } = useCategories({ id });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="flex gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full max-w-52 space-y-1">
                  <FormLabel className="text-[#595548]">Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da categoria" {...field} />
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
