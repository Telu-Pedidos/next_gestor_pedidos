import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  subsets: ["latin"],
  style: ["normal"]
})

export const metadata: Metadata = {
  title: "Gestor de Pedidos - Telú Personalizados",
  description: "Gestor de Pedidos - Telú Personalizados"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${inter.className}`}>
        <div className="flex min-h-screen flex-col">{children}</div>
      </body>
    </html>
  )
}
