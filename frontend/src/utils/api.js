import axios from 'axios';

// Get the base URL from environment variables or use default
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5555';

// Create an axios instance with default config
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add a request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor for logging
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error);
    
    // Store order data in session storage before request fails
    // This allows us to recover it in case of API issues
    if (error.config && error.config.url.includes('/api/orders') && 
        error.config.method === 'post' && error.config.data) {
      try {
        console.log('Storing order data for recovery');
        sessionStorage.setItem('lastOrderData', error.config.data);
        localStorage.setItem('orderTotalAmount', JSON.parse(error.config.data).totalAmount);
      } catch (e) {
        console.error('Failed to store order data', e);
      }
    }
    
    return Promise.reject(error);
  }
);

// Orders API
export const ordersApi = {
  createOrder: (orderData) => api.post('/api/orders', orderData),
  getOrders: () => api.get('/api/orders'),
  getOrder: (id) => api.get(`/api/orders/${id}`),
  updateOrderStatus: (id, status) => api.put(`/api/orders/${id}`, { status }),
  cancelOrder: (id) => api.post(`/api/orders/${id}/cancel`),
  testConnection: () => api.get('/api/test'),
};

export default api;
