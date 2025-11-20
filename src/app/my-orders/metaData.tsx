import { Column, Order, PaymentMethod } from "@/interfaces/common";
import { Status } from "@/interfaces/order";
import { paymentMethodLabels, statusLabels } from "@/utils/data";
import { format } from "date-fns";

export const columns: readonly Column<Order>[] = [
  { key: "id", header: "ID" },
  {
    key: "status",
    header: "Status",
    render: (value: Status) => statusLabels[value] || value,
  },
  {
    key: "paymentMethod",
    header: "Pagamento",
    render: (value: PaymentMethod) => paymentMethodLabels[value] || value,
  },
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
