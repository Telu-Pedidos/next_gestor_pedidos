"use client";

import {
  BanknoteIcon,
  CalendarIcon,
  ChevronDownIcon,
  LockIcon,
  UserIcon
} from "lucide-react";
import { renderStatusText, statusStylesCard } from "./order-utils";
import { DialogClose, DialogContent, DialogHeader } from "../ui/dialog";
import { Button } from "../ui/button";
import { ICON } from "@/icons";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";
import { Status, statuses } from "@/validations/order-validation";
import { formatNumberToHex, transformNameDelivery } from "@/utils/functions";
import { formatDateNew, formatDateToDays } from "@/helpers/date";
import OrderCardTable from "./order-card-table";
import { formatPhoneNumber, regexPhoneNumber } from "@/helpers/phone";
import Link from "next/link";
import OrderDelete from "./order-delete";
import { OrderResponse } from "@/models/order";

type OrderDetaisProps = {
  order: OrderResponse;
  status: Status;
  modifyStatusOrder?: (id: string, newStatus: Status) => void;
  canMoveToStatus?: (currentStatus: Status, targetStatus: string) => boolean;
};

export default function OrderDetais({
  order,
  status,
  modifyStatusOrder,
  canMoveToStatus
}: OrderDetaisProps) {
  const styles = statusStylesCard[status as Status];

  return (
    <DialogContent className="flex w-full max-w-[40rem] flex-col gap-9">
      <DialogHeader className="flex-row items-baseline justify-between pt-6">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-order">
            {formatNumberToHex(order.id)}
          </p>
          <span className="text-[0.625rem] text-[#666358]">
            Recebido há {formatDateToDays(order.createdAt)}
          </span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="link"
              className={`inline-flex h-8 items-center gap-1 px-2 py-1 text-xs font-semibold text-active ${styles.border} ${styles.background} ${styles.text}`}
            >
              {renderStatusText(status)}
              <ChevronDownIcon className="size-[0.875rem]" />
            </Button>
          </DropdownMenuTrigger>

          {modifyStatusOrder && canMoveToStatus && status !== "COMPLETED" && (
            <DropdownMenuContent className="w-52">
              {statuses
                .filter((targetStatus) => canMoveToStatus(status, targetStatus))
                .map((targetStatus, index) => (
                  <div key={index}>
                    <DropdownMenuCheckboxItem
                      checked={status === targetStatus}
                      onCheckedChange={() =>
                        modifyStatusOrder(String(order.id), targetStatus)
                      }
                      className="flex gap-1 px-2 py-1 text-order"
                    >
                      Mover para{" "}
                      <strong>{renderStatusText(targetStatus)}</strong>
                    </DropdownMenuCheckboxItem>
                    {index < statuses.length - 1 && <DropdownMenuSeparator />}
                  </div>
                ))}
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </DialogHeader>
      <div className="flex w-full justify-between gap-2 rounded border border-border p-3">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-1 text-[#605E48]">
            <UserIcon className="size-[0.875rem]" />
            <p className="text-xs font-medium capitalize">
              {order.client.name}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-1 text-[#605E48]">
            <LockIcon className="size-[0.875rem]" />
            <p className="text-xs font-medium capitalize">
              {transformNameDelivery(order.delivery)}
            </p>
          </div>
        </div>
        <div className="space-y-2">
          {order.client.phone && (
            <div className="flex flex-wrap items-center gap-1 text-[#605E48]">
              <ICON.Whatsapp className="size-[0.875rem]" />
              <Link
                target="_blank"
                href={`https://wa.me/${regexPhoneNumber(order.client.phone || "")}`}
                className="text-xs font-semibold text-primary-foreground underline opacity-90 hover:opacity-100"
              >
                {formatPhoneNumber(order.client.phone)}
              </Link>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-1 text-[#605E48]">
            <BanknoteIcon className="size-[0.875rem]" />
            <p className="text-xs font-medium">
              Dinheiro{" "}
              <span className="text-[0.625rem] font-medium text-[#9F9E7F]">
                - Sem troco
              </span>
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-1 pr-10 text-[#605E48]">
            <CalendarIcon className="size-[0.875rem]" />
            <p className="text-xs font-medium">
              {formatDateNew(order.createdAt)} -{" "}
              {formatDateToDays(order.createdAt)}
            </p>
          </div>
        </div>
      </div>

      {order.products && <OrderCardTable order={order} />}

      <div className="block h-[1px] w-full bg-border"></div>

      {modifyStatusOrder && (
        <div className="flex items-center justify-end gap-3">
          <OrderDelete id={order.id} />
          <DialogClose asChild>
            {status === "PENDING" ? (
              <Button
                onClick={() => modifyStatusOrder(String(order.id), "ACCEPTED")}
              >
                Aceitar pedido
              </Button>
            ) : status === "ACCEPTED" ? (
              <Button
                onClick={() =>
                  modifyStatusOrder(String(order.id), "PREPARATION")
                }
              >
                Começar o preparo
              </Button>
            ) : (
              status === "PREPARATION" && (
                <Button
                  onClick={() =>
                    modifyStatusOrder(String(order.id), "COMPLETED")
                  }
                >
                  Concluir pedido
                </Button>
              )
            )}
          </DialogClose>
        </div>
      )}
    </DialogContent>
  );
}
