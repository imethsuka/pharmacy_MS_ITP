import React, { useState, useEffect } from "react";
import { FaSearch, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios";
import "../../styles/Inventory/MedicineLists.css"; // Import the external CSS file
import Sidebar from "../../components/Inventory/Sidebar";
import MedicinesTable from "../../components/Inventory/MedicinesTable";
import Spinner from "../../components/Spinner";
import logo from '../../../public/Sethsiri_Favicon.svg';

const MedicineLists = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
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
                
              </div>

              {/* Content Section */}
              {loading ? (
                <Spinner />
              ) : showType === 'table' ? (
                <MedicinesTable medicines={medicines} />
              ) : (
                <div>Card View Content</div> // Placeholder for card view content
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default MedicineLists;
