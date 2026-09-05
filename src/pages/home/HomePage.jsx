import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { useSearchParams } from "react-router";
import { ProductsGrid } from "./ProductsGrid";
import { getProducts } from "../../utils/localStore";
import "./HomePage.css";

export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    setProducts(getProducts(search || ""));
  }, [search]);
  return (
    <>
      <title>Ecommerce Project</title>
      <Header cart={cart} />
      <link rel="icon" type="image/png" href={`${import.meta.env.BASE_URL}home-favicon.png`} />
      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
