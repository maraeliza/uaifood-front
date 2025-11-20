"use client";

import { Item, GetItemResponse } from "@/interfaces/item";
import { PaginationData } from "@/interfaces/common";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { GetOrderResponse, OrderEdit } from "@/interfaces/order";

interface Props {
  page: number;
  limit: number;
  userId: number;
}

async function getItems({
  page,
  limit,
  userId,
}: Props): Promise<GetOrderResponse> {
  try {
    const response = await api
      .get("/orders/my?userId="+userId, { params: { page, limit } })
      .then((res) => res.data);

    const data: OrderEdit[] = response.data;

    const meta: PaginationData = {
      currentPage: response.meta.page,
      registerPerPage: response.meta.limit,
      totalCountofRegisters: response.meta.total,
      lastPage: response.meta.lastPage,
    };
    return { data, meta };
  } catch (error) {
    console.error("Erro buscando itens:", error);

    return {
      data: [],
      meta: {
        currentPage: 1,
        registerPerPage: 0,
        totalCountofRegisters: 0,
        lastPage: 1,
      },
    };
  }
}

export function useMyOrders({ page, limit, userId }: Props) {
  return useQuery({
    queryKey: ["my-orders", { page, limit, userId }],
    refetchOnWindowFocus: false,
    queryFn: () => getItems({ page, limit, userId }),
  });
}
