import React, { useState } from "react";
import axios from "axios";
import "../../styles/Delivery/AddDriver.css";
import { useNavigate } from 'react-router-dom';
import DriverBackButton from "../../components/Delivery/DriverBackButton";

const AddDriver = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    DName: "",
    VehicleType: "",
    Phone: "",
    Email: "",
    LicenseNumber: "",
    Availability: "Available",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validation functions
  const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone);
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Phone number validation
    if (!isValidPhone(formData.Phone)) {
      alert("Please enter a valid 10-digit phone number.");
      setLoading(false);
      return;
    }

    // Email validation
    if (!isValidEmail(formData.Email)) {
      alert("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5555/drivers", formData);
      alert("Driver details submitted successfully!");
      console.log("Response:", response.data);
      setFormData({
        DName: "",
        VehicleType: "",
        Phone: "",
        Email: "",
        LicenseNumber: "",
        Availability: "Available"
      });
      navigate("/Delivery/DriverDetails"); // Navigate to the driver details page after submission
    } catch (error) {
      console.error("Error submitting driver details:", error);
      alert("Failed to submit driver details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="driver-body">
      <div>
      <div className="Driver-form-container">
      <DriverBackButton/> 

        <h2 className="driver-heading"> Add Driver</h2>    
        <form  className="driver-form-title"onSubmit={handleSubmit}>
          <label className="driver-label">Driver Name:</label>
          <input className="driver-input" type="text" name="DName" value={formData.DName} onChange={handleChange} required />

          <label className="driver-label">Vehicle Type:</label>
          <input className="driver-input" type="text" name="VehicleType" value={formData.VehicleType} onChange={handleChange} required />

          <label className="driver-label">Phone:</label>
          <input className="driver-input" 
            type="tel"
            name="Phone"
            value={formData.Phone}
            onChange={handleChange}
            required
            placeholder="Enter 10-digit phone number"
          />

          <label className="driver-label">Email:</label>
          <input className="driver-input"
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
            placeholder="Enter a valid email address"
          />

          <label className="driver-label">License Number:</label>
          <input className="driver-input" type="text" name="LicenseNumber" value={formData.LicenseNumber} onChange={handleChange} required />

          <label  className="driver-label">Availability:</label>
          <select className="driver-select" name="Availability" value={formData.Availability} onChange={handleChange}>
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>

          <button className="driver-btn" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AddDriver;
