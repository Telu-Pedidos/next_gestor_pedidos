import { PencilIcon } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import ProductDelete from "./product-delete";
import { ProductResponse } from "@/models/product";

type ProductActionsProps = {
  product: ProductResponse;
};

export default function ProductActions({ product }: ProductActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir Menu</span>
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          asChild
          className="flex items-center gap-2 text-active"
        >
          <Link
            href={`/dashboard/produtos/alterar/${product.id}/${product.slug}`}
          >
            <PencilIcon className="size-4" />
            Editar Produto
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="flex items-center gap-2 text-active"
        >
          <ProductDelete name={product.name} id={String(product.id)} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
