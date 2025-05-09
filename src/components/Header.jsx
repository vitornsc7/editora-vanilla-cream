import { Search, ShoppingCart } from "lucide-react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Header() {
  const navigate = useNavigate();
  const [qtde, setQtde] = useState(0);

  const onLogoClick = () => {
    navigate(`/editora-vanilla-cream/`);
  };

  const onCartClick = () => {
    navigate(`/editora-vanilla-cream/cart`);
  };

  useEffect(() => {
    const atualizarQuantidade = () => {
      const carrinho = JSON.parse(sessionStorage.getItem("cart")) || [];
      setQtde(carrinho.length);
    };

    atualizarQuantidade();

    window.addEventListener("cartUpdated", atualizarQuantidade);

    return () => {
      window.removeEventListener("cartUpdated", atualizarQuantidade);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0  w-full z-50">
      <div className="h-10 bg-green-950 text-white">
        <div className="max-w-7xl mx-auto h-full flex justify-between items-center px-4">
          <p className="text-sm">Desenvolvido por Vitor do Nascimento</p>
          <div className="space-x-4 text-sm">
            <a
              href="https://github.com/vitornsc7"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/vitor-do-nascimento1/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <header className="bg-[url('./assets/banner.png')] bg-cover bg-center h-20 text-white">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 gap-4">
          <img
            onClick={() => onLogoClick()}
            src={logo}
            alt="Logo"
            className="w-14 h-auto hover:cursor-pointer"
          />

          <div className="hidden md:flex items-center border-2 border-white rounded-md bg-transparent px-4 py-2 max-w-md w-full">
            <input
              type="text"
              placeholder="Buscar produtos"
              className="flex-1 text-sm italic font-light bg-transparent text-white placeholder-white focus:outline-none"
            />
            <Search className="text-white ml-2" />
          </div>

          <p className="hidden md:block text-sm font-light italic whitespace-nowrap">
            Simplesmente seja feliz
          </p>

          <div
            onClick={() => onCartClick()}
            className="text-white flex items-center justify-end space-x-1 hover:cursor-pointer w-30"
          >
            <ShoppingCart />
            <p>{qtde}</p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
