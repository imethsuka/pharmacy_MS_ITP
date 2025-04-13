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

  useEffect(() => {
    fetchReorders();
  }, []);

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

  const handleRetry = () => {
    enqueueSnackbar('Retrying...', { variant: 'info' });
    fetchReorders();
  };

  return (
    <div className="notifications-container">
      <HeaderStripe />
      <div className="notifications-content">
        <Sidebar />
        <div className="notifications-main">
          <div className="notifications-header">
            <h1>Reorder Notifications</h1>
            <button className="check-stock-button" onClick={triggerStockCheck}>
              Check Stock Levels Now
            </button>
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
                      <span className={getStatusBadgeClass(reorder.status)}>
                        {reorder.status.charAt(0).toUpperCase() + reorder.status.slice(1)}
                      </span>
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
                          onClick={() => handleStatusUpdate(reorder._id, 'completed')}
                        >
                          Mark as Completed
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
        </div>
      </div>
    </div>
  );
};

export default Notifications;
