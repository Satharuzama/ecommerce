import { Link } from "react-router";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import "./TrackingPage.css";
import dayjs from "dayjs";
import { Header } from "../components/Header";
import { getOrder } from "../utils/localStore";

export function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);
  const [currentTime, setCurrentTime] = useState(() => dayjs().valueOf());
  useEffect(() => {
    setOrder(getOrder(orderId));
  }, [orderId]);
  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(dayjs().valueOf());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);
  if (!order) {
    return null;
  }

  const orderProduct = order.products.find((orderProduct) => {
    return orderProduct.productId === productId;
  });

  if (!orderProduct) {
    return (
      <>
        <Header cart={cart} />
        <div className="tracking-page">
          <div className="order-tracking">
            <Link className="back-to-orders-link link-primary" to="/orders">
              View all orders
            </Link>
            <div className="product-info">Tracking information not found.</div>
          </div>
        </div>
      </>
    );
  }

  const totalDeliveryTimeMs =
    orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  let timePassedMs = currentTime - order.orderTimeMs;

  let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;
  deliveryPercent = Math.max(0, Math.min(100, deliveryPercent));

  const isPreparing = deliveryPercent < 33;
  const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
  const isDelivered = deliveryPercent >= 100;
  const preparingComplete = deliveryPercent >= 0;
  const shippedComplete = deliveryPercent >= 33;
  const deliveredComplete = deliveryPercent >= 100;
  return (
    <>
      <link rel="icon" type="image/png" href={`${import.meta.env.BASE_URL}tracking-favicon.png`} />
      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {deliveryPercent >= 100 ? "Delivered on " : "Arriving on"}
            {dayjs(orderProduct.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
          </div>

          <div className="product-info">{orderProduct.product.name}</div>

          <div className="product-info">Quantity: {orderProduct.quantity}</div>

          <img
            className="product-image"
            src={`${import.meta.env.BASE_URL}${orderProduct.product.image}`}
          />

          <div className="progress-labels-container">
            <div className={`progress-label ${preparingComplete ? "completed-status" : ""} ${isPreparing ? "current-status" : ""}`}>Preparing</div>
            <div className={`progress-label ${shippedComplete ? "completed-status" : ""} ${isShipped ? "current-status" : ""}`}>Shipped</div>
            <div className={`progress-label ${deliveredComplete ? "completed-status" : ""} ${isDelivered ? "current-status" : ""}`}>Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${deliveryPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
