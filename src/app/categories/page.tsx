"use client";

import { GenericTable } from "@/components/my-ui/Table";

export default function Page() {
  const data = [
    { id: 1, nome: "Hambúrguer Artesanal", preco: "R$ 29,90" },
    { id: 2, nome: "Pizza Portuguesa", preco: "R$ 45,00" },
    { id: 3, nome: "Coxinha", preco: "R$ 6,00" },
  ];

  function handleEdit(item: any) {
    console.log("Editar:", item);
  }

  function handleDelete(item: any) {
    console.log("Excluir:", item);
  }

  return (
    <GenericTable
      data={data}
      columns={[
        { key: "id", header: "ID" },
        { key: "nome", header: "Nome" },
        { key: "preco", header: "Preço" },
      ]}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}
