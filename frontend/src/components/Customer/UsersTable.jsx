import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { HiOutlineTrash } from 'react-icons/hi';
import '../../styles/Customer/UsersTable.css';

const UsersTable = ({ users }) => {
  return (
    <table className="users-table">
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Email</th>
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
            <td className="hide-on-mobile">{user.gender}</td>
            <td className="hide-on-mobile">{user.dob}</td>
            <td className="hide-on-mobile">{user.address}</td>
            <td>
              <div className="operations">
                <Link to={`/users/edit/${user._id}`}>
                  <AiOutlineEdit className="edit-icon" />
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
