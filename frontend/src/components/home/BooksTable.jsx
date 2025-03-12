import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai'; // Modern edit icon
import { BsInfoCircle } from 'react-icons/bs'; // Modern info icon
import { MdOutlineDelete } from 'react-icons/md'; // Modern delete icon
import { FiInfo } from 'react-icons/fi'; // Modern alternative for info
import { RiEdit2Line } from 'react-icons/ri'; // Modern alternative for edit
import { HiOutlineTrash } from 'react-icons/hi'; // Modern alternative for delete
import '../../styles/BooksTable.css'; // Import the CSS file

const BooksTable = ({ books }) => {
  return (
    <table className="books-table">
      <thead>
        <tr>
          <th>No</th>
          <th>Title</th>
          <th className="hide-on-mobile">Author</th>
          <th className="hide-on-mobile">Publish Year</th>
          <th>Operations</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={book._id}>
            <td>{index + 1}</td>
            <td>{book.title}</td>
            <td className="hide-on-mobile">{book.author}</td>
            <td className="hide-on-mobile">{book.publishYear}</td>
            <td>
              <div className="operations">
                <Link to={`/books/details/${book._id}`}>
                  <FiInfo className="info-icon" /> {/* Modern info icon */}
                </Link>
                <Link to={`/books/edit/${book._id}`}>
                  <RiEdit2Line className="edit-icon" /> {/* Modern edit icon */}
                </Link>
                <Link to={`/books/delete/${book._id}`}>
                  <HiOutlineTrash className="delete-icon" /> {/* Modern delete icon */}
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BooksTable;