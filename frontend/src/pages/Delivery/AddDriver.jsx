import React, { useState } from "react";
import "./DriverForm.css";

const DriverForm = () => {
  const [formData, setFormData] = useState({
    DName: "",
    VehicleType: "",
    Phone: "",
    Email: "",
    LicenseNumber: "",
    Availability: "Available", // Default value
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Driver Details Submitted:", formData);
    alert("Driver details submitted successfully!");
  };

  return (
    <div className="Driver-form-container">
      <h2>Delivery Driver Details</h2>
      <form onSubmit={handleSubmit}>
        <label>Driver Name:</label>
        <input
          type="text"
          name="DName"
          value={formData.DName}
          onChange={handleChange}
          required
        />

        <label>Vehicle Type:</label>
        <input
          type="text"
          name="VehicleType"
          value={formData.VehicleType}
          onChange={handleChange}
          required
        />

        <label>Phone:</label>
        <input
          type="tel"
          name="Phone"
          value={formData.Phone}
          onChange={handleChange}
          required
          pattern="[0-9]{10}"
          title="Enter a 10-digit phone number"
        />

        <label>Email:</label>
        <input
          type="email"
          name="Email"
          value={formData.Email}
          onChange={handleChange}
          required
        />

        <label>License Number:</label>
        <input
          type="text"
          name="LicenseNumber"
          value={formData.LicenseNumber}
          onChange={handleChange}
          required
        />

        <label>Availability:</label>
        <select name="Availability" value={formData.Availability} onChange={handleChange}>
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DriverForm;
