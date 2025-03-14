import React from "react";
import '../../Styles/Delivery/NavBar.css'
import logo from '../../../public/Sethsiri_Favicon.svg';


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/Sethsiri_Favicon.svg" alt="Sethsiri Pharmacy" />
        <span className="title">Sethsiri Pharmacy</span>
      </div>
      <div className="user-info">
        <div className="user-details">
          
          <div>
            
          </div>
        </div>
        <button className="signout-btn">Sign out</button>
      </div>
    </nav>
  );
};

export default Navbar;