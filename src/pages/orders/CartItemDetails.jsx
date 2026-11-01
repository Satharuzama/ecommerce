  import { useState } from "react";
import { formatMoney } from "../../utils/money";
import { removeFromCart, updateCartItem } from "../../utils/localStore";

export function CartItemDetails({ cartItem, loadCart }) {
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const updateQuantity = async () => {
    if (isUpdatingQuantity) {
       updateCartItem(cartItem.productId, { quantity: Number(quantity) });
      loadCart();
      setIsUpdatingQuantity(false);
    } else {
      setIsUpdatingQuantity(true);
    }
  };

  const updateQuantityInput = (event) => {
    setQuantity(event.target.value);
  };

   const handleQuantityKeyDown = (event) => {
    const keyPressed = event.key;

    if (keyPressed === 'Enter') {
      updateQuantity();

    } else if (keyPressed === 'Escape') {
      setQuantity(cartItem.quantity);
      setIsUpdatingQuantity(false);
    }
  };

  const deleteCartItem = async () => {
    removeFromCart(cartItem.productId);
    loadCart();
  };
  return (
    <>
      <img className="product-image" src={cartItem.product.image.startsWith('http://') || cartItem.product.image.startsWith('https://') ? cartItem.product.image : `${import.meta.env.BASE_URL}${cartItem.product.image}`} />
      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{" "}
            {isUpdatingQuantity ? (
              <input
                type="text"
                className="quantity-textbox"
                value={quantity}
                onChange={updateQuantityInput}
              />
            ) : (
              <span className="quantity-label">{cartItem.quantity}</span>
            )}
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={updateQuantity}
            onKeyDown={handleQuantityKeyDown}
          >
            Update
          </span>
          <button
            type="button"
            className="delete-cart-button"
            aria-label={`Remove ${cartItem.product.name} from cart`}
            onClick={deleteCartItem}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
