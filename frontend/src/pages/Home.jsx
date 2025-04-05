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
import BMI from "../components/Prescription/BMI";
// Import CSS module
import styles from "../styles/Home.module.css";

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

  // Sample pharmacy health tips
  const healthTips = [
    {
      title: "Medication Adherence",
      content: "Taking your medications as prescribed is crucial for their effectiveness. Set reminders if you tend to forget."
    },
    {
      title: "Proper Storage",
      content: "Store medications in a cool, dry place away from direct sunlight. Some may require refrigeration - always check the label."
    },
    {
      title: "Antibiotic Awareness",
      content: "Always complete your full course of antibiotics, even if you feel better. This helps prevent antibiotic resistance."
    },
    {
      title: "Drug Interactions",
      content: "Always inform your pharmacist about all medications you're taking to avoid potentially harmful drug interactions."
    }
  ];

  return (
    <div className={styles.pageContainer}>
      <HeaderStripe />

      <div className={styles.floatingNavbar}>
        <NavBar />
      </div>

      <div className={styles.contentWrapper}>
        <HeroSection />

        <section className={styles.categoriesSection}>
          <h2 className={styles.sectionTitle}>Health Categories</h2>
          <div className={styles.circleCardContainer}>
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
        </section>

        {/* Product Listing Section */}
        <section className={styles.productSection}>
          <h2 className={styles.sectionTitle}>Our Products</h2>
          
          {loading ? (
            <div className={styles.loadingContainer}>
              <Spinner />
              <p className={styles.loadingText}>Loading products...</p>
            </div>
          ) : error ? (
            <div className={styles.errorContainer}>
              <p className={styles.errorMessage}>{error}</p>
              <button onClick={fetchMedicines} className={styles.retryButton}>
                Try Again
              </button>
            </div>
          ) : (
            <div className={styles.productGrid}>
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
                <p className={styles.noProducts}>No products available at the moment.</p>
              )}
            </div>
          )}
        </section>

        {/* Health Tips Section */}
        <section className={styles.healthTipsSection}>
          <h2 className={styles.sectionTitle}>Pharmacy Health Tips</h2>
          <div className={styles.tipsGrid}>
            {healthTips.map((tip, index) => (
              <div key={index} className={styles.tipCard}>
                <h3 className={styles.tipTitle}>{tip.title}</h3>
                <p className={styles.tipContent}>{tip.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Add BMI component here */}
        <div className={styles.bmiSection}>
          <h2 className={styles.sectionTitle}>BMI Calculator</h2>
          <div className={styles.bmiSectionInner}>
            <BMI />
          </div>
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