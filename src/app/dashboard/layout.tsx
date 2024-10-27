import Header from "@/components/header";
import "../globals.css";

import type { Metadata } from "next";

import { Toaster } from "react-hot-toast";
import Menu from "@/components/menu";
import { OrderProvider } from "@/context/order-context";

export const metadata: Metadata = {
  title: "Dashboard | Télu Pedidos",
  description: "Dashboard de administrador do gestor de pedidos Télu Pedidos"
};

export default async function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <OrderProvider>
      <Toaster position="top-center" />
      <div className="flex min-h-screen w-full flex-col gap-4 md:flex-row md:px-0">
        <Header />
        <div className="w-full md:px-4">
          <Menu />
          {children}
        </div>
      </div>
    </OrderProvider>
  );
}
