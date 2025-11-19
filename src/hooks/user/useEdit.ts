"use client";

import { queryClient } from "@/context/ChakraProvider";
import { UserEdit } from "@/interfaces/user";
import { api } from "@/lib/axios";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useEditUser() {
  const toast = useToast();

  return useMutation({
    mutationFn: async (item: UserEdit) => {
      const url = "/users/" + item.id;
      return await api.put(url, item);
    },
    onSuccess: () => {
      toast({
        title: "Usuário editado com sucesso!",
        status: "success",
        duration: 2500,
        isClosable: true,
        variant: "left-accent",
        position: "top-right",
      });
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast({
        title: "Não foi possível salvar as alterações do usuário!",
        status: "error",
        description:
          error.response?.data.message || "Ocorreu um erro inesperado.",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    },
  });
}
