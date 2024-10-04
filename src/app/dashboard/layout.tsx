import Header from "@/components/header";
import "../globals.css";

import type { Metadata } from "next";

import { Toaster } from "react-hot-toast";
import Menu from "@/components/menu";
import { OrderProvider } from "@/context/order-context";

export const metadata: Metadata = {
  title: "Dashboard | Télu Personalizados",
  description:
    "Dashboard de administrador do gestor de pedidos Télu Personalizados"
};

export default async function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <OrderProvider>
      <Toaster position="top-center" />
      <div className="flex min-h-screen">
        <Header />
        <div className="flex-1">
          <Menu />
          <div className="ml-8 mt-7">{children}</div>
        </div>
      </div>
    </OrderProvider>
  );
}
