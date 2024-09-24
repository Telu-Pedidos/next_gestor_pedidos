import "./globals.css";

import { inter } from "@/functions/fonts";
import type { Metadata } from "next";

import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Telú Personalizados",
  description: "Telú Personalizados"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${inter.className}`}>
        <div className="flex min-h-screen flex-col">
          <Toaster position="top-center" />
          {children}
        </div>
      </body>
    </html>
  );
}
