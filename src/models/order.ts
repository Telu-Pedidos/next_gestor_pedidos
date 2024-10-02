import { orderSchema } from "@/validations/order-validation";
import { z } from "zod";
import { ClientResponse } from "./client";
import { ProductResponse } from "./product";

export type OrderDTO = z.infer<typeof orderSchema>;

export type OrderResponse = OrderDTO & {
  id: number;
  createdAt: string;
  updatedAt: string;
  client: ClientResponse;
  products: ProductResponse[];
};
