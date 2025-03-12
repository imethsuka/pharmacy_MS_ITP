import React from "react";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import SignInButton from "./SignInButton";
import "../styles/header.css";

const HeaderStripe = () => {
  return (
    <div className="header-container">
      {/* Logo and Site Name */}
      <div className="logo-container">
        <img src="../public/Sethsiri_Favicon.svg" alt="Logo" className="logo" />
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
        <SignInButton />
      </div>
    </div>
  );
};

export default HeaderStripe;
