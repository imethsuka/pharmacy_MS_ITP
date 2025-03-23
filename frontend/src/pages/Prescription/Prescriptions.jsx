import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Correct import
import AddPSidebar from "../../components/Prescription/PSidebar";
import HeaderStripe from "../../components/HeaderStripe";
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
import "./Prescriptions.css";

const PDashboard = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch orders from backend
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/orders`) // Ensure your backend is running on port 5555
      .then((response) => {
        setOrders(response.data); // Assuming API response is an array
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, []);

  // Handle "View Full Details" button click
  const handleViewDetails = (prescriptionId) => {
    navigate(`/Prescription/Details/${prescriptionId}`);
  };

  // PDF download logic
  const downloadPDF = () => {
    if (!orders || orders.length === 0) {
      alert("No orders available to generate the PDF.");
      return;
    }

    const doc = new jsPDF();

    // Add title
    doc.text("Prescriptions Report", 14, 10);

    // Define table columns
    const columns = [
      "No",
      "Customer ID",
      "Prescription ID",
      "Total Amount",
      "Status",
      "Created At",
    ];

    // Map orders data to rows with safe default values
    const rows = orders.map((order, index) => [
      index + 1,
      order.customerId || "N/A",
      order.prescriptionId || "N/A",
      `$${order.totalAmount.toFixed(2)}`,
      order.status || "Pending",
      new Date(order.createdAt).toLocaleDateString(),
    ]);

    if (rows.length === 0) {
      console.error("No valid data to generate the PDF.");
      return;
    }

    // Add table to PDF
    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 20,
    });

    // Save the PDF
    doc.save("PrescriptionsReport.pdf");
  };

  return (
    <div className="pdashboard-container">
      <HeaderStripe />
      <div className="pdashboard-content">
        <AddPSidebar />
        <div className="pdashboard-main">
          <h1 style={{ marginBottom: "20px", color: "#1f2937" }}>Prescriptions</h1>
          <Button
            variant="contained"
            onClick={downloadPDF}
            style={{ marginBottom: "20px", backgroundColor: "#1f2937", color: "white" }}
          >
            Download Report
          </Button>
          <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1f2937" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>No</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Customer ID</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Prescription ID</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Total Amount</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Created At</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order, index) => (
                  <TableRow key={order._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{order.customerId || "N/A"}</TableCell>
                    <TableCell>{order.prescriptionId || "N/A"}</TableCell>
                    <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                    <TableCell>
                      <span
                        style={{
                          color:
                            order.status === "Pending"
                              ? "#f59e0b"
                              : order.status === "Verified"
                              ? "#10b981"
                              : "#ef4444",
                          fontWeight: "bold",
                        }}
                      >
                        {order.status || "Pending"}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        endIcon={<ArrowForward />}
                        onClick={() => handleViewDetails(order.prescriptionId)}
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

export default PDashboard;