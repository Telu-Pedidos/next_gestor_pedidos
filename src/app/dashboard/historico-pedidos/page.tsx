import getOrders from "@/actions/order/get-orders";
import { Metadata } from "next";
import { formatPrice } from "@/utils/format-price";
import OrderHistoryManager from "./components/order-history-manager";

export const metadata: Metadata = {
  title: "Dashboard - Histórico | Télu Personalizados"
};

export default async function HistoricoPedidosPage() {
  const { data } = await getOrders();

  const totalSales =
    data?.reduce((sum, order) => sum + (order.total ? order?.total : 0), 0) ??
    0;

  return (
    <main>
      <div className="max-w-6xl rounded-md bg-card px-5 py-4">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-medium text-title">
            Histórico de Pedidos
          </h1>
        </div>
        <div className="mb-2 flex flex-wrap justify-end gap-8">
          <div className="space-y-1">
            <h2 className="text-sm font-medium text-[#666358]">
              Venda total (período)
            </h2>
            <p className="text-sm font-semibold text-title">
              {formatPrice(totalSales)}
            </p>
          </div>
          <div className="space-y-1">
            <h2 className="text-sm font-medium text-[#666358]">
              Nº de pedidos
            </h2>
            <p className="text-sm font-semibold text-title">
              {data?.length ?? 0}
            </p>
          </div>
          <div className="space-y-1">
            <h2 className="text-sm font-medium text-[#666358]">Ticket médio</h2>
            <p className="text-sm font-semibold text-title">
              {formatPrice(totalSales)}{" "}
            </p>
          </div>
        </div>
        {data && <OrderHistoryManager data={data} />}
      </div>
    </main>
  );
}
