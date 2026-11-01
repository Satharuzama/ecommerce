import { useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router";
import CartIcon from "../assets/images/icons/cart-icon.png";
import SearchIcon from "../assets/images/icons/search-icon.png";
import "./Header.css";

export function Header({ cart }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const searchText = searchParams.get("search");

  // || '' is a shortcut. It means if searchText does not exist
  // it will use a default value of ''.
  const [search, setSearch] = useState(searchText || "");

  const updateSearchInput = (event ) => {
    setSearch(event.target.value);
  };

  const searchProducts = () => {
    navigate(`/?search=${search}`);
  };

  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });
  return (
    <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-link">
          <span className="logo-text">E-Commerce Shop</span>
          <span className="mobile-logo">E-Commerce Shop</span>
        </NavLink>
      </div>

      <div className="middle-section">
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
          value={search}
          onChange={updateSearchInput}
        />

        <button className="search-button" onClick={searchProducts}>
          <img className="search-icon" src={SearchIcon} />
        </button>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src={CartIcon} />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  );
}
