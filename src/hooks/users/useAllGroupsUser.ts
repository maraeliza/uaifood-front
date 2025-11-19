'use client'

import { api } from '@/lib/axios'
import { GroupUser } from '@/utils/interfaces'
import { useQuery } from '@tanstack/react-query'

interface getResponse {
  groups: GroupUser[]
}

async function getAllGroupUsers(): Promise<getResponse> {
  const response = await api
    .get(`/api/user/allGroupUser`)
    .then((response) => response.data)

  const groups: GroupUser[] = response
  return { groups }
}

export function useAllGroupUser() {
  return useQuery({
    queryKey: ['users'],
    refetchOnWindowFocus: false,
    queryFn: () => getAllGroupUsers(),
  })
}
