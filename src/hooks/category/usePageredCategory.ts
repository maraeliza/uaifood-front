'use client'

import { api } from '@/lib/axios'
import { Category, GetCategoryResponse, PaginationData } from '@/utils/interface'

import { useQuery } from '@tanstack/react-query'

interface Props {
  page: number
  limit: number
}

async function getCategories({ page }: Props): Promise<GetCategoryResponse> {
  try {
    const response = await api
      .get(`/categories?page=${page}&limit=10`)
      .then((res) => res.data);

    const categories: Category[] = response.data;

    const pageData: PaginationData = {
      currentPage: response.meta.page,
      registerPerPage: response.meta.limit,
      totalCountofRegisters: response.meta.total,
      lastPage: response.meta.lastPage,
    };
    return { categories, pageData };
  } catch (error) {
    console.error("Erro buscando categorias:", error);

    return {
      categories: [],
      pageData: {
        currentPage: 0,
        registerPerPage: 0,
        totalCountofRegisters: 0,
        lastPage: 0,
      },
    };
  }
}


export function useCategories({ page, limit }: Props) {
  return useQuery({
    queryKey: ['categories', { page, limit }],
    refetchOnWindowFocus: false,
    queryFn: () => getCategories({ page, limit }),
  })
}
