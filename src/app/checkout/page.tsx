"use client";

import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Badge,
  Button,
  RadioGroup,
  Radio,
  Stack,
  Image,
  Center,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import { api } from "@/lib/axios";
import { Item } from "@/interfaces/item";

interface CheckoutProps {
  items: Item[];
  cart: { [key: number]: number };
}

export default function CheckoutPage({ items, cart }: CheckoutProps) {
  const { user } = useAuth();
  const router = useRouter();
  const toast = useToast();

  const [paymentMethod, setPaymentMethod] = useState<"CASH" | "CREDIT">("CASH");
  const [isLoading, setIsLoading] = useState(false);

  const cartItems = items?.filter((item) => cart[item.id]) || [];
  const total = cartItems.reduce(
    (acc, item) => acc + item.unitPrice * cart[item.id],
    0
  );

  const handleSubmit = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      await api.post("/orders", {
        clientId: user.id,
        createdById: user.id,
        status: "PENDING",
        paymentMethod,
        items: cartItems.map((item) => ({
          itemId: item.id,
          quantity: cart[item.id],
        })),
      });
      toast({
        title: "Pedido realizado!",
        description: "Seu pedido foi registrado com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/orders");
    } catch (err) {
      toast({
        title: "Erro ao realizar pedido",
        description: "Tente novamente mais tarde.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack spacing={6} align="stretch" maxW="800px" mx="auto" py={10}>
      <Heading size="lg">Checkout</Heading>
      <Box borderWidth="1px" borderRadius="md" p={4} bg="white" shadow="md">
        <Heading size="md" mb={4}>
          Seu Carrinho
        </Heading>
        {cartItems.map((item) => (
          <HStack key={item.id} justify="space-between" mb={2}>
            <HStack>
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.description}
                  boxSize="50px"
                  objectFit="cover"
                  borderRadius="md"
                />
              ) : (
                <Center boxSize="50px" bg="gray.200" borderRadius="md">
                  <Text fontSize="sm">Sem imagem</Text>
                </Center>
              )}
              <VStack align="start" spacing={0}>
                <Text fontWeight="bold">{item.description}</Text>
                <HStack spacing={2}>
                  <Box
                    w="10px"
                    h="10px"
                    borderRadius="full"
                    bg={item.category.color || "gray.300"}
                  />
                  <Badge colorScheme="teal">{item.category.description}</Badge>
                </HStack>
              </VStack>
            </HStack>
            <Text>
              {cart[item.id]} x R$ {item.unitPrice.toFixed(2)} = R$
              {(item.unitPrice * cart[item.id]).toFixed(2)}
            </Text>
          </HStack>
        ))}

        <Text fontWeight="bold" fontSize="lg" mt={4}>
          Total: R$ {total.toFixed(2)}
        </Text>
      </Box>

      <Box borderWidth="1px" borderRadius="md" p={4} bg="white" shadow="md">
        <Heading size="md" mb={4}>
          Forma de Pagamento
        </Heading>
        <RadioGroup
          value={paymentMethod}
          onChange={(value: string) =>
            setPaymentMethod(value as "CASH" | "CREDIT")
          }
        >
          <Stack direction="row" spacing={6}>
            <Radio value="CASH">Dinheiro</Radio>
            <Radio value="CREDIT">Cartão</Radio>
          </Stack>
        </RadioGroup>
      </Box>

      <Button
        colorScheme="green"
        size="lg"
        mt={4}
        onClick={handleSubmit}
        isLoading={isLoading}
      >
        Finalizar Pedido
      </Button>
    </VStack>
  );
}
