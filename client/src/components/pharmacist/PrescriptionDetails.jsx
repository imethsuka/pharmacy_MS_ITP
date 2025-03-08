import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPrescriptionById, verifyPrescription } from "../../services/prescriptionService";

const PrescriptionDetails = () => {
  const { id } = useParams();
  const [prescription, setPrescription] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    getPrescriptionById(id).then((response) => setPrescription(response.data));
  }, [id]);

  const handleVerify = (status) => {
    verifyPrescription(id, status, rejectionReason).then(() => {
      alert(`Prescription ${status}`);
      window.location.href = "/dashboard";
    });
  };

  if (!prescription) return <p>Loading...</p>;

  return (
    <div>
      <h2>Prescription Details</h2>
      <p><strong>Customer:</strong> {prescription.userId.name}</p>
      <p><strong>Status:</strong> {prescription.status}</p>
      <img src={prescription.prescriptionFile} alt="Prescription" width="200" />
      
      {prescription.status === "Pending" && (
        <>
          <button onClick={() => handleVerify("Verified")}>Approve</button>
          <button onClick={() => handleVerify("Rejected")}>Reject</button>
          <input
            type="text"
            placeholder="Rejection Reason"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
          />
        </>
      )}
    </div>
  );
};

export default PrescriptionDetails;
