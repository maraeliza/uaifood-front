"use client";

import { useState } from "react";
import {
  Spinner,
  Center,
  Text,
  VStack,
  Heading,
  SimpleGrid,
  Box,
  Badge,
  HStack,
  Image,
  Flex,
  Button,
  Collapse,
} from "@chakra-ui/react";
import { ProtectedRoute } from "@/context/ProtectedRoute";
import { Order } from "@/interfaces/common";
import { useMyOrders } from "@/hooks/orders/useMyOrders";

export default function UserOrdersPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const {
    data: orders,
    isLoading,
    isError,
  } = useMyOrders({
    page,
    limit: pageSize,
  });
  const [openOrderId, setOpenOrderId] = useState<number | null>(null);

  if (isLoading)
    return (
      <Center mt={10}>
        <Spinner size="lg" />
      </Center>
    );

  if (isError)
    return (
      <Center mt={10}>
        <Text color="red.500">Erro ao carregar pedidos</Text>
      </Center>
    );

  return (
    <ProtectedRoute roles={["CLIENT"]}>
      <VStack
        spacing={6}
        align="stretch"
        w="full"
        maxW="1200px"
        mx="auto"
        py={10}
      >
        <Heading size="lg">Meus Pedidos</Heading>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {orders?.map((order: Order) => (
            <Box
              key={order.id}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              shadow="md"
              bg="white"
              _dark={{ bg: "gray.700" }}
            >
              <HStack justify="space-between" mb={2}>
                <Text fontWeight="bold">Pedido #{order.id}</Text>
                <Badge
                  colorScheme={order.status === "PENDING" ? "yellow" : "green"}
                >
                  {order.status}
                </Badge>
              </HStack>
              <Text mb={2}>Pagamento: {order.paymentMethod}</Text>
              <Text fontSize="sm" color="gray.500" mb={2}>
                Criado em: {new Date(order.createdAt).toLocaleString()}
              </Text>
              <Button
                size="sm"
                mb={2}
                onClick={() =>
                  setOpenOrderId(openOrderId === order.id ? null : order.id)
                }
              >
                {openOrderId === order.id ? "Esconder itens" : "Ver itens"}
              </Button>

              <Collapse in={openOrderId === order.id} animateOpacity>
                <VStack spacing={3} align="stretch">
                  {order.orderItems.map((oi) => (
                    <Flex
                      key={oi.id}
                      justify="space-between"
                      align="center"
                      p={2}
                      borderWidth="1px"
                      borderRadius="md"
                    >
                      <HStack spacing={3}>
                        {oi.item.image && (
                          <Image
                            src={oi.item?.image}
                            alt={oi.item.description}
                            boxSize="50px"
                            objectFit="cover"
                            borderRadius="md"
                          />
                        )}
                        <Box>
                          <Text fontWeight="bold">{oi.item.description}</Text>
                          <HStack spacing={1}>
                            <Box
                              w="10px"
                              h="10px"
                              borderRadius="full"
                              bg={oi.item?.category?.color || "gray.300"}
                            />
                            <Badge colorScheme="teal">
                              {oi.item?.category?.description}
                            </Badge>
                          </HStack>
                        </Box>
                      </HStack>
                      <Text>
                        {oi.quantity} x R$ {oi.item.unitPrice.toFixed(2)}
                      </Text>
                    </Flex>
                  ))}
                </VStack>
              </Collapse>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </ProtectedRoute>
  );
}
