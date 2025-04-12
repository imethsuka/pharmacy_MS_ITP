import React from "react";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import ProfileDropdown from "./ProfileDropdown";
import { useAuthStore } from "../store/authStore";
import "../styles/HeaderStripe.css";

const HeaderStripe = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <header className="header-container">
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

      {/* Cart and Sign-in/Profile */}
      <div className="actions">
        <CartIcon />
        {isAuthenticated ? (
          <ProfileDropdown />
        ) : (
          <Link to="/signup">
            <button className="sign-up-button">Sign Up</button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default HeaderStripe;
