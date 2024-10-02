import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { OrderResponse } from "@/models/order";
import { formatPrice } from "@/utils/format-price";
import { transformPhotoProduct } from "@/utils/photo-product";
import Image from "next/image";

export default function OrderCardTable({ order }: { order: OrderResponse }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Qtd</TableHead>
          <TableHead>Itens</TableHead>
          <TableHead className="text-right">Preços</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {order.products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">1</TableCell>
            <TableCell>
              <div className="flex items-center gap-2 font-semibold text-foreground">
                <Image
                  src={transformPhotoProduct(product.imageUrl || "")}
                  alt={product.name}
                  width={40}
                  height={40}
                  className="size-10 rounded-full object-cover"
                />
                <span>{product.name}</span>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <span className="font-semibold text-foreground">
                {formatPrice(product.price)}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right">
            {formatPrice(order.total || 0)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
