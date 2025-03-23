import React, { useEffect, useState } from 'react';
import "../../styles/Delivery/DriverDetails.css";
// import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBarV from "../../components/Delivery/NavBarV";
import SideBarV from "../../components/Delivery/SideBarV";
// import DriverTable from "../../components/Delivery/DriverTable";




const DriverDetails = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

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

  return (
    <><div className="driver-nav">
      <NavBarV />
    </div><div className="driver-side">
        <SideBarV />
      </div><div className="Driver-large-container">

        <h1 className="Driver-Title">Delivery Driver Details</h1>
        <div className="Add-driver-button">
          <button onClick={() => navigate("/Delivery/AddDriver")}>
            Add Driver
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
                  className="text-center border-b hover:bg-blue-100 transition duration-200"
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
                  <button 
                          onClick={() => navigate(`/delivery/deletedriver/${driver._id}`)} 
                      
                             >
                        Delete
                     </button>
                     <button onClick={() => navigate(`/delivery/driverprofile/${driver._id}`)}>View</button>

                   </td>

                </tr>
              ))}
            </tbody>
          </table>
         )}
        </div>
      </div></>
  );
};

export default DriverDetails;
