import { useEffect, useState } from "react";
import Header from "./Header";
import Products from "./Products";

const CartPage = () => {
  const [produtosDetalhados, setProdutosDetalhados] = useState([]);

  useEffect(() => {
    const carrinhoBruto = JSON.parse(sessionStorage.getItem("cart")) || [];
    const idsCarrinho = carrinhoBruto.map((item) => item.dados);

    const contagem = {};
    idsCarrinho.forEach((id) => {
      contagem[id] = (contagem[id] || 0) + 1;
    });

    fetch("/editora-vanilla-cream/banco.txt")
      .then((res) => res.text())
      .then((texto) => {
        const todosProdutos = JSON.parse(texto);
        const produtos = Object.keys(contagem).map((idStr) => {
          const produto = todosProdutos.find((p) => p.id === Number(idStr));
          return {
            ...produto,
            quantidade: contagem[idStr],
          };
        });
        setProdutosDetalhados(produtos);
      })
      .catch((err) => console.error("Erro ao carregar banco.txt:", err));
  }, []);

  const removerDoCarrinho = (id) => {
    let carrinhoAtual = JSON.parse(sessionStorage.getItem("cart")) || [];
    const index = carrinhoAtual.findIndex((item) => item.dados === id);
    if (index !== -1) carrinhoAtual.splice(index, 1);

    sessionStorage.setItem("cart", JSON.stringify(carrinhoAtual));
    window.location.reload();
  };

  const calcularTotal = () => {
    return produtosDetalhados
      .reduce((total, produto) => total + produto.preco * produto.quantidade, 0)
      .toFixed(2);
  };

  if (produtosDetalhados.length === 0) {
    return (
      <>
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-10 text-center">
          <p className="text-lg">Seu carrinho está vazio.</p>
        </div>
        <Products titulo="Adicione ao carrinho" />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-6">Carrinho de Compras</h2>
        <div className="grid gap-6">
          {produtosDetalhados.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 rounded bg-white shadow"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.imagem}
                  alt={item.titulo}
                  className="w-12 object-cover rounded"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.titulo}</h3>
                  <p className="text-sm text-gray-500">
                    Quantidade: {item.quantidade}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl text-green-700 font-bold">
                  R$ {(item.preco * item.quantidade).toFixed(2)}
                </p>
                <button
                  onClick={() => removerDoCarrinho(item.id)}
                  className="text-gray-600 underline text-sm mt-2 hover:cursor-pointer"
                >
                  Remover unidade
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-right mt-8">
          <p className="text-2xl font-bold">
            Total: <span className="text-green-700">R$ {calcularTotal()}</span>
          </p>
          <button className="mt-4 bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded">
            Finalizar Compra
          </button>
        </div>
      </div>
      <Products titulo="Compre também" />
    </>
  );
};

export default CartPage;
