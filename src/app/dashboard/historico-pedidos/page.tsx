import getOrders from "@/actions/order/get-orders";
import { Metadata } from "next";
import ReportView from "@/components/report/report-view";

export const metadata: Metadata = {
  title: "Dashboard - Histórico | Télu Personalizados"
};

export default async function HistoricoPedidosPage() {
  const { data } = await getOrders();

  return (
    <main>
      <div className="max-w-6xl rounded-md bg-card px-5 py-4">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-medium text-title md:text-2xl">
            Histórico de Pedidos
          </h1>
        </div>

        {data && <ReportView data={data} />}
      </div>
    </main>
  );
}
