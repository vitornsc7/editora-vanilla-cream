import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductPage from "./components/ProductPage.jsx";
import CartPage from "./components/CartPage.jsx";

const router = createBrowserRouter([
  {
    path: "/editora-vanilla-cream",
    element: <App />,
  },
  {
    path: "/editora-vanilla-cream/product",
    element: <ProductPage />,
  },
  {
    path: "/editora-vanilla-cream/cart",
    element: <CartPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
