import React, { useEffect, useState } from 'react';
import "../../styles/Delivery/DriverDetails.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBarV from "../../components/Delivery/NavBarV";
import SideBarV from "../../components/Delivery/SideBarV";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const DriverDetails = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch drivers data
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/drivers`)
      .then((response) => {
        setDrivers(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // PDF download logic
  const downloadPDF = () => {
    if (!drivers || drivers.length === 0) {
      alert("No drivers available to generate the PDF.");
      return;
    }

    const doc = new jsPDF();

    // Add title
    doc.text("Delivery Driver Details", 14, 10);

    // Define table columns
    const columns = [
      "Driver ID",
      "Name",
      "Phone Number",
      "Vehicle Type",
      "Email",
      "License Number",
      "Availability",
    ];

    // Map drivers data to rows
    const rows = drivers.map((driver, index) => [
      index + 1,
      driver.DName || "N/A",
      driver.Phone || "N/A",
      driver.VehicleType || "N/A",
      driver.Email || "N/A",
      driver.LicenseNumber || "N/A",
      driver.Availability || "N/A",
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
    doc.save("DriverDetails.pdf");
  };

  return (
    <>
      <div className="driver-nav">
        <NavBarV />
      </div>
      <div className="driver-side">
        <SideBarV />
      </div>
      <div className="Driver-large-container">
        <h1 className="Driver-Title">Delivery Driver Details</h1>
        <div className="Add-driver-button">
          <button onClick={() => navigate("/Delivery/AddDriver")}>Add Driver</button>
          <button onClick={downloadPDF} className="download-pdf-button">
            Download PDF
          </button>
        </div>
        <div className="Driver-table">
          {loading ? (
            <p>Loading drivers...</p>
          ) : (
            <table className="Driver-table-start">
              <thead>
                <tr className="Driver-table-header">
                  <th className="Driver-header">Driver ID</th>
                  <th className="Driver-header">Name</th>
                  <th className="Driver-header">Phone Number</th>
                  <th className="Driver-header">Vehicle Type</th>
                  <th className="Driver-header">Email</th>
                  <th className="Driver-header">License Number</th>
                  <th className="Driver-header">Availability</th>
                  <th className="Driver-header">Action</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver, index) => (
                  <tr
                  key={index}
                  style={{
                    textAlign: 'center',
                    borderBottom: '1px solid',
                    transition: 'background-color 200ms',
                    ':hover': {
                      backgroundColor: '#ebf8ff', // Equivalent to bg-blue-100
                    },
                  }}
                >
                    <td className="Driver-data">{index + 1}</td>
                    <td className="Driver-data">{driver.DName}</td>
                    <td className="Driver-data">{driver.Phone}</td>
                    <td className="Driver-data">{driver.VehicleType}</td>
                    <td className="Driver-data">{driver.Email}</td>
                    <td className="Driver-data">{driver.LicenseNumber}</td>
                    <td
                      className={`Driver-availability ${driver.Availability === 'Available' ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {driver.Availability}
                    </td>
                    <td className="Driver-data">
                      <button onClick={() => navigate(`/delivery/editdriver/${driver._id}`)}>Edit</button>
                      <button  onClick={() => navigate(`/delivery/deletedriver/${driver._id}`)}>Delete</button>
                      <button onClick={() => navigate(`/delivery/driverprofile/${driver._id}`)}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default DriverDetails;