import React from "react";
import { FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/HeaderStripe.css";

const HeaderStripe2 = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleSignOut = () => {
    // Clear authentication data if stored in local storage
    localStorage.removeItem("authToken"); // Example: remove auth token
    localStorage.removeItem("user"); // Remove user data if stored

    // Navigate to the home page
    navigate("/");
  };

  return (
    <header className="header-container">
      {/* Logo and Site Name */}
      <div className="logo-container">
        <img src="../public/Sethsiri_Favicon.svg" alt="Logo" className="logo" />
        <span className="site-name">Sethsiri Pharmacy</span>
      </div>

      {/* Cart and Sign-in */}
      <div className="actions">
        <div className="right-side">
          <button className="signout-btn" onClick={handleSignOut}>
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderStripe2;
