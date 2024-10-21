"use client";

import { formatPrice } from "@/utils/format-price";
import { OrderResponse } from "@/models/order";
import {
  startOfDay,
  isBefore,
  isAfter,
  isEqual,
  startOfYear,
  endOfYear
} from "date-fns";
import { useMemo, useState } from "react";
import { CalendarDatePicker } from "@/components/calendar-date-picker";
import OrdersTable from "@/app/dashboard/historico-pedidos/components/table/orders-table";
import { usePathname } from "next/navigation";
import { ReportBarChartLabel } from "@/app/dashboard/relatorios/components/report-bar-chart-label";

export default function ReportView({ data }: { data: OrderResponse[] }) {
  const pathname = usePathname();

  const today = new Date();

  const [selectedDateRange, setSelectedDateRange] = useState({
    from: startOfYear(today),
    to: endOfYear(today)
  });

  const filterOrderDate = useMemo(() => {
    return (
      data.filter((order) => {
        const orderCreated = startOfDay(new Date(order.startAt));
        const filterStart = startOfDay(new Date(selectedDateRange.from));
        const filterEnd = startOfDay(new Date(selectedDateRange.to));

        return (
          (isAfter(orderCreated, filterStart) &&
            isBefore(orderCreated, filterEnd)) ||
          isEqual(orderCreated, filterStart) ||
          isEqual(orderCreated, filterEnd)
        );
      }) || data
    );
  }, [data, selectedDateRange]);

  const totalSales = useMemo(() => {
    return (
      filterOrderDate?.reduce(
        (sum, order) => sum + (order.total ? order?.total : 0),
        0
      ) || 0
    );
  }, [filterOrderDate]);

  return (
    <>
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
          <h2 className="text-sm font-medium text-[#666358]">Nº de pedidos</h2>
          <p className="text-sm font-semibold text-title">
            {filterOrderDate?.length ?? 0}
          </p>
        </div>
        <div className="space-y-1">
          <h2 className="text-sm font-medium text-[#666358]">Ticket médio</h2>
          <p className="text-sm font-semibold text-title">
            {formatPrice(totalSales)}{" "}
          </p>
        </div>
      </div>

      <CalendarDatePicker
        date={selectedDateRange}
        onDateSelect={setSelectedDateRange}
      />

      {pathname === "/dashboard/historico-pedidos" && filterOrderDate && (
        <OrdersTable orders={filterOrderDate} />
      )}

      <div className="mt-6">
        {pathname === "/dashboard/relatorios" && filterOrderDate && (
          <ReportBarChartLabel />
        )}
      </div>
    </>
  );
}
