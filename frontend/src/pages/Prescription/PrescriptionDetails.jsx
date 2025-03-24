import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
// import HeaderStripe from "../HeaderStripe";
// import AddPSidebar from "./PSidebar"; 

const PrescriptionDetails = () => {
  const { id } = useParams(); // Get the prescription ID from the URL
  const navigate = useNavigate();
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  // Fetch prescription details by ID
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/orders/${id}`) // Fetch data by ID
      .then((response) => {
        setPrescription(response.data);
        setStatus(response.data.status); // Set initial status
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching prescription details:", error);
        setLoading(false);
      });
  }, [id]);

  // Handle status change
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  // Update status in the database
  const updateStatus = () => {
    axios
      .put(`http://localhost:5555/orders/${id}`, { status })
      .then((response) => {
        alert("Status updated successfully!");
        setPrescription({ ...prescription, status }); // Update local state
      })
      .catch((error) => {
        console.error("Error updating status:", error);
        alert("Failed to update status.");
      });
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!prescription) {
    return <Typography>Prescription not found.</Typography>;
  }

  return (
    <div className="prescription-details-container">
      {/* <HeaderStripe /> */}
      <div className="prescription-details-content">
        {/* <AddPSidebar /> */}
        <div className="prescription-details-main">
          <h1 style={{ marginBottom: "20px", color: "#1f2937" }}>Prescription Details</h1>
          <Paper elevation={3} sx={{ padding: "20px", marginBottom: "20px" }}>
            <Typography variant="h6" gutterBottom>
              Prescription ID: {prescription._id}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Customer ID: {prescription.customerId || "N/A"}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Total Amount: ${prescription.totalAmount.toFixed(2)}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Created At: {new Date(prescription.createdAt).toLocaleDateString()}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Status:{" "}
              <span
                style={{
                  color:
                    prescription.status === "Pending"
                      ? "#f59e0b"
                      : prescription.status === "Verified"
                      ? "#10b981"
                      : "#ef4444",
                  fontWeight: "bold",
                }}
              >
                {prescription.status}
              </span>
            </Typography>
          </Paper>

          {/* Status Update Section */}
          <Paper elevation={3} sx={{ padding: "20px", marginBottom: "20px" }}>
            <Typography variant="h6" gutterBottom>
              Update Status
            </Typography>
            <FormControl fullWidth sx={{ marginBottom: "20px" }}>
              <InputLabel>Status</InputLabel>
              <Select value={status} onChange={handleStatusChange} label="Status">
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" onClick={updateStatus}>
              Update Status
            </Button>
          </Paper>

          {/* Back Button */}
          <Button variant="outlined" onClick={() => navigate('/Prescription/Prescriptions')}>
            Back to Prescriptions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionDetails;