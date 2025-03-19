import React, { useState, useEffect } from "react";
import HeaderStripe from "../components/HeaderStripe";
import NavBar from "../components/home/NavBar";
import CircleCard from "../components/home/CircleCard";
import HeroSection from "../components/HeroSection";
import ProductCard from "../components/ProductCard/ProductCard"; // Import ProductCard component
import Footer from "../components/Footer"; // Import Footer component
import Popup from "../components/Popup/Popup"; // Import Popup component
import "../styles/Home.css"; // Import the CSS file for styling

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [medicines, setMedicines] = useState([]); // State to store medicines data

  // Fetch medicines data from MongoDB
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch("http://localhost:5555/medicines"); // Update with correct API endpoint
        const data = await response.json();
        setMedicines(data.data); // Set only the required data
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };

    fetchMedicines();
  }, []);

  // Handle "Add to Cart" button click
  const handleAddToCart = (product) => {
    if (product.requiresPrescription) {
      setPopupMessage(
        "This medicine requires a prescription. Please upload your prescription to proceed."
      );
      setShowPopup(true); // Show popup if prescription is required
    } else {
      console.log(`Added ${product.name} to cart`); // Call the onAddToCart function directly
    }
  };

  // Close the popup
  const handleClosePopup = () => {
    setShowPopup(false);
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

        <div className="product-card-container">
          {/* Map over fetched medicines data to render ProductCard components */}
          {medicines.map((medicine) => (
            <ProductCard
              key={medicine._id}
              image={medicine.imageUrl} // Use imageUrl from database
              name={medicine.name} // Use name from database
              price={medicine.price} // Use price from database
              requiresPrescription={medicine.requiresPrescription} // Use prescription requirement
              onAddToCart={() => handleAddToCart(medicine)}
              onMoreInfo={() =>
                console.log(`More info clicked for ${medicine.name}`)
              }
            />
          ))}
        </div>

        <Footer />
      </div>

      {/* Render the Popup outside the ProductCard container */}
      {showPopup && <Popup message={popupMessage} onClose={handleClosePopup} />}
    </div>
  );
};

export default Home;
