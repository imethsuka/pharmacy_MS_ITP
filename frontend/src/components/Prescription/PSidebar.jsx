import React, { useState, useContext, useEffect } from "react";
import {
  FaUserCircle,
  FaBars,
  FaTachometerAlt,
  FaClipboardList,
  FaClock,
  FaCheckCircle,
  FaTimesCircle
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/Prescription/PSidebar.css";

const PSidebar = () => {
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
              <p className="profile-name">{user?.name || "Pharmacist"}</p>
              <p className="profile-role">{user?.role || "Pharmacist"}</p>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="sidebar-nav">
          <Link
            to="/Prescription/PDashboard"
            className={isActive("/Prescription/PDashboard") ? "active" : ""}
          >
            <FaTachometerAlt size={20} />
            {!isCollapsed && <span>Dashboard</span>}
          </Link>
          <Link
            to="/Prescription/Prescriptions"
            className={isActive("/Prescription/Prescriptions") ? "active" : ""}
          >
            <FaClipboardList size={20} />
            {!isCollapsed && <span>Prescriptions</span>}
          </Link>
          <Link
            to="/Prescription/Pending"
            className={isActive("/Prescription/Pending") ? "active" : ""}
          >
            <FaClock size={20} />
            {!isCollapsed && <span>Pending</span>}
          </Link>
          <Link
            to="/Prescription/Verified"
            className={isActive("/Prescription/Verified") ? "active" : ""}
          >
            <FaCheckCircle size={20} />
            {!isCollapsed && <span>Approved</span>}
          </Link>
          <Link
            to="/Prescription/Rejected"
            className={isActive("/Prescription/Rejected") ? "active" : ""}
          >
            <FaTimesCircle size={20} />
            {!isCollapsed && <span>Rejected</span>}
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

export default PSidebar;