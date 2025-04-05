import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaSignOutAlt, FaUserShield, FaHeadset, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import styles from "../styles/Footer.module.css";

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
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>About Sethsiri Pharmacy</h3>
          <p className={styles.footerAbout}>
            We are dedicated to providing quality medications and healthcare 
            products with exceptional service. Our licensed pharmacists are 
            available to assist you with all your healthcare needs.
          </p>
          <div className={styles.footerSocial}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}><FaLinkedin /></a>
          </div>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Quick Links</h3>
          <ul className={styles.footerLinks}>
            <li><Link to="/" className={styles.footerLink}>Home</Link></li>
            <li><Link to="/order" className={styles.footerLink}>Shop</Link></li>
            <li><Link to="/prescription/upload" className={styles.footerLink}>Upload Prescription</Link></li>
            <li><Link to="/Delivery/FeedbackForm" className={styles.footerLink}>Provide Feedback</Link></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Contact Us</h3>
          <ul className={styles.contactList}>
            <li className={styles.contactItem}>
              <FaMapMarkerAlt className={styles.contactIcon} />
              <span>123 Pharmacy Street, Colombo</span>
            </li>
            <li className={styles.contactItem}>
              <FaPhone className={styles.contactIcon} />
              <span>+94 11 234 5678</span>
            </li>
            <li className={styles.contactItem}>
              <FaEnvelope className={styles.contactIcon} />
              <span>info@sethsiripharmacy.com</span>
            </li>
            <li className={styles.contactItem}>
              <FaHeadset className={styles.contactIcon} />
              <span>24/7 Customer Support</span>
            </li>
          </ul>
        </div>

        {userInfo && (
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Staff Portal</h3>
            <ul className={styles.staffLinks}>
              {userInfo.role === 'admin' && (
                <li><Link to="/admin/users" className={styles.staffLink}><FaUserShield /> Admin Dashboard</Link></li>
              )}
              <li><Link to="/customerdashboard" className={styles.staffLink}>Customer Manager</Link></li>
              <li><Link to="/Inventory/Dashboard" className={styles.staffLink}>Inventory Manager</Link></li>
              <li><Link to="/Prescription/PDashboard" className={styles.staffLink}>Pharmacist</Link></li>
              <li><Link to="/sd-manager" className={styles.staffLink}>Search & Order Manager</Link></li>
              <li><Link to="/Delivery/DeliveryHistory" className={styles.staffLink}>Delivery Manager</Link></li>
            </ul>
            <button onClick={handleSignOut} className={styles.signOutBtn}>
              <FaSignOutAlt /> Sign Out
            </button>
          </div>
        )}
      </div>
      <div className={styles.footerBottom}>
        <p className={styles.copyright}>© 2025 Sethsiri Pharmacy. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
