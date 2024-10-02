import { Card, CardContent } from "@/components/ui/card";

import { ProductResponse } from "@/models/product";
import { formatPrice } from "@/utils/format-price";
import { transformPhotoProduct } from "@/utils/photo-product";
import Image from "next/image";

type ProductCardProps = {
  product: ProductResponse;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-2 py-2">
        <Image
          src={transformPhotoProduct(product.imageUrl || "")}
          alt={product.name}
          width={144}
          height={144}
          className="h-36 w-36 object-contain"
        />
        <p className="font-medium capitalize">{product.name}</p>
        <p>{formatPrice(product.price)}</p>
      </CardContent>
    </Card>
  );
}
