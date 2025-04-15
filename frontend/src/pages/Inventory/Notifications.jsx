import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import HeaderStripe from '../../components/HeaderStripe';
import Sidebar from '../../components/Inventory/Sidebar';
import Spinner from '../../components/Spinner';
import '../../styles/Inventory/Notifications.css';

const Notifications = () => {
  const [reorders, setReorders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedReorder, setSelectedReorder] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [pharmacyDetails] = useState({
    name: "Sethsiri Pharmacy",
    address: "123 Health Street, Colombo 07",
    contactNumber: "+94 11 234 5678"
  });
  const [orderData, setOrderData] = useState({
    supplierEmail: '',
    note: '',
    medicineName: '',
    dosage: '',
    brand: '',
    quantity: 0
  });

  // Email validation regex
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  useEffect(() => {
    fetchReorders();
  }, []);

  // Set the order data when a reorder is selected
  useEffect(() => {
    if (selectedReorder) {
      setOrderData({
        supplierEmail: selectedReorder.supplierEmail || '',
        note: '',
        medicineName: selectedReorder.medicineName || '',
        dosage: '', // Will need to fetch this data if available
        brand: '', // Will need to fetch this data if available
        quantity: selectedReorder.quantityRequested || 0
      });
      // Clear any previous email validation errors
      setEmailError('');
    }
  }, [selectedReorder]);

  // Validate email whenever supplierEmail changes
  useEffect(() => {
    validateEmail(orderData.supplierEmail);
  }, [orderData.supplierEmail]);

  // Email validation function
  const validateEmail = (email) => {
    if (!email) {
      setEmailError('Supplier email is required');
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const fetchReorders = () => {
    setLoading(true);
    setError(null);
    
    axios.get('http://localhost:5555/api/reorders')
      .then(response => {
        if (response.data && Array.isArray(response.data)) {
          setReorders(response.data);
          if (response.data.length > 0) {
            enqueueSnackbar(`${response.data.length} reorder notifications found`, { variant: 'info' });
          }
        } else {
          throw new Error('Invalid response format');
        }
      })
      .catch(error => {
        console.error('Error fetching reorders:', error);
        
        // Set error state for UI display
        setError('Failed to load notifications');
        
        // Handle different types of errors with specific messages
        if (error.response) {
          // Server responded with a status code outside of 2xx range
          const status = error.response.status;
          if (status === 401 || status === 403) {
            enqueueSnackbar('Authentication error. Please log in again.', { variant: 'error' });
          } else if (status === 404) {
            enqueueSnackbar('Reorder API endpoint not found.', { variant: 'error' });
          } else if (status >= 500) {
            enqueueSnackbar('Server error. Please try again later.', { variant: 'error' });
          } else {
            enqueueSnackbar(`Failed to fetch reorder notifications: ${error.response.data.message || 'Unknown error'}`, { variant: 'error' });
          }
        } else if (error.request) {
          // The request was made but no response was received
          enqueueSnackbar('Network error. Please check your connection.', { variant: 'error' });
        } else {
          // Something happened in setting up the request
          enqueueSnackbar(`Error: ${error.message || 'Failed to fetch reorder notifications'}`, { variant: 'error' });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5555/api/reorders/${id}`, { status: newStatus });
      enqueueSnackbar(`Reorder marked as ${newStatus}`, { variant: 'success' });
      fetchReorders(); // Refresh the list
    } catch (error) {
      console.error('Error updating reorder status:', error);
      
      if (error.response) {
        const message = error.response.data.message || 'Failed to update status';
        enqueueSnackbar(`Error: ${message}`, { variant: 'error' });
      } else if (error.request) {
        enqueueSnackbar('Network error while updating status', { variant: 'error' });
      } else {
        enqueueSnackbar('Failed to update status', { variant: 'error' });
      }
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'status-badge pending';
      case 'completed':
        return 'status-badge completed';
      case 'cancelled':
        return 'status-badge cancelled';
      default:
        return 'status-badge';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const triggerStockCheck = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5555/api/reorders/check-stock');
      enqueueSnackbar(response.data.message, { variant: 'success' });
      fetchReorders(); // Refresh the list
    } catch (error) {
      console.error('Error checking stock levels:', error);
      
      if (error.response) {
        const message = error.response.data.message || 'Failed to check stock levels';
        enqueueSnackbar(`Error: ${message}`, { variant: 'error' });
      } else if (error.request) {
        enqueueSnackbar('Network error. Please check your connection.', { variant: 'error' });
      } else {
        enqueueSnackbar('Failed to check stock levels', { variant: 'error' });
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle clearing all notifications
  const handleClearAllNotifications = async () => {
    if (reorders.length === 0) {
      enqueueSnackbar('No notifications to clear', { variant: 'info' });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.delete('http://localhost:5555/api/reorders/clear-all');
      
      // Clear the notifications from the state
      setReorders([]);
      
      enqueueSnackbar(`${response.data.count || 'All'} notifications cleared`, { variant: 'success' });
    } catch (error) {
      console.error('Error clearing all notifications:', error);
      
      if (error.response) {
        const message = error.response.data.message || 'Failed to clear notifications';
        enqueueSnackbar(`Error: ${message}`, { variant: 'error' });
      } else if (error.request) {
        enqueueSnackbar('Network error while clearing notifications', { variant: 'error' });
      } else {
        enqueueSnackbar('Failed to clear notifications', { variant: 'error' });
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle clearing a single notification
  const handleClearNotification = async (id) => {
    try {
      await axios.put(`http://localhost:5555/api/reorders/${id}/clear`);
      
      // Remove the cleared notification from the state
      setReorders(prevReorders => prevReorders.filter(reorder => reorder._id !== id));
      
      enqueueSnackbar('Notification cleared', { variant: 'success' });
    } catch (error) {
      console.error('Error clearing notification:', error);
      
      if (error.response) {
        const message = error.response.data.message || 'Failed to clear notification';
        enqueueSnackbar(`Error: ${message}`, { variant: 'error' });
      } else if (error.request) {
        enqueueSnackbar('Network error while clearing notification', { variant: 'error' });
      } else {
        enqueueSnackbar('Failed to clear notification', { variant: 'error' });
      }
    }
  };

  const handleRetry = () => {
    enqueueSnackbar('Retrying...', { variant: 'info' });
    fetchReorders();
  };

  // Handle showing the order popup
  const handleShowOrderPopup = (reorder) => {
    setSelectedReorder(reorder);
    setShowPopup(true);
  };

  // Handle closing the popup
  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedReorder(null);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData({
      ...orderData,
      [name]: value
    });
  };

  // Handle sending the order
  const handleSendOrder = async () => {
    // Validate email before sending
    if (!validateEmail(orderData.supplierEmail)) {
      setEmailError('Please enter a valid supplier email');
      enqueueSnackbar('Please enter a valid supplier email', { variant: 'error' });
      return;
    }
    
    // Validate required fields
    if (!orderData.quantity) {
      enqueueSnackbar('Please enter a quantity', { variant: 'error' });
      return;
    }

    try {
      setLoading(true);
      
      // Send the reorder request with all details to trigger email sending
      const response = await axios.put(`http://localhost:5555/api/reorders/${selectedReorder._id}/send-order`, { 
        status: 'completed',
        note: orderData.note,
        supplierEmail: orderData.supplierEmail,
        dosage: orderData.dosage,
        brand: orderData.brand,
        quantity: orderData.quantity,
        pharmacyDetails: pharmacyDetails
      });
      
      if (response.data.emailSent) {
        enqueueSnackbar('Order placed and email sent to supplier successfully', { variant: 'success' });
      } else {
        enqueueSnackbar('Order placed but failed to send email to supplier. Please try again later.', { variant: 'warning' });
      }
      
      setShowPopup(false);
      fetchReorders(); // Refresh the list
    } catch (error) {
      console.error('Error placing order:', error);
      
      if (error.response) {
        const message = error.response.data.message || 'Failed to place order';
        enqueueSnackbar(`Error: ${message}`, { variant: 'error' });
      } else if (error.request) {
        enqueueSnackbar('Network error while placing order. Please check your internet connection.', { variant: 'error' });
      } else {
        enqueueSnackbar('Failed to place order. Please try again later.', { variant: 'error' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="notifications-container">
      <HeaderStripe />
      <div className="notifications-content">
        <Sidebar />
        <div className="notifications-main">
          <div className="notifications-header">
            <h1>Reorder Notifications</h1>
            <div className="notifications-actions">
              <button className="clear-all-button" onClick={handleClearAllNotifications}>
                Clear All
              </button>
              <button className="check-stock-button" onClick={triggerStockCheck}>
                Check Stock Levels Now
              </button>
            </div>
          </div>

          {loading ? (
            <div className="spinner-container">
              <Spinner />
            </div>
          ) : error ? (
            <div className="error-container">
              <p className="error-message">{error}</p>
              <button className="retry-button" onClick={handleRetry}>
                Retry
              </button>
            </div>
          ) : (
            <div className="reorders-list">
              {reorders.length === 0 ? (
                <p className="no-reorders">No reorder notifications found.</p>
              ) : (
                reorders.map((reorder) => (
                  <div key={reorder._id} className="reorder-card">
                    <div className="reorder-header">
                      <h3>{reorder.medicineName}</h3>
                      <div className="header-actions">
                        <span className={getStatusBadgeClass(reorder.status)}>
                          {reorder.status.charAt(0).toUpperCase() + reorder.status.slice(1)}
                        </span>
                        <button 
                          className="clear-button"
                          onClick={() => handleClearNotification(reorder._id)}
                          title="Clear notification"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                    <div className="reorder-details">
                      <p><strong>Product ID:</strong> {reorder.productId}</p>
                      <p><strong>Quantity:</strong> {reorder.quantityRequested} units</p>
                      <p><strong>Supplier:</strong> {reorder.supplierEmail}</p>
                      <p><strong>Requested:</strong> {formatDate(reorder.createdAt)}</p>
                      {reorder.emailSent && (
                        <p><strong>Email Sent:</strong> {formatDate(reorder.emailSentAt)}</p>
                      )}
                      {reorder.status === 'completed' && reorder.completedAt && (
                        <p><strong>Completed:</strong> {formatDate(reorder.completedAt)}</p>
                      )}
                    </div>
                    {reorder.status === 'pending' && (
                      <div className="reorder-actions">
                        <button 
                          className="complete-button"
                          onClick={() => handleShowOrderPopup(reorder)}
                        >
                          Place Reorder
                        </button>
                        <button 
                          className="cancel-button"
                          onClick={() => handleStatusUpdate(reorder._id, 'cancelled')}
                        >
                          Cancel Reorder
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* Order Popup */}
          {showPopup && selectedReorder && (
            <div className="order-popup-overlay">
              <div className="order-popup">
                <button className="close-popup-button" onClick={handleClosePopup}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                
                <h2>Place Order</h2>
                
                <div className="order-popup-content">
                  <div className="order-section">
                    <h3>Medicine Details</h3>
                    <div className="form-group">
                      <label>Medicine Name</label>
                      <input 
                        type="text" 
                        name="medicineName" 
                        value={orderData.medicineName} 
                        onChange={handleInputChange}
                        disabled
                      />
                    </div>
                    <div className="form-group">
                      <label>Dosage</label>
                      <input 
                        type="text" 
                        name="dosage" 
                        value={orderData.dosage} 
                        onChange={handleInputChange}
                        placeholder="Enter dosage"
                      />
                    </div>
                    <div className="form-group">
                      <label>Brand</label>
                      <input 
                        type="text" 
                        name="brand" 
                        value={orderData.brand} 
                        onChange={handleInputChange}
                        placeholder="Enter brand"
                      />
                    </div>
                    <div className="form-group">
                      <label>Quantity</label>
                      <input 
                        type="number" 
                        name="quantity" 
                        value={orderData.quantity} 
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Supplier Email</label>
                      <input 
                        type="email" 
                        name="supplierEmail" 
                        value={orderData.supplierEmail} 
                        onChange={handleInputChange}
                      />
                      {emailError && <p className="error-message">{emailError}</p>}
                    </div>
                    <div className="form-group">
                      <label>Special Note</label>
                      <textarea 
                        name="note" 
                        value={orderData.note} 
                        onChange={handleInputChange}
                        placeholder="Add any special instructions here..."
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="order-section">
                    <h3>Pharmacy Information</h3>
                    <div className="pharmacy-info">
                      <p><strong>Name:</strong> {pharmacyDetails.name}</p>
                      <p><strong>Address:</strong> {pharmacyDetails.address}</p>
                      <p><strong>Contact:</strong> {pharmacyDetails.contactNumber}</p>
                    </div>
                  </div>
                </div>
                
                <div className="order-popup-actions">
                  <button className="send-order-button" onClick={handleSendOrder} disabled={loading}>
                    {loading ? 'Sending...' : 'Send'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
