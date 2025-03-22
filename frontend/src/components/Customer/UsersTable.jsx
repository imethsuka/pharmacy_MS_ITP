import { Link } from 'react-router-dom';
import { FiInfo } from 'react-icons/fi'; // Info icon
import { RiEdit2Line } from 'react-icons/ri'; // Edit icon
import { HiOutlineTrash } from 'react-icons/hi'; // Delete icon
import '../../styles/Customer/UsersTable.css'; // Import the CSS file

const UsersTable = ({ users }) => {
  return (
    <table className="users-table">
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th className="hide-on-mobile">Email</th>
          <th className="hide-on-mobile">Gender</th>
          <th className="hide-on-mobile">DOB</th>
          <th className="hide-on-mobile">Address</th>
          <th>Operations</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user._id}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td className="hide-on-mobile">{user.email}</td>
            <td className="hide-on-mobile">{user.gender}</td>
            <td className="hide-on-mobile">{user.dob}</td>
            <td className="hide-on-mobile">{user.address}</td>
            <td>
              <div className="operations">
                <Link to={`/users/details/${user._id}`}>
                  <FiInfo className="info-icon" />
                </Link>
                <Link to={`/users/edit/${user._id}`}>
                  <RiEdit2Line className="edit-icon" />
                </Link>
                <Link to={`/users/delete/${user._id}`}>
                  <HiOutlineTrash className="delete-icon" />
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
