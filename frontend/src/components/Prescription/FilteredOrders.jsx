import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
import { ArrowForward } from "@mui/icons-material";
import "../../pages/Prescription/Prescriptions.css";

const FilteredOrders = ({ statusFilter, title }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/orders")
      .then((response) => {
        const filteredOrders = response.data.filter(
          (order) => order.status.toLowerCase() === statusFilter.toLowerCase()
        );
        setOrders(filteredOrders);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, [statusFilter]);

  const handleViewDetails = (prescriptionId) => {
    navigate(`/Prescription/Details/${prescriptionId}`);
  };

  return (
    <div className="pdashboard-container">
      <HeaderStripe />
      <div className="pdashboard-content">
        <AddPSidebar />
        <div className="pdashboard-main">
          <h1 style={{ marginBottom: "20px", color: "#1f2937" }}>{title}</h1>
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
                    <TableCell style={{ fontWeight: "bold", color: "#ef4444" }}>
                      {order.status}
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

export default FilteredOrders;
