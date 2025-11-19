"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Spinner, Center, Text } from "@chakra-ui/react";
import { Category, Column } from "@/utils/interface";
import { useCategories } from "@/hooks/category/usePageredCategory";
import { TableWithPagination } from "@/components/my-ui/Table";
import { EditModal } from "@/components/my-ui/EditModal";
import { useEditCategory } from "@/hooks/category/useEditCategory";
import { useDeleteCategory } from "@/hooks/category/useDeleteCategory";

export default function Page() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedItem, setSelectedItem] = useState<Category | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const useEditMutation = useEditCategory()
  const useDeleteMutation = useDeleteCategory()
  const { data, isLoading, isError } = useCategories({
    page,
    limit: pageSize,
  });

  const columns: readonly Column<Category>[] = [
    { key: "id", header: "ID" },
    { key: "description", header: "Descrição" },
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

  function handleEdit(item: Category) {
    setSelectedItem(item);
    setIsEditOpen(true);
  }
  function handleSaveEdit(updated: Category) {
    useEditMutation.mutateAsync(updated)
    
  }
  function handleDelete(item: Category) {
    useDeleteMutation.mutateAsync(item.id)
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
        <Text color="red.500">Erro ao carregar categorias</Text>
      </Center>
    );

  return (
    <>
      <TableWithPagination
        data={data?.categories ?? []}
        columns={columns}
        onEdit={(item) => handleEdit(item)}
        onDelete={(item) => handleDelete(item)}
        pagination={{
          currentPage: data?.pageData.currentPage ?? 1,
          lastPage: data?.pageData.lastPage ?? 1,
          total: data?.pageData.totalCountofRegisters ?? 0,
          pageSize,
          onPageChange: setPage,
          onPageSizeChange: setPageSize,
        }}
      />
      <EditModal<Category>
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        initialData={selectedItem}
        fieldKey="description"
        title="Editar Categoria"
        label="Descrição"
        onSubmit={handleSaveEdit}
        isPending={useEditMutation.isPending}
      />
    </>
  );
}
