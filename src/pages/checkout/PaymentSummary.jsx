import { useNavigate } from "react-router";
import { formatMoney } from "../../utils/money";
import { createOrder } from "../../utils/localStore";

export function PaymentSummary({ paymentSummary, loadCart }) {
  const navigate = useNavigate();
  const placeOrder = () => {
    createOrder();
    loadCart();
    navigate("/orders");
  };
  return (
    <div className="payment-summary">
      <div className="payment-summary-title">Payment Summary</div>
      {paymentSummary && (
        <>
          <div
            className="payment-summary-row"
            data-testid="payment-summary-product-cost"
          >
            <div>Items ({paymentSummary.totalItems}):</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.productCostCents)}
            </div>
          </div>

          <div
            className="payment-summary-row"
            data-testid="payment-summary-shipping-cost"
          >
            <div>Shipping &amp; handling:</div>
            <div className="payment-summary-money">
              {" "}
              {formatMoney(paymentSummary.shippingCostCents)}
            </div>
          </div>

          <div
            className="payment-summary-row subtotal-row"
            data-testid="payment-summary-total-before-tax"
          >
            <div>Total before tax:</div>
            <div className="payment-summary-money">
              {" "}
              {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
            </div>
          </div>

          <div
            className="payment-summary-row"
            data-testid="payment-summary-tax"
          >
            <div>Estimated tax (10%):</div>
            <div className="payment-summary-money">
              {" "}
              {formatMoney(paymentSummary.taxCents)}
            </div>
          </div>

          <div className="payment-summary-row total-row">
            <div>Order total:</div>
            <div
              className="payment-summary-money"
              data-testid="payment-summary-total"
            >
              {formatMoney(paymentSummary.totalCostCents)}
            </div>
          </div>

          <button
            className="place-order-button button-primary"
            onClick={placeOrder}
            data-testid="place-order-button"
          >
            Place your order
          </button>
        </>
      )}
    </div>
  );
}
