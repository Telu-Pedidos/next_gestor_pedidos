import { CategoryResponse } from "./category";
import { ModelResponse } from "./model";

export interface ProductDTO {
  name: string;
  price: number;
  categoryId: number;
  slug?: string;
  imageUrl?: string;
  modelId?: number;
}

export interface ProductResponse extends ProductDTO {
  id: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  category: CategoryResponse;
  model: ModelResponse;
}
