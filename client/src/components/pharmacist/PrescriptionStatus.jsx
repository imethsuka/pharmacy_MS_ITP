import { useEffect, useState } from "react";
import { getUserPrescriptions } from "../../services/prescriptionService";

const PrescriptionStatus = ({ userId }) => {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    getUserPrescriptions(userId).then((response) => setPrescriptions(response.data));
  }, [userId]);

  return (
    <div>
      <h2>Your Prescription Status</h2>
      <ul>
        {prescriptions.map((p) => (
          <li key={p._id}>
            <p><strong>Status:</strong> {p.status}</p>
            <p><strong>Rejection Reason:</strong> {p.rejectionReason || "N/A"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrescriptionStatus;
