"use client";

import { VStack, Heading, Button, Center } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function HomeAdmin() {
  const router = useRouter();

  return (
    <Center minH="100vh">
      <VStack spacing={6}>
        <Heading size="2xl">Painel Administrativo</Heading>

        <Button colorScheme="teal" size="lg" onClick={() => router.push("/dashboard")}>
          Dashboard
        </Button>

        <Button colorScheme="blue" size="lg" onClick={() => router.push("/orders")}>
          Gerenciar Pedidos
        </Button>

        <Button colorScheme="orange" size="lg" onClick={() => router.push("/categories")}>
          Categorias
        </Button>

        <Button colorScheme="green" size="lg" onClick={() => router.push("/items")}>
          Produtos
        </Button>
      </VStack>
    </Center>
  );
}
