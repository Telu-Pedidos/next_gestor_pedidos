"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProductFormValues,
  productSchema
} from "@/validations/product-validation";
import { ProductResponse } from "@/models/product";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import Image from "next/image";
import { CameraIcon } from "lucide-react";
import { transformPhotoProduct } from "@/utils/photo-product";
import useCategories from "@/hooks/useCategories";
import useModels from "@/hooks/useModels";
import useProducts from "@/hooks/useProducts";
import { Separator } from "@/components/ui/separator";

type ProductFormProps = {
  product?: ProductResponse;
  id?: string;
};

export default function ProductForm({ product, id }: ProductFormProps) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      price: product?.price || 0,
      categoryId: product?.categoryId,
      modelId: product?.modelId,
      imageUrl: product?.imageUrl || "",
      file: product?.file || undefined
    }
  });

  const { categories } = useCategories({ id });
  const { models } = useModels({ id });

  const {
    onSubmit,
    selectedFile,
    previewImage,
    handleCancel,
    handleImageChange,
    isPending
  } = useProducts({ id });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem className="w-full max-w-52 space-y-1 font-medium text-[#595548]">
                  <FormLabel
                    className="cursor-pointer text-[#595548]"
                    htmlFor="fileInput"
                    aria-label="Mudar Foto"
                  >
                    Foto do Produto
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      id="fileInput"
                      onChange={(e) => {
                        const file =
                          e.target.files?.[0] || selectedFile || null;
                        field.onChange(file);
                        handleImageChange(file);
                      }}
                      className="hidden"
                      accept=".jpg, .jpeg, .png, .webp"
                      multiple={false}
                    />
                  </FormControl>
                  <div
                    className="relative mt-4 h-48 w-48 cursor-pointer"
                    onClick={() =>
                      document.getElementById("fileInput")?.click()
                    }
                  >
                    <Image
                      src={
                        previewImage || transformPhotoProduct(product?.imageUrl)
                      }
                      alt="Pré-visualização da imagem"
                      className="h-full w-full rounded object-contain"
                      width={192}
                      height={192}
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 transition-colors hover:bg-black/20">
                      <CameraIcon className="text-white" size={32} />
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full max-w-52 space-y-1">
                  <FormLabel className="text-[#595548]">Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do produto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-[#595548]">Preço</FormLabel>
                  <FormControl>
                    <NumericFormat
                      allowLeadingZeros={false}
                      allowNegative={false}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      decimalSeparator=","
                      allowedDecimalSeparators={["."]}
                      prefix="R$ "
                      thousandSeparator="."
                      isAllowed={(values) => {
                        if (values.value.length > 9) return false;
                        return true;
                      }}
                      className="flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      onValueChange={(values) =>
                        field.onChange(values.floatValue)
                      }
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-8">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="w-48 space-y-1">
                  <FormLabel className="text-[#595548]">Categoria</FormLabel>
                  <Select
                    value={
                      field.value ||
                      (product?.category?.id
                        ? String(product?.category?.id)
                        : undefined)
                    }
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem
                          value={String(category.id)}
                          key={category.id}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="modelId"
              render={({ field }) => (
                <FormItem className="w-48 space-y-1">
                  <FormLabel className="text-[#595548]">Modelo</FormLabel>
                  <Select
                    value={
                      field.value ||
                      (product?.model?.id
                        ? String(product?.model?.id)
                        : undefined)
                    }
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o modelo..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {models?.map((model) => (
                        <SelectItem value={String(model.id)} key={model.id}>
                          <div className="flex items-center gap-2">
                            {model?.imageUrl && (
                              <>
                                <Image
                                  src={model.imageUrl}
                                  width={32}
                                  height={32}
                                  className="h-8 w-8"
                                  alt={model.name}
                                />
                                -
                              </>
                            )}{" "}
                            <span>{model.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator className="mt-4 block h-[1px] w-full bg-border" />

          <div className="col-span-2 mt-6 flex w-full flex-wrap gap-4">
            {id ? (
              <Button disabled={isPending}>
                {isPending ? "Alterando..." : "Alterar"}
              </Button>
            ) : (
              <Button disabled={isPending}>
                {isPending ? "Salvando..." : "Salvar"}
              </Button>
            )}
            <Button
              type="button"
              variant="outline"
              className="gap-3"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
