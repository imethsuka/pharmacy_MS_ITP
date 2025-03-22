import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderStripe from "../../components/HeaderStripe";
import AddPSidebar from "../../components/Prescription/PSidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import { ArrowForward, Delete } from "@mui/icons-material"; // Icons for actions
import "./Prescriptions.css"; // Reuse the same CSS file

const VerifiedPrescriptionsPage = () => {
  const navigate = useNavigate();
  const [prescriptions, setPrescriptions] = useState([]);

  // Simulate fetching verified prescription data (replace with actual API call)
  useEffect(() => {
    const fetchVerifiedPrescriptions = async () => {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Sample data
      const data = [
        {
          id: 1,
          customerName: "John Doe",
          prescriptionId: "RX123456",
        },
        {
          id: 2,
          customerName: "Jane Smith",
          prescriptionId: "RX654321",
        },
        {
          id: 3,
          customerName: "Alice Johnson",
          prescriptionId: "RX987654",
        },
      ];
      setPrescriptions(data);
    };

    fetchVerifiedPrescriptions();
  }, []);

  // Handle "Remove from List" button click
  const handleRemove = (prescriptionId) => {
    setPrescriptions((prev) =>
      prev.filter((prescription) => prescription.prescriptionId !== prescriptionId)
    );
  };

  // Handle "View Full Details" button click
  const handleViewDetails = (prescriptionId) => {
    navigate(`/Prescription/Details/${prescriptionId}`);
  };

  return (
    <div className="pdashboard-container">
      <HeaderStripe />
      <div className="pdashboard-content">
        <AddPSidebar />
        <div className="pdashboard-main">
          <h1 style={{ marginBottom: "20px", color: "#1f2937" }}>Verified Prescriptions</h1>
          <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1f2937" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Customer Name</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Prescription ID</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Remove from List</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>View Full Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {prescriptions.map((prescription) => (
                  <TableRow key={prescription.id}>
                    <TableCell>{prescription.customerName}</TableCell>
                    <TableCell>{prescription.prescriptionId}</TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => handleRemove(prescription.prescriptionId)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        endIcon={<ArrowForward />}
                        onClick={() => handleViewDetails(prescription.prescriptionId)}
                      >
                        View Full Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default VerifiedPrescriptionsPage; 