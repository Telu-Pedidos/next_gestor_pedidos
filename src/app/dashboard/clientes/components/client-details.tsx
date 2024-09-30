import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatPhoneNumber } from "@/helpers/phone";
import { ClientResponse } from "@/models/client";
import {
  CalendarIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  PlusIcon,
  UserIcon
} from "lucide-react";
import {
  getLastDateOrder,
  getQuantityOrders,
  getTotalSpentOrder
} from "../client-functions";
import { Row } from "@tanstack/react-table";
import { formatDateNew, formatDateToDays } from "@/helpers/date";
import { formatPrice } from "@/utils/format-price";

type ClientDetailsProps = {
  client: ClientResponse;
  row: Row<ClientResponse>;
};

export default function ClientDetails({ client, row }: ClientDetailsProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm" className="gap-1.5">
          <PlusIcon className="size-3.5" />
          Detalhes
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-xl px-0 py-8">
        <DialogHeader className="flex flex-col gap-5">
          <DialogTitle className="px-4 text-base font-medium">
            Detalhes do cliente
          </DialogTitle>
          <Separator />

          <DialogDescription className="mt-5 space-y-2.5 px-4">
            <div className="flex flex-wrap items-center gap-1 text-[#605E48]">
              <UserIcon className="size-[0.875rem]" />
              <p className="text-sm font-semibold">{client.name}</p>
            </div>
            <div className="flex flex-wrap gap-10">
              {client.phone ? (
                <div className="flex flex-wrap items-center gap-1 text-[#605E48]">
                  <PhoneIcon className="size-[0.875rem]" />
                  <p className="text-sm font-medium">
                    {formatPhoneNumber(client.phone)}
                  </p>
                </div>
              ) : (
                ""
              )}
              {client.email ? (
                <div className="flex flex-wrap items-center gap-1 text-[#605E48]">
                  <MailIcon className="size-[0.875rem]" />
                  <p className="text-sm font-medium">{client.email}</p>
                </div>
              ) : (
                ""
              )}
            </div>

            {client.address ? (
              <div className="flex flex-wrap items-center gap-1 text-[#605E48]">
                <MapPinIcon className="size-[0.875rem]" />
                <p className="text-sm font-medium">{client.address}</p>
              </div>
            ) : (
              ""
            )}
          </DialogDescription>

          <div className="flex w-full items-baseline justify-between gap-3 px-4">
            <div className="flex h-full flex-col gap-2 rounded border border-border px-9 py-3">
              <div className="h-full">
                <p className="text-sm font-medium text-[#666358]">
                  Total de pedidos
                </p>
                <span className="text-sm font-semibold text-title">
                  {getQuantityOrders(row)}{" "}
                  {getQuantityOrders(row) === 1 ? "pedido" : "pedidos"}
                </span>
              </div>

              <div className="text-xs font-medium">
                <p className="mb-1 text-title">Última compra:</p>
                {getLastDateOrder(row) !== null ? (
                  <div className="flex items-center gap-1 text-[#666358]">
                    <CalendarIcon className="size-4" />
                    <span>
                      Há {formatDateToDays(getLastDateOrder(row) || "")}{" "}
                      {formatDateNew(getLastDateOrder(row) || "")}
                    </span>
                  </div>
                ) : (
                  <span className="text-[#666358]">Não existem compras</span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="rounded border border-border px-9 py-3 text-center">
                <p className="text-sm font-medium text-[#666358]">Cliente há</p>
                <span className="text-sm font-semibold text-title">
                  {formatDateToDays(client.createdAt)}
                </span>
              </div>
              <div className="rounded border border-border px-9 py-3 text-center">
                <p className="text-sm font-medium text-[#666358]">
                  Total gasto pelo cliente
                </p>
                <span className="text-sm font-semibold text-title">
                  {formatPrice(getTotalSpentOrder(row))}
                </span>
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
