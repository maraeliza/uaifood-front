export const mockData = {
  totalItems: 24,
  totalOrders: 18,
  totalCategories: 6,
  ordersByCategory: [
    { category: "Burgers", count: 8 },
    { category: "Bebidas", count: 5 },
    { category: "Sobremesas", count: 3 },
    { category: "Saladas", count: 2 },
  ],
  recentOrders: [
    {
      id: 101,
      clientName: "Maria",
      totalItems: 3,
      status: "Pendente",
      createdAt: "2025-11-18T14:30:00Z",
    },
    {
      id: 102,
      clientName: "João",
      totalItems: 2,
      status: "Entregue",
      createdAt: "2025-11-18T13:20:00Z",
    },
    {
      id: 103,
      clientName: "Ana",
      totalItems: 4,
      status: "Pendente",
      createdAt: "2025-11-18T12:45:00Z",
    },
    {
      id: 104,
      clientName: "Carlos",
      totalItems: 1,
      status: "Cancelado",
      createdAt: "2025-11-18T11:15:00Z",
    },
    {
      id: 105,
      clientName: "Lucia",
      totalItems: 5,
      status: "Entregue",
      createdAt: "2025-11-18T10:50:00Z",
    },
  ],
};
