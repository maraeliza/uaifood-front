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

export interface OrderData {
  id: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
  orderItems: OrderItemData[];
}
