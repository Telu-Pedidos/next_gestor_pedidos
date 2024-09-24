import OrderCardManager from "@/components/order/order-card-manager";
import OrderStatusManager from "@/components/order/order-status-manager";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <main className="w-full max-w-[1180px] px-3 py-6 lg:px-1">
      <div className="mb-6 flex justify-between gap-2">
        <OrderStatusManager />
        <Button>Criar Pedido</Button>
      </div>
      <OrderCardManager />
    </main>
  );
}
