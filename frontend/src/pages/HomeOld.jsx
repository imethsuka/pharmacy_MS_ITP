import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory
import { MdOutlineAddBox } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';
import '../styles/HomeOld.css'; // Import the CSS file
import NavBar from '../components/home/NavBar';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    
    <div className="home-container">
      <div className="home-content">
       <NavBar />

        {/* View Toggle Buttons */}
        <div className="view-toggle">
          <button
            className={`view-button ${showType === 'table' ? 'active' : ''}`}
            onClick={() => setShowType('table')}
          >
            Table View
          </button>
          <button
            className={`view-button ${showType === 'card' ? 'active' : ''}`}
            onClick={() => setShowType('card')}
          >
            Card View
          </button>
          <button
            className="view-button inventory-button" // Added class for styling
            onClick={() => navigate('/Inventory/Dashboard')}
          >
            Inventory Dashboard
          </button>
          <button
            className="view-button delivery-button" // Added class for styling
            onClick={() => navigate('/Delivery/DeliveryStatus')}
          >
            Delivery Status 
          </button>
        </div>

        {/* Header Section */}
        <div className="header">
          <h1 className="page-title">Medicine List</h1>
          <Link to="/books/CreateBooks" className="add-button">
            <MdOutlineAddBox className="add-icon" />
          </Link>
        </div>

        {/* Content Section */}
        {loading ? (
          <Spinner />
        ) : showType === 'table' ? (
          <BooksTable books={books} />
        ) : (
          <BooksCard books={books} />
        )}
      </div>
    </div>
  );
};

export default Home;
