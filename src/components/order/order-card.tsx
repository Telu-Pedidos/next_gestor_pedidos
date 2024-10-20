"use client";

import {
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
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Status, statuses } from "@/validations/order-validation";
import { OrderResponse } from "@/models/order";
import { formatNumberToHex, transformNameDelivery } from "@/utils/functions";
import { formatDateNew, formatDateToDays, isSameDate } from "@/helpers/date";
import { formatPrice } from "@/utils/format-price";
import useOrders from "@/hooks/useOrders";
import { Dispatch, SetStateAction } from "react";
import OrderDetails from "@/components/order/order-details";

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

  const { handleNewStatusOrder, handleFinishOrder } = useOrders({});

  const modifyStatusOrder = (id: string, newStatus: Status) => {
    setActiveStatus(newStatus);

    if (newStatus === "COMPLETED") {
      handleFinishOrder(id);
      return;
    }

    handleNewStatusOrder(id, newStatus);
  };

  const finishStatusOrder = (id: string) => {
    setActiveStatus("COMPLETED");
    handleFinishOrder(id);
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
                {transformNameDelivery(order.delivery)}
              </p>
            </div>
            {order?.endAt && !isSameDate(order?.startAt, order?.endAt) && (
              <div className="flex flex-wrap items-center gap-1 text-xs font-medium text-destructive/90">
                <CalendarIcon className="size-[0.875rem]" />
                <p>
                  Concluir até{" "}
                  <strong className="text-destructive">
                    {formatDateNew(order.endAt)}
                  </strong>
                </p>
              </div>
            )}
          </CardContent>

          <CardFooter className="mt-9 flex flex-wrap justify-between gap-2 p-0">
            <span className="text-xs text-[#9F947F]">
              Recebido há {formatDateToDays(order.startAt)}
            </span>
            <p className="text-base font-semibold">
              {formatPrice(order.total || 0)}
            </p>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <OrderDetails
        order={order}
        status={status}
        modifyStatusOrder={modifyStatusOrder}
        canMoveToStatus={canMoveToStatus}
        finishStatusOrder={finishStatusOrder}
      />
    </Dialog>
  );
}
