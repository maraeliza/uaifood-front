import { Column, Order } from "@/interfaces/common";
import { Box, HStack, Text } from "@chakra-ui/react";
import { format } from "date-fns";

export const columns: readonly Column<Order>[] = [
  { key: "id", header: "ID" },
  { key: "client", header: "Cliente", render: (_, item) => item.client.name },
  {
    key: "createdBy",
    header: "Criado por",
    render: (_, item) => item.createdBy.name,
  },
  { key: "status", header: "Status" },
  { key: "paymentMethod", header: "Pagamento" },
  {
    key: "createdAt",
    header: "Criado em",
    render: (value: string) => format(new Date(value), "dd/MM/yyyy HH:mm"),
  },
  {
    key: "updatedAt",
    header: "Modificado em",
    render: (value: string) => format(new Date(value), "dd/MM/yyyy HH:mm"),
  },
];
