import React, { useState, useContext, useEffect } from "react";
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
import { AuthContext } from "../../context/AuthContext";
import "../../styles/Inventory/Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useContext(AuthContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
            {user?.profilePicture ? (
              <img 
                src={user.profilePicture} 
                alt="Profile" 
                className="profile-image" 
              />
            ) : (
              <FaUserCircle size={50} className="profile-icon" />
            )}
          </div>
          {!isCollapsed && (
            <div className="profile-info">
              <p className="profile-name">{user?.name || "Inventory Manager"}</p>
              <p className="profile-role">{user?.role || "Inventory Manager"}</p>
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