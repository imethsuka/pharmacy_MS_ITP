import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';
import BookModal from './BookModal';
import '../../styles/BookSingleCard.css'; // Import the CSS file

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="book-single-card">
      <h2 className="publish-year">{book.publishYear}</h2>
      <h4 className="book-id">{book._id}</h4>
      <div className="book-info">
        <PiBookOpenTextLight className="book-icon" />
        <h2 className="book-title">{book.title}</h2>
      </div>
      <div className="book-info">
        <BiUserCircle className="author-icon" />
        <h2 className="book-author">{book.author}</h2>
      </div>
      <div className="actions">
        <BiShow
          className="show-icon"
          onClick={() => setShowModal(true)}
        />
        <Link to={`/books/details/${book._id}`}>
          <BsInfoCircle className="info-icon" />
        </Link>
        <Link to={`/books/edit/${book._id}`}>
          <AiOutlineEdit className="edit-icon" />
        </Link>
        <Link to={`/books/delete/${book._id}`}>
          <MdOutlineDelete className="delete-icon" />
        </Link>
      </div>
      {showModal && (
        <BookModal book={book} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default BookSingleCard;