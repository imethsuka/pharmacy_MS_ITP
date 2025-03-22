import React, { useState, useEffect } from "react";
import HeaderStripe from "../components/HeaderStripe";
import NavBar from "../components/home/NavBar";
import CircleCard from "../components/home/CircleCard";
import HeroSection from "../components/HeroSection";
import ProductCard from "../components/ProductCard/ProductCard";
import Footer from "../components/Footer";
import Popup from "../components/Popup/MoreInfo";
import "../styles/Home.css";

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [medicines, setMedicines] = useState([]);

  // Fetch medicines data from MongoDB
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch("http://localhost:5555/medicines");
        const data = await response.json();
        setMedicines(data.data);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };

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
          {medicines.map((medicine) => (
            <ProductCard
              key={medicine._id}
              image={medicine.imageUrl}
              name={medicine.name}
              price={medicine.price}
              requiresPrescription={medicine.requiresPrescription}
              onAddToCart={() => handleAddToCart(medicine)}
              onMoreInfo={() => handleMoreInfo(medicine)}
            />
          ))}
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