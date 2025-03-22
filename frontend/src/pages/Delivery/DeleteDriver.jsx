import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import NavBarV from '../../components/Delivery/NavBarV';
import SideBarV from '../../components/Delivery/SideBarV';
// import Spinner from '../../components/Spinner';
import '../../styles/Delivery/DeleteDriver.css'; // You can create or reuse CSS for delete styling
import DriverBackButton from "../../components/BackButton";

const DeleteDriver = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteDriver = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/drivers/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Driver deleted successfully', { variant: 'success' });
        navigate('/delivery/driverdetails');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error deleting driver', { variant: 'error' });
        console.error(error);
      });
  };

  return (
    <div>
      <div className="driver-nav">
        <NavBarV />
      </div>
      <div className="driver-side">
        <SideBarV />
      </div>
      <div className="delete-driver-container">
        <DriverBackButton/>
        
        <h1 className="delete-driver-title">Delete Driver</h1>
        {/* {loading && <Spinner />} */}
        <div className="delete-driver-confirmation">
          <h3>Are you sure you want to delete this driver?</h3>
          <button className="delete-button" onClick={handleDeleteDriver}>
            Yes, Delete
          </button>
          <button className="cancel-button" onClick={() => navigate('/delivery/driverdetails')}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDriver;
