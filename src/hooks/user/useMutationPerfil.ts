"use client";

import { api } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { formPerfil } from "@/utils/schema";
import { queryClient } from "@/app/pages/_app";

export function useMutationPerfil() {
  return useMutation({
    mutationFn: async (data: formPerfil) => {
      const response = await api.put("api/user", data);

      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
        exact: false,
        type: "all",
      });
    },
    onError: (err: AxiosError<{ detail: string }>) => {},
  });
}
