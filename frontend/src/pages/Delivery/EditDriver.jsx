import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/Delivery/EditDriver.css";
import { useNavigate, useParams } from 'react-router-dom';

const EditDriver = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    DName: "",
    VehicleType: "",
    Phone: "",
    Email: "",
    LicenseNumber: "",
    Availability: "Available",
  });

  useEffect(() => {
    // Fetch existing driver details by ID
    const fetchDriver = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/drivers/${id}`);

        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching driver details:", error);
        alert("Failed to fetch driver details.");
      }
    };
    fetchDriver();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone);
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isValidPhone(formData.Phone)) {
      alert("Please enter a valid 10-digit phone number.");
      setLoading(false);
      return;
    }

    if (!isValidEmail(formData.Email)) {
      alert("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      await axios.put(`http://localhost:5555/drivers/${id}`, formData);

      alert("Driver details updated successfully!");
      navigate("/Delivery/DriverDetails");
    } catch (error) {
      console.error("Error updating driver details:", error);
      alert("Failed to update driver details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Edit-body">
      {/* <DriverBackButton/>  */}
      <div className="Edit-form-container">
        <h2>Edit Delivery Driver Details</h2>
        <form onSubmit={handleSubmit}>
          <label>Driver Name:</label>
          <input type="text" name="DName" value={formData.DName} onChange={handleChange} required />

          <label>Vehicle Type:</label>
          <input type="text" name="VehicleType" value={formData.VehicleType} onChange={handleChange} required />

          <label>Phone:</label>
          <input
            type="tel"
            name="Phone"
            value={formData.Phone}
            onChange={handleChange}
            required
            placeholder="Enter 10-digit phone number"
          />

          <label>Email:</label>
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
            placeholder="Enter a valid email address"
          />

          <label>License Number:</label>
          <input type="text" name="LicenseNumber" value={formData.LicenseNumber} onChange={handleChange} required />

          <label>Availability:</label>
          <select name="Availability" value={formData.Availability} onChange={handleChange}>
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDriver;
