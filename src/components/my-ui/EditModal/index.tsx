"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

interface EditModalProps<T> {
  isOpen: boolean;
  onClose: () => void;
  initialData: T | null; 
  fieldKey: keyof T;
  title?: string;
  label?: string;
  onSubmit: (updated: T) => void;
  isPending: boolean
}

export function EditModal<T extends Record<string, any>>({
  isOpen,
  onClose,
  initialData,
  fieldKey,
  title = "Editar",
  label = "Valor",
  onSubmit,
  isPending
}: EditModalProps<T>) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (initialData) {
      setValue(initialData[fieldKey] ?? "");
    }
  }, [initialData, fieldKey]);

  function handleSubmit() {
    if (!initialData) return;
    const updated = { ...initialData, [fieldKey]: value };
    onSubmit(updated as T);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack align="stretch" gap={4}>
            <FormControl>
              <FormLabel>{label}</FormLabel>
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Digite aqui..."
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter gap={3}>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit} isLoading={isPending}>
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
