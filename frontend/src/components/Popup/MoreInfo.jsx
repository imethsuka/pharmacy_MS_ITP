import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiShoppingCart, HiOutlineX, HiOutlineHeart, HiOutlineShare } from "react-icons/hi";
import "./MoreInfo.css";

const Popup = ({ medicine, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const navigate = useNavigate();

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
    }, 3000);
  };

  // Navigate to product detail page
  const goToProductDetail = () => {
    const id = medicine._id || medicine.productId;
    if (id) {
      navigate(`/order/product/${id}`);
      onClose();
    }
  };

  // Navigate to cart page
  const goToCart = () => {
    navigate("/order/cart");
    onClose();
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <HiOutlineX />
        </button>
        
        <div className="popup-body">
          <div className="popup-image">
            <img src={medicine.imageUrl} alt={medicine.name} />
            {medicine.requiresPrescription && (
              <span className="prescription-tag">Prescription Required</span>
            )}
          </div>
          
          <div className="popup-details">
            <div className="product-header">
              <h2 className="product-name">{medicine.name}</h2>
              <div className="product-actions">
                <button className="action-btn" title="View product details" onClick={goToProductDetail}>
                  <span className="action-text">Full Details</span>
                </button>
              </div>
            </div>
            
            <p className="product-description">{medicine.description}</p>
            
            <div className="info-section">
              {medicine.howToUse && (
                <div className="detail-section">
                  <h3>How to Use</h3>
                  <p>{medicine.howToUse}</p>
                </div>
              )}
              
              {medicine.sideEffects && (
                <div className="detail-section">
                  <h3>Side Effects</h3>
                  <p>{medicine.sideEffects}</p>
                </div>
              )}
              
              <div className="detail-section">
                <h3>Category</h3>
                <p>{medicine.category || "Medicine"}</p>
              </div>
              
              <div className="detail-section price-section">
                <h3>Price</h3>
                <p className="price">Rs. {medicine.price}</p>
              </div>
            </div>
            
            <div className="purchase-section">
              <div className="quantity-section">
                <button
                  className="quantity-button"
                  onClick={handleDecreaseQuantity}
                  disabled={quantity <= 1}
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
                  <span>✓ Item added to cart!</span>
                  <button onClick={goToCart} className="go-to-cart-btn">
                    <HiShoppingCart /> View Cart
                  </button>
                </div>
              ) : (
                <button className="add-to-cart-button" onClick={handleAddToCart}>
                  <HiShoppingCart /> Add to Cart ({quantity})
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
