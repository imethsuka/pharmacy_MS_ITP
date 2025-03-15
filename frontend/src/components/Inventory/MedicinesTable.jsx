import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai'; // Modern edit icon
import { BsInfoCircle } from 'react-icons/bs'; // Modern info icon
import { MdOutlineDelete } from 'react-icons/md'; // Modern delete icon
import { FiInfo } from 'react-icons/fi'; // Modern alternative for info
import { RiEdit2Line } from 'react-icons/ri'; // Modern alternative for edit
import { HiOutlineTrash } from 'react-icons/hi'; // Modern alternative for delete
import '../../styles/Inventory/MedicinesTable.css'; // Import the CSS file

const MedicinesTable = ({ medicines }) => {
  return (
    <table className="medicines-table">
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th className="hide-on-mobile">Product ID</th>
          <th className="hide-on-mobile">Category</th>
          <th className="hide-on-mobile">Descriptionn</th>
          <th className="hide-on-mobile">How To Use</th>
          <th className="hide-on-mobile">Side Effects</th>
          <th className="hide-on-mobile">Price</th>
          <th className="hide-on-mobile">Stock</th>
          <th className="hide-on-mobile">Reorder Level</th>
          <th className="hide-on-mobile">Batch Expiry</th>
          <th className="hide-on-mobile">Requires Prescription</th>
          <th className="hide-on-mobile">Supplier Email</th>
          <th className="hide-on-mobile">Image</th>
          <th>Operations</th>
        </tr>
      </thead>
      <tbody>
        {medicines.map((medicine, index) => (
          <tr key={medicine._id}>
            <td>{index + 1}</td>
            <td>{medicine.name}</td>
            <td className="hide-on-mobile">{medicine.productId}</td>
            <td className="hide-on-mobile">{medicine.category}</td>
            <td className="hide-on-mobile">{medicine.description}</td>
            <td className="hide-on-mobile">{medicine.howToUse}</td>
            <td className="hide-on-mobile">{medicine.sideEffects}</td>
            <td className="hide-on-mobile">{medicine.price}</td>
            <td className="hide-on-mobile">{medicine.stock}</td>
            <td className="hide-on-mobile">{medicine.reorderLevel}</td>
            <td className="hide-on-mobile">{medicine.batchExpiry}</td>
            <td className="hide-on-mobile">{medicine.requiresPrescription}</td>
            <td className="hide-on-mobile">{medicine.supplierEmail}</td>
            <td className="hide-on-mobile">{medicine.imageUrl}</td>
            <td>
              <div className="operations">
                <Link to={`/medicines/details/${medicine._id}`}>
                  <FiInfo className="info-icon" /> {/* Modern info icon */}
                </Link>
                <Link to={`/medicines/edit/${medicine._id}`}>
                  <RiEdit2Line className="edit-icon" /> {/* Modern edit icon */}
                </Link>
                <Link to={`/medicines/delete/${medicine._id}`}>
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

export default MedicinesTable;