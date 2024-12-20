import getOrders from "@/actions/order/get-orders";
import ReportView from "@/components/report/report-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Relatórios | Télu Pedidos"
};

export default async function RelatoriosPage() {
  const { data } = await getOrders();
  const newData = data?.reverse() ?? null;

  return (
    <main className="max-w-6xl rounded-md bg-card px-5 py-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-medium text-title">Relatórios</h1>
      </div>

      {newData && <ReportView data={newData} />}
    </main>
  );
}
