import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import '../../styles/Customer/DeleteUser.css'; // Import the CSS file
import BackButton from '../../components/BackButton'; // Update the path according to where your BackButton is located

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
        enqueueSnackbar('User Deleted successfully', { variant: 'success' });
        navigate('/Customer/userslist');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="delete-user-container">
      <BackButton />
      <h1 className="delete-user-title">Delete User</h1>
      {loading ? <Spinner /> : ''}
      <div className="delete-user-confirmation">
        <h3 className="confirmation-message">Are You Sure You want to delete this user?</h3>
        <button className="delete-button" onClick={handleDeleteUser}>
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteUser;