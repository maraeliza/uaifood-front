"use client";

import { useEffect } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { ProtectedRoute } from "@/context/ProtectedRoute";
import { useUserById } from "@/hooks/user/useOrderById";
import { useAuth } from "@/context/AuthProvider";
import { useEditUser } from "@/hooks/user/useEdit";

// ------------------- ZOD SCHEMAS -------------------

const addressSchema = z.object({
  street: z.string().min(1, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  district: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(1, "Estado é obrigatório"),
  zipCode: z.string().min(1, "CEP é obrigatório"),
});

const userSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(1, "Telefone é obrigatório"),
  address: addressSchema,
});

export type UserFormData = z.infer<typeof userSchema>;


export default function MyProfile() {
  const toast = useToast();
  const { user } = useAuth();
  const { data } = useUserById({ userId: user?.id || 0 });
  const useMutationEdit = useEditUser();

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: {
        street: "",
        number: "",
        district: "",
        city: "",
        state: "",
        zipCode: "",
      },
    },
  });
  useEffect(() => {
    if (data) {
      reset({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        address: {
          street: data.address?.street || "",
          number: data.address?.number || "",
          district: data.address?.district || "",
          city: data.address?.city || "",
          state: data.address?.state || "",
          zipCode: data.address?.zipCode || "",
        },
      });
    }
  }, [data, reset]);

  const onSubmit: SubmitHandler<UserFormData> = async (values) => {
    console.log("AAAAAAAAAAAAAAAAA")
    console.log(values)
    try {
      await useMutationEdit(values);
      toast({
        title: "Perfil atualizado com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Erro ao atualizar perfil",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  console.log(errors)
  return (
    <ProtectedRoute roles={["ADMIN", "CLIENT"]}>
      <Box p={6} bg="gray.50" minH="100vh">
        <Heading mb={6}>Meu Perfil</Heading>
        <VStack spacing={6} align="stretch" maxW="800px" mx="auto">
          <Box p={4} bg="white" shadow="md" borderRadius="md">
            <Heading size="md" mb={4}>
              Informações Pessoais
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel>Nome</FormLabel>
                <Input {...register("name")} />
              </FormControl>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input type="email" {...register("email")} />
              </FormControl>
              <FormControl isInvalid={!!errors.phone}>
                <FormLabel>Telefone</FormLabel>
                <Input {...register("phone")} />
              </FormControl>
            </SimpleGrid>
          </Box>

          {/* Endereço */}
          <Box p={4} bg="white" shadow="md" borderRadius="md">
            <Heading size="md" mb={4}>
              Endereço
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {(
                [
                  ["street", "Rua"],
                  ["number", "Número"],
                  ["district", "Bairro"],
                  ["city", "Cidade"],
                  ["state", "Estado"],
                  ["zipCode", "CEP"],
                ] as const
              ).map(([field, label]) => (
                <FormControl
                  key={field}
                  isInvalid={!!errors.address?.[field]}
                >
                  <FormLabel>{label}</FormLabel>
                  <Input
                    {...register(`address.${field}` as const)}
                  />
                </FormControl>
              ))}
            </SimpleGrid>
          </Box>

          <Button
            colorScheme="green"
            isLoading={isSubmitting}
            onClick={handleSubmit(onSubmit)}
          >
            Salvar Alterações
          </Button>
        </VStack>
      </Box>
    </ProtectedRoute>
  );
}
