import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "../../styles/Delivery/SideBarV.css";

const SideBarV = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="Delivery-sidebar"><br/><br/><br/><br/>
      <div className="Delivery-profile-section">
        <FaUserCircle size={50} className="Delivery-profile-pic" />
        <div>
          <p className="Delivery-profile-name">Vonara</p>
          <p className="Delivery-profile-role">Delivery Manager</p>
        </div>
      </div>

      <nav className="Delivery-sidebar-nav">
        <Link
          to="/Delivery/DeliveryStatus"
          className={`Delivery-nav-item ${isActive("/Delivery/DeliveryStatus") ? "active" : ""}`}
        >
          <span className="Delivery-icon">📦</span> Delivery Status
        </Link>
        <Link
          to="/Delivery/DeliveryHistory"
          className={`Delivery-nav-item ${isActive("/Delivery/DeliveryHistory") ? "active" : ""}`}
        >
          <span className="Delivery-icon">🕒</span> Delivery History
        </Link>
        {/* <Link
          to="/Delivery/DriverForm"
          className={`Delivery-nav-item ${isActive("/Delivery/DriverForm") ? "active" : ""}`}
        >
          <span className="Delivery-icon">📝</span> Driver Form
        </Link> */}
        <Link
          to="/Delivery/DriverDetails"
          className={`Delivery-nav-item ${isActive("/Delivery/DriverDetails") ? "active" : ""}`}
        >
          <span className="Delivery-icon">📦</span> Driver Details
        </Link>
      </nav>

      <p className="Delivery-footer-text">Powered by ITP 2025</p>
      <p className="Delivery-version-text">v 1.12</p>
    </aside>
  );
};

export default SideBarV;
