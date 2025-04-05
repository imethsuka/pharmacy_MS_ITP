import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaUsersCog, FaSignOutAlt, FaUserShield } from 'react-icons/fa';
import "../styles/Footer.css";
import "../index.css";

function Footer() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Get user info from localStorage on component mount
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('userInfo');
    window.location.href = '/login';
  };

  return (
    <footer className="Footer">
      <h4>Staff & Management</h4>
      <div className="footer-links">
        {/* Development Links - All without authentication */}
        <Link to="/admin/users" className="admin-link">
          <FaUserShield /> Super Admin
        </Link>
        <Link to="/customerdashboard">Customer Manager</Link>
        <Link to="/Inventory/Dashboard">Inventory Manager</Link>
        <Link to="/Prescription/PDashboard">Pharmacist</Link>
        <Link to="/sd-manager">Search & Order Manager</Link>
        <Link to="/Delivery/DeliveryHistory">Delivery Manager</Link>
      </div>

      {/* Sign Out Button - Only show if user is logged in */}
      {userInfo && (
        <div className="signout-container">
          <button onClick={handleSignOut} className="signout-btn">
            <FaSignOutAlt /> Sign Out
          </button>
          <span className="user-info">Logged in as: {userInfo.name} ({userInfo.role})</span>
        </div>
      )}

      <div className="footer-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook style={{ color: 'white' }} /></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter style={{ color: 'white' }} /></a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram style={{ color: 'white' }} /></a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin style={{ color: 'white' }} /></a>
      </div>
      <button className="feedback-btn">
        <Link to="/Delivery/FeedbackForm">PROVIDE FEEDBACK</Link>
      </button>
      <h4 className="rights">@2025 ALL RIGHTS RESERVED</h4>
    </footer>
  );
}

export default Footer;
