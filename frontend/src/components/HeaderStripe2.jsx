import React from "react";
import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import "../styles/HeaderStripe.css";

const HeaderStripe2 = () => {
  return (
    <header className="header-container">
      {/* Logo and Site Name */}
      <div className="logo-container">
        <img src="../public/Sethsiri_Favicon.svg" alt="Logo" className="logo" />
        <span className="site-name">Sethsiri Pharmacy</span>
      </div>

      {/* Cart and Profile */}
      <div className="actions">
        <ProfileDropdown />
      </div>
    </header>
  );
};

export default HeaderStripe2;
