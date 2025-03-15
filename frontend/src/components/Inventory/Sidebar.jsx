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
            <p className="profile-name">Dehemi</p>
            <p className="profile-role">Inventory Manager</p>
          </div>
        </div>
        <nav className="sidebar-nav">
          <Link
            to="/Inventory/Dashboard"
            className={isActive("/Inventory/Dashboard") ? "active" : ""}
          >
            Dashboard
          </Link>
          <Link
            to="/inventory/MedicineLists"
            className={isActive("/inventory/MedicineLists") ? "active" : ""}
          >
            Medicines List
          </Link>
          <Link
            to="/inventory/MedicineGroups"
            className={isActive("/inventory/MedicineGroups") ? "active" : ""}
          >
            Medicines Group
          </Link>
          <Link
            to="/inventory/reports"
            className={isActive("/inventory/reports") ? "active" : ""}
          >
            Reports
          </Link>
          <Link
            to="/inventory/notifications"
            className={isActive("/inventory/notifications") ? "active" : ""}
          >
            Notifications <span className="notification-badge">1</span>
          </Link>
        </nav>
        <p className="footer-text">Powered by ITP 2025</p>
      </div>
    </aside>
  );
};

export default Sidebar;