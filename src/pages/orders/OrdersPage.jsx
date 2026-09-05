import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import "./OrdersPage.css";
import { OrdersGrid } from "./OrdersGrid";
import { getOrders } from "../../utils/localStore";

export function OrdersPage({ cart , loadCart }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    setOrders(getOrders());
  }, []);
  return (
    <>
      <title>Orders</title>
      <Header cart={cart} />
      <link rel="icon" type="image/png" href={`${import.meta.env.BASE_URL}orders-favicon.png`} />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <OrdersGrid orders={orders} loadCart={loadCart} />
      </div>
    </>
  );
}
