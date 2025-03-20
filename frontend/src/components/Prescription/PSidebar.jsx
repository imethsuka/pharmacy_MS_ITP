import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "../../styles/Prescription/PSidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const [profile, setProfile] = useState({ name: "Imeth", role: "Pharmasist" });

  // Function to check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Fetch profile data from the backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/profile/your-user-id"); // Replace with the actual user ID
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
        const data = await response.json();
        setProfile({ name: data.name, role: data.role });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <div className="profile-section">
          <div className="profile-pic">
            <FaUserCircle size={50} color="#374151" />
          </div>
          <div className="profile-info">
            <p className="profile-name">{profile.name}</p>
            <p className="profile-role">{profile.role}</p>
          </div>
        </div>
        <nav className="sidebar-nav">
          <Link
            to="/Prescription/PDashboard"
            className={isActive("/Prescription/PDashboard") ? "active" : ""}
          >
            Dashboard
          </Link>
          <Link
            to="/Prescription/Prescriptions"
            className={isActive("/Prescription/Prescriptions") ? "active" : ""}
          >
            Prescriptions
          </Link>
          <Link
            to="/Prescription/Pending"
            className={isActive("/Prescription/Pending") ? "active" : ""}
          >
            Pending
          </Link>
          <Link
            to="/Prescription/Verified"
            className={isActive("/Prescription/Verified") ? "active" : ""}
          >
            Verified Prescriptions
          </Link>
          <Link
            to="/Prescription/Rejected"
            className={isActive("/Prescription/Rejected") ? "active" : ""}
          >
            Rejected Prescriptions
          </Link>
        </nav>
        <p className="footer-text">Powered by ITP 2025</p>
      </div>
    </aside>
  );
};

export default Sidebar; 