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
import { PatternFormat } from "react-number-format";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ClientFormValues,
  clientSchema
} from "@/validations/client-validation";
import { ClientResponse } from "@/models/client";
import useClients from "@/hooks/useClients";
import { Separator } from "@/components/ui/separator";

type ClientFormProps = {
  client?: ClientResponse;
  id?: string;
};

export default function ClientForm({ client, id }: ClientFormProps) {
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: client?.name || "",
      email: client?.email || "",
      address: client?.address || "",
      phone: client?.phone || ""
    }
  });

  const { onSubmit, handleCancel, isPending } = useClients({ id });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-wrap gap-8 sm:flex-nowrap">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full max-w-full space-y-1 sm:max-w-52">
                  <FormLabel className="text-[#595548]">Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do cliente" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-full space-y-1 sm:w-fit">
                  <FormLabel className="text-[#595548]">Telefone</FormLabel>
                  <FormControl>
                    <PatternFormat
                      format="(##) #####-####"
                      mask="_"
                      placeholder="(XX) XXXXX-XXXX"
                      {...field}
                      className="flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-wrap gap-8 sm:flex-nowrap">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full space-y-1 sm:max-w-52">
                  <FormLabel className="text-[#595548]">E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="Email do cliente" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="w-full space-y-1 sm:max-w-52">
                  <FormLabel className="text-[#595548]">Endereço</FormLabel>
                  <FormControl>
                    <Input placeholder="Endereço do cliente" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator className="mt-4 block h-[1px] w-full bg-border" />

          <div className="col-span-2 mt-6 flex w-full flex-wrap gap-4">
            {id ? (
              <Button disabled={isPending}>Alterar</Button>
            ) : (
              <Button disabled={isPending}>Salvar</Button>
            )}
            <Button
              type="button"
              variant="outline"
              className="gap-3"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
