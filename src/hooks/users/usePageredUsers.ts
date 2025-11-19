'use client'

import { api } from '@/lib/axios'
import { FilterUserProps } from '@/pages/users/components/Header'

import { UserAccount } from '@/utils/interfaces'
import { useQuery } from '@tanstack/react-query'

interface Props {
  page: number
  filters?: FilterUserProps
}
interface PaginationData {
  registerPerPage: number
  currentPage: number
  totalCountofRegisters: number
  lastPage: number
  startIndex: number
  endIndex: number
}
interface getResponse {
  users: UserAccount[]
  pageData: PaginationData
}

async function getUsers({ page, filters }: Props): Promise<getResponse> {
  let apiURL = `/api/user/all?page=${page - 1}&perPage=8`

  if (filters?.name) {
    apiURL += '&name=' + filters.name
  }
  if (filters?.login) {
    apiURL += '&login=' + filters.login
  }
  try {
    const response = await api.get(apiURL).then((response) => response.data)
    const users: UserAccount[] = response.content
    const pageData: PaginationData = {
      registerPerPage: response.pageable.pageSize,
      currentPage: response.pageable.pageNumber + 1,
      totalCountofRegisters: response.totalElements,
      lastPage: response.totalPages,
      startIndex: response.pageable.pageNumber * response.pageable.pageSize + 1,
      endIndex:
        response.pageable.pageNumber * response.pageable.pageSize +
        response.content.length,
    }
    return { users, pageData }
  } catch (error) {
    console.log(error)
    return {
      users: [],
      pageData: {
        registerPerPage: 0,
        currentPage: 0,
        totalCountofRegisters: 0,
        lastPage: 0,
        startIndex: 0,
        endIndex: 0,
      },
    }
  }
}

export function useUsers({ page, filters }: Props) {
  return useQuery({
    queryKey: ['users', { page, filters }],
    refetchOnWindowFocus: false,
    queryFn: () => getUsers({ page, filters }),
  })
}
