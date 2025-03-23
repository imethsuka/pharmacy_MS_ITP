import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeaderStripe from "../../components/HeaderStripe";
import Footer from "../../components/Footer";
import Spinner from "../../components/Spinner";
import { FiCheckCircle, FiArrowLeft, FiFileText } from "react-icons/fi";
import '../../styles/Order/OrderConfirmation.css';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5555';
        const response = await axios.get(`${baseURL}/api/orders/${orderId}`);
        
        setOrder(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching order details:', err);
        setError('Failed to load order details');
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    } else {
      setError('Order ID not provided');
      setLoading(false);
    }
  }, [orderId]);

  const handleViewAllOrders = () => {
    navigate('/order/history');
  };

  const handleContinueShopping = () => {
    navigate('/order/products');
  };

  if (loading) return (
    <div>
      <HeaderStripe />
      <div className="order-confirmation-container">
        <Spinner />
      </div>
      <Footer />
    </div>
  );

  if (error) return (
    <div>
      <HeaderStripe />
      <div className="order-confirmation-container">
        <div className="error-message">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={handleContinueShopping}>
            <FiArrowLeft /> Continue Shopping
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );

  return (
    <div>
      <HeaderStripe />
      <div className="order-confirmation-container">
        <div className="confirmation-header">
          <FiCheckCircle className="confirmation-icon" />
          <h1>Order Confirmed!</h1>
          <p>Your order has been successfully placed.</p>
        </div>

        <div className="order-details">
          <h2>Order Details</h2>
          <div className="order-info">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
            <p><strong>Status:</strong> <span className="status-badge">{order.status}</span></p>
          </div>

          <div className="order-items">
            <h3>Ordered Items</h3>
            <div className="items-list">
              {order.items.map((item, index) => (
                <div key={index} className="item">
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div className="item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-total">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>${(order.totalAmount - 350).toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Shipping:</span>
              <span>$350.00</span>
            </div>
            <div className="total-row grand-total">
              <span>Total:</span>
              <span>${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="shipping-address">
            <h3>Shipping Address</h3>
            <p>{order.shippingAddress.street}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
            <p>{order.shippingAddress.country}</p>
          </div>
        </div>

        <div className="confirmation-actions">
          <button className="secondary-btn" onClick={handleViewAllOrders}>
            <FiFileText /> View All Orders
          </button>
          <button className="primary-btn" onClick={handleContinueShopping}>
            <FiArrowLeft /> Continue Shopping
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
