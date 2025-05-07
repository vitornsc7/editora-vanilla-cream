import { useNavigate } from "react-router-dom";
import Button from "./Button";

const Card = ({ dados }) => {
  const navigate = useNavigate();

  const onSeeProductClick = () => {
    const query = new URLSearchParams();
    query.set("id", dados.id);
    navigate(`/editora-vanilla-cream/product?${query.toString()}`);
  };

  return (
    <div
      onClick={() => onSeeProductClick()}
      className="p-4 rounded-lg bg-white w-full hover:cursor-pointer hover:shadow flex flex-col justify-between h-full"
    >
      <div>
        <div className="w-full flex justify-center">
          <img
            src={dados.imagem}
            alt={dados.titulo}
            className="w-32 object-cover rounded-md mb-4"
          />
        </div>
        <h2 className="text-sm mb-2 hover:underline">{dados.titulo}</h2>
        
      </div>
      
      <div>
        <p className="text-gray-700 text-md text-right mb-4">
          R$ {dados.preco.toFixed(2)}
        </p>
        <Button id={dados.id} />
      </div>
    </div>
  );
};

export default Card;
