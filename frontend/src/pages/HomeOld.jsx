import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';
import '../styles/HomeOld.css'; // Import the CSS file

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

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
        </div>
        <div className="header">
          <h1 className="page-title">Medicine List</h1>
          <Link to="/books/create" className="add-button">
            <MdOutlineAddBox className="add-icon" />
          </Link>
        </div>
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