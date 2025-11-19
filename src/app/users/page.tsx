"use client";

import { useState } from "react";
import {
  Spinner,
  Center,
  Text,
  Button,
  HStack,
  Input,
  VStack,
  Heading,
  Box,
} from "@chakra-ui/react";
import { TableWithPagination } from "@/components/my-ui/Table";
import { EditModal } from "@/components/my-ui/EditModal";
import { ConfirmModal } from "@/components/my-ui/ConfirmModal";
import { CreateModal } from "@/components/my-ui/AddModal";
import { useDebounce } from "use-debounce";
import { columns, fields } from "./metaData";
import { User } from "@/interfaces/user";
import { useUsers } from "@/hooks/user/usePagered";
import { useAddUser } from "@/hooks/user/useAdd";
import { useEditUser } from "@/hooks/user/useEdit";
import { useDeleteUser } from "@/hooks/user/useDelete";
import { FormUser, schemaUserEdit } from "@/utils/schema";
import { ProtectedRoute } from "@/context/ProtectedRoute";

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedItem, setSelectedItem] = useState<User | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<User | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [debouncedFilter] = useDebounce(filter, 500);

  const { data, isLoading, isError } = useUsers({
    page,
    limit: pageSize,
    nameOrEmail: debouncedFilter,
  });

  const addMutation = useAddUser();
  const editMutation = useEditUser();
  const deleteMutation = useDeleteUser();

  function handleEdit(item: User) {
    setSelectedItem(item);
    setIsEditOpen(true);
  }

  function handleDeleteClick(item: User) {
    setItemToDelete(item);
    setIsDeleteOpen(true);
  }

  function handleSaveEdit(updated: User) {
    editMutation.mutateAsync(updated);
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
        <Text color="red.500">Erro ao carregar usuários</Text>
      </Center>
    );

  return (
    <ProtectedRoute roles={["ADMIN"]}>
      <Center py={10}>
        <VStack spacing={6} align="stretch">
          <HStack justify="space-between">
            <Heading size="lg">Usuários</Heading>
            <Button colorScheme="teal" onClick={() => setIsCreateOpen(true)}>
              Novo Usuário
            </Button>
          </HStack>

          <Box maxW="400px">
            <Input
              placeholder="Filtrar por nome ou email..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              size="md"
              bg="white"
              _dark={{ bg: "gray.700" }}
              focusBorderColor="teal.400"
            />
          </Box>

          <TableWithPagination
            data={data?.data ?? []}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            pagination={{
              currentPage: data?.meta.currentPage ?? 1,
              lastPage: data?.meta.lastPage ?? 1,
              total: data?.meta.totalCountofRegisters ?? 0,
              pageSize,
              onPageChange: setPage,
              onPageSizeChange: setPageSize,
            }}
          />

          {/* Modal de confirmação de exclusão */}
          <ConfirmModal
            isOpen={isDeleteOpen}
            onClose={() => setIsDeleteOpen(false)}
            onConfirm={() => {
              if (itemToDelete) {
                deleteMutation.mutateAsync(itemToDelete.id);
                setIsDeleteOpen(false);
              }
            }}
            title="Excluir Usuário"
            description={`Tem certeza que deseja excluir "${itemToDelete?.name}"?`}
            isPending={deleteMutation.isPending}
          />

          {/* Modal de edição */}
          <EditModal<User>
            isOpen={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            initialData={selectedItem}
            fields={fields}
            title="Editar Usuário"
            onSubmit={handleSaveEdit}
            isPending={editMutation.isPending}
          />

          {/* Modal de criação */}
          <CreateModal<FormUser>
            isOpen={isCreateOpen}
            onClose={() => setIsCreateOpen(false)}
            onSubmit={(data) => addMutation.mutateAsync(data)}
            schema={schemaUserEdit}
            fields={fields}
            title="Cadastrar Usuário"
            isPending={addMutation.isPending}
          />
        </VStack>
      </Center>
    </ProtectedRoute>
  );
}
