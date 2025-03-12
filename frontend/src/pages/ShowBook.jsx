import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import '../styles/ShowBook.css'; // Import the CSS file

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="show-book-container">
      <BackButton />
      <h1 className="show-book-title">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="book-details">
          <div className="detail-item">
            <span className="detail-label">Id</span>
            <span className="detail-value">{book._id}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Name</span>
            <span className="detail-value">{book.title}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Pharmasist</span>
            <span className="detail-value">{book.author}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">MFD</span>
            <span className="detail-value">{book.publishYear}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Create Time</span>
            <span className="detail-value">{new Date(book.createdAt).toString()}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Last Update Time</span>
            <span className="detail-value">{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;