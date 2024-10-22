"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import useReports from "@/hooks/useReports";
import { Skeleton } from "@/components/ui/skeleton";
import { getYear } from "date-fns";

export const description = "A bar chart with a label";

const chartConfig = {
  orders: {
    label: "Pedidos",
    color: "hsl(var(--chart-4))"
  },
  total: {
    label: "Total",
    color: "hsl(var(--chart-1))"
  }
} satisfies ChartConfig;

export function ReportBarChartLabel() {
  const { chartData, isPending } = useReports();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gráfico de Barra - Pedidos</CardTitle>
        <CardDescription>
          {!isPending && (
            <>
              {chartData[0]?.month} - {chartData[chartData?.length - 1]?.month}{" "}
              {getYear(new Date())}
            </>
          )}
        </CardDescription>
      </CardHeader>
      {isPending ? (
        <Skeleton className="hidden h-[597px] w-full rounded-xl bg-gray-100 p-6 sm:block" />
      ) : (
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="pedidos" fill="var(--color-orders)" radius={4} />
              <Bar dataKey="total" fill="var(--color-total)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      )}
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Mostrando o total de pedidos dos últimos 6 meses
        </div>
      </CardFooter>
    </Card>
  );
}
