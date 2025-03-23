import React, { useState } from "react";
import {
  FaUserCircle,
  FaBars,
  FaTachometerAlt, // Dashboard icon
  FaList, // Medicines List icon
  FaLayerGroup, // Medicines Group icon
  FaChartLine, // Reports icon
  FaBell, // Notifications icon
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "../../styles/Inventory/Sidebar.css";

const Sidebar = () => {
  const location = useLocation(); // Get the current location
  const [isCollapsed, setIsCollapsed] = useState(false); // State for collapse

  // Function to check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Toggle sidebar collapse
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {/* Toggle Button */}
      <div className="sidebar-toggle" onClick={toggleCollapse}>
        <FaBars size={20} />
      </div>

      {/* Sidebar Content */}
      <div className="sidebar-content">
        {/* Profile Section */}
        <div className="profile-section">
          <div className="profile-pic">
            <FaUserCircle size={50} color="#374151" />
          </div>
          {!isCollapsed && (
            <div>
              <p className="profile-name">Dehemi</p>
              <p className="profile-role">Inventory Manager</p>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="sidebar-nav">
          <Link
            to="/Inventory/Dashboard"
            className={isActive("/Inventory/Dashboard") ? "active" : ""}
          >
            <FaTachometerAlt size={20} />
            {!isCollapsed && <span>Dashboard</span>}
          </Link>
          <Link
            to="/inventory/MedicineLists"
            className={isActive("/inventory/MedicineLists") ? "active" : ""}
          >
            <FaList size={20} />
            {!isCollapsed && <span>Medicines List</span>}
          </Link>
          <Link
            to="/inventory/MedicineGroups"
            className={isActive("/inventory/MedicineGroups") ? "active" : ""}
          >
            <FaLayerGroup size={20} />
            {!isCollapsed && <span>Medicines Group</span>}
          </Link>
          <Link
            to="/inventory/reports"
            className={isActive("/inventory/reports") ? "active" : ""}
          >
            <FaChartLine size={20} />
            {!isCollapsed && <span>Reports</span>}
          </Link>
          <Link
            to="/inventory/notifications"
            className={isActive("/inventory/notifications") ? "active" : ""}
          >
            <FaBell size={20} />
            {!isCollapsed && <span>Notifications</span>}
            {!isCollapsed && <span className="notification-badge">1</span>}
          </Link>
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <p className="footer-text">Powered by ITP 2025</p>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;