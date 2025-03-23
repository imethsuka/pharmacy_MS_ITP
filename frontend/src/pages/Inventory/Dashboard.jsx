import React, { useState, useEffect } from "react";
import HeaderStripe from "../../components/HeaderStripe";
import Sidebar from "../../components/Inventory/Sidebar"; // Import the Inventory Sidebar
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import {
  LocalPharmacy, // Icon for Available Medicines
  Warning, // Icon for Low Stock Medicines
  Schedule, // Icon for Short Expiry Medicines
} from "@mui/icons-material";
import "../../styles/Inventory/Dashboard.css"; // Custom CSS for the dashboard

const DashboardPage = () => {
  const [counts, setCounts] = useState({
    availableMedicines: 0,
    lowStockMedicines: 0,
    shortExpiryMedicines: 0,
  });

  // Simulate fetching counts (replace with actual API call)
  useEffect(() => {
    const fetchCounts = async () => {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Sample data
      setCounts({
        availableMedicines: 150,
        lowStockMedicines: 12,
        shortExpiryMedicines: 5,
      });
    };

    fetchCounts();
  }, []);

  return (
    <div className="dashboard-container">
      <HeaderStripe />
      <div className="dashboard-content">
        <Sidebar /> {/* Use the Inventory Sidebar */}
        <div className="dashboard-main">
          <h1 style={{ marginBottom: "20px", color: "#1f2937" }}>Inventory Manager Dashboard</h1>
          <Grid container spacing={3}>
            {/* Available Medicines Card */}
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ backgroundColor: "#3b82f6", color: "white" }}>
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="h5" component="div">
                      Available Medicines
                    </Typography>
                    <LocalPharmacy sx={{ fontSize: 40 }} />
                  </Box>
                  <Typography variant="h3" component="div" sx={{ marginTop: 2 }}>
                    {counts.availableMedicines}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Low Stock Medicines Card */}
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ backgroundColor: "#f59e0b", color: "white" }}>
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="h5" component="div">
                      Low Stock Medicines
                    </Typography>
                    <Warning sx={{ fontSize: 40 }} />
                  </Box>
                  <Typography variant="h3" component="div" sx={{ marginTop: 2 }}>
                    {counts.lowStockMedicines}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Short Expiry Medicines Card */}
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ backgroundColor: "#ef4444", color: "white" }}>
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="h5" component="div">
                      Short Expiry Medicines
                    </Typography>
                    <Schedule sx={{ fontSize: 40 }} />
                  </Box>
                  <Typography variant="h3" component="div" sx={{ marginTop: 2 }}>
                    {counts.shortExpiryMedicines}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;