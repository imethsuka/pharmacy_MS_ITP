import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import BackButton from '../../components/BackButton'; // Ensure this exists
import '../../styles/Customer/DeleteUser.css'; 

const DeleteUser = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteUser = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/users/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('User deleted successfully', { variant: 'success' });
        navigate('/CDashboard');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error deleting user', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="delete-user-container">
      <BackButton />
      <h1 className="delete-user-title">Delete User</h1>
      {loading ? <p>Loading...</p> : ''}
      <div className="delete-user-confirmation">
        <h3 className="confirmation-message">Are you sure you want to delete this user?</h3>
        <button className="delete-button" onClick={handleDeleteUser}>Yes, Delete it</button>
      </div>
    </div>
  );
};

export default DeleteUser;
