import React, { useState } from "react";
import "../../styles/Delivery/DriverForm.css";
import NavBar from "../../components/Delivery/NavBar";
import SideBarV from "../../components/Delivery/SideBarV";

const DriverForm = () => {
  const [drivers, setDrivers] = useState([
    { id: 1, name: "John Doe", contact: "123-456-7890", status: "Active" },
  ]);

  const [newDriver, setNewDriver] = useState({ name: "", contact: "", status: "Active" });

  const handleChange = (e) => {
    setNewDriver({ ...newDriver, [e.target.name]: e.target.value });
  };

  const addDriver = (e) => {
    e.preventDefault();
    if (newDriver.name && newDriver.contact) {
      setDrivers([...drivers, { ...newDriver, id: Date.now() }]);
      setNewDriver({ name: "", contact: "", status: "Active" });
    }
  };

  const toggleStatus = (id) => {
    setDrivers((prevDrivers) =>
      prevDrivers.map((driver) =>
        driver.id === id
          ? { ...driver, status: driver.status === "Active" ? "Inactive" : "Active" }
          : driver
      )
    );
  };

  return (
    <div className="page-container">
      <NavBar />
      <div className="content-wrapper">
        <SideBarV />
        <div className="drivers-container">
          <h2>Delivery Drivers</h2>

          {/* Add Driver Form */}
          <form className="driver-form" onSubmit={addDriver}>
            <input
              type="text"
              name="name"
              placeholder="Driver Name"
              value={newDriver.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact Number"
              value={newDriver.contact}
              onChange={handleChange}
              required
            />
            <select name="status" value={newDriver.status} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <button type="submit">Add Driver</button>
          </form>

          {/* Drivers List Table */}
          <div className="table-container">
            <table className="drivers-table">
              <thead>
                <tr className="Driver-content">
                  <th className="Driver-headerV">Name</th>
                  <th className="Driver-headerV">Contact</th>
                  <th className="Driver-headerV">Status</th>
                  <th className="Driver-headerV">Action</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver) => (
                  <tr className="Driver-content" key={driver.id}>
                    <td className="Driver-header" >{driver.name}</td>
                    <td className="Driver-header">{driver.contact}</td>
                    <td className={driver.status === "Active" ? "status-active" : "status-inactive"}>
                      {driver.status}
                    </td>
                    <td className="Driver-header">
                      <button
                        className={driver.status === "Active" ? "deactivate-btn" : "activate-btn"}
                        onClick={() => toggleStatus(driver.id)}
                      >
                        {driver.status === "Active" ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverForm;