'use client'

import { api } from '@/lib/axios'
import { useToast } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

interface ChangePwdProps {
  userId: number
  newPwd: string
}
export function useChangePwd() {
  const toast = useToast()
  return useMutation({
    mutationFn: async ({ userId, newPwd }: ChangePwdProps) => {
      const url = `/api/user/update-password`
      const data = { newPassword: newPwd, userId }
      return await api.put(url, data)
    },
    onSuccess: () => {
      toast({
        title: 'Senha alterada com sucesso!',
        status: 'success',
        duration: 2500,
        isClosable: true,
        variant: 'left-accent',
        position: 'top-right',
      })
    },
    onError: (error: AxiosError<{ detail: string }>) => {
      toast({
        title: 'Não foi possível alterar a senha!',
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
