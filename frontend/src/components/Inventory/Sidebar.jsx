import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import "./Sidebar.css";

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
            to="/"
            className={isActive("/") ? "active" : ""}
          >
            Dashboard
          </Link>
          <Link
            to="/Pages/MedicineLists"
            className={isActive("/Pages/MedicineLists") ? "active" : ""}
          >
            Medicines List
          </Link>
          <Link
            to="/Pages/MedicineGroups"
            className={isActive("/Pages/MedicineGroups") ? "active" : ""}
          >
            Medicines Group
          </Link>
          <Link
            to="/Pages/reports"
            className={isActive("/Pages/reports") ? "active" : ""}
          >
            Reports
          </Link>
          <Link
            to="/Pages/notifications"
            className={isActive("/Pages/notifications") ? "active" : ""}
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