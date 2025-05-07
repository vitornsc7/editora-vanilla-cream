import "./App.css";
import Carousel from "./components/Carousel";
import Header from "./components/Header";
import Products from "./components/Products";
import image1 from "./assets/books.png"
import image2 from "./assets/primavera.png"
import image3 from "./assets/passagem.png"

const imagens = [
  image2,
  image1,
  image3,
];

function App() {
  return (
    <>
      <Header />
      <Carousel items={imagens} />
      <Products titulo="Nossos livros" />
    </>
  );
}

export default App;
