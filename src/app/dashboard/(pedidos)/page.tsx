import getOrders from "@/actions/order/get-orders";
import OrderCardManager from "@/components/order/order-card-manager";
import OrderStatusManager from "@/components/order/order-status-manager";
import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const { data } = await getOrders();

  return (
    <main className="w-full max-w-[1180px] px-3 py-6 lg:px-1">
      <div className="mb-6 flex justify-between gap-2">
        <OrderStatusManager orders={data} />
        <Button className="gap-2" asChild>
          <Link href="/dashboard/cadastrar">
            <UploadIcon className="size-[1.125rem]" />
            Criar Pedido
          </Link>
        </Button>
      </div>
      {data && <OrderCardManager orders={data} />}
    </main>
  );
}
