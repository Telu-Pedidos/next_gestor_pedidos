"use client";

import {
  BanknoteIcon,
  CalendarIcon,
  ChevronDownIcon,
  LockIcon,
  UserIcon
} from "lucide-react";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "../ui/card";
import { renderStatusText, statusStylesCard } from "./order-utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger
} from "../ui/dialog";
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
import { OrderResponse } from "@/models/order";
import { formatNumberToHex } from "@/utils/functions";
import { formatDateNew, formatDateToDays } from "@/helpers/date";
import { formatPrice } from "@/utils/format-price";
import OrderCardTable from "./order-card-table";
import useOrders from "@/hooks/useOrders";
import { formatPhoneNumber, regexPhoneNumber } from "@/helpers/phone";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import OrderDelete from "./order-delete";

type OrderCardProps = {
  order: OrderResponse;
  status: Status;
  setActiveStatus: Dispatch<
    SetStateAction<"PENDING" | "ACCEPTED" | "PREPARATION" | "COMPLETED" | null>
  >;
};

export default function OrderCard({
  status,
  setActiveStatus,
  order
}: OrderCardProps) {
  const styles = statusStylesCard[status as Status];

  const { handleNewStatusOrder } = useOrders({});

  const modifyStatusOrder = (id: string, newStatus: Status) => {
    setActiveStatus(newStatus);
    handleNewStatusOrder(id, newStatus);
  };

  const canMoveToStatus = (currentStatus: Status, targetStatus: string) => {
    const currentIndex = statuses.indexOf(
      currentStatus as (typeof statuses)[number]
    );
    const targetIndex = statuses.indexOf(
      targetStatus as (typeof statuses)[number]
    );
    return targetIndex > currentIndex;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="w-full cursor-pointer rounded-md p-4 md:max-w-64">
          <CardHeader className="mb-4 flex flex-row flex-wrap items-baseline justify-between gap-2 p-0 text-order">
            <CardTitle className="text-sm font-semibold">
              {formatNumberToHex(order.id)}
            </CardTitle>
            <Badge
              className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-active ${styles.border} ${styles.background} ${styles.text}`}
            >
              {renderStatusText(status)}
              <ChevronDownIcon className="size-[0.875rem]" />
            </Badge>
          </CardHeader>
          <CardContent className="space-y-2 p-0">
            <div className="flex flex-wrap items-center gap-1 text-[#605E48]">
              <UserIcon className="size-[0.875rem]" />
              <p className="text-xs font-medium capitalize">
                {order.client.name}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-1 text-[#605E48]">
              <LockIcon className="size-[0.875rem]" />
              <p className="text-xs font-medium capitalize">
                {order.delivery.toLocaleLowerCase()}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-1 text-[#605E48]">
              <BanknoteIcon className="size-[0.875rem]" />
              <p className="text-xs font-medium">
                Dinheiro{" "}
                <span className="text-[0.625rem] font-medium text-[#9F9E7F]">
                  - Sem troco
                </span>
              </p>
            </div>
          </CardContent>
          <CardFooter className="mt-9 flex flex-wrap justify-between gap-2 p-0">
            <span className="text-xs text-[#9F947F]">
              Recebido há {formatDateToDays(order.createdAt)}
            </span>
            <p className="text-base font-semibold">
              {formatPrice(order.total || 0)}
            </p>
          </CardFooter>
        </Card>
      </DialogTrigger>
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
            {status !== "COMPLETED" && (
              <DropdownMenuContent className="w-52">
                {statuses
                  .filter((targetStatus) =>
                    canMoveToStatus(status, targetStatus)
                  )
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
                {order.delivery.toLocaleLowerCase()}
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
      </DialogContent>
    </Dialog>
  );
}
