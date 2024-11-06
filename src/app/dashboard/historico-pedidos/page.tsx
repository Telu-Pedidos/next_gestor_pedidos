import getOrders from "@/actions/order/get-orders";
import { Metadata } from "next";
import ReportView from "@/components/report/report-view";

export const metadata: Metadata = {
  title: "Dashboard - Histórico | Télu Pedidos"
};

export default async function HistoricoPedidosPage() {
  const { data } = await getOrders();
  const newData = data?.reverse() ?? null;

  return (
    <main className="w-full max-w-full rounded-md bg-card px-5 py-4">
      <div className="mb-6 flex w-full items-center justify-between">
        <h1 className="text-xl font-medium text-title md:text-2xl">
          Histórico de Pedidos
        </h1>
      </div>

      {newData && <ReportView data={newData} />}
    </main>
  );
}
