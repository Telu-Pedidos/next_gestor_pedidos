/* eslint-disable @typescript-eslint/no-explicit-any */
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import ProductCard from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProductResponse } from "@/models/product";
import { useState } from "react";

type OrderSelectProductProps = {
  products: ProductResponse[] | undefined;
  field: any;
  calculateTotal: (selectedProductIds: number[]) => void;
  resetTotal: () => void;
};

export default function OrderSelectProduct({
  products,
  field,
  calculateTotal,
  resetTotal
}: OrderSelectProductProps) {
  const selectedCount = field.value?.length || 0;

  const [selectOption, setSelectOption] = useState<
    "selectProductsOption" | "allProductsOption"
  >("allProductsOption");

  function handleProductChange(checked: boolean, productId: string) {
    const newProductIds = checked
      ? [...(field.value || []), Number(productId)].filter(
          (value, index, self) => self.indexOf(value) === index
        )
      : field.value?.filter((value: number) => value !== Number(productId)) ||
        [];

    field.onChange(newProductIds);
    calculateTotal(newProductIds);
  }

  function clearSelection() {
    field.onChange([]);
    calculateTotal([]);
    resetTotal();
  }

  const filteredProducts = products?.filter((product) => {
    if (selectOption === "selectProductsOption") {
      return field.value?.includes(Number(product.id));
    }
    return product.active;
  });

  return (
    <FormItem className="space-y-4">
      <div className="flex flex-col items-start gap-1">
        <FormLabel className="mb-2 text-[#595548]">Produtos</FormLabel>

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
            <ToggleGroup
              type="single"
              className="mt-10 flex w-full flex-wrap sm:flex-nowrap"
              value={selectOption}
              onValueChange={(value) => {
                if (value !== selectOption) {
                  setSelectOption(
                    value as "allProductsOption" | "selectProductsOption"
                  );
                }
              }}
            >
              <ToggleGroupItem
                value="allProductsOption"
                aria-label="Mudar para mostrar todos os produtos"
                className="w-full sm:w-fit"
              >
                Mostrar Produtos
              </ToggleGroupItem>
              <ToggleGroupItem
                value="selectProductsOption"
                aria-label="Mudar para produtos selecionados"
                className="w-full sm:w-fit"
              >
                Produtos Selecionados
              </ToggleGroupItem>
            </ToggleGroup>

            <ScrollArea className="h-[calc(100vh-16rem)] w-full">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {filteredProducts?.length ? (
                  filteredProducts?.map((product) => {
                    const checkboxId = `checkedProduct-${product.id}`;
                    const isChecked = field.value?.includes(Number(product.id));

                    return (
                      <FormControl key={product.id}>
                        <div className="flex items-center space-x-2">
                          <FormLabel htmlFor={checkboxId}>
                            <Checkbox
                              id={checkboxId}
                              checked={isChecked}
                              onCheckedChange={(checked) =>
                                handleProductChange(
                                  !!checked,
                                  String(product.id)
                                )
                              }
                            />
                            <ProductCard product={product} />
                          </FormLabel>
                        </div>
                      </FormControl>
                    );
                  })
                ) : (
                  <p>Nenhum produto encontrado...</p>
                )}
              </div>
            </ScrollArea>

            {/* Linha com o texto de contagem de produtos e o botão de limpar seleção */}
            <div className="flex w-full items-end justify-between">
              <p className="mt-4 text-sm text-gray-600">
                {selectedCount} produto{selectedCount !== 1 ? "s" : ""}{" "}
                selecionado{selectedCount !== 1 ? "s" : ""}
              </p>
              <Button
                onClick={clearSelection}
                variant="destructive"
                className="text-white"
                size="sm"
              >
                Limpar seleção
              </Button>
            </div>

            <DialogDescription />
          </DialogContent>
        </Dialog>

        <p className="cursor-default text-xs text-gray-600">
          {selectedCount} produto{selectedCount !== 1 ? "s" : ""} selecionado
          {selectedCount !== 1 ? "s" : ""}
        </p>
      </div>

      <FormMessage />
    </FormItem>
  );
}
