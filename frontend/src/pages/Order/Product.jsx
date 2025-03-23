import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import HeaderStripe from "../../components/HeaderStripe";
import Footer from "../../components/Footer";
import Spinner from "../../components/Spinner";
import { FiShoppingCart, FiArrowLeft } from "react-icons/fi";
import '../../styles/Order/Product.css';

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cartMessage, setCartMessage] = useState('');

  useEffect(() => {
    // Check if id exists before making the API call
    if (!id || id === 'undefined') {
      setError('Invalid product ID');
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        // Use proxy to avoid CORS issues - proxy is configured in vite.config.js
        // This request will be routed through your development server to avoid CORS
        const response = await axios.get(`/api/medicines/${id}`);
        
        // Check if we got valid data
        if (!response.data) {
          throw new Error('No product data received');
        }
        
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product:', err);
        
        // More detailed error message
        let errorMessage = 'Failed to load product.';
        
        // Handle different types of errors with specific messages
        if (err.message && err.message.includes('Network Error')) {
          errorMessage = 'Unable to connect to the server. Please check your connection or try running the frontend on port 5173.';
        } else if (err.response) {
          errorMessage = `Server error: ${err.response.status} - ${err.response.data?.message || 'Unknown server error'}`;
        }
        
        setError(errorMessage);
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    // Prescription validation
    if (product.requiresPrescription) {
      // You might want to redirect to a prescription upload page or show a modal
      if (!confirm('This product requires a prescription. Continue to add to cart?')) {
        return;
      }
    }
    
    // Get existing cart items from localStorage or initialize empty array
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already exists in cart
    const existingItemIndex = existingCart.findIndex(item => item.id === product._id);
    
    if (existingItemIndex >= 0) {
      // Update quantity if product already in cart
      existingCart[existingItemIndex].quantity += quantity;
      setCartMessage(`Updated quantity in cart`);
    } else {
      // Add new product to cart
      existingCart.push({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.imageUrl,
        quantity: quantity,
        productId: product.productId,
        category: product.category || product.catergory, // Fix typo and handle both for backward compatibility
        requiresPrescription: product.requiresPrescription
      });
      setCartMessage(`Added to cart successfully`);
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Show feedback message
    setTimeout(() => {
      // Navigate to cart page after showing message
      navigate('/order/cart');
    }, 1000);
  };

  const handleBackToProducts = () => {
    navigate('/order/products');
  };

  return (
    <div>
      <HeaderStripe />
      {loading ? (
        <div className="loader-container"><Spinner /></div>
      ) : error ? (
        <div className="error-container">
          <h3>Error Loading Product</h3>
          <p>{error}</p>
          <div className="error-actions">
            <button 
              className="retry-button"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
            <button 
              className="back-button"
              onClick={() => navigate('/order/products')}
            >
              Back to Products
            </button>
          </div>
        </div>
      ) : !product ? (
        <div className="error-container">
          <p>No product found.</p>
          <button 
            className="back-button"
            onClick={() => navigate('/order/products')}
          >
            Back to Products
          </button>
        </div>
      ) : (
        <div className="product-detail-container">
          <button className="back-to-products" onClick={handleBackToProducts}>
            <FiArrowLeft /> Back to Products
          </button>
          
          {cartMessage && (
            <div className="cart-message">
              {cartMessage}
            </div>
          )}
          
          <div className="product-detail-content">
            <div className="product-detail-left">
              <div className="product-detail-image">
                <img src={product.imageUrl} alt={product.name} />
              </div>
            </div>
            <div className="product-detail-right">
              <h1 className="product-title">{product.name}</h1>
              <p className="product-id">Product ID: {product.productId}</p>
              <p className="product-category">Category: {product.category || product.catergory}</p>
              <div className="product-price-section">
                <span className="product-price">${product.price}</span>
                <span className="product-stock">In Stock: {product.stock}</span>
                {product.requiresPrescription && 
                  <span className="prescription-required">Prescription Required</span>
                }
              </div>

              <div className="product-section">
                <h2>Description</h2>
                <p>{product.description}</p>
              </div>

              <div className="product-section">
                <h2>How to Use</h2>
                <p>{product.howToUse}</p>
              </div>

              <div className="product-section">
                <h2>Side Effects</h2>
                <p>{product.sideEffects}</p>
              </div>

              <div className="product-quantity">
                <label htmlFor="quantity">Quantity:</label>
                <div className="quantity-controls">
                  <button 
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    className="quantity-btn"
                    disabled={quantity <= 1}
                  >-</button>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (val > 0 && val <= product.stock) {
                        setQuantity(val);
                      }
                    }}
                  />
                  <button 
                    onClick={() => quantity < product.stock && setQuantity(quantity + 1)}
                    className="quantity-btn"
                    disabled={quantity >= product.stock}
                  >+</button>
                </div>
              </div>

              <div className="product-actions">
                <button 
                  className="add-to-cart-btn" 
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                >
                  <FiShoppingCart /> Add to Cart
                </button>
              </div>
            </div>
          </div>
          
          <div className="checkout-section">
            <div className="order-summary">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Product</span>
                <span>{product.name}</span>
              </div>
              <div className="summary-row">
                <span>Quantity</span>
                <span>{quantity}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${(product.price * quantity).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Product;
