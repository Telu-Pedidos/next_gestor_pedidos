import Header from "@/components/header";
import "../globals.css";

import type { Metadata } from "next";

import { Toaster } from "react-hot-toast";
import Menu from "@/components/menu";

export const metadata: Metadata = {
  title: "Dashboard | Telú Personalizados",
  description:
    "Dashboard de administrador do gestor de pedidos Telú Personalizados"
};

export default async function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Toaster position="top-center" />
      <div className="flex min-h-screen">
        <Header />
        <div className="flex-1">
          <Menu />
          <div className="ml-8 mt-7">{children}</div>
        </div>
      </div>
    </>
  );
}
