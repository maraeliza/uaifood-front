import { PaymentMethod } from "@/interfaces/common";
import { Status } from "@/interfaces/order";

export const paymentMethodLabels: Record<PaymentMethod, string> = {
  CASH: "Dinheiro",
  DEBIT: "Débito",
  CREDIT: "Crédito",
  PIX: "PIX",
};

export const statusLabels: Record<Status, string> = {
  PENDING: "Pendente",
  PAID: "Pago",
  CANCELLED: "Cancelado",
};
