import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeaderStripe from "../components/HeaderStripe";
import NavBar from "../components/home/NavBar";
import CircleCard from "../components/home/CircleCard";
import HeroSection from "../components/HeroSection";
import ProductCard from "../components/ProductCard/ProductCard";
import Footer from "../components/Footer";
import Popup from "../components/Popup/MoreInfo";
import Spinner from "../components/Spinner";
import BMI from "../components/Prescription/BMI"; // Import BMI component
import "../styles/Home.css";

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch medicines data from MongoDB using proxy
  const fetchMedicines = async () => {
    setLoading(true);
    try {
      // Use the proxy path instead of direct URL
      const response = await axios.get('/api/medicines');
      setMedicines(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching medicines:", err);
      
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

  useEffect(() => {
    fetchMedicines();
  }, []);

  // Handle "More Info" button click
  const handleMoreInfo = (medicine) => {
    setSelectedMedicine(medicine);
    setShowPopup(true);
  };

  // Close the popup
  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedMedicine(null);
  };
  
  // Handle product click to navigate to detail page
  const handleProductClick = (productId) => {
    navigate(`/order/product/${productId}`);
  };
  
  // Handle Add to Cart
  const handleAddToCart = (medicine) => {
    // Get existing cart items from localStorage or initialize empty array
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already exists in cart
    const existingItemIndex = existingCart.findIndex(item => item.id === medicine._id);
    
    if (existingItemIndex >= 0) {
      // Update quantity if product already in cart
      existingCart[existingItemIndex].quantity += 1;
    } else {
      // Add new product to cart
      existingCart.push({
        id: medicine._id,
        name: medicine.name,
        price: medicine.price,
        quantity: 1
      });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
  };

  return (
    <div>
      <HeaderStripe />

      <div className="floating-navbar">
        <NavBar />
      </div>

      <div className="content-wrapper">
        <HeroSection />

        <div className="circle-card-container">
          <CircleCard
            imageUrl="./src/assets/HomePage_assets/Women-Face-Care.webp"
            title="Skin care"
          />
          <CircleCard
            imageUrl="./src/assets/HomePage_assets/vitamins-pills-190716.jpg"
            title="Vitamin"
          />
          <CircleCard
            imageUrl="./src/assets/HomePage_assets/medicine-pills.jpg"
            title="Drugs"
          />
          <CircleCard
            imageUrl="./src/assets/HomePage_assets/Mother-Baby-Care.webp"
            title="Baby Care"
          />
          <CircleCard
            imageUrl="./src/assets/HomePage_assets/Medical-equipment.jpg"
            title="Medical Equipment"
          />
        </div>

        {/* Product Listing Section */}
        <div className="product-listing-section">
          <h2 className="section-title">Our Products</h2>
          
          {loading ? (
            <div className="loading-container">
              <Spinner />
              <p>Loading products...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <p className="error-message">{error}</p>
              <button onClick={fetchMedicines} className="retry-button">
                Try Again
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {medicines.length > 0 ? (
                medicines.map((medicine) => (
                  <ProductCard
                    key={medicine._id}
                    product={medicine}
                    onMoreInfo={() => handleMoreInfo(medicine)}
                    onProductClick={() => handleProductClick(medicine._id)}
                    onAddToCart={() => handleAddToCart(medicine)}
                  />
                ))
              ) : (
                <p className="no-products">No products available at the moment.</p>
              )}
            </div>
          )}
        </div>

        {/* Add BMI component here */}
        <div className="bmi-section">
          <BMI />
        </div>

        <Footer />
      </div>

      {/* Render the Popup if showPopup is true */}
      {showPopup && (
        <Popup medicine={selectedMedicine} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default Home;