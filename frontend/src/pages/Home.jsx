import React from "react";
import HeaderStripe from "../components/HeaderStripe";
import NavBar from '../components/home/NavBar';
import CircleCard from "../components/home/CircleCard";
import HeroSection from "../components/HeroSection";
import ProductCard from "../components/ProductCard"; // Import ProductCard component
import Footer from "../components/Footer"; // Import Footer component
import '../styles/Home.css'; // Import the CSS file for styling
import medicineImage from '../assets/medicineImage.png'; // Import the medicineImage

const Home = () => {
  return (
    <div>

      <HeaderStripe />
      


      {/* <div className="floating-navbar">
        <NavBar />
      </div> */}
      {/* <HeroSection /> */}




      <div className="floating-navbar">
        <NavBar />
      </div>
      <div className="content-wrapper"> {/* Add this wrapper */}
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
          <ProductCard
            image={medicineImage}
            name="Paracetamol 500mg"
            price="5.99"
            onAddToCart={() => alert("Added to cart!")}
            onMoreInfo={() => alert("More Info clicked!")}
          />
          <ProductCard
            image={medicineImage}
            name="Paracetamol 500mg"
            price="5.99"
            onAddToCart={() => alert("Added to cart!")}
            onMoreInfo={() => alert("More Info clicked!")}
          />
          <ProductCard
            image={medicineImage}
            name="Paracetamol 500mg"
            price="5.99"
            onAddToCart={() => alert("Added to cart!")}
            onMoreInfo={() => alert("More Info clicked!")}
          />
          <ProductCard
            image={medicineImage}
            name="Paracetamol 500mg"
            price="5.99"
            onAddToCart={() => alert("Added to cart!")}
            onMoreInfo={() => alert("More Info clicked!")}
          />
          <ProductCard
            image={medicineImage}
            name="Paracetamol 500mg"
            price="5.99"
            onAddToCart={() => alert("Added to cart!")}
            onMoreInfo={() => alert("More Info clicked!")}
          />
          <ProductCard
            image={medicineImage}
            name="Paracetamol 500mg"
            price="5.99"
            onAddToCart={() => alert("Added to cart!")}
            onMoreInfo={() => alert("More Info clicked!")}
          />
          <ProductCard
            image={medicineImage}
            name="Paracetamol 500mg"
            price="5.99"
            onAddToCart={() => alert("Added to cart!")}
            onMoreInfo={() => alert("More Info clicked!")}
          />
          <ProductCard
            image={medicineImage}
            name="Paracetamol 500mg"
            price="5.99"
            onAddToCart={() => alert("Added to cart!")}
            onMoreInfo={() => alert("More Info clicked!")}
          />
        </div>


        <Footer />
      </div>
    </div>
  );
};

      export default Home;