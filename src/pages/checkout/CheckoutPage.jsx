import { useEffect, useState } from "react";
import { CheckoutHeader } from "./CheckoutHeader";
import "./CheckoutHeader.css";
import "./CheckoutPage.css";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";
import { getDeliveryOptions, getPaymentSummary } from "../../utils/localStore";

export function CheckoutPage({ cart , loadCart }) {
  const [deliveryOptions, setDevliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    setDevliveryOptions(getDeliveryOptions());
  }, []);

   useEffect(()=>{
    setPaymentSummary(getPaymentSummary());
   },[cart])
  
  return (
    <>
      <title>Checkout</title>

      <CheckoutHeader cart={cart}/>
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary loadCart={loadCart} cart={cart} deliveryOptions={deliveryOptions} />
          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        </div>
      </div>
    </>
  );
}
