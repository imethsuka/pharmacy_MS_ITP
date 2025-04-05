import React from "react";
import { Link } from "react-router-dom";
import logo from '/Sethsiri_Favicon.svg';
import "../../styles/Delivery/NavBarV.css";

const NavBarV = () => {
  return (
    <nav className="Delivery-navbar">
      <div className="Delivery-logo">
        <img src="/Sethsiri_Favicon.svg" alt="Sethsiri Pharmacy" />
        <span className="Delivery-title">Sethsiri Pharmacy</span>
      </div>
      <div className="Delivery-user-info">
        <div className="Delivery-user-details">
          
          <div>
            
          </div>
        </div>
        <button className="Delivery-signout-btn">Sign out</button>
      </div>
    </nav>
  );
};

export default NavBarV;