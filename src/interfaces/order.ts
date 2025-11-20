import { PaginationData } from "./common";

export interface OrderItemData {
  id: number;
  quantity: number;
  item: {
    id: number;
    description: string;
    unitPrice: number;
    category: { description: string; color?: string };
    image?: string;
  };
}

export type PaymentMethod = "CASH" | "DEBIT" | "CREDIT" | "PIX";
export type Status = "PENDING" | "PAID" | "CANCELLED";

export interface OrderData {
  id: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
  orderItems: OrderItemData[];
}

export interface OrderAdd {
  clientId: number;
  paymentMethod: PaymentMethod;
  status: Status;
  createdById: number;
}

export interface OrderEdit extends OrderAdd {
  id: number;
}
export interface GetOrderResponse {
  data: OrderEdit[];
  meta: PaginationData;
}
