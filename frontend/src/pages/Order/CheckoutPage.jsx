import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import HeaderStripe from "../../components/HeaderStripe";
import Footer from "../../components/Footer";
import { FiShoppingBag, FiArrowLeft, FiCheckCircle, FiAlertTriangle } from "react-icons/fi";
import '../../styles/Order/Cart.css';
import '../../styles/Order/CheckoutPage.css';
import axios from 'axios';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(350);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Sri Lanka",
    specialMessage: ""
  });

  useEffect(() => {
    // Get cart data from location state or fallback to localStorage
    if (location.state) {
      const { cartItems, subtotal, shipping, total } = location.state;
      setCartItems(cartItems);
      setSubtotal(subtotal);
      setShipping(shipping);
      setTotal(total);
    } else {
      const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartItems(storedCart);
      
      const calculatedSubtotal = storedCart.reduce(
        (acc, item) => acc + (item.price * item.quantity), 0
      );
      setSubtotal(calculatedSubtotal);
      setTotal(calculatedSubtotal + shipping);
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleBackToCart = () => {
    navigate('/order/cart');
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    if (!formData.street || !formData.city || !formData.state || !formData.zipCode) {
      alert('Please fill in all address fields');
      return;
    }
    
    try {
      setIsProcessing(true);
      setError(null);
  
      // Prepare order data
      const orderData = {
        items: cartItems.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          requiresPrescription: item.requiresPrescription || false
        })),
        totalAmount: total,
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        },
        specialMessage: formData.specialMessage,
        prescriptionId: localStorage.getItem('prescriptionId') || null
      };
  
      // Submit order to backend
      const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5555';
      
      console.log('Attempting to submit order to:', `${baseURL}/api/orders`);
      
      // Skip ping test and directly try to submit the order
      // This is more reliable since the specific /api endpoint might not exist
      try {
        const response = await axios.post(`${baseURL}/api/orders`, orderData, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true 
        });
        
        if (response.data && response.data._id) {
          // Clear cart
          localStorage.removeItem('cart');
          localStorage.removeItem('prescriptionUploaded');
          localStorage.removeItem('prescriptionId');
          
          // Navigate to order confirmation page
          navigate(`/order/confirmation/${response.data._id}`);
        } else {
          throw new Error('Failed to create order - incomplete response data');
        }
      } catch (error) {
        console.error('Error creating order:', error);
        
        // Enhanced error detection and handling
        if (error.message && error.message.includes('Server connection failed')) {
          setError({
            type: 'connection',
            message: 'Backend Server Not Reachable',
            details: error.message
          });
        } else if (error.response && error.response.status === 404) {
          setError({
            type: 'endpoint',
            message: 'API Endpoint Not Found (404)',
            details: 'The API endpoint /api/orders does not exist. Please check if the route is correctly defined in your backend.'
          });
        } else if (error.message && (error.message.includes('Network Error') || 
            error.message.includes('CORS') || 
            error.code === 'ERR_NETWORK')) {
          setError({
            type: 'cors',
            message: 'CORS or Network Error',
            details: 'This could be due to CORS configuration or the server might be running on a different port. Check that backend CORS settings include your frontend origin.'
          });
        } else {
          setError({
            type: 'general',
            message: 'There was an error processing your order.',
            details: error.message || 'Please try again later.'
          });
        }
      } finally {
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Error creating order:', error);
      
      // Enhanced error detection and handling
      if (error.message && error.message.includes('Server connection failed')) {
        setError({
          type: 'connection',
          message: 'Backend Server Not Reachable',
          details: error.message
        });
      } else if (error.response && error.response.status === 404) {
        setError({
          type: 'endpoint',
          message: 'API Endpoint Not Found (404)',
          details: 'The API endpoint /api/orders does not exist. Please check if the route is correctly defined in your backend.'
        });
      } else if (error.message && (error.message.includes('Network Error') || 
          error.message.includes('CORS') || 
          error.code === 'ERR_NETWORK')) {
        setError({
          type: 'cors',
          message: 'CORS or Network Error',
          details: 'This could be due to CORS configuration or the server might be running on a different port. Check that backend CORS settings include your frontend origin.'
        });
      } else {
        setError({
          type: 'general',
          message: 'There was an error processing your order.',
          details: error.message || 'Please try again later.'
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <HeaderStripe />
      <div className="checkout-container">
        <h1 className="checkout-title">
          <FiShoppingBag /> Checkout
        </h1>
        
        {error && (
          <div className="error-container">
            <div className="error-message">
              <FiAlertTriangle size={24} />
              <h3>{error.message}</h3>
              <p>{error.details}</p>
              
              {error.type === 'cors' && (
                <div className="developer-info">
                  <h4>Developer Information:</h4>
                  <ul>
                    <li>Check backend CORS configuration in <code>backend/index.js</code></li>
                    <li>Update <code>corsOptions</code> to include your frontend origin</li>
                    <li>Make sure you're using the correct API URL (current: {import.meta.env.VITE_API_URL || 'http://localhost:5555'})</li>
                  </ul>
                </div>
              )}
              
              {error.type === 'endpoint' && (
                <div className="developer-info">
                  <h4>Developer Information:</h4>
                  <ul>
                    <li>The route <code>/api/orders</code> was not found on the server</li>
                    <li>Check if <code>orderRoute</code> is properly defined and imported in your <code>backend/index.js</code></li>
                    <li>Verify that the server is using the route pattern <code>app.use('/api/orders', orderRoute)</code></li>
                  </ul>
                </div>
              )}
              
              {error.type === 'connection' && (
                <div className="developer-info">
                  <h4>Developer Information:</h4>
                  <ul>
                    <li>Make sure the backend server is running</li>
                    <li>Check if the server is running on the correct port (expected: {import.meta.env.VITE_API_URL || 'http://localhost:5555'})</li>
                    <li>Try starting the backend with <code>npm start</code> or <code>node index.js</code></li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="checkout-content">
          <div className="checkout-form-section">
            <h2>Shipping Information</h2>
            <form onSubmit={handlePlaceOrder} className="shipping-form">
              <div className="form-group">
                <label htmlFor="street">Street Address*</label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="city">City*</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="state">State/Province*</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="zipCode">Postal Code*</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  disabled
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="specialMessage">Special Message (Optional)</label>
                <textarea
                  id="specialMessage"
                  name="specialMessage"
                  value={formData.specialMessage}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Add any special instructions or notes for your order"
                ></textarea>
              </div>
              
              <div className="checkout-actions">
                <button 
                  type="button" 
                  className="back-button"
                  onClick={handleBackToCart}
                >
                  <FiArrowLeft /> Back to Cart
                </button>
                
                <button 
                  type="submit" 
                  className="confirm-order-btn"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Confirm Order'}
                </button>
              </div>
            </form>
          </div>
          
          <div className="checkout-summary-section">
            <h2>Order Summary</h2>
            <div className="checkout-items">
              {cartItems.map((item) => (
                <div key={item.id} className="checkout-item">
                  <div className="checkout-item-info">
                    <p className="checkout-item-name">{item.name}</p>
                    <p className="checkout-item-quantity">Qty: {item.quantity}</p>
                  </div>
                  <p className="checkout-item-price">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            
            <div className="checkout-totals">
              <div className="checkout-total-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="checkout-total-row">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              
              <div className="checkout-total-row grand-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
