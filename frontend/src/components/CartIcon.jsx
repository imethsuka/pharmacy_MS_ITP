import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import "../styles/CartIcon.css";

const CartIcon = () => {
  return (
    <div className="cart-icon">
      <FiShoppingCart size={24} />
    </div>
  );
};

export default CartIcon;
