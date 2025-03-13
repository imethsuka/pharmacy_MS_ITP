import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import '../../styles/BookModal.css'; // Import the CSS file

const BookModal = ({ book, onClose }) => {
  return (
    <div className="book-modal-overlay" onClick={onClose}>
      <div className="book-modal-content" onClick={(event) => event.stopPropagation()}>
        <AiOutlineClose className="close-icon" onClick={onClose} />
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
        <p className="additional-info">Anything You want to show</p>
        <p className="description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quia
          voluptatum sint. Nisi impedit libero eveniet cum vitae qui expedita
          necessitatibus assumenda laboriosam, facilis iste cumque a pariatur
          nesciunt cupiditate voluptas? Quis atque earum voluptate dolor nisi
          dolorum est? Deserunt placeat cumque quo dicta architecto, dolore
          vitae voluptate sequi repellat!
        </p>
      </div>
    </div>
  );
};

export default BookModal;