import React, { useState, useEffect } from "react";
import { FaSearch, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios";
import "../../styles/Inventory/MedicineLists.css"; // Import the external CSS file
import Sidebar from "../../components/Inventory/Sidebar";
import MedicinesTable from "../../components/Inventory/MedicinesTable";
import MedicineMoreInfo from "../../components/Inventory/MedicineMoreInfo"; // Import the popup component
import Spinner from "../../components/Spinner";
import logo from '/Sethsiri_Favicon.svg';

const MedicineLists = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  const [selectedMedicine, setSelectedMedicine] = useState(null); // State for selected medicine
  const [showMoreInfo, setShowMoreInfo] = useState(false); // State to control popup visibility
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/medicines')
      .then((response) => {
        setMedicines(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleAddMedicine = () => {
    navigate('/inventory/addMedicines'); // Navigate to addMedicines page
  };

  // Handle "info" icon click in MedicinesTable
  const handleMoreInfoClick = (medicine) => {
    setSelectedMedicine(medicine); // Set the selected medicine
    setShowMoreInfo(true); // Show the popup
  };

  // Close the popup
  const handleCloseMoreInfo = () => {
    setSelectedMedicine(null); // Clear the selected medicine
    setShowMoreInfo(false); // Hide the popup
  };

  return (
    <>
      {/* Top Bar */}
      {/* <div className="top-bar">
        <div className="brand-section">
          <img src={logo} alt="Sethsiri Logo" width="80" />
          <h2 className="brand-title">Sethsiri Pharmacy</h2>
        </div>
        <div className="centered-search-box">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div className="right-side">
          <button className="signout-btn">
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </div> */}

      <div className="dashboard-container">
        {/* Sidebar */}
        {/* <Sidebar /> */}

        {/* Main Content */}
        <main className="main-content">
          <div className="top-left">
            <button className="add-medicine-btn" onClick={handleAddMedicine}>
              Add Medicine
            </button>
          </div>
          <h2 className="dashboard-title">Medicine Lists</h2>
          <p className="dashboard-subtitle">A detailed list of all medicines.</p>

          <div className="medicineShow-container">
            <div className="medicineShow-content">
              {/* View Toggle Buttons */}
              <div className="view-toggle">
                {/* Add your view toggle buttons here if needed */}
              </div>

              {/* Content Section */}
              {loading ? (
                <Spinner />
              ) : showType === 'table' ? (
                <MedicinesTable medicines={medicines} onMoreInfoClick={handleMoreInfoClick} />
              ) : (
                <div>Card View Content</div> // Placeholder for card view content
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Render the MedicineMoreInfo popup if showMoreInfo is true */}
      {showMoreInfo && (
        <MedicineMoreInfo medicine={selectedMedicine} onClose={handleCloseMoreInfo} />
      )}
    </>
  );
};

export default MedicineLists;