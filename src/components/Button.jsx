import { useState } from "react";
import { ShoppingCart } from "lucide-react";

const Button = ({ id, w }) => {
  const [isClicked, setIsClicked] = useState(false);

  const addToCart = () => {
    const existingCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    existingCart.push(id);
    sessionStorage.setItem("cart", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleClick = (e) => {
    e.stopPropagation();

    if (isClicked) return; // evita múltiplos cliques

    setIsClicked(true);
    addToCart();

    // Desbloqueia após 800ms
    setTimeout(() => {
      setIsClicked(false);
    }, 600);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isClicked}
      className={`bg-green-700 text-white flex items-center hover:cursor-pointer w-full justify-center gap-2 py-2.5 rounded transition-all duration-300 ease-in-out
        ${isClicked ? "opacity-70 cursor-not-allowed" : "hover:bg-green-600"}
        ${w}`}
    >
      <ShoppingCart />
      <span>{isClicked ? "Adicionado!" : "Adicionar"}</span>
    </button>
  );
};

export default Button;
