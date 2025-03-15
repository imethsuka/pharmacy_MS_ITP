import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { HiOutlineChevronRight } from "react-icons/hi";
import "./ProductCard.css";

const ProductCard = ({ image, name, price, requiresPrescription, onAddToCart, onMoreInfo }) => {
  return (
    <div className="product-card">
      {/* Product Image */}
      <div className="product-image">
        <img src={image} alt={name} />
      </div>

      {/* Product Details */}
      <div className="product-details">
        <span className="product-name">{name}</span>
        <button className="add-to-cart" onClick={onAddToCart}>
          <FiShoppingCart size={18} /> Add
        </button>
        <div className="product-bottom">
          <span className="product-price">${price}</span>
          <button className="more-info" onClick={onMoreInfo}>
            More Info <HiOutlineChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;