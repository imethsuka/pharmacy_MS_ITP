import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderStripe from "../../components/HeaderStripe";
import Footer from "../../components/Footer";
import Spinner from "../../components/Spinner";
import { FiEye, FiArrowLeft, FiShoppingBag } from "react-icons/fi";
import '../../styles/Order/OrderHistory.css';
import { ordersApi } from '../../utils/api';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await ordersApi.getOrders();
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load order history');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleViewOrder = (orderId) => {
    navigate(`/order/confirmation/${orderId}`);
  };

  const handleBackToShopping = () => {
    navigate('/order/products');
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return 'status-processing';
      case 'shipped':
        return 'status-shipped';
      case 'delivered':
        return 'status-delivered';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-pending';
    }
  };

  if (loading) return (
    <div>
      <HeaderStripe />
      <div className="order-history-container">
        <Spinner />
      </div>
      <Footer />
    </div>
  );

  return (
    <div>
      <HeaderStripe />
      <div className="order-history-container">
        <div className="order-history-header">
          <h1><FiShoppingBag /> Your Order History</h1>
          <button className="back-to-shop" onClick={handleBackToShopping}>
            <FiArrowLeft /> Back to Shop
          </button>
        </div>

        {error ? (
          <div className="error-message">
            <p>{error}</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="no-orders">
            <p>You haven't placed any orders yet.</p>
            <button onClick={handleBackToShopping}>Start Shopping</button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-card-header">
                  <div>
                    <h3>Order #{order._id.slice(-6)}</h3>
                    <p className="order-date">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`status-badge ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                <div className="order-card-items">
                  {order.items.slice(0, 2).map((item, index) => (
                    <div key={index} className="order-item-preview">
                      <p>{item.name} × {item.quantity}</p>
                      <p>${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                  {order.items.length > 2 && (
                    <p className="more-items">+{order.items.length - 2} more items</p>
                  )}
                </div>

                <div className="order-card-footer">
                  <p className="order-total">Total: ${order.totalAmount.toFixed(2)}</p>
                  <button 
                    className="view-details-btn"
                    onClick={() => handleViewOrder(order._id)}
                  >
                    <FiEye /> View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OrderHistory;
