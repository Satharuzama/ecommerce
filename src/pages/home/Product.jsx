import { formatMoney } from "../../utils/money";
import CheckmarkIcon from "../../assets/images/icons/checkmark.png";
import { useState } from "react";
import { addToCart as addProductToCart } from "../../utils/localStore";

const ratingStarPoints = "10,1.5 12.5,7.2 18.8,7.9 14.2,12.2 15.4,18.5 10,15.2 4.6,18.5 5.8,12.2 1.2,7.9 7.5,7.2";

function DrawnRatingStars({ stars, productId }) {
  const fullStars = Math.floor(stars);
  const partialStar = stars - fullStars;
  const gradientId = `rating-star-fill-${productId}`;

  return (
    <svg
      className="product-rating-stars"
      data-testid="product-rating-stars"
      viewBox="0 0 100 20"
      role="img"
      aria-label={`${stars} out of 5 stars`}
    >
      {partialStar > 0 && (
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset={`${partialStar * 100}%`} stopColor="rgb(25, 135, 84)" />
            <stop offset={`${partialStar * 100}%`} stopColor="transparent" />
          </linearGradient>
        </defs>
      )}
      {Array.from({ length: 5 }, (_, index) => {
        const isFull = index < fullStars;
        const isPartial = index === fullStars && partialStar > 0;

        return (
          <polygon
            key={index}
            points={ratingStarPoints}
            transform={`translate(${index * 20} 0)`}
            fill={isFull ? "rgb(25, 135, 84)" : isPartial ? `url(#${gradientId})` : "transparent"}
            stroke="rgb(25, 135, 84)"
            strokeWidth="1.25"
          />
        );
      })}
    </svg>
  );
}

export function Product({ product, loadCart }) {
  const [quantity, setQuantity] = useState(1);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const ratingStars = Number(product.rating.stars);
  const addToCart = async () => {
    addProductToCart(product.id, quantity);
    loadCart();
    setShowAddedMessage(true);

    setTimeout(() => {
      setShowAddedMessage(false);
    }, 2000);
  };
  const selectQuantity = (event) => {
    const quantitySelected = Number(event.target.value);
    setQuantity(quantitySelected);
  };
  return (
    <div className="product-container" data-testid="product-container">
      <div className="product-image-container">
        <img
          className="product-image"
          data-testid="product-image"
          src={product.image.startsWith('http://') || product.image.startsWith('https://') ? product.image : `${import.meta.env.BASE_URL}${product.image}`}
        />
      </div>

      <div className="product-name limit-text-to-2-lines">{product.name}</div>

      <div className="product-rating-container">
        {Number.isInteger(ratingStars * 2) ? (
          <img
            className="product-rating-stars"
            data-testid="product-rating-stars"
            src={`${import.meta.env.BASE_URL}images/ratings/rating-${ratingStars * 10}.png`}
          />
        ) : (
          <DrawnRatingStars stars={ratingStars} productId={product.id} />
        )}
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">{formatMoney(product.priceCents)}</div>

      <div className="product-quantity-container">
        <select value={quantity} data-testid="product-quantity-container" onChange={selectQuantity}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="product-spacer"></div>

      <div
        className="added-to-cart"
        style={{
          opacity: showAddedMessage ? 1 : 0,
        }}
      >
        <img src={CheckmarkIcon} />
        Added
      </div>

      <button className="add-to-cart-button button-primary"
      data-testid="add-to-cart-button" onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
}
