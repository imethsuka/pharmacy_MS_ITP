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
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material"; // Icon for "View Full Details"
import "./PDashboard.css"; // Reuse the same CSS file

const PendingPrescriptionsPage = () => {
  const navigate = useNavigate();
  const [prescriptions, setPrescriptions] = useState([]);

  // Simulate fetching pending prescription data (replace with actual API call)
  useEffect(() => {
    const fetchPendingPrescriptions = async () => {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Sample data
      const data = [
        {
          id: 1,
          customerName: "John Doe",
          prescriptionId: "RX123456",
          uploadDate: "2023-10-01",
        },
        {
          id: 2,
          customerName: "Jane Smith",
          prescriptionId: "RX654321",
          uploadDate: "2023-10-02",
        },
        {
          id: 3,
          customerName: "Alice Johnson",
          prescriptionId: "RX987654",
          uploadDate: "2023-10-03",
        },
      ];
      setPrescriptions(data);
    };

    fetchPendingPrescriptions();
  }, []);

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
          <h1 style={{ marginBottom: "20px", color: "#1f2937" }}>Pending Prescriptions</h1>
          <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1f2937" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Customer Name</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Prescription ID</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Upload Date</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>View Full Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {prescriptions.map((prescription) => (
                  <TableRow key={prescription.id}>
                    <TableCell>{prescription.customerName}</TableCell>
                    <TableCell>{prescription.prescriptionId}</TableCell>
                    <TableCell>{prescription.uploadDate}</TableCell>
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

export default PendingPrescriptionsPage;