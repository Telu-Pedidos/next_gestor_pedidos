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
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@radix-ui/react-dropdown-menu";
import toast from "react-hot-toast";
import createClient from "@/actions/client/create-client";
import {
  ClientFormValues,
  clientSchema
} from "@/validations/client-validation";
import editClient from "@/actions/client/edit-client";
import { ClientResponse } from "@/models/client";

type ClientFormProps = {
  client?: ClientResponse;
  id?: string;
};

export default function ClientForm({ client, id }: ClientFormProps) {
  const router = useRouter();

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: client?.name || "",
      email: client?.email || "",
      address: client?.address || "",
      phone: client?.phone || ""
    }
  });

  const onSubmit = async (data: ClientFormValues) => {
    if (id) {
      handleEditClient(data);
      return;
    }
    handleCreateClient(data);
  };

  const handleCreateClient = async (data: ClientFormValues) => {
    try {
      const result = await createClient(data);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success("Cliente cadastrado com sucesso!");
      router.push("/dashboard/clientes");
    } catch (error) {
      console.error("Erro no servidor", error);
      toast.error("Ocorreu um erro ao cadastrar o cliente.");
    }
  };

  const handleEditClient = async (data: ClientFormValues) => {
    if (!id) {
      router.push("/dashboard/clientes");
      return;
    }

    try {
      const result = await editClient(data, id);
      console.log(result);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success("Cliente alterado com sucesso!");
      router.push("/dashboard/clientes");
    } catch (error) {
      console.log("Erro no servidor", error);
      toast.error("Ocorreu um erro ao alterar o cliente.");
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/clientes");
  };

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
                <FormItem className="space-y-1">
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

          <div className="flex gap-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="max-w-52 space-y-1">
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
                <FormItem className="space-y-1">
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
            <Button className="">Salvar</Button>
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
