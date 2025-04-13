import React, { useState, useEffect } from "react";
import {
  FaUserCircle,
  FaBars,
  FaTachometerAlt,
  FaList,
  FaChartLine,
  FaBell,
  FaLayerGroup,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "../../styles/Inventory/Sidebar.css";
import NotificationBadge from "./NotificationBadge";

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [pendingReorders, setPendingReorders] = useState(0);

  const isActive = (path) => location.pathname === path;

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const fetchPendingReorders = async () => {
      try {
        const response = await axios.get("http://localhost:5555/api/reorders");
        const pendingCount = response.data.filter(
          (reorder) => reorder.status === "pending"
        ).length;
        setPendingReorders(pendingCount);
      } catch (error) {
        console.error("Error fetching reorder notifications:", error);
      }
    };

    fetchPendingReorders();
    
    // Set up an interval to check regularly
    const interval = setInterval(fetchPendingReorders, 60000); // Check every minute
    
    return () => clearInterval(interval); // Clean up on unmount
  }, []);

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
              <p className="profile-name">Admin</p>
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
            {!isCollapsed ? (
              <>
                <FaBell size={20} />
                <span>Notifications</span>
                {pendingReorders > 0 && (
                  <span className="notification-badge">{pendingReorders}</span>
                )}
              </>
            ) : (
              <NotificationBadge count={pendingReorders} />
            )}
          </Link>
        </nav>

        {/* Footer */}
        {!isCollapsed && <p className="footer-text">Powered by ITP 2025</p>}
      </div>
    </aside>
  );
};

export default Sidebar;