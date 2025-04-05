import React from "react";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../styles/HeaderStripe.css";

const HeaderStripe = () => {
  return (
    <header className="header-container">
      {/* Logo and Site Name */}
      <div className="logo-container">
        <img src="/Sethsiri_Favicon.svg" alt="Logo" className="logo" />
        <span className="site-name">Sethsiri Pharmacy</span>
      </div>

      {/* Search Bar and Category Dropdown */}
      <div className="search-section">
        <SearchBar />
        <select className="category-dropdown">
          <option>All</option>
          <option>Medicines</option>
          <option>Healthcare</option>
        </select>
      </div>

      {/* Cart and Sign-in */}
      <div className="actions">
        <CartIcon />
        <Link to="/signup" className="sign-in-button">Sign Up</Link> {/* Use Link component */}
      </div>
    </header>
  );
};

export default HeaderStripe;
