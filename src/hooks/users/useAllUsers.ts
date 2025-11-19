'use client'

import { api } from '@/lib/axios'
import { UserAccount } from '@/utils/interfaces'
import { useQuery } from '@tanstack/react-query'

interface getResponse {
  users: UserAccount[]
}

async function getUsers(): Promise<getResponse> {
  const response = await api
    .get(`/api/user/search-all`)
    .then((response) => response.data)

  const users: UserAccount[] = response

  return { users }
}

export function useUsersAll() {
  return useQuery({
    queryKey: ['users-all'],
    refetchOnWindowFocus: false,
    queryFn: () => getUsers(),
  })
}
