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
  VStack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Path, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateModalProps } from "@/interfaces/common";

export function CreateModal<T extends Record<string, any>>({
  isOpen,
  onClose,
  onSubmit,
  schema,
  fields,
  title = "Cadastrar",
  isPending = false,
}: CreateModalProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<T>({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = (data: T) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack
            as="form"
            onSubmit={handleSubmit(handleFormSubmit)}
            spacing={4}
          >
            {fields.map((field) => (
              <FormControl
                key={String(field.key)}
                isInvalid={!!errors[field.key]}
              >
                <FormLabel>{field.label}</FormLabel>
                <Input
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                  {...register(field.key as unknown as Path<T>)}
                />
                <FormErrorMessage>
                  {errors[field.key]?.message as string}
                </FormErrorMessage>
              </FormControl>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter gap={3}>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSubmit(handleFormSubmit)}
            isLoading={isPending}
          >
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
