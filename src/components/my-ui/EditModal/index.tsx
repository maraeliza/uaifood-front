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
import { ColorInput } from "../ColorInput";
import { EditModalProps } from "@/interfaces/common";

export function EditModal<T extends Record<string, any>>({
  isOpen,
  onClose,
  initialData,
  fields,
  title = "Editar",
  onSubmit,
  isPending,
}: EditModalProps<T>) {
  const [values, setValues] = useState<Record<string, any>>({});

  useEffect(() => {
    if (initialData) {
      const initialValues: Record<string, any> = {};
      fields.forEach((f) => {
        initialValues[String(f.key)] = initialData[f.key] ?? "";
      });
      setValues(initialValues);
    }
  }, [initialData, fields]);

  function handleChange(key: keyof T, value: any) {
    setValues((prev) => ({ ...prev, [String(key)]: value }));
  }

  function handleSubmit() {
    if (!initialData) return;
    onSubmit({ ...initialData, ...values } as T);
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
            {fields.map((field) => {
              const value = values[String(field.key)] ?? "";

              if (field.type === "color") {
                return (
                  <FormControl key={String(field.key)}>
                    <FormLabel>{field.label}</FormLabel>
                    <ColorInput
                      value={value}
                      onChange={(val) => handleChange(field.key, val)}
                      placeholder="Digite #RRGGBB ou cor"
                    />
                  </FormControl>
                );
              }

              return (
                <FormControl key={String(field.key)}>
                  <FormLabel>{field.label}</FormLabel>
                  <Input
                    type={field.type ?? "text"}
                    placeholder={field.placeholder ?? ""}
                    value={value}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                  />
                </FormControl>
              );
            })}
          </VStack>
        </ModalBody>

        <ModalFooter gap={3}>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isLoading={isPending}
          >
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
