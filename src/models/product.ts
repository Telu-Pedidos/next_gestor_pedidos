import { z } from "zod";
import { CategoryResponse } from "./category";
import { ModelResponse } from "./model";
import { productSchema } from "@/validations/product-validation";

export type ProductDTO = z.infer<typeof productSchema>;

export type ProductResponse = ProductDTO & {
  id: number;
  slug: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  category?: CategoryResponse;
  model?: ModelResponse;
};
