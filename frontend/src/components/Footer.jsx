import React from "react";
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import "../styles/Footer.css";
import "../index.css";

function Footer() {
  return (
    <footer className="Footer">
      <h4>Staff</h4>
      <div className="footer-links">
        <Link to="/customer-manager">Customer Manager</Link>
        <Link to="/Inventory/Dashboard">Inventory Manager</Link>
        <Link to="/pharmacist">Pharmacist</Link>
        <Link to="/sd-manager">SD Manager</Link>
        <Link to="/delivery-manager">Delivery Manager</Link>
      </div>
      <div className="footer-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook style={{ color: 'white' }} /></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter style={{ color: 'white' }} /></a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram style={{ color: 'white' }} /></a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin style={{ color: 'white' }} /></a>
      </div>
      <button className="feedback-btn">PROVIDE FEEDBACK</button>
      <h4 className="rights">@2025 ALL RIGHTS RESERVED</h4>
    </footer>
  );
}

export default Footer;
