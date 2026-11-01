import dayjs from "dayjs";
import { Link } from "react-router";
import BuyAgainIcon from "../../assets/images/icons/buy-again.png";
import { Fragment } from "react";
import { addToCart } from "../../utils/localStore";

export function OrderDetailsGrid({order , loadCart}){
    return(
         <div className="order-details-grid">
                  {order.products.map((orderProduct) => {
                      const addOrderProductToCart = () => {
                      addToCart(orderProduct.product.id, 1);
                      loadCart();
                    };
                    return (
                      <Fragment key={orderProduct.product.id}>
                        {" "}
                        <div className="product-image-container">
                          <img src={orderProduct.product.image.startsWith('http://') || orderProduct.product.image.startsWith('https://') ? orderProduct.product.image : `${import.meta.env.BASE_URL}${orderProduct.product.image}`} />
                        </div>
                        <div className="product-details">
                          <div className="product-name">
                            {orderProduct.name}
                          </div>
                          <div className="product-delivery-date">
                            Arriving on:{" "}
                            {dayjs(orderProduct.estimatedDeliveryTimeMs).format(
                              "MMMM D"
                            )}
                          </div>
                          <div className="product-quantity">
                            Quantity: {orderProduct.quantity}
                          </div>
                          <button className="buy-again-button button-primary"
                          onClick={addOrderProductToCart}>
                            <img
                              className="buy-again-icon"
                              src={BuyAgainIcon}
                            />
                            <span className="buy-again-message">
                              Add to Cart
                            </span>
                          </button>
                        </div>
                        <div className="product-actions">
                          <Link to={`/tracking/${order.id}/${orderProduct.product.id}`}>
                            <button className="track-package-button button-secondary">
                              Track package
                            </button>
                          </Link>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
    );
}