/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  ChartColumnIncreasingIcon,
  CircleUserIcon,
  ClipboardListIcon,
  ComponentIcon,
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
    href: "/dashboard/modelos",
    id: "models",
    name: "Modelos"
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
  models: <ComponentIcon />,
  clients: <CircleUserIcon />,
  reports: <ChartColumnIncreasingIcon />
};
