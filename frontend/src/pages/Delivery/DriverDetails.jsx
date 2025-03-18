import React from "react";
import "../../styles/Delivery/DriverDetails.css";
import NavBarV from "../../components/Delivery/NavBarV";
import SideBarV from "../../components/Delivery/SideBarV";
import { useNavigate } from "react-router-dom";

const DriverDetails = () => {
  const drivers = [
    { id: 1, name: "John Doe", phone: "+1234567890", vehicle: "Bike", license: "AB123456", availability: "Available" },
    { id: 2, name: "Jane Smith", phone: "+9876543210", vehicle: "Car", license: "XY987654", availability: "Busy" },
    { id: 3, name: "Michael Brown", phone: "+1122334455", vehicle: "Scooter", license: "LM456789", availability: "Available" },
  ];

  const navigate = useNavigate();

  return (
    <div className="DriverDetails-container">
      <div> <NavBarV /></div>
      <div className="Details-container">
        <div>
          <SideBarV />
        </div>
        <div className="Delivery-Driver">
          <h2>Delivery Driver Details</h2>
        </div>
        
        <button onClick={() => navigate("/Delivery/addDriver")}>
          Add Driver
        </button>

        <table className="driverDetails-table">
          <thead>
            <tr>
              <th>Driver ID</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Vehicle Type</th>
              <th>License Number</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id}>
                <td>{driver.id}</td>
                <td>{driver.name}</td>
                <td>{driver.phone}</td>
                <td>{driver.vehicle}</td>
                <td>{driver.license}</td>
                <td className={driver.availability === "Available" ? "available" : "busy"}>
                  {driver.availability}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DriverDetails;












