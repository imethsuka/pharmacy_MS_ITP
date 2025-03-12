import React from "react";
import HeaderStripe from "../components/HeaderStripe";
import NavBar from '../components/home/NavBar';
import CircleCard from "../components/home/CircleCard";
import HeroSection from "../components/HeroSection";
import '../styles/Home.css'; // Import the CSS file for styling

const Home = () => {
  return (
    <div>
      {/* HeaderStripe at the very top */}
      <HeaderStripe />

      {/* Floating NavBar with a small gap below HeaderStripe */}
      <div className="floating-navbar">
        <NavBar />
      </div>

      {/* HeroSection below the HeaderStripe and NavBar */}
      <HeroSection />

      {/* Other content (e.g., CircleCard) */}
      <CircleCard
        imageUrl="https://www.viamodasalon.com/wp-content/uploads/2018/07/4clean-up7-1.jpg"
        title="Circle Title"
      />
    </div>
  );
};

export default Home;