"use client";

import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

interface Column<T> {
  key: keyof T;
  header: string;
}

interface GenericTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
}

export function GenericTable<T extends Record<string, any>>({
  data,
  columns,
  onEdit,
  onDelete,
}: GenericTableProps<T>) {

  const bg = useColorModeValue("white", "gray.800");
  const border = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      bg={bg}
      p={4}
      rounded="md"
      shadow="md"
      borderWidth="1px"
      borderColor={border}
      overflowX="auto"
    >
      <Table variant="simple" size="md">
        <Thead bg={useColorModeValue("gray.50", "gray.700")}>
          <Tr>
            {columns.map((col) => (
              <Th key={String(col.key)} fontWeight="bold">
                {col.header}
              </Th>
            ))}
            <Th textAlign="center">Ações</Th>
          </Tr>
        </Thead>

        <Tbody>
          {data.length === 0 ? (
            <Tr>
              <Td colSpan={columns.length + 1} textAlign="center">
                Nenhum dado encontrado
              </Td>
            </Tr>
          ) : (
            data.map((item, index) => (
              <Tr key={index} _hover={{ bg: useColorModeValue("gray.50", "gray.700") }}>
                {columns.map((col) => (
                  <Td key={String(col.key)}>
                    {String(item[col.key])}
                  </Td>
                ))}

                <Td>
                  <Flex justify="center" gap={2}>
                    <IconButton
                      aria-label="Editar"
                      icon={<EditIcon />}
                      size="sm"
                      colorScheme="blue"
                      variant="ghost"
                      onClick={() => onEdit(item)}
                    />

                    <IconButton
                      aria-label="Excluir"
                      icon={<DeleteIcon />}
                      size="sm"
                      colorScheme="red"
                      variant="ghost"
                      onClick={() => onDelete(item)}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </Box>
  );
}
