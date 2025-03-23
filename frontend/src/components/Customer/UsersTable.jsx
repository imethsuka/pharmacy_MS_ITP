import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai'; // Edit icon
import { BsInfoCircle } from 'react-icons/bs'; // Info icon
import { HiOutlineTrash } from 'react-icons/hi'; // Trash (delete) icon
import '../../styles/Customer/UsersTable.css'; // Import the CSS file for user table styles

const UsersTable = ({ users }) => {
  return (
    <table className="users-table">
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Email</th>
          <th className="hide-on-mobile">Password</th>
          <th className="hide-on-mobile">Gender</th>
          <th className="hide-on-mobile">Date of Birth</th>
          <th className="hide-on-mobile">Address</th>
          
          <th>Operations</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user._id}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td className="hide-on-mobile">{user.password}</td>
            <td className="hide-on-mobile">{user.gender}</td>
            <td className="hide-on-mobile">{user.dob}</td>
            <td className="hide-on-mobile">{user.address}</td>
            
            <td>
              <div className="operations">
                <Link to={`/users/details/${user._id}`}>
                  <BsInfoCircle className="info-icon" /> {/* Info icon for user details */}
                </Link>
                <Link to={`/Customer/editUser/:id`}>
                  <AiOutlineEdit className="edit-icon" /> {/* Edit icon for editing user */}
                </Link>
                <Link to={`/users/delete/${user._id}`}>
                  <HiOutlineTrash className="delete-icon" /> {/* Trash icon for deleting user */}
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
