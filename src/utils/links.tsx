/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  ChartColumnIncreasingIcon,
  CircleUserIcon,
  ClipboardListIcon,
  HouseIcon,
  PackageSearchIcon,
  StickyNoteIcon
} from "lucide-react";

export const menuLinks = [
  {
    href: "/dashboard",
    id: "home",
    name: "Início"
  },
  {
    href: "/dashboard/historico-pedidos",
    id: "orderHistory",
    name: "Histórico de Pedidos"
  },
  {
    href: "/dashboard/produtos",
    id: "products",
    name: "Produtos"
  },
  {
    href: "/dashboard/categorias",
    id: "categories",
    name: "Categorias"
  },
  {
    href: "/dashboard/clientes",
    id: "clients",
    name: "Clientes"
  },
  {
    href: "/dashboard/relatorios",
    id: "reports",
    name: "Relatórios"
  }
];

export const iconsLinks: any = {
  home: <HouseIcon />,
  orderHistory: <ClipboardListIcon />,
  products: <PackageSearchIcon />,
  categories: <StickyNoteIcon />,
  clients: <CircleUserIcon />,
  reports: <ChartColumnIncreasingIcon />
};
