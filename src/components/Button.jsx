import { ShoppingCart } from "lucide-react";

const Button = (id) => {
  const addToCart = () => {
    const existingCart = JSON.parse(sessionStorage.getItem("cart")) || [];

    if (!existingCart.includes(id)) {
      existingCart.push(id);
      sessionStorage.setItem("cart", JSON.stringify(existingCart));

      window.dispatchEvent(new Event("cartUpdated"));
    }
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        addToCart();
      }}
      className="bg-green-700 text-white flex items-center w-full justify-center gap-2 py-2.5 rounded hover:bg-green-600 hover:cursor-pointer transition-all mt-auto max-w-100"
    >
      <ShoppingCart />
      <span>Adicionar</span>
    </button>
  );
};

export default Button;
