"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import getOrderMonth from "@/actions/order/get-order-month";
import { getLastSixMonths } from "@/helpers/date";
import { useState, useEffect, useTransition } from "react";
import toast from "react-hot-toast";

type ChartData = {
  month: string;
  pedidos: number;
};

export default function useReports() {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    async function fetchOrders() {
      startTransition(async () => {
        const today = new Date();

        try {
          const lastSixMonths = getLastSixMonths(today);
          const promises = lastSixMonths.map(
            async ({ formattedMonth, monthIndex }) => {
              const { data, ok, error } = await getOrderMonth({
                month: monthIndex
              });

              const totalOrders =
                data?.reduce(
                  (sum, order) => sum + (order.total ? order?.total : 0),
                  0
                ) ?? 0;

              if (ok) {
                return {
                  month: formattedMonth,
                  pedidos: data.length,
                  total: totalOrders
                };
              } else {
                throw new Error(error);
              }
            }
          );

          const ordersData = await Promise.all(promises);
          setChartData(ordersData);
        } catch (error: any) {
          console.error(error.message);
          toast.error("Erro ao buscar os pedidos");
        }
      });
    }

    fetchOrders();
  }, []);

  return {
    chartData,
    isPending
  };
}
