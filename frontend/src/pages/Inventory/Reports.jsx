import React from "react";
import "../../styles/Inventory/Reports.css";
import Sidebar from "../../components/Inventory/Sidebar";
import HeaderStripe from "../../components/HeaderStripe";

const Reports = () => {
  return (
    <div className="dashboard-container">
      <HeaderStripe />
      <div className="dashboard-content">
        <Sidebar />
        <main className="main-content">
          <h2 className="dashboard-title">Reports</h2>
          <p className="dashboard-subtitle">A detailed list of all reports.</p>
        </main>
      </div>
    </div>
  );
};

export default Reports;
