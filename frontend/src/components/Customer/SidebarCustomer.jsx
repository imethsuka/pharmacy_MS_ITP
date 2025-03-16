import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import "../../styles/Inventory/Sidebar.css";

const Sidebar = () => {
  const location = useLocation(); // Get the current location

  // Function to check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className="sidebar">
      <div>
        <div className="profile-section">
          <div className="profile-pic">
            <FaUserCircle size={50} color="#374151" />
          </div>
          <div>
            <p className="profile-name">Govindi</p>
            <p className="profile-role">Customer Manager</p>
          </div>
        </div>
        <nav className="sidebar-nav">
          <Link
            to="/customerdashboard"
            className={isActive("/customerdashboard") ? "active" : ""}
          >
            Dashboard
          </Link>
          <Link
            to="/users"
            className={isActive("/users") ? "active" : ""}
          >
            Manage Customers
          </Link>
          
          
          
        </nav>
        <p className="footer-text">Powered by ITP 2025</p>
      </div>
    </aside>
  );
};

export default Sidebar;