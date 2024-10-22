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
      <div className="flex min-h-screen flex-col gap-4 md:flex-row md:px-0">
        <Header />
        <div className="flex-1 md:px-4">
          <Menu />
          {children}
        </div>
      </div>
    </OrderProvider>
  );
}
