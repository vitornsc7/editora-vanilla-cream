// src/components/Produtos.jsx
import { useEffect, useState } from "react";
import Card from "./Card";

const Products = ({ titulo, id }) => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch("/editora-vanilla-cream/banco.txt")
      .then((res) => res.text())
      .then((texto) => {
        const json = JSON.parse(texto);
        setProdutos(json);
      })
      .catch((err) => console.error("Erro ao carregar banco.txt:", err));
  }, []);

  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-5">{titulo}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {produtos
            .filter((produto) => String(produto.id) !== String(id))
            .map((produto) => (
              <Card key={produto.id} dados={produto} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
