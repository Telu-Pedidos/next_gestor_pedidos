import getOrders from "@/actions/order/get-orders";
import OrderCardManager from "@/components/order/order-card-manager";
import OrderStatusManager from "@/components/order/order-status-manager";
import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";
import Link from "next/link";

import Image from "next/image";
import { IMAGE } from "@/utils/image";

export default async function DashboardPage() {
  const { data } = await getOrders();
  const newData = data?.reverse() ?? null;

  return (
    <main className="w-full max-w-full px-3 py-6 lg:px-1">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-x-2 gap-y-4">
        <OrderStatusManager orders={newData} />
        <Button className="gap-2" asChild>
          <Link href="/dashboard/cadastrar">
            <UploadIcon className="size-4 md:size-[1.125rem]" />
            <span className="text-xs md:text-sm">Criar Pedido</span>
          </Link>
        </Button>
      </div>
      {newData && newData?.length >= 1 ? (
        <OrderCardManager orders={newData} />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex w-fit flex-col items-center gap-4 p-4">
            <strong className="cursor-default">
              Nenhum pedido foi encontrado
            </strong>
            <Image src={IMAGE.Cat} width={120} height={120} alt="cat" />
          </div>
        </div>
      )}
    </main>
  );
}
