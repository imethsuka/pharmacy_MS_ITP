import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBarV from "../../components/Delivery/NavBarV";
//import SideBarV from "../../components/Delivery/SideBarV";
import "../../styles/Delivery/DriverProfile.css";
import DriverBackButton from "../../components/BackButton";


const DriverProfile = () => {
  const { id } = useParams(); // get the driver ID from URL
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5555/drivers/${id}`)
      .then((response) => {
        setDriver(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching driver:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading driver details...</p>;

  if (!driver) return <p>Driver not found.</p>;

  return (
    <>
      <div className="driver-nav">
        <NavBarV />
      </div>
      <div className="profile-btn">
        <DriverBackButton destination='/Delivery/DriverDetails' />
      </div>
      <div className="DriverProfile-container"><br/><br/><br/><br/>
        <h1 className="DriverProfile-title">Driver Profile</h1>
        <div className="DriverProfile-card"><br/><br/>
          <p><strong>Name:</strong> {driver.DName}</p>
          <p><strong>Phone:</strong> {driver.Phone}</p>
          <p><strong>Email:</strong> {driver.Email}</p>
          <p><strong>Vehicle Type:</strong> {driver.VehicleType}</p>
          <p><strong>License Number:</strong> {driver.LicenseNumber}</p>
          <p>
            <strong>Availability:</strong>{" "}
            <span className={driver.Availability === "Available" ? "text-green" : "text-red"}>
              {driver.Availability}
            </span>
          </p>
        </div>
        {/* <button onClick={() => navigate("/delivery/driverdetails")} className="back-btn">
          Back to Driver List
        </button> */}
      </div>
    </>
  );
};

export default DriverProfile;
