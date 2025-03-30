import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../styles/Order/ProductList.css";
import HeaderStripe from "../../components/HeaderStripe";
import Footer from "../../components/Footer";
import Spinner from "../../components/Spinner";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Use relative URL with /api prefix which will be handled by the proxy
        const response = await axios.get('/api/medicines');
        setProducts(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        
        // Better error handling with specific messages
        if (err.message && err.message.includes('Network Error')) {
          setError('Connection error: Unable to connect to the server. The server might be down or there could be CORS issues.');
        } else if (err.response) {
          // Server responded with error
          setError(`Server error: ${err.response.status} - ${err.response.data.message || 'Unknown error'}`);
        } else {
          setError('Failed to load products. Please try again later.');
        }
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/order/product/${productId}`);
  };

  if (loading) return <div className="product-list-container"><Spinner /></div>;
  if (error) return (
    <div className="product-list-container">
      <div className="error-container">
        <h2>Connection Error</h2>
        <p className="error-message">{error}</p>
        <div className="error-suggestions">
          <p>Possible solutions:</p>
          <ul>
            <li>Start your frontend on port 5173 instead of 5174</li>
            <li>Make sure the backend server is running</li>
            <li>Ask a developer to update the CORS configuration in the backend</li>
          </ul>
        </div>
        <button 
          className="retry-button"
          onClick={() => {
            setLoading(true);
            setError('');
            fetchProducts();
          }}
        >
          Retry Connection
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <HeaderStripe />
      <div className="product-list-container">
        <h1 className="product-list-title">Available Medicines</h1>
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <div 
                key={product._id} 
                className="product-card"
                onClick={() => handleProductClick(product._id)}
              >
                <div className="product-image">
                  <img src={product.imageUrl} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  {product.category && <p className="product-category">{product.category}</p>}
                  <p className="product-price">${product.price}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-products">No products available</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductList;
