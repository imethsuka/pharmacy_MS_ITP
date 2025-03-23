import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import "./MoreInfo.css";

const Popup = ({ medicine, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const navigate = useNavigate(); // Add this hook

  if (!medicine) return null;

  const handleIncreaseQuantity = () => setQuantity((prev) => prev + 1);
  const handleDecreaseQuantity = () =>
    quantity > 1 && setQuantity((prev) => prev - 1);

  // Add to cart handler
  const handleAddToCart = () => {
    // Get existing cart items from localStorage or initialize empty array
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    
    // Check if product already exists in cart
    const existingItemIndex = existingCart.findIndex(item => item.id === medicine._id);
    
    if (existingItemIndex >= 0) {
      // Update quantity if product already in cart
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      // Add new product to cart
      existingCart.push({
        id: medicine._id,
        name: medicine.name,
        price: medicine.price,
        image: medicine.imageUrl,
        quantity: quantity,
        productId: medicine.productId || medicine._id,
        category: medicine.category,
        requiresPrescription: medicine.requiresPrescription
      });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(existingCart));
    
    // Give feedback to user
    setAddedToCart(true);
    
    // Reset feedback after 2 seconds
    setTimeout(() => {
      setAddedToCart(false);
      onClose(); // Optionally close the popup
    }, 2000);
  };

  // Navigate to cart page
  const goToCart = () => {
    navigate("/order/cart");
    onClose();
  };

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
            {addedToCart ? (
              <div className="cart-success-message">
                Item added to cart! <button onClick={goToCart} className="go-to-cart-btn">View Cart</button>
              </div>
            ) : (
              <button className="add-to-cart-button" onClick={handleAddToCart}>
                Add to Cart ({quantity})
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
