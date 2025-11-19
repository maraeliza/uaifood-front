'use client'

import { api } from '@/lib/axios'
import { useToast } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

type Usuario = {
  name: string
  email: string
  login: string
  cellphone: string
  password: string
  groupIds: number[]
}

export function useAddNewUser() {
  const toast = useToast()

  return useMutation({
    mutationFn: async (newUser: Usuario) => {
      const url = '/api/user'
      return await api.post(url, newUser)
    },
    onSuccess: () => {
      toast({
        title: 'Usuário cadastrado com sucesso!',
        status: 'success',
        duration: 2500,
        isClosable: true,
        variant: 'left-accent',
        position: 'top-right',
      })
    },
    onError: (error: AxiosError<{ detail: string }>) => {
      toast({
        title: 'Não foi possível cadastrar o usuário!',
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
