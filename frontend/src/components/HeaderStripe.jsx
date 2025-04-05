import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import styles from "../styles/HeaderStripe.module.css";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const HeaderStripe = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

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
    <header className={styles.headerContainer}>
      {/* Logo and Site Name */}
      <div className={styles.logoContainer}>
        <Link to="/" className={styles.logoLink}>
          <img src="/Sethsiri_Favicon.svg" alt="Logo" className={styles.logo} />
          <span className={styles.siteName}>Sethsiri Pharmacy</span>
        </Link>
      </div>

      {/* Search Bar and Category Dropdown */}
      <div className={styles.searchSection}>
        <SearchBar />
        <select className={styles.categoryDropdown}>
          <option>All</option>
          <option>Medicines</option>
          <option>Healthcare</option>
          <option>Baby Care</option>
          <option>Medical Equipment</option>
        </select>
      </div>

      {/* Cart and Sign-in/Profile */}
      <div className={styles.actions}>
        <CartIcon />
        
        {userInfo ? (
          <div className={styles.profileContainer}>
            <button className={styles.profileButton} onClick={() => setShowDropdown(!showDropdown)}>
              <FaUserCircle className={styles.profileIcon} />
              <span className={styles.userName}>{userInfo.name}</span>
            </button>
            
            {showDropdown && (
              <div className={styles.profileDropdown}>
                <Link to="/profile" className={styles.dropdownItem}>Profile</Link>
                <Link to={`/${userInfo.role.toLowerCase()}/dashboard`} className={styles.dropdownItem}>Dashboard</Link>
                <button onClick={handleSignOut} className={styles.signOutButton}>
                  <FaSignOutAlt /> Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className={styles.signInButton}>Sign In</Link>
        )}
      </div>
    </header>
  );
};

export default HeaderStripe;
