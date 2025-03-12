import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import '../styles/DeleteBook.css'; // Import the CSS file

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Deleted successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="delete-book-container">
      <BackButton />
      <h1 className="delete-book-title">Delete Book</h1>
      {loading ? <Spinner /> : ''}
      <div className="delete-book-confirmation">
        <h3 className="confirmation-message">Are You Sure You want to delete this book?</h3>
        <button className="delete-button" onClick={handleDeleteBook}>
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;