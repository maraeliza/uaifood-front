'use client'

import { api } from '@/lib/axios'
import { useToast } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

type Usuario = {
  id: number
  name: string
  email: string
  login: string
  cellphone: string
  groupIds: number[]
  isEnabled: boolean
}

export function useEditUser() {
  const toast = useToast()

  return useMutation({
    mutationFn: async (user: Usuario) => {
      const url = '/api/user/' + user.id
      return await api.put(url, user)
    },
    onSuccess: () => {
      toast({
        title: 'Usuário editado com sucesso!',
        status: 'success',
        duration: 2500,
        isClosable: true,
        variant: 'left-accent',
        position: 'top-right',
      })
    },
    onError: (error: AxiosError<{ detail: string }>) => {
      toast({
        title: 'Não foi possível editar o usuário!',
        status: 'error',
        description:
          error.response?.data.detail || 'Ocorreu um erro inesperado.',
        duration: 5000,
        isClosable: true,
        position: 'top-left',
      })
    },
  })
}
