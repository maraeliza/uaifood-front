"use client";

import { useState } from "react";
import { Spinner, Center, Text, VStack, Heading } from "@chakra-ui/react";
import { TableWithPagination } from "@/components/my-ui/Table";
import { columns } from "./metaData";
import { ConfirmModal } from "@/components/my-ui/ConfirmModal";
import { Order } from "@/interfaces/common";
import { useOrders } from "@/hooks/orders/usePagered";
import { useDeleteOrder } from "@/hooks/orders/useDelete";
import { ViewItemsModal } from "./ViewItems";
import { ProtectedRoute } from "@/context/ProtectedRoute";

export default function OrdersPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);

  const { data, isLoading, isError } = useOrders({
    page,
    limit: pageSize,
  });
  const deleteMutation = useDeleteOrder();

  function handleView(order: Order) {
    setSelectedOrder(order);
    setIsViewOpen(true);
  }

  function handleDeleteClick(order: Order) {
    setOrderToDelete(order);
    setIsDeleteOpen(true);
  }

  function handleConfirmDelete() {
    if (orderToDelete) {
      deleteMutation.mutateAsync(orderToDelete.id);
      setIsDeleteOpen(false);
    }
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
    <ProtectedRoute roles={["ADMIN"]}>
      <Center py={10}>
        <VStack spacing={6} align="stretch" w="full">
          <Heading size="lg">Pedidos</Heading>

          <TableWithPagination<Order>
            data={data?.orders ?? []}
            columns={columns}
            onView={handleView}
            onDelete={handleDeleteClick}
            pagination={{
              currentPage: data?.meta.currentPage ?? 1,
              lastPage: data?.meta.lastPage ?? 1,
              total: data?.meta.totalCountofRegisters ?? 0,
              pageSize,
              onPageChange: setPage,
              onPageSizeChange: setPageSize,
            }}
            onEdit={function (item: Order): void {
              throw new Error("Function not implemented.");
            }}
          />

          <ViewItemsModal
            isOpen={isViewOpen}
            onClose={() => setIsViewOpen(false)}
            items={selectedOrder?.orderItems ?? []}
          />

          <ConfirmModal
            isOpen={isDeleteOpen}
            onClose={() => setIsDeleteOpen(false)}
            onConfirm={handleConfirmDelete}
            title="Excluir Pedido"
            description={`Tem certeza que deseja excluir o pedido #${orderToDelete?.id}?`}
            isPending={deleteMutation.isPending}
          />
        </VStack>
      </Center>
    </ProtectedRoute>
  );
}
