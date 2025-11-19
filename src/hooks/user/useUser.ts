'use client'

import { api } from '@/lib/axios'
import { User } from '@/utils/interfaces'
import { useQuery } from '@tanstack/react-query'

async function getUser(): Promise<User> {
  const response = await api.get(`api/user`).then((response) => response.data)

  return response
}

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    refetchOnWindowFocus: false,
    queryFn: () => getUser(),
  })
}
