"use client";
import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
} from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { mockData } from "./data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function AdminDashboard() {
  const data = mockData;
  const isLoading = false;
  if (isLoading) return <Text>Carregando dados...</Text>;

  const barData = {
    labels: data?.ordersByCategory.map((d) => d.category),
    datasets: [
      {
        label: "Pedidos por Categoria",
        data: data?.ordersByCategory.map((d) => d.count),
        backgroundColor: "rgba(72, 187, 120, 0.6)",
      },
    ],
  };

  return (
    <Box p={6}>
      <Heading mb={6}>Dashboard Administrativo</Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={6}>
        <Stat p={4} shadow="md" borderRadius="md">
          <StatLabel>Total de Itens</StatLabel>
          <StatNumber>{data?.totalItems}</StatNumber>
        </Stat>
        <Stat p={4} shadow="md" borderRadius="md">
          <StatLabel>Total de Pedidos</StatLabel>
          <StatNumber>{data?.totalOrders}</StatNumber>
        </Stat>
        <Stat p={4} shadow="md" borderRadius="md">
          <StatLabel>Total de Categorias</StatLabel>
          <StatNumber>{data?.totalCategories}</StatNumber>
        </Stat>
      </SimpleGrid>

      <Box mb={6} p={4} shadow="md" borderRadius="md" bg="white">
        <Heading size="md" mb={4}>
          Pedidos por Categoria
        </Heading>
        <Bar data={barData} />
      </Box>

      <Box p={4} shadow="md" borderRadius="md" bg="white">
        <Heading size="md" mb={4}>
          Pedidos Recentes
        </Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Cliente</Th>
              <Th>Total de Itens</Th>
              <Th>Status</Th>
              <Th>Criado em</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.recentOrders.map((order) => (
              <Tr key={order.id}>
                <Td>{order.id}</Td>
                <Td>{order.clientName}</Td>
                <Td>{order.totalItems}</Td>
                <Td>{order.status}</Td>
                <Td>{new Date(order.createdAt).toLocaleDateString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
