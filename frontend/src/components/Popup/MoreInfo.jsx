import React, { useState } from "react";
import "./MoreInfo.css"; // Import Vanilla CSS styles

const Popup = ({ medicine, onClose }) => {
  const [quantity, setQuantity] = useState(1);

  if (!medicine) return null;

  const handleIncreaseQuantity = () => setQuantity((prev) => prev + 1);
  const handleDecreaseQuantity = () =>
    quantity > 1 && setQuantity((prev) => prev - 1);

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="popup-body">
          <div className="popup-image">
            <img src={medicine.imageUrl} alt={medicine.name} />
          </div>
          <div className="popup-details">
            <h2 className="product-name">{medicine.name}</h2>
            <p className="product-description">{medicine.description}</p>
            <div className="info-section">
              <div className="detail-section">
                <h3>How to Use</h3>
                <p>{medicine.howToUse}</p>
              </div>
              <div className="detail-section">
                <h3>Side Effects</h3>
                <p>{medicine.sideEffects}</p>
              </div>
              <div className="detail-section">
                <h3>Category</h3>
                <p>{medicine.category}</p>
              </div>
              <div className="detail-section price-section">
                <h3>Price</h3>
                <p className="price">Rs. {medicine.price}</p>
              </div>
            </div>
            <div className="quantity-section">
              <button
                className="quantity-button"
                onClick={handleDecreaseQuantity}
              >
                −
              </button>
              <span className="quantity">{quantity}</span>
              <button
                className="quantity-button"
                onClick={handleIncreaseQuantity}
              >
                +
              </button>
            </div>
            <button className="add-to-cart-button">
              Add to Cart ({quantity})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
