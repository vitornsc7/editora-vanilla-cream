import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Button from "./Button";
import Products from "./Products";

const ProductPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");

  const [produto, setProduto] = useState(null);

  useEffect(() => {
    fetch("/banco.txt")
      .then((res) => res.text())
      .then((texto) => {
        const json = JSON.parse(texto);
        const encontrado = json.find((item) => String(item.id) === id);
        setProduto(encontrado);
      })
      .catch((err) => console.error("Erro ao carregar banco.txt:", err));
  }, [id]);

  if (!produto) {
    return (
      <>
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-10">
          <p>Carregando produto...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-4">{produto.titulo}</h2>
        <div className="flex">
          <img
            src={produto.imagem}
            alt={produto.titulo}
            className="w-64 object-cover rounded-md mb-4"
          />

          <div className="pl-10 pb-4 flex flex-col justify-between">
            <p className="text-md mb-2">{produto.descricao}</p>
            <div className="flex items-center justify-between mt-4">
              <p className="text-xl font-semibold text-green-700">
                R$ {produto.preco}
              </p>
              <Button dados={Number(id)} />
            </div>
          </div>
        </div>
      </div>
      <Products titulo="Outros livros" id={Number(id)} />
    </>
  );
};

export default ProductPage;
