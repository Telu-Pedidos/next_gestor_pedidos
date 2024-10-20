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
    <div className="h-full max-h-[calc(80vh-16rem)] w-full overflow-y-auto">
      <Table className="w-full">
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
                  <div className="flex flex-col gap-2">
                    <span className="line-clamp-2 inline-block max-h-10">
                      {product.name}
                    </span>
                    {product?.model && (
                      <strong className="w-fit cursor-default rounded-md bg-primary p-1 text-xs font-semibold text-active">
                        {product.model?.name}
                      </strong>
                    )}
                  </div>
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
    </div>
  );
}
