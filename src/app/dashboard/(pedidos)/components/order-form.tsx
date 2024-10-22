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
import { NumericFormat } from "react-number-format";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { OrderResponse } from "@/models/order";
import {
  OrderFormValues,
  orderSchema,
  statuses,
  deliveryuses
} from "@/validations/order-validation";
import useOrders from "@/hooks/useOrders";
import useClients from "@/hooks/useClients";
import useProducts from "@/hooks/useProducts";
import { Textarea } from "@/components/ui/textarea";
import OrderSelectProduct from "./order-select-product";
import { transformNameDelivery } from "@/utils/functions";
import { useState } from "react";

type OrderFormProps = {
  order?: OrderResponse;
  id?: string;
};

export default function OrderForm({ order, id }: OrderFormProps) {
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      total: order?.total || null,
      clientId: order?.clientId,
      delivery: order?.delivery || "SHOPEE",
      status: order?.status || "PENDING",
      observation: order?.observation || "",
      productIds: order?.productIds || [],
      startAt: order?.startAt || String(new Date()),
      endAt: order?.endAt || String(new Date())
    }
  });

  const { clients } = useClients({ id });
  const { products } = useProducts({ id });
  const { onSubmit, isPending, handleCancel } = useOrders({ id });

  const [total, setTotal] = useState(order?.total || 0);

  const calculateTotal = (selectedProductIds: number[]) => {
    const selectedProducts = products?.filter((product) =>
      selectedProductIds.includes(Number(product.id))
    );
    const newTotal =
      selectedProducts?.reduce((acc, product) => acc + product.price, 0) || 0;
    setTotal(newTotal);
    form.setValue("total", newTotal);
  };

  const selectedProductIds = form.watch("productIds");

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
              name="clientId"
              render={({ field }) => (
                <FormItem className="w-full space-y-1 sm:w-60">
                  <FormLabel className="text-[#595548]">Cliente</FormLabel>
                  <Select
                    value={
                      field.value ||
                      (order?.client.id ? String(order?.client.id) : undefined)
                    }
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o cliente..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {clients?.map((client) => (
                        <SelectItem value={String(client.id)} key={client.id}>
                          <div className="flex items-center gap-2">
                            <span>{client.name}</span>
                            {client.phone && <span> - {client.phone}</span>}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="total"
              render={({ field }) => (
                <FormItem className="w-full space-y-1 sm:w-fit">
                  <FormLabel className="text-[#595548]">Total</FormLabel>
                  <FormControl>
                    <NumericFormat
                      disabled={selectedProductIds?.length ? true : false}
                      allowLeadingZeros={false}
                      allowNegative={false}
                      decimalScale={2}
                      fixedDecimalScale
                      decimalSeparator=","
                      allowedDecimalSeparators={["."]}
                      prefix="R$ "
                      thousandSeparator="."
                      isAllowed={(values) => values.value.length <= 9}
                      className="flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
                      onValueChange={(values) =>
                        field.onChange(values.floatValue)
                      }
                      value={total}
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
              name="productIds"
              render={({ field }) => (
                <OrderSelectProduct
                  products={products}
                  field={field}
                  calculateTotal={calculateTotal}
                  resetTotal={() => setTotal(0)}
                />
              )}
            />
          </div>

          <div className="flex flex-wrap gap-8 sm:flex-nowrap">
            <FormField
              control={form.control}
              name="delivery"
              render={({ field }) => (
                <FormItem className="w-full space-y-1 sm:w-48">
                  <FormLabel className="text-[#595548]">Entrega</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a entrega" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {deliveryuses.map((delivery) => (
                        <SelectItem value={delivery} key={delivery}>
                          {transformNameDelivery(delivery)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="w-full space-y-1 sm:w-48">
                  <FormLabel className="text-[#595548]">Status</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem value={status} key={status}>
                          {status === "PENDING"
                            ? "Pendente"
                            : status === "ACCEPTED"
                              ? "Aceito"
                              : status === "PREPARATION"
                                ? "Em Preparo"
                                : "Concluído"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-wrap gap-8 sm:flex-nowrap">
            <FormField
              control={form.control}
              name="startAt"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-[#595548]">Início</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endAt"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-[#595548]">Fim</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-wrap gap-8 sm:flex-nowrap">
            <FormField
              control={form.control}
              name="observation"
              render={({ field }) => (
                <FormItem className="w-full max-w-xl space-y-1">
                  <FormLabel className="text-[#595548]">Observação</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Digite sua observação aqui."
                      className="min-h-32 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator className="mt-2 block h-[1px] w-full bg-border" />

          <div className="col-span-2 mt-2 flex w-full flex-wrap gap-4">
            <Button disabled={isPending}>
              {isPending
                ? id
                  ? "Alterando..."
                  : "Salvando..."
                : id
                  ? "Alterar"
                  : "Salvar"}
            </Button>
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
