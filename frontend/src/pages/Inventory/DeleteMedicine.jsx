import React, { useState } from 'react';
import BackButton from '../../components/Inventory/InventoryBackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import '../../styles/Inventory/DeleteMedicine.css'; // Import the CSS file

const DeleteMedicine = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteMedicine = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/medicines/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Medicine Deleted successfully', { variant: 'success' });
        navigate('/inventory/MedicineLists');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="delete-medicine-container">
      
      {loading ? <Spinner /> : ''}
      <div className="delete-medicine-confirmation">
      <BackButton />
      <h1 className="delete-medicine-title">Delete Medicine</h1>
        <h3 className="confirmation-medicine-message">Are You Sure You want to remove this medicine?</h3>
        <button className="delete-medicine-button" onClick={handleDeleteMedicine}>
          Okay, Delete it.this book
        </button>
      </div>
    </div>
  );
};

export default DeleteMedicine;