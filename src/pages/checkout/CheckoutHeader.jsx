import { Link } from "react-router";
import CheckoutLockIcon from "../../assets/images/icons/checkout-lock-icon.png";
import "./CheckoutHeader.css";

export function CheckoutHeader( {cart}  ) {
  let totalQuantity =0;
  cart.forEach((cartItem)=>{
    totalQuantity +=cartItem.quantity;
  })
  return (
    <>
      <link rel="icon" type="image/png" href={`${import.meta.env.BASE_URL}cart-favicon.png`} />
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/" className="checkout-header-logo">
              E-Commerce Shop
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <Link className="return-to-home-link" to="/">
              {totalQuantity} items
            </Link>
            )
          </div>

          <div className="checkout-header-right-section">
            <img src={CheckoutLockIcon} />
          </div>
        </div>
      </div>
    </>
  );
}