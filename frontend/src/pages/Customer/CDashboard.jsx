import React, { useState, useEffect } from "react";
import HeaderStripe from "../../components/HeaderStripe";
import AddCSidebar from "../../components/Customer/CustomerSidebar";
import "./CDashboard.css"; // Custom CSS for the dashboard
import UsersTable from "../../components/Customer/UsersTable";

const CMDashboardPage = () => {
  const [counts, setCounts] = useState({
    pending: 0,
    rejected: 0,
    verified: 0,
  });

  // Simulate fetching counts (replace with actual API call)
  useEffect(() => {
    const fetchCounts = async () => {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Sample data
      setCounts({
        pending: 12,
        rejected: 5,
        verified: 20,
      });
    };

    fetchCounts();
  }, []);

  return (
    <div className="dashboard-container">
      <HeaderStripe />
      <div className="dashboard-content">
        <AddCSidebar />
        <div className="dashboard-main">
          <h1 style={{ marginBottom: "20px", color: "#1f2937" }}>Users</h1>
        
         
            

        </div>
      </div>
    </div>
  );
};

export default CMDashboardPage;