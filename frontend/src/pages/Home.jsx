import React, { useState } from "react";
import HeaderStripe from "../components/HeaderStripe";
import NavBar from '../components/home/NavBar';
import CircleCard from "../components/home/CircleCard";
import HeroSection from "../components/HeroSection";
import ProductCard from "../components/ProductCard/ProductCard"; // Import ProductCard component
import Footer from "../components/Footer"; // Import Footer component
import Popup from "../components/Popup/Popup"; // Import Popup component
import '../styles/Home.css'; // Import the CSS file for styling
import medicineImage from '../assets/medicineImage.png'; // Import the medicineImage

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // Dummy data to simulate fetching from a database
  const products = [
    {
      id: 1,
      image: medicineImage,
      name: "Paracetamol 500mg",
      price: "5.99",
      requiresPrescription: true, // Requires prescription
    },
    {
      id: 2,
      image: medicineImage,
      name: "Ibuprofen 400mg",
      price: "7.99",
      requiresPrescription: false, // Does not require prescription
    },
    {
      id: 3,
      image: medicineImage,
      name: "Amoxicillin 500mg",
      price: "12.99",
      requiresPrescription: true, // Requires prescription
    },
    {
      id: 4,
      image: medicineImage,
      name: "Vitamin C 1000mg",
      price: "9.99",
      requiresPrescription: false, // Does not require prescription
    },
    {
      id: 5,
      image: medicineImage,
      name: "Omeprazole 20mg",
      price: "8.99",
      requiresPrescription: true, // Requires prescription
    },
    {
      id: 6,
      image: medicineImage,
      name: "Cetirizine 10mg",
      price: "6.99",
      requiresPrescription: false, // Does not require prescription
    },
    {
      id: 7,
      image: medicineImage,
      name: "Metformin 500mg",
      price: "10.99",
      requiresPrescription: true, // Requires prescription
    },
    {
      id: 8,
      image: medicineImage,
      name: "Aspirin 75mg",
      price: "4.99",
      requiresPrescription: false, // Does not require prescription
    },
  ];

  // Handle "Add to Cart" button click
  const handleAddToCart = (product) => {
    if (product.requiresPrescription) {
      setPopupMessage("This medicine requires a prescription. Please upload your prescription to proceed.");
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
            title="Circle Title"
          />
          <CircleCard
            imageUrl="./src/assets/HomePage_assets/vitamins-pills-190716.jpg"
            title="Circle Title 2"
          />
          <CircleCard
            imageUrl="./src/assets/HomePage_assets/medicine-pills.jpg"
            title="Circle Title 3"
          />
          <CircleCard
            imageUrl="./src/assets/HomePage_assets/Mother-Baby-Care.webp"
            title="Circle Title 4"
          />
          <CircleCard
            imageUrl="./src/assets/HomePage_assets/Medical-equipment.jpg"
            title="Circle Title 5"
          />
        </div>

        <div className="product-card-container">
          {/* Map over the dummy data to render ProductCard components */}
          {products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              requiresPrescription={product.requiresPrescription}
              onAddToCart={() => handleAddToCart(product)}
              onMoreInfo={() => console.log(`More info clicked for ${product.name}`)}
            />
          ))}
        </div>

        <Footer />
      </div>

      {/* Render the Popup outside the ProductCard container */}
      {showPopup && (
        <Popup
          message={popupMessage}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default Home;