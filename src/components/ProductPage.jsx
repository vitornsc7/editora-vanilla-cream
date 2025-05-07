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
    fetch("/editora-vanilla-cream/livros-banco.txt")
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
        <h2 className="text-2xl font-bold mb-4">{produto.titulo}</h2>

        <div className="flex flex-wrap gap-6 items-start">
          <div className="w-full flex justify-center items-center sm:w-70">
            <img
              src={produto.imagem}
              alt={produto.titulo}
              className="w-52 sm:w-70 object-cover"
            />
          </div>

          <div className="flex-1 min-w-[200px] h-full pb-4 flex flex-col justify-between">
            <p className="text-md min-w-40 mb-2">{produto.descricao}</p>

            <div className="flex p-2 justify-between items-end mt-4">
              <p className="text-xl font-semibold text-green-700">
                R$ {produto.preco}
              </p>
              <Button id={Number(id)} w="max-w-40" />
            </div>
          </div>
        </div>
      </div>
      <Products titulo="Outros livros" id={Number(id)} />
    </>
  );
};

export default ProductPage;
