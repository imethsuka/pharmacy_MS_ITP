import React from "react";
import { FaSearch, FaSignOutAlt, FaCapsules, FaExclamationTriangle } from "react-icons/fa";
import "../../styles/Inventory/Dashboard.css"; // Import the external CSS file
import Sidebar from "../../components/Inventory/Sidebar";
import logo from '../../../public/Sethsiri_Favicon.svg';

const Dashboard = () => {
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
          {/* Dashboard Summary */}
          <h2 className="dashboard-title">Inventory Manager Dashboard</h2>
          <p className="dashboard-subtitle">A quick data overview of the inventory.</p>

          <div className="summary-cards">
            <div className="card blue">
              <FaCapsules className="icon" />
              <div>
                <p className="card-value">number of available Medicines</p>
                <p>Available Medicines</p>
              </div>
            </div>
            <div className="card yellow">
              <FaExclamationTriangle className="icon" />
              <div>
                <p className="card-value">number of low stock Medicines</p>
                <p>Low Stocks Medicines</p>
              </div>
            </div>
            <div className="card red">
              <FaExclamationTriangle className="icon" />
              <div>
                <p className="card-value">number of Short expiration Medicines</p>
                <p>Return list Medicines</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
