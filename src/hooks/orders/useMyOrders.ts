"use client";

import { Item, GetItemResponse } from "@/interfaces/item";
import { PaginationData } from "@/interfaces/common";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface Props {
  page: number;
  limit: number;
  description?: string;
  categoryId?: number;
}

async function getItems({
  page,
  limit,
  description,
  categoryId,
}: Props): Promise<GetItemResponse> {
  try {
    const response = await api
      .get("/orders/my", { params: { page, limit, description, categoryId } })
      .then((res) => res.data);

    const data: Item[] = response.data;

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
        currentPage: 0,
        registerPerPage: 0,
        totalCountofRegisters: 0,
        lastPage: 0,
      },
    };
  }
}

export function useMyOrders({ page, limit, description, categoryId }: Props) {
  return useQuery({
    queryKey: ["my-orders", { page, limit, description, categoryId }],
    refetchOnWindowFocus: false,
    queryFn: () => getItems({ page, limit, description, categoryId }),
  });
}
