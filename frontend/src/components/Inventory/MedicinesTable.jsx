import { Link } from "react-router-dom";
import { FiInfo } from "react-icons/fi";
import { RiEdit2Line } from "react-icons/ri";
import { HiOutlineTrash } from "react-icons/hi";
import "../../styles/Inventory/MedicinesTable.css";

const MedicinesTable = ({ medicines, onMoreInfoClick }) => {
  return (
    <div className="table-container">
      <table className="medicines-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th className="hide-on-mobile">Product ID</th>
            <th className="hide-on-mobile">Category</th>
            <th className="hide-on-mobile">Price</th>
            <th className="hide-on-mobile">Stock</th>
            <th className="hide-on-mobile">Reorder</th>
            <th className="hide-on-mobile">Batch Expiry</th>
            <th className="hide-on-mobile">Prescription</th>
            <th className="hide-on-mobile">Supplier</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine, index) => (
            <tr key={medicine._id}>
              <td>{index + 1}</td>
              <td>{medicine.name}</td>
              <td className="hide-on-mobile">{medicine.productId}</td>
              <td className="hide-on-mobile">{medicine.category}</td>
              <td className="hide-on-mobile price">Rs. {medicine.price}</td>
              <td className="hide-on-mobile stock">{medicine.stock}</td>
              <td className="hide-on-mobile">{medicine.reorderLevel}</td>
              <td className="hide-on-mobile">{medicine.batchExpiry}</td>
              <td className="hide-on-mobile">
                {medicine.requiresPrescription ? "Yes" : "No"}
              </td>
              <td className="hide-on-mobile">{medicine.supplierEmail}</td>
              <td>
                <div className="actions">
                  <button onClick={() => onMoreInfoClick(medicine)}>
                    <FiInfo className="info-icon" />
                  </button>
                  <Link to={`/inventory/EditMedicine/${medicine._id}`}>
                    <RiEdit2Line className="edit-icon" />
                  </Link>
                  <Link to={`/medicines/delete/${medicine._id}`}>
                    <HiOutlineTrash className="delete-icon" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicinesTable;
