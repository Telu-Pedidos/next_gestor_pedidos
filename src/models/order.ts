import { ClientResponse } from "./client";
import { ProductResponse } from "./product";

type OrderStatus =
  | "PENDING"
  | "CANCELLED"
  | "ACCEPTED"
  | "PREPARATION"
  | "COMPLETED";

type OrderDelivery = "WITHDRAWALS" | "SHOPEE";

export interface OrderDTO {
  startAt: string;
  endAt: string;
  clientId: string;
  productIds: number[];
  total?: number;
  observation?: string;
  status?: OrderStatus;
  delivery?: OrderDelivery;
}

export interface OrderResponse extends OrderDTO {
  id: number;
  client: ClientResponse;
  products: ProductResponse[];
  createdAt: string;
  updatedAt: string;
}
