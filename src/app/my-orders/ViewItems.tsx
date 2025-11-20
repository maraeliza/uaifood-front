"use client";

import { OrderItem } from "@/interfaces/common";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

interface ViewItemsModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderItem[];
}

export function ViewItemsModal({
  isOpen,
  onClose,
  items,
}: ViewItemsModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Itens do Pedido</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Produto</Th>
                <Th>Categoria</Th>
                <Th>Quantidade</Th>
                <Th>Preço Unit.</Th>
                <Th>Total</Th>
              </Tr>
            </Thead>
            <Tbody>
              {items.map((item) => (
                <Tr key={item.id}>
                  <Td>{item.id}</Td>
                  <Td>{item.item.description}</Td>
                  <Td>{item.item.category?.description}</Td>
                  <Td>{item.quantity}</Td>
                  <Td>R$ {item.item.unitPrice.toFixed(2)}</Td>
                  <Td>R$ {(item.item.unitPrice * item.quantity).toFixed(2)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Fechar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
