"use client";
import { useState } from "react";
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

// Tipagem para usuário
interface Address {
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  zipCode: string;
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: Address;
}

// Dados mockados iniciais (substituir pela API real depois)
const mockUser: UserProfile = {
  name: "Maria Silva",
  email: "maria@email.com",
  phone: "11999999999",
  address: {
    street: "Rua Exemplo",
    number: "123",
    district: "Centro",
    city: "Uberlândia",
    state: "MG",
    zipCode: "38400-000",
  },
};

export default function MyProfile() {
  const toast = useToast();
  const [userData, setUserData] = useState<UserProfile>(mockUser);
  const [isSaving, setIsSaving] = useState(false);

  // Atualizar campos do formulário
  const handleChange = (
    field: keyof UserProfile | keyof Address,
    value: string,
    isAddress = false,
  ) => {
    if (isAddress) {
      setUserData((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else {
      setUserData((prev) => ({ ...prev, [field]: value }));
    }
  };

  // Simulação de salvar
  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Aqui você chamaria sua API, exemplo:
      // await fetch("/api/user/update", { method: "PUT", body: JSON.stringify(userData) })
      await new Promise((r) => setTimeout(r, 1000)); // mock delay
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
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Box p={6} bg="gray.50" minH="100vh">
      <Heading mb={6}>Meu Perfil</Heading>
      <VStack spacing={6} align="stretch" maxW="800px" mx="auto">
        {/* Dados pessoais */}
        <Box p={4} bg="white" shadow="md" borderRadius="md">
          <Heading size="md" mb={4}>
            Informações Pessoais
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input
                value={userData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                value={userData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Telefone</FormLabel>
              <Input
                value={userData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </FormControl>
          </SimpleGrid>
        </Box>

        {/* Endereço */}
        <Box p={4} bg="white" shadow="md" borderRadius="md">
          <Heading size="md" mb={4}>
            Endereço
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <FormControl>
              <FormLabel>Rua</FormLabel>
              <Input
                value={userData.address.street}
                onChange={(e) => handleChange("street", e.target.value, true)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Número</FormLabel>
              <Input
                value={userData.address.number}
                onChange={(e) => handleChange("number", e.target.value, true)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Bairro</FormLabel>
              <Input
                value={userData.address.district}
                onChange={(e) => handleChange("district", e.target.value, true)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Cidade</FormLabel>
              <Input
                value={userData.address.city}
                onChange={(e) => handleChange("city", e.target.value, true)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Estado</FormLabel>
              <Input
                value={userData.address.state}
                onChange={(e) => handleChange("state", e.target.value, true)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>CEP</FormLabel>
              <Input
                value={userData.address.zipCode}
                onChange={(e) => handleChange("zipCode", e.target.value, true)}
              />
            </FormControl>
          </SimpleGrid>
        </Box>

        <Button colorScheme="green" isLoading={isSaving} onClick={handleSave}>
          Salvar Alterações
        </Button>
      </VStack>
    </Box>
  );
}
