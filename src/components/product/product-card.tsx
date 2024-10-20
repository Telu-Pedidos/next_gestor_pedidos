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
      <CardContent className="px-0 pb-0">
        <div className="mb-4 space-y-2 px-4 pt-2">
          <Image
            src={transformPhotoProduct(product.imageUrl || "")}
            alt={product.name}
            width={144}
            height={144}
            className="h-36 w-36 object-contain"
          />
          <p className="font-medium capitalize">{product.name}</p>
          <p className="">{formatPrice(product.price)}</p>
        </div>

        {product?.model && (
          <span className="block w-full rounded-b-md bg-primary/80 px-4 py-2 text-center text-xs font-medium text-primary-foreground">
            {product.model?.name}
          </span>
        )}
      </CardContent>
    </Card>
  );
}
