'use client'

import { api } from '@/lib/axios'
import { useToast } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { formUpdatePassword } from '@/utils/schema'

export function useMutationPassword() {
  const toast = useToast()

  return useMutation({
    mutationFn: async (data: formUpdatePassword) => {
      const response = await api.put('api/user/password', data)

      return response.data
    },
    onSuccess: async () => {
      toast({
        title: 'Senha atualizada',
        description: 'Seus dados foram processados com sucesso',
        status: 'success',
        variant: 'left-accent',
        position: 'bottom',
        duration: 5000,
        isClosable: true,
      })
    },
    onError: (err: AxiosError<{ detail: string }>) => {
      toast({
        title: 'Erro ao atualizar',
        description: err?.response?.data.detail,
        status: 'error',
        variant: 'left-accent',
        position: 'bottom',
        duration: 5000,
        isClosable: true,
      })
    },
  })
}
