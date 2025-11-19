'use client'

import { api } from '@/lib/axios'
import { queryClient } from '@/pages/_app.page'
import { useToast } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

// Função utilitária para cancelar pedido
async function enableOrDisable(userId: number) {
  const response = await api.put(`/api/user/enableOrDisable?userId=${userId}`)
  return response.data
}

// Hook customizado para cancelar pedido
export function useEnableUser() {
  const toast = useToast()

  return useMutation({
    mutationFn: (userId: number) => enableOrDisable(userId),
    onError: (err: AxiosError<{ detail: string }>) => {
      toast({
        title: 'Erro ao atualizar status do usuário',
        description: err?.response?.data.detail || 'Erro desconhecido',
        status: 'error',
        variant: 'left-accent',
        position: 'top',
        duration: 5000,
        isClosable: true,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'], exact: false })
    },
  })
}
