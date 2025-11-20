"use client";

import { useState } from "react";
import { Spinner, Center, Text, VStack, Heading } from "@chakra-ui/react";
import { TableWithPagination } from "@/components/my-ui/Table";
import { columns } from "./metaData";
import { ConfirmModal } from "@/components/my-ui/ConfirmModal";
import { Order } from "@/interfaces/common";
import { useDeleteOrder } from "@/hooks/orders/useDelete";
import { ViewItemsModal } from "./ViewItems";
import { ProtectedRoute } from "@/context/ProtectedRoute";
import { useMyOrders } from "@/hooks/orders/useMyOrders";
import { useAuth } from "@/context/AuthProvider";

export default function OrdersPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const { user } = useAuth();
  const { data, isLoading, isError } = useMyOrders({
    page,
    limit: pageSize,
    userId: user?.id || 0,
  });

  function handleView(order: Order) {
    setSelectedOrder(order);
    setIsViewOpen(true);
  }

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
      <Center py={10}>
        <VStack spacing={6} align="stretch" w="full">
          <Heading size="lg">Pedidos</Heading>

          <TableWithPagination<Order>
            data={data?.data ?? []}
            columns={columns}
            onView={handleView}
            onDelete={() => {}}
            pagination={{
              currentPage: data?.meta.currentPage ?? 1,
              lastPage: data?.meta.lastPage ?? 1,
              total: data?.meta.totalCountofRegisters ?? 0,
              pageSize,
              onPageChange: setPage,
              onPageSizeChange: setPageSize,
            }}
            onEdit={() => {}}
          />
          <ViewItemsModal
            isOpen={isViewOpen}
            onClose={() => setIsViewOpen(false)}
            items={[]}
          />
        </VStack>
      </Center>
    </ProtectedRoute>
  );
}
