/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductCard from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProductResponse } from "@/models/product";

type OrderSelectProductProps = {
  products: ProductResponse[] | undefined;
  field: any;
};

export default function OrderSelectProduct({
  products,
  field
}: OrderSelectProductProps) {
  const selectedCount = field.value?.length || 0;

  return (
    <FormItem className="space-y-4">
      <div className="flex flex-col gap-4">
        <FormLabel className="text-[#595548]">Produtos</FormLabel>

        <Dialog>
          <DialogTrigger>
            <Button
              type="button"
              id="selectProducts"
              size="sm"
              variant="outline"
            >
              Selecionar produtos
            </Button>
          </DialogTrigger>

          <DialogContent className="w-full max-w-4xl">
            <ScrollArea className="h-[calc(100vh-16rem)] w-full">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {products
                  ?.filter((product) => product.active)
                  .map((product) => {
                    const checkboxId = `checkedProduct-${product.id}`;

                    return (
                      <FormControl key={product.id}>
                        <div className="flex items-center space-x-2">
                          <FormLabel htmlFor={checkboxId}>
                            <Checkbox
                              id={checkboxId}
                              checked={field.value?.includes(product.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...(field.value || []),
                                      product.id
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: any) => value !== product.id
                                      )
                                    );
                              }}
                            />
                            <ProductCard product={product} />
                          </FormLabel>
                        </div>
                      </FormControl>
                    );
                  })}
              </div>
            </ScrollArea>
            <p className="mt-4 text-sm text-gray-600">
              {selectedCount} produto{selectedCount !== 1 ? "s" : ""}{" "}
              selecionado{selectedCount !== 1 ? "s" : ""}
            </p>
          </DialogContent>
        </Dialog>
      </div>

      <FormMessage />
    </FormItem>
  );
}
