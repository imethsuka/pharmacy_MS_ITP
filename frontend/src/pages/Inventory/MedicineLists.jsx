import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/Inventory/MedicineLists.css";
import Sidebar from "../../components/Inventory/Sidebar";
import HeaderStripe from "../../components/HeaderStripe";
import MedicinesTable from "../../components/Inventory/MedicinesTable";
import MedicineMoreInfo from "../../components/Inventory/MedicineMoreInfo";
import Spinner from "../../components/Spinner";

const MedicineLists = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const navigate = useNavigate();

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
    navigate('/inventory/addMedicines');
  };

  const handleMoreInfoClick = (medicine) => {
    setSelectedMedicine(medicine);
    setShowMoreInfo(true);
  };

  const handleCloseMoreInfo = () => {
    setSelectedMedicine(null);
    setShowMoreInfo(false);
  };

  return (
    <div className="dashboard-container">
      <HeaderStripe />
      <div className="dashboard-content">
        <Sidebar />
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
              <div className="view-toggle">
                {/* Add your view toggle buttons here if needed */}
              </div>

              {loading ? (
                <Spinner />
              ) : showType === 'table' ? (
                <MedicinesTable medicines={medicines} onMoreInfoClick={handleMoreInfoClick} />
              ) : (
                <div>Card View Content</div>
              )}
            </div>
          </div>
        </main>
      </div>

      {showMoreInfo && (
        <MedicineMoreInfo medicine={selectedMedicine} onClose={handleCloseMoreInfo} />
      )}
    </div>
  );
};

export default MedicineLists;