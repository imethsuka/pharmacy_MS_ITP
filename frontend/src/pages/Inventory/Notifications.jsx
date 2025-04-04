import React from "react";
import { FaSearch, FaSignOutAlt } from "react-icons/fa";
import "../../styles/Inventory/Notifications.css"; // Import the external CSS file
import Sidebar from "../../components/Inventory/Sidebar";

import logo from '../../../public/Sethsiri_Favicon.svg';


const Notifications = () => {
  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="brand-section">
          <img src={logo} alt="Sethsiri Logo" width="80" />
          <h2 className="brand-title">Sethsiri Pharmacy</h2>
        </div>
        <div className="centered-search-box">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div className="right-side">
          <button className="signout-btn">
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </div>

      <div className="dashboard-container">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="main-content">
          <h2 className="dashboard-title">Notifications</h2>
          <p className="dashboard-subtitle">A detailed list of all notifications.</p>
        </main>
      </div>
    </>
  );
};

export default Notifications;
