import { useEffect, useState } from "react";
import { getPrescriptions } from "../../services/prescriptionService";

const PrescriptionList = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    getPrescriptions().then((response) => {
      setPrescriptions(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Prescriptions</h2>
      <ul>
        {prescriptions.map((p) => (
          <li key={p._id}>
            <strong>Customer:</strong> {p.userId.name} <br />
            <strong>Status:</strong> {p.status} <br />
            <a href={`/prescription/${p._id}`}>View Details</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrescriptionList;
