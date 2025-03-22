import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import HeaderStripe from "../../components/HeaderStripe";
import Footer from "../../components/Footer";
import Spinner from "../../components/Spinner";
import { FiShoppingCart } from "react-icons/fi";
import '../../styles/Order/Product.css';

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if id exists
    if (!id) {
      setError('No product ID provided');
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        // Use your API URL from environment variables or fallback to localhost
        const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5555';
        const { data } = await axios.get(`${baseURL}/medicines/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    // Get existing cart items from localStorage or initialize empty array
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already exists in cart
    const existingItemIndex = existingCart.findIndex(item => item.id === product._id);
    
    if (existingItemIndex >= 0) {
      // Update quantity if product already in cart
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      // Add new product to cart
      existingCart.push({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.imageUrl,
        quantity: quantity,
        productId: product.productId,
        category: product.catergory,
        requiresPrescription: product.requiresPrescription
      });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Navigate to cart page
    navigate('/order/cart');
  };

  if (loading) return (
    <div>
      <HeaderStripe />
      <div className="loader-container"><Spinner /></div>
      <Footer />
    </div>
  );
  
  if (error) return (
    <div>
      <HeaderStripe />
      <div className="error-container">{error}</div>
      <Footer />
    </div>
  );
  
  if (!product) return (
    <div>
      <HeaderStripe />
      <div className="error-container">No product found.</div>
      <Footer />
    </div>
  );

  return (
    <div>
      <HeaderStripe />
      <div className="product-detail-container">
        <div className="product-detail-content">
          <div className="product-detail-left">
            <div className="product-detail-image">
              <img src={product.imageUrl} alt={product.name} />
            </div>
          </div>
          <div className="product-detail-right">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-id">Product ID: {product.productId}</p>
            <p className="product-category">Category: {product.catergory}</p>
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
                >-</button>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  readOnly
                />
                <button 
                  onClick={() => quantity < product.stock && setQuantity(quantity + 1)}
                  className="quantity-btn"
                >+</button>
              </div>
            </div>

            <div className="product-actions">
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
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
      <Footer />
    </div>
  );
}

export default Product;
