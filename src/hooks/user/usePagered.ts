"use client";

import { PaginationData } from "@/interfaces/common";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { GetUserResponse, User } from "@/interfaces/user";

interface Props {
  page: number;
  limit: number;
  nameOrEmail: string;
}

async function getUsers({
  page,
  limit,
  nameOrEmail,
}: Props): Promise<GetUserResponse> {
  try {
    const response = await api
      .get("/users", { params: { page, limit, nameOrEmail } })
      .then((res) => res.data);

    const data: User[] = response.data;

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

export function useUsers({ page, limit, nameOrEmail }: Props) {
  return useQuery({
    queryKey: ["users", { page, limit, nameOrEmail }],
    refetchOnWindowFocus: false,
    queryFn: () => getUsers({ page, limit, nameOrEmail }),
  });
}
