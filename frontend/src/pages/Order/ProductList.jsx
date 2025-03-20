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
        const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5555';
        const response = await axios.get(`${baseURL}/medicines`);
        setProducts(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/order/product/${productId}`);
  };

  if (loading) return <div className="product-list-container"><Spinner /></div>;
  if (error) return <div className="product-list-container error-message">{error}</div>;

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
