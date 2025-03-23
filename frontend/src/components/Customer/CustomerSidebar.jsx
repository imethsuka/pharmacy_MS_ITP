import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "../../styles/Prescription/PSidebar.css";

const CSidebar = () => {
  const location = useLocation();
  const [profile, setProfile] = useState({ name: "Govindi", role: "Customer Manager" });

  // Function to check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Fetch profile data from the backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:5555/api/profile/1"); // Replace with the actual user ID
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
            to="/customerdashboard"
            className={isActive("/customerdashboard") ? "active" : ""}
          >
            Dashboard
          </Link>
          <Link
            to="/CDashboard"
            className={isActive("/CDashboard") ? "active" : ""}
          >
            Manage Users
          </Link>
          
          
        </nav>
        <p className="footer-text">Powered by ITP 2025</p>
      </div>
    </aside>
  );
};

export default CSidebar; 