import React, { useState, useEffect } from "react";
import HeaderStripe from "../../components/HeaderStripe";
import AddPSidebar from "../../components/Prescription/PSidebar";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import {
  PendingActions, // Icon for Pending
  Cancel, // Icon for Rejected
  Verified, // Icon for Verified
} from "@mui/icons-material";
import "./PDashboard.css"; // Custom CSS for the dashboard

const DashboardPage = () => {
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
        <AddPSidebar />
        <div className="dashboard-main">
          <h1 style={{ marginBottom: "20px", color: "#1f2937" }}>Dashboard</h1>
          <Grid container spacing={3}>
            {/* Pending Card */}
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ backgroundColor: "#f59e0b", color: "white" }}>
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="h5" component="div">
                      Pending
                    </Typography>
                    <PendingActions sx={{ fontSize: 40 }} />
                  </Box>
                  <Typography variant="h3" component="div" sx={{ marginTop: 2 }}>
                    {counts.pending}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Rejected Card */}
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ backgroundColor: "#ef4444", color: "white" }}>
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="h5" component="div">
                      Rejected
                    </Typography>
                    <Cancel sx={{ fontSize: 40 }} />
                  </Box>
                  <Typography variant="h3" component="div" sx={{ marginTop: 2 }}>
                    {counts.rejected}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Verified Card */}
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ backgroundColor: "#10b981", color: "white" }}>
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="h5" component="div">
                      Verified
                    </Typography>
                    <Verified sx={{ fontSize: 40 }} />
                  </Box>
                  <Typography variant="h3" component="div" sx={{ marginTop: 2 }}>
                    {counts.verified}
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